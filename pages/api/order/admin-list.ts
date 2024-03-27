// pages/api/order/admin-list.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismaClient'; // Adjust the path as necessary
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Check if the user is authenticated and an admin
        const cookies = parseCookies({ req });
        const token = cookies.auth;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Verify token and check admin status
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Fetch orders from the database
        const orders = await prisma.order.findMany({
            include: {
                // Assuming 'user' is the field that references the user related to the order
                // Adjust according to your Prisma schema
                user: true, 
                // You can add more related models here if necessary, like order items
            },
            orderBy: {
                createdAt: 'desc', // Orders the orders by creation date, adjust as needed
            },
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Request error', error);
        res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
}
