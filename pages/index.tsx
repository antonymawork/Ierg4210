// pages/index.tsx
import { useEffect, useState } from 'react';
import Header from '../components/storefront/Header';
import Footer from '../components/storefront/Footer';
import Breadcrumbs from '../components/storefront/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';


const Home = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Breadcrumbs />
        <div className="p-4 grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.categoryID} className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
              <Link href={`/categories/${category.categorySlug}`} legacyBehavior>
                <a className="flex flex-col flex justify-center ">
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

export default Home;
