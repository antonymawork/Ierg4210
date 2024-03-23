import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import validator from 'validator'; // Make sure to install 'validator'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch the CSRF token
    const fetchCsrfToken = async () => {
      const response = await axios.get('/api/csrf-token');
      setCsrfToken(response.data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset error messages
    setErrorMsg('');
    setEmailError('');
    setPasswordError('');

    // Client-side validation
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validator.isEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return; // Stop the submission if validation fails

    try {
      const response = await axios.post('/api/auth/login', { email, password, csrfToken });
      const { token, isAdmin } = response.data;

      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrorMsg(error.response.data.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">Log In</h2>
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            className="mt-1 text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        <div className="mt-6 mb-4 text-gray-700">
          Test accounts:<br/>
          Admin: 123@gmail.com, PW: 123<br/>
          User: 234@gmail.com, PW: 234
        </div>
        <div className="mt-6 mb-4">
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Log In
          </button>
        </div>
        <Link legacyBehavior href="/register"><a className='text-gray-700 text-md text-center'>No account yet?</a></Link>
      </form>
    </div>
  );
};

export default LoginPage;
