// pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
}
