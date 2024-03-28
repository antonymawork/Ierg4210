// pages/api/order/list.ts
import prisma from '../../../lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const cookies = parse(req.headers.cookie || '');
        const token = cookies.auth;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        if (!userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json(orders.map(order => ({
            ...order,
            items: order.items ? JSON.parse(order.items) : []
        })));
    } catch (error) {
        console.error('Fetching orders failed:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
