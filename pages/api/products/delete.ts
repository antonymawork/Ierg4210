import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the import path as necessary
import { parseCookies } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { productID, csrfToken } = req.body;
    const cookies = parseCookies({ req });
    const storedCsrfToken = cookies['csrfToken'];

    // CSRF token validation
    if (!csrfToken || csrfToken !== storedCsrfToken) {
        return res.status(403).json({ message: 'Invalid CSRF token.' });
    }

    try {
      // Assuming 'productId' is the name of the field in your database
      await prisma.product.delete({
        where: {
          productID: parseInt(productID),
        },
      });

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
