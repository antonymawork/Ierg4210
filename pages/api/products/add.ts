import type { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer } from 'multer';
import { PrismaClient } from '@prisma/client';
import { slugify } from '../../../lib/slugify'; // Ensure you have slugify installed: npm install slugify
import path from 'path';
import { parseCookies } from 'nookies';

const prisma = new PrismaClient();

// Assuming you have a function to handle file uploads
function handleFileUpload(file: Express.Multer.File, productSlug: string): string {
    const fileName = `${productSlug}${path.extname(file.originalname)}`;
    // Proceed with your file upload logic, saving the file with the new fileName
    return fileName;
}

// Configure multer for file upload
const storage: Multer['storage'] = multer.diskStorage({
    destination: 'public/images/products/',
    filename: (req, file, cb) => {
        const productSlug = slugify(req.body.productName);
        const fileName = handleFileUpload(file, productSlug);
        cb(null, fileName);
    },
});

const upload = multer({ storage });

// Initialize multer
const uploadMiddleware = upload.single('Image');

export const config = {
    api: {
        bodyParser: false, // Disabling bodyParser to use multer
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        uploadMiddleware(req, res, async (error: any) => {
            if (error) {
                return res.status(500).json({ message: `File upload error: ${error.message}` });
            }

            // CSRF token validation
            const cookies = parseCookies({ req });
            const { csrfToken } = req.body;
            if (!csrfToken || csrfToken !== cookies['csrfToken']) {
                return res.status(403).json({ message: 'Invalid CSRF token.' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Product image is required.' });
            }
            
            // console.log(req.body)
            const { productName, categoryID, productPrice, productInventory, productDescription } = req.body;
            const productSlug = slugify(req.body.productName);

            const isDuplicate = await prisma.product.findUnique({ where: { productSlug } });
            if (isDuplicate) {
                return res.status(409).json({ message: 'A product with this name already exists. Please choose a different name.' });
            }

            const imagePath = `images/products/${req.file.filename}`;
            console.log("\n")
            console.log(req.body.productName)
            console.log(productSlug)
            console.log(parseInt(req.body.categoryID))
            console.log(parseFloat(req.body.productPrice))
            console.log(parseInt(req.body.productInventory))
            console.log(req.body.productDescription)
            console.log(imagePath)

            try {
                const product = await prisma.product.create({
                    data: {
                        productName: productName,
                        productSlug: productSlug,
                        categoryID: parseInt(categoryID),
                        productPrice: parseFloat(productPrice),
                        productInventory: parseInt(productInventory),
                        productDescription: productDescription,
                        productImagePath: imagePath,
                    },
                });

                return res.status(200).json(product);
            } catch (dbError: any) {
                return res.status(500).json({ message: `Database error: ${dbError.message}` });
            }
        });
    } else {
        // Handle any other HTTP methods, or a catch-all for unhandled paths
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Add a default response
    // return res.status(200).json({ message: 'API resolved without sending a response.' });
    return
}
