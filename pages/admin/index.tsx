import { useState } from 'react';
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
