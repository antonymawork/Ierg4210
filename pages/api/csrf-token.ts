// pages/api/csrf-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Generate a CSRF token
        const csrfToken = crypto.randomBytes(64).toString('hex');

        // Set the CSRF token in an HTTPOnly cookie
        res.setHeader('Set-Cookie', serialize('csrfToken', csrfToken, {
            httpOnly: true,
            secure: true,//process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict', // Adjust depending on your requirements
            maxAge: 3600 // Expires in 1 hour, adjust as necessary
        }));

        // Send the CSRF token back to the client
        return res.status(200).json({ csrfToken });
    } else {
        // If not a GET request, return method not allowed
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
