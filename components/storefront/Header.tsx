// components/storefront/Header.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PayPalButton } from "react-paypal-button-v2";

const Header = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isPayPalReady, setIsPayPalReady] = useState(false); // New state to track PayPal SDK readiness
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCartItems();
    // PayPal SDK script loading
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${process.env.NEXT_PUBLIC_PAYPAL_CURRENCY}`;    
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('PayPal SDK has loaded.'); 
      setIsPayPalReady(true); // Set PayPal SDK to ready when the script has loaded
    };
    document.body.appendChild(script);

    return () => {
        // Cleanup the script when the component unmounts
        document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    setCartItems(items);
  };

  const updateQuantity = (productId, change) => {
    let items = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    items = items.map(item => item.productId === productId ? { ...item, quantity: item.quantity + change } : item)
                  .filter(item => item.quantity > 0); // Remove the item if its quantity is 0

    localStorage.setItem('shoppingCart', JSON.stringify(items));
    setCartItems(items);
    window.dispatchEvent(new Event('storage')); // Notify other components of the update
  };

  const handleLogout = async () => {
    try {
      // Call your API route to clear the cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      // Clear user context and redirect to homepage
      router.replace('/'); // Using replace to avoid going back to the admin page with browser's back button
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const createOrder = (data, actions) => {
    return fetch('/api/order/create', { // Assuming you have this endpoint set up
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }), // Send cart items to the server
    })
      .then(res => res.json())
      .then(order => {
        // The server should return the order ID and details
        return actions.order.create({
          purchase_units: [
            {
              reference_id: order.id, // Use the order ID from your server
              description: "Your Store Purchase", // Customize as needed
              amount: {
                currency_code: "HKD",
                value: order.total, // Use the total from your server
                breakdown: {
                  item_total: {
                    currency_code: "HKD",
                    value: order.total, // Repeat the total as item total
                  },
                },
              },
              items: order.items, // Include item details from the server
            },
          ],
        });
      });
  };

  // Function called when the payment has been successfully completed
  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      console.log('Payment successful:', details);
      
      // Here you should inform your server about the successful payment
      // For example, you might update the order status in your database
      fetch(`/api/order/complete/${details.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
          details: details,
        }),
      });

      clearCartAfterPayment();
    });
  };

  // Function called when the payment is cancelled
  const onCancel = (data) => {
    console.log('Payment cancelled:', data);
    // Inform your server about the cancelled payment if necessary
    fetch('/api/order/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
  };

  const clearCartAfterPayment = () => {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
    setCartItems([]);
    setTransactionCompleted(true); // Indicate that transaction has been completed
    setTimeout(() => setTransactionCompleted(false), 5000); // Reset after a delay
  };

  return (
    <header className="flex justify-between items-center bg-slate-800 p-4 text-white">
      <Link href="/" legacyBehavior><a className="text-3xl font-semibold">Antony Ecommerce Store</a></Link>
      <nav className="flex gap-4">
        <Link href="/categories/bags" legacyBehavior><a className="hover:text-slate-400 uppercase text-l font-semibold">Bags</a></Link>
        <Link href="/categories/pants" legacyBehavior><a className="hover:text-slate-400 uppercase text-l font-semibold">Pants</a></Link>
        <Link href="/categories/shoes" legacyBehavior><a className="hover:text-slate-400 uppercase text-l font-semibold">Shoes</a></Link>
      </nav>
      <div className="flex items-center gap-3">
      <div className="relative group">
        <FontAwesomeIcon icon={faShoppingCart} className="cursor-pointer text-xl" />
          <div className="absolute right-0 hidden group-hover:flex flex-col items-start bg-white text-black p-4 w-96 rounded-lg"> {/* Adjusted width here to w-80 */}
            <label className='text-2xl font-bold'>Shopping List</label>
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between items-center my-2 font-bold">
                <span className="mr-2">{item.name}</span> {/* Added margin for gap */}
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item.productId, -1)} className="transition hover:scale-105 text-sm px-2 py-1 bg-red-500 text-white mr-2 rounded-lg">-</button> {/* Added margin for gap */}
                  <input type="number" value={item.quantity} className="mx-2 w-16 text-center rounded-lg" readOnly />
                  <button onClick={() => updateQuantity(item.productId, 1)} className="transition hover:scale-105 text-sm px-2 py-1 bg-green-500 text-white ml-2 rounded-lg">+</button> {/* Added margin for gap */}
                </div>
                <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span> {/* Added margin for gap */}
              </div>
            ))}
            <div className="mt-2 text-xl font-bold">Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</div> {/* Added margin-top for gap */}
            {isPayPalReady && cartItems.length > 0 && !transactionCompleted && (
              <PayPalButton
                amount={cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onCancel={(data) => onCancel(data)}
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  currency: "HKD",
                  buyerCountry: 'HK'
                }}
                key={new Date().getTime()} // Force re-render the PayPal button on every transaction
              />
            )}
            {/* <button className="transition hover:scale-105 mt-2 bg-slate-700 text-white p-2 font-bold rounded-lg">Check Out</button> */}
          </div>
        </div>
        {!user ? (
            <Link legacyBehavior href="/login"><a className="transition hover:scale-105 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">Log in</a></Link>
        ) : (
            <div className="relative group">
                <FontAwesomeIcon icon={faUser} className="cursor-pointer text-xl" />
                <div className="absolute right-0 hidden group-hover:flex flex-col items-start bg-white text-black p-4 w-64 rounded-lg shadow-lg">
                    <span className="block mb-2 text-2xl font-bold">Welcome, {user.isAdmin ? 'Admin ' : ''}{user.username}</span>
                    {user.isAdmin && (
                        <Link legacyBehavior href="/admin"><a className="transition hover:scale-105 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Admin Panel</a></Link>
                    )}
                    <Link legacyBehavior href="/change-password"><a className="transition hover:scale-105 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mb-2">Change Password</a></Link>
                    <button onClick={handleLogout} className="transition hover:scale-105 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log out</button>
                </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
