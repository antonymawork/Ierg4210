// components/storefront/Header.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { PayPalButton } from "react-paypal-button-v2";

const Header = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isPayPalReady, setIsPayPalReady] = useState(false); // New state to track PayPal SDK readiness
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const router = useRouter();
  const customOrderId = useRef("");

  useEffect(() => {
    // Check if the PayPal script is already loaded
    if (window.paypal) {
        console.log('PayPal SDK was already loaded.');
        setIsPayPalReady(true);
        return;
    }

    // If not, create and append the script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${process.env.NEXT_PUBLIC_PAYPAL_CURRENCY}`;
    script.type = 'text/javascript';
    script.onload = () => {
        console.log('PayPal SDK has loaded.');
        setIsPayPalReady(true);
    };
    document.body.appendChild(script);

    // Clean up script when the component unmounts
    return () => {
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

  const createOrder = async (data, actions) => {
    try {
      // Prepare the order data from cart items
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId, // Assuming each item has a 'productId' field
          name: item.name, // Item name
          quantity: item.quantity, // Quantity of the item
          price: item.price.toString(), // Price per item; ensure this is a string if required by your backend
        })),
      };
  
      // Send the order data to your server to create a new order
      const response = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request if your authentication depends on them
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        // If the server response is not OK, throw an error to be caught below
        throw new Error(`Failed to create order: ${response.statusText}`);
      }
  
      // Extract the order ID from the response for the PayPal transaction
      const order = await response.json();
      console.log('Order created with ID:', order.id);
      customOrderId.current = order.id; // Store the order ID for use in later steps (e.g., onApprove)
  
      // Return a value expected by PayPal's createOrder method
      return actions.order.create({
        purchase_units: [{
          reference_id: order.id, // Use the server-generated order ID as reference
          description: "Your Store Purchase", // Description for the purchase
          amount: {
            currency_code: "HKD", // Currency code (ensure this matches your store's currency)
            value: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2), // Total amount
          }
        }],
      });
    } catch (error) {
      console.error('Create order failed:', error.message);
      // Handle the error appropriately in your UI
    }
  };
  


  // This function is triggered when the PayPal payment is approved
  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    
    // Confirm this matches the structure expected by your server
    const bodyData = {
        paypalOrderID: details.id,
        items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unit_amount: {
                currency_code: "HKD",
                value: item.price.toString(),
            }
        })),
        currency_code: "HKD",
        value: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    };

    console.log("Sending to server:", JSON.stringify(bodyData)); // For debugging, remove after

    const response = await fetch(`/api/order/complete/${customOrderId.current}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
    });

    if (!response.ok) throw new Error(`Order completion failed: ${response.statusText}`);

    const orderUpdateResponse = await response.json();
    clearCartAfterPayment();
    customOrderId.current = '';
    alert("Payment Approved");
    router.push('/orders');
};



  const onCancel = (data) => {
    fetch('/api/order/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: customOrderId.current }), // Use the same orderId
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order cancelled:', data);
        alert("Payment Cancelled");
    })
    .catch(error => {
        console.error('Cancellation error:', error);
        onError(error); // Optionally handle the error
    });
  };

  const onError = (err) => {
    // Handle specific PayPal errors differently
    if (err && err.message && (err.message.includes('popup close') || err.message.includes('window closed'))) {
       //handled
    } else if (err && err.message) {
        alert(`Error during payment: ${err.message}. Please try again.`);
    } else {
        // Handle unknown errors
        alert("There was an issue with the PayPal Checkout process. Please try again.");
    }
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
            {isPayPalReady && cartItems.length > 0 && !transactionCompleted && user && (
              <PayPalButton
                amount={cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onCancel={(data) => onCancel(data)}
                onError={(err) => onError(err)}
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  currency: "HKD",
                  buyerCountry: 'HK'
                }}
                // key={new Date().getTime()} // Force re-render the PayPal button on every transaction
              />
            )}
            {!user && (
              <Link legacyBehavior href="/login"><button className="transition hover:scale-105 mt-2 bg-slate-700 text-white p-2 font-bold rounded-lg">Login to Check Out</button></Link>
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
                    {!user.isAdmin && (
                      <Link legacyBehavior href="/orders"><a className="transition hover:scale-105 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mb-2">My Orders</a></Link>
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
