// pages/api/auth/change-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient'; // Adjust path as necessary
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract CSRF token from the cookies
  const { csrfToken } = req.cookies;

  // Validate CSRF token
  if (!csrfToken || csrfToken !== req.body.csrfToken) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
  }

  const { currentPassword, newPassword } = req.body;

  // Validate the inputs
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required.' });
  }

  // Get the user from the token
  const token = req.cookies.auth;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare provided current password with hashed password in the database
  const isValid = bcrypt.compareSync(currentPassword, user.password);
  if (!isValid) {
    return res.status(403).json({ message: 'Current password is incorrect.' });
  }

  // Check if new password is the same as the current password
  const isSamePassword = bcrypt.compareSync(newPassword, user.password);
  if (isSamePassword) {
    return res.status(400).json({ message: 'New password cannot be the same as current password.' });
  }

  // Hash the new password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  // Update the user's password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  // Clear the auth cookie to log the user out after password change
  res.setHeader('Set-Cookie', serialize('auth', '', {
    maxAge: -1,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }));

  return res.status(200).json({ message: 'Password changed successfully. Please log in with your new password.' });
}
