import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/order/admin-list', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders:', await response.text());
            }
        };

        fetchOrders();
    }, []);

    const renderOrderDetails = (order) => {
        if (["CREATED", "CANCELLED"].includes(order.status)) {
            return { itemsComponent: <li>N/A</li>, totalAmount: "N/A" };
        }
    
        try {
            const details = order.orderDetails ? JSON.parse(order.orderDetails) : null;
            if (!details) {
                return { itemsComponent: <li>Details missing</li>, totalAmount: "N/A" };
            }
    
            // Generate a list of JSX elements for items
            const itemsComponent = details.purchase_units.flatMap((unit) =>
                unit.items.map((item, index) => (
                    <li key={index}>{`${item.name} x ${item.quantity} @ $${item.unit_amount.value} ${item.unit_amount.currency_code}`}</li>
                ))
            );
    
            const totalAmount = details.purchase_units
                .map((unit) => unit.amount.breakdown.item_total.value)
                .reduce((acc, curr) => acc + parseFloat(curr), 0)
                .toFixed(2);
    
            return {
                itemsComponent: itemsComponent.length > 0 ? itemsComponent : <li>No items</li>,
                totalAmount: `$${totalAmount} ${details.purchase_units[0].amount.currency_code}`,
            };
        } catch (error) {
            console.error('Error parsing order details:', error);
            return { itemsComponent: <li>Error loading items</li>, totalAmount: "Error" };
        }
    };
    

    return (
        <div className="bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-slate-700 mb-6">All Orders</h1>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-slate-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">Order ID</th>
                            <th scope="col" className="py-3 px-6">User</th>
                            <th scope="col" className="py-3 px-6">User Email</th>
                            <th scope="col" className="py-3 px-6">Total Amount</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Items</th>
                            <th scope="col" className="py-3 px-6">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const { itemsComponent, totalAmount } = renderOrderDetails(order);
                            return (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {order.id.substring(0, 8)}...
                                    </th>
                                    <td className="py-4 px-6">{order.user?.username || 'N/A'}</td>
                                    <td className="py-4 px-6">{order.user?.email || 'N/A'}</td>
                                    <td className="py-4 px-6">{totalAmount}</td>
                                    <td className="py-4 px-6"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {order.status}
                                </span></td>
                                    <td className="py-4 px-6">
                                        <ul className="list-disc pl-5">
                                            {itemsComponent}
                                        </ul>
                                    </td>
                                    <td className="py-4 px-6">{new Date(order.createdAt).toLocaleString([], {
                                                year: 'numeric', 
                                                month: '2-digit', 
                                                day: '2-digit', 
                                                hour: '2-digit', 
                                                minute: '2-digit', 
                                                hour12: true // or false for 24-hour format
                                            })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
