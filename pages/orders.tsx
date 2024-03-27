// pages/orders.js
import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch('/api/order/list', {
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data);
            } else {
                alert(data.error || 'Could not fetch orders');
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-white p-10 min-h-screen text-gray-700">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Orders</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="p-6 shadow-lg rounded-xl bg-gray-100">
                        <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
                        <p className="text-md mb-1"><span className="font-medium">Amount:</span> {order.amount}</p>
                        <p className="text-md mb-4"><span className="font-medium">Status:</span> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span></p>
                        <div className="font-medium mb-2">Items:</div>
                        <ul className="list-disc ml-5">
                            {JSON.parse(order.items).map(item => (
                                <li key={item.productId} className="mt-1">{item.name} x {item.quantity} @ {item.price} each</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-10">
                <Link legacyBehavior href="/"><a className="text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out">← Back to the homepage</a></Link>
            </div>
        </div>
    );
};

export default OrdersPage;
