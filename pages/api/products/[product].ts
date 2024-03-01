// pages/api/products/[product].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the import path according to your file structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { product } = req.query;

  try {
    const productDetails = await prisma.product.findUnique({
      where: {
        // Assuming `product` is the `productSlug`. If it's `productID`, you'll need to convert it to a number.
        productSlug: product as string,
      },
    });

    if (productDetails) {
      res.status(200).json(productDetails);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
