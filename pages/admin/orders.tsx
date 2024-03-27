// pages/admin/orders.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/order/admin-list', { credentials: 'include' });
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-8 bg-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">Order ID</th>
                            <th scope="col" className="py-3 px-6">User</th>
                            <th scope="col" className="py-3 px-6">Amount</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Items</th>
                            <th scope="col" className="py-3 px-6">Created At</th>
                            <th scope="col" className="py-3 px-6">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {order.id.substring(0, 4)}... {/* Display only the first four characters followed by ellipsis */}
                            </th>
                            <td className="py-4 px-6">{order.user.username}</td>
                            <td className="py-4 px-6">{order.amount}</td>
                            <td className="py-4 px-6">{order.status}</td>
                            <td className="py-4 px-6">
                                <ul className="list-disc pl-5">
                                    {JSON.parse(order.items).map((item, index) => (
                                        <li key={index}>{`${item.name} x ${item.quantity}`}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 px-6">{new Date(order.updatedAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
