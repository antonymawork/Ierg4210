import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import Products from './products';
import Categories from './categories';
import Orders from './orders';

export default function Admin({ user }) { // Here, receive user prop
  const [activeTab, setActiveTab] = useState('Products');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header user={user} /> {/* Pass user prop to Header */}
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-10">
          {activeTab === 'Products' && <Products />}
          {activeTab === 'Categories' && <Categories />}
          {activeTab === 'Orders' && <Orders />}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies.auth;
  let user = null; // Initialize user as null

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.isAdmin) {
      user = { username: decoded.username, isAdmin: decoded.isAdmin }; // Set user if admin
    }

    // If decoded data doesn't include admin rights, redirect
    if (!user || !user.isAdmin) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return { props: { user } }; // Pass user to the page via props
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
