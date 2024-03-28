// pages/api/products/byCategory.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          categorySlug: category.toString(),
        },
      },
      include: {
        category: true, // This ensures the category data is included in the response
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Adjusted for better error handling
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
