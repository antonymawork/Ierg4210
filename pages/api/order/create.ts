// pages/api/order/create.js
import prisma from '../../../lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body; // Your front end should send an array of items
    // Implement your logic to calculate the total price based on items
    // For simplicity, let's assume each item has 'price' and 'quantity'

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = await prisma.order.create({
      data: {
        total,
        items: { createMany: { data: items } }, // Adjust based on your Prisma schema
        status: 'CREATED', // You might have different statuses
      },
    });

    res.status(201).json({ id: order.id, total, items });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
