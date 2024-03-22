// components/admin/Header.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Header({user}) {
  const router = useRouter();

  const handleRouteToStore = async () => {
    try {
      router.push('/');
    } catch (error) {
      console.error('Route failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Call your API route to clear the cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      // Redirect to the homepage
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Antony Ecommerce Store | Admin Panel</h1>
      <div className="flex items-center gap-4"> {/* Wrapper with a gap */}
        <button onClick={handleRouteToStore} className="transition hover:scale-105 bg-slate-700 font-bold px-4 py-2 rounded hover:bg-slate-600">
          Visit Store
        </button>
        <div className="relative group">
          <FontAwesomeIcon icon={faUser} className="cursor-pointer text-xl" />
          <div className="absolute right-0 hidden group-hover:flex flex-col items-start bg-white text-black p-4 w-72 rounded-lg shadow-lg">
            <span className='text-2xl font-bold'>Welcome, Admin: {user.username}</span>
            <Link legacyBehavior href="/change-password">
              <a className="transition hover:scale-105 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-2">Change Password</a>
            </Link>
            <button onClick={handleLogout} className="transition hover:scale-105 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
