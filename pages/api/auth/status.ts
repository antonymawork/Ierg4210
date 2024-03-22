// pages/api/auth/status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie'; // Import the parse method from the cookie library

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse the cookies from the request
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;

    // Verify the token
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        // If token is valid, respond with user status
        return res.status(200).json({ isLoggedIn: true, isAdmin: decoded.isAdmin });
      }
    }
    // If no valid token, respond with false
    return res.status(200).json({ isLoggedIn: false, isAdmin: false });
  } catch (error) {
    // Respond with error message and status if something goes wrong
    return res.status(500).json({ message: 'Something went wrong', isLoggedIn: false, isAdmin: false });
  }
}
