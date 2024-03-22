// pages/categories/[category]/[product].tsx
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/storefront/Header';
import Footer from '../../../components/storefront/Footer';
import Breadcrumbs from '../../../components/storefront/Breadcrumbs';
import Image from 'next/image';
import { addToCart } from '../../../lib/addToCart';

const ProductPage = ({ user }) => {
  const router = useRouter();
  const { category, product } = router.query;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (product) {
      fetch(`/api/products/${product}`)
        .then((res) => res.json())
        .then((data) => setProductDetails(data));
    }
  }, [product]);

  if (!productDetails) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const productToAdd = {
      productID: productDetails.productID,
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
      productQuantity: 1, // Default quantity to 1 or any logic you have
    };
    addToCart(productToAdd);
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen text-slate-800">
      <Header user={user} />
      <main className="flex-grow">
        <Breadcrumbs links={[{ title: 'Home', href: '/' }, { title: category, href: `/categories/${category}` }, { title: productDetails.productName, href: '#' }]} />
        <div className="flex flex-wrap justify-center items-center p-4">
          <div className="w-full md:w-1/2 p-4">
            <Image src={`/${productDetails.productImagePath}`}  alt={productDetails.productName} width={500} height={500} layout="responsive" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">{productDetails.productName}</h1>
            <p className="text-xl mt-4">${productDetails.productPrice.toFixed(2)}</p>
            <p className="text-md mt-4">{productDetails.productDescription}</p>
            <button onClick={handleAddToCart} className="transition hover:scale-105 text-white bg-slate-700 font-bold mt-4 px-4 py-2 rounded hover:bg-slate-600">
              Add to Cart
            </button>
          </div>
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

export default ProductPage;
