// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient';
import { serialize } from 'cookie'; // Import the serialize method from the cookie library

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with hashed password in the database
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.isAdmin, username: user.username }, // Include username here
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    // Set the cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Set to true in production, false in development
      maxAge: 3 * 24 * 60 * 60, // 3 days
      path: '/',
    };
    res.setHeader('Set-Cookie', serialize('auth', token, cookieOptions));

    // Return the token and the user's role
    return res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
