// pages/api/order/cancel.ts
import prisma from '../../../lib/prismaClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Initialize orderId outside of the try-catch scope
    let orderId;

    try {
        // Attempt to retrieve orderId from the request body
        orderId = req.body.orderId;

        // If orderId is not provided, throw an error
        if (!orderId) {
            throw new Error('Order ID not provided');
        }

        const cancelledOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
        });

        res.status(200).json(cancelledOrder);
    } catch (error) {
        // Now orderId is accessible here, but check if it was defined
        console.error(`Order cancellation failed for order ${orderId || 'unknown'}:`, error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
