// pages/categories/[category].tsx
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Header from '../../components/storefront/Header';
import Footer from '../../components/storefront/Footer';
import Breadcrumbs from '../../components/storefront/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addToCart } from '../../lib/addToCart';

const CategoryPage = ({ user }) => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`/api/products/byCategory?category=${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  }, [category]);

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen text-slate-800">
      <Header user={user} />
      <main className="flex-grow">
        <Breadcrumbs links={[{ title: 'Home', href: '/' }, { title: category, href: '#' }]} />
        <div className="p-4 grid grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.productID} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
              <Link legacyBehavior href={`/categories/${category}/${product.productSlug}`}>
                <a className="flex flex-col items-center justify-center">
                  <Image src={`/${product.productImagePath}`} alt={product.productName} layout="responsive" width={400} height={400} />
                  <h2 className="mt-2 text-center text-lg font-semibold">{product.productName}</h2>
                  <p className="text-center text-lg">${product.productPrice}</p>
                </a>
              </Link>
              <button onClick={() => addToCart(product)} className="transition hover:scale-105 text-white bg-slate-700 font-bold px-4 py-2 rounded hover:bg-slate-600">Add To Cart</button>
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
      user = {
        isAdmin: decoded.isAdmin || false,
        username: decoded.username || 'Guest',
      };
    } catch (error) {
      console.error('Error verifying JWT:', error);
    }
  }

  return {
    props: { user },
  };
};

export default CategoryPage;
