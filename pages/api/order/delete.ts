// pages/api/order/cancel.js
import prisma from '../../../lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderID } = req.body; // The ID of the order to cancel

    // Update the order status to 'CANCELLED' or similar
    const cancelledOrder = await prisma.order.update({
      where: { id: parseInt(orderID, 10) },
      data: {
        status: 'CANCELLED',
      },
    });

    res.status(200).json(cancelledOrder);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
