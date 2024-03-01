import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the import path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    const { categoryID } = req.body;

    try {
      // Assuming 'category' is the name of the field in your database
      await prisma.category.delete({
        where: {
            categoryID: parseInt(categoryID),
        },
      });

      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Failed to delete category' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
