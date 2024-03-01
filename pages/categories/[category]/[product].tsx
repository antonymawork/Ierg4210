// pages/categories/[category]/[product].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../components/storefront/Header';
import Footer from '../../../components/storefront/Footer';
import Breadcrumbs from '../../../components/storefront/Breadcrumbs';
import Image from 'next/image';
import { addToCart } from '../../../lib/addToCart';
import { Product } from '@prisma/client';


const ProductPage = () => {
  const router = useRouter();
  const { category, product } = router.query;
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      fetch(`/api/products/${product}`)
        .then((res) => res.json())
        .then((data) => setProductDetails(data));
    }
  }, [product]);

  if (!productDetails) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Ensure this object matches the expected structure in addToCart.ts
    const productToAdd = {
      productID: productDetails.productID, // or any unique identifier
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
      // Include any other necessary fields
    };
  
    addToCart(productToAdd);
  };
  

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen text-slate-800">
      <Header />
      <main className="flex-grow">
      <Breadcrumbs />
      <div className="flex p-4">
        <div className="flex-1 p-4 item-center">
          <Image src={`/${productDetails.productImagePath}`} alt={productDetails.productName} layout="responsive" width={300} height={300} style={{ maxWidth: '800px' }}/> {/* Center image */}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{productDetails.productName}</h1>
          <p className="text-xl mt-4">${productDetails.productPrice}</p>
          <p className={`text-xl mt-4${productDetails.productInventory < 4 ? 'text-red-500' : ''}`}>
            {productDetails.productInventory} in stock
            {productDetails.productInventory < 4 && ` - Only ${productDetails.productInventory} left!`}
          </p>
          <p className="text-xl mt-4">{productDetails.productDescription}</p>
          <button onClick={() => handleAddToCart()} className="transition hover:scale-105 text-white bg-slate-700 font-bold mt-4 px-4 py-2 rounded hover:bg-slate-600">
            Add to Cart
          </button>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
