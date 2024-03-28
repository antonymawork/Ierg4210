// pages/api/order/create.ts
import prisma from '../../../lib/prismaClient';
import { v4 as uuidv4 } from 'uuid';
import { createHmac, randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const cookies = parse(req.headers.cookie || '');
        const token = cookies.auth;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        const userId = decoded.userId;
        if (!userId) {
            throw new Error('User ID not found in token');
        }

        console.log('Authenticated user ID:', userId);

        const { items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const merchantEmail = "1155170608@link.cuhk.edu.hk";
        const currency = "HKD";
        const salt = randomBytes(16).toString('hex');
        let dataString = items.map(item => `${item.name}:${item.quantity}`).join('|');
        
        const pricesFromDB = await Promise.all(items.map(async item => {
            const product = await prisma.product.findUnique({ where: { productID: item.productId } });
            if (!product) {
                throw new Error(`Product not found: ${item.name}`);
            }
            return product.productPrice;
        }));

        const total = pricesFromDB.reduce((acc, price, idx) => acc + (price * items[idx].quantity), 0).toFixed(2);
        dataString += '|' + pricesFromDB.join('|') + `|${total}|${currency}|${merchantEmail}|${salt}`;
        const digest = createHmac('sha256', process.env.HMAC_SECRET).update(dataString).digest('hex');
        const invoiceId = uuidv4();

        const newOrder = await prisma.order.create({
            data: {
                id: uuidv4(),
                userId: userId,
                digest: digest,
                salt: salt,
                orderDetails: '', // Initially empty or suitable placeholder
                status: 'CREATED',
                createdAt: new Date(),
            },
        });

        return res.status(201).json(newOrder);
    } catch (error) {
        console.error('Order creation failed:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
