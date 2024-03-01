// pages/api/products/edit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the path as necessary

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // console.log(req.body)
        const { productID, categoryID, productPrice, productInventory, productDescription} = req.body;
        
        console.log(productID)
        console.log(parseInt(categoryID))
        console.log(parseFloat(productPrice))
        console.log(parseInt(productInventory))
        console.log(productDescription)

        try {
            const updatedProduct = await prisma.product.update({
                where: {
                    productID: parseInt(productID),
                },
                data: {
                    categoryID: parseInt(categoryID),
                    productPrice: parseFloat(productPrice),
                    productInventory: parseInt(productInventory),
                    productDescription: productDescription,
                },
            });

            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(500).json({ error: "Failed to update product" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update product" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
