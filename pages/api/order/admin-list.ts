// pages/api/order/admin-list.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the path as necessary
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const cookies = parseCookies({ req });
        const token = cookies.auth;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Attempt to decode the token and check for admin privileges
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Fetch all orders from the database
        const orders = await prisma.order.findMany({
            include: {
                user: true, // Assumes there's a relation 'user' in your Prisma schema
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // No need to transform orders here since Prisma automatically parses JSON fields
        return res.status(200).json(orders);
    } catch (error) {
        // Catch and log any errors, including token verification failures
        console.error('Admin request error', error);
        return res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
}
