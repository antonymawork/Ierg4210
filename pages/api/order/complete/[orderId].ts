// pages/api/order/complete/[orderId].js
import prisma from '../../../../lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.query; // The ID of the order
    const { details } = req.body; // Payment details from PayPal

    // Update the order in the database
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId, 10) },
      data: {
        status: 'COMPLETED',
        paymentDetails: details, // Save payment details, adjust based on your needs
      },
    });

    res.status(200).json(updatedOrder);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
