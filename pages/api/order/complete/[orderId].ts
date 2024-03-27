// pages/api/order/complete/[orderId].ts
import prisma from '../../../../lib/prismaClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { orderId } = req.query; // Get the orderId from URL parameters
  console.log("Attempting to complete order with ID:", orderId);

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID must be provided' });
  }

  try {
    // Fetch the existing order to ensure it exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: String(orderId) },
    });

    if (!existingOrder) {
      console.log(`Order with ID ${orderId} not found`);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order to mark it as completed
    const updatedOrder = await prisma.order.update({
      where: { id: String(orderId) },
      data: {
        status: 'COMPLETED',
        // Include additional fields here as needed
        orderDetails: JSON.stringify(req.body.orderDetails),
      },
    });

    console.log('Order completed successfully:', updatedOrder);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Order completion failed:', error);
    return res.status(500).json({ error: 'Failed to complete order', details: error.message });
  }
}
