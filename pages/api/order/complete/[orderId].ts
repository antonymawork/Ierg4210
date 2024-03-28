// pages/api/order/complete/[orderId].ts
import prisma from '../../../../lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { orderId } = req.query;
  const { paypalOrderID, items, currency_code, value } = req.body;

  try {
    // Generate orderDetails based on the items and other data received
    const orderDetails = {
      purchase_units: [{
        amount: {
          currency_code,
          value,
          breakdown: {
            item_total: {
              currency_code,
              value
            }
          }
        },
        items: items.map(item => ({
          name: item.name,
          unit_amount: item.unit_amount,
          quantity: item.quantity.toString(),
        })),
        custom_id: "", // Assign appropriately if needed
        invoice_id: orderId, // This could be the PayPal order ID or your internal order ID
      }]
    };

    const updatedOrder = await prisma.order.update({
      where: { id: String(orderId) },
      data: {
        status: 'COMPLETED',
        orderDetails: JSON.stringify(orderDetails),
      },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Order completion failed:', error);
    return res.status(500).json({ error: 'Failed to complete order', details: error.message });
  }
}
