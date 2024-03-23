import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear multiple cookies
    const clearAuthCookie = serialize('auth', '', {
      maxAge: -1, // Expire the cookie immediately
      path: '/',
      httpOnly: true,
      secure: true,//process.env.NODE_ENV === 'production',
    });

    const clearCsrfCookie = serialize('csrfToken', '', {
      maxAge: -1, // Expire the cookie immediately
      path: '/',
      httpOnly: true,
      secure: true,//process.env.NODE_ENV === 'production',
    });

    // Add more cookies to clear as needed

    // Set the response headers to clear cookies
    res.setHeader('Set-Cookie', [clearAuthCookie, clearCsrfCookie]);

    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    // If not a POST request, respond with method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
