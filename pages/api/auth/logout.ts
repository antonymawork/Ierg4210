// pages/api/auth/logout.ts
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the auth cookie
    res.setHeader('Set-Cookie', serialize('auth', '', {
      maxAge: -1, // Expire the cookie immediately
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    }));

    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    // If not a POST request, respond with method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
