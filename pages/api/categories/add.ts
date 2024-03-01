import type { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer } from 'multer';
import { PrismaClient } from '@prisma/client';
import { slugify } from '../../../lib/slugify'; // Ensure you have slugify installed: npm install slugify
import path from 'path';

const prisma = new PrismaClient();

// Assuming you have a function to handle file uploads
function handleFileUpload(file: Express.Multer.File, categorySlug: string): string {
    const fileName = `${categorySlug}${path.extname(file.originalname)}`;
    // Proceed with your file upload logic, saving the file with the new fileName
    return fileName;
}

// Configure multer for file upload
const storage: Multer['storage'] = multer.diskStorage({
    destination: 'public/images/categories/',
    filename: (req, file, cb) => {
        const categorySlug = slugify(req.body.categoryName);
        const fileName = handleFileUpload(file, categorySlug);
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
            console.log(req.body)
            if (error) {
                console.log(error)
                return res.status(500).json({ message: `File upload error: ${error.message}` });
            }

            if (!req.file) {
                console.log("no file")
                return res.status(400).json({ message: 'Category image is required.' });
            }
            
            const { categoryName } = req.body;
            const categorySlug = slugify(req.body.categoryName);

            const isDuplicate = await prisma.category.findUnique({ where: { categorySlug } });
            if (isDuplicate) {
                return res.status(409).json({ message: 'A category with this name already exists. Please choose a different name.' });
            }

            const imagePath = `images/categories/${req.file.filename}`;
            console.log("\n")
            console.log(req.body.categoryName)
            console.log(categorySlug)
            console.log(imagePath)

            try {
                const category = await prisma.category.create({
                    data: {
                        categoryName: categoryName,
                        categorySlug: categorySlug,
                        categoryImagePath: imagePath,
                    },
                });

                return res.status(200).json(category);
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