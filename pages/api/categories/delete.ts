import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the import path as necessary
import { parseCookies } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    const { categoryID, csrfToken } = req.body;
    const cookies = parseCookies({ req });
    const storedCsrfToken = cookies['csrfToken'];

    // CSRF token validation
    if (!csrfToken || csrfToken !== storedCsrfToken) {
        return res.status(403).json({ message: 'Invalid CSRF token.' });
    }

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
