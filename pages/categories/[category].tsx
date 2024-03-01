// pages/categories/[category].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/storefront/Header';
import Footer from '../../components/storefront/Footer';
import Breadcrumbs from '../../components/storefront/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { addToCart } from '../../lib/addToCart';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      fetch(`/api/products/byCategory?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          // Ensure the data is an array
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            // Handle cases where data is not an array
            console.error('Data is not an array', data);
            setProducts([]); // Set to an empty array to avoid breaking .map
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setProducts([]); // Set to an empty array on error
        });
    }
  }, [category]);
  

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen text-slate-800">
      <Header />
      <main className="flex-grow">
      <Breadcrumbs links={[{ title: 'Home', href: '/' }, { title: category, href: '#' }]} />
      <div className="p-4 grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.productID} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
            <Link href={`/categories/${category}/${product.productSlug}`} legacyBehavior>
              <a className="flex flex-col items-center">
                <Image src={`/${product.productImagePath}`} alt={product.productName} layout="responsive" width={500} height={500} />
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

export default CategoryPage;
