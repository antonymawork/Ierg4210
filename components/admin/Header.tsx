import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-white">Antony Ecommerce Store | Admin Panel</h1>
      <Link href="/" legacyBehavior>
        <button className="transition hover:scale-105 bg-slate-700 font-bold px-4 py-2 rounded hover:bg-slate-600">Log out</button>
      </Link>
    </header>
  );
}
