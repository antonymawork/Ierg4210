// pages/index.tsx
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Header from '../components/storefront/Header';
import Footer from '../components/storefront/Footer';
import Breadcrumbs from '../components/storefront/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Home = ({ user }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-slate-50">
      <Header user={user} />
      <main className="flex-grow">
        <Breadcrumbs />
        <div className="p-4 grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.categoryID} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
              <Link legacyBehavior href={`/categories/${category.categorySlug}`}>
                <a className="flex flex-col items-center justify-center">
                  <Image src={`/${category.categoryImagePath}`} alt={category.categoryName} layout="responsive" width={400} height={400} />
                </a>
              </Link>
              <h2 className="mt-2 text-center text-lg font-semibold uppercase">{category.categoryName}</h2>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies.auth;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Make sure to set default values if properties are undefined
      user = {
        id: decoded.userId,
        isAdmin: decoded.isAdmin || false, // Default to false if undefined
        username: decoded.username || 'Guest', // Default to 'Guest' if undefined
      };
    } catch (error) {
      console.error('Error verifying JWT:', error);
    }
  }

  return {
    props: { user },
  };
};

export default Home;
