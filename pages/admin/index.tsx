import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import Products from './products';
import Categories from './categories';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Products');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-10">
          {activeTab === 'Products' && <Products />}
          {activeTab === 'Categories' && <Categories />}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies.auth;

  // User not logged in scenario
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // Decoding the token to check if the user is an admin
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isAdmin = decoded ? decoded.isAdmin : false;

    // User is not an admin scenario
    if (!isAdmin) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // User is an admin and logged in
    return { props: {} };
  } catch (error) {
    // Error with token or not logged in leads to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
