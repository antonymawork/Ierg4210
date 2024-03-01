const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-200 p-5 h-screen">
      <ul>
        <li className={`p-2.5 rounded-lg font-bold text-slate-800 ${activeTab === 'Products' ? 'bg-slate-800 text-white transition scale-105' : ''}`} onClick={() => setActiveTab('Products')}>Products</li>
        <li className={`p-2.5 rounded-lg font-bold text-slate-800 ${activeTab === 'Categories' ? 'bg-slate-800 text-white transition scale-105' : ''}`} onClick={() => setActiveTab('Categories')}>Categories</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
