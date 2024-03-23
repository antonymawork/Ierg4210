// pages/change-password.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch the CSRF token when the component mounts
        const fetchCsrfToken = async () => {
            try {
                const { data } = await axios.get('/api/csrf-token');
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        // Basic frontend validations
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (newPassword === currentPassword) {
            setError('New password cannot be the same as the current password.');
            return;
        }

        try {
            // Backend request to change the password
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword, csrfToken }), // Include csrfToken here
            });

            const data = await res.json();

            if (res.ok) {
                // Logout user after changing password
                await fetch('/api/auth/logout', { method: 'POST' });
                // Redirect to the login page after logout
                router.push('/');
            } else {
                setError(data.message || 'An error occurred while changing your password.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                    Change Password
                </h2>
                {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
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
            // We could add more checks here for user role or status
            user = { username: decoded.username, isAdmin: decoded.isAdmin };
        } catch (error) {
            // If there's an error, like token expiration, redirect to login
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
    }

    // Redirect to login if there's no user
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {}, // You can pass some props if needed
    };
};

export default ChangePassword;
