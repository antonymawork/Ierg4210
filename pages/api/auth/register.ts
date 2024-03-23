// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prismaClient';
import { parse } from 'cookie';
import validator from 'validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password, csrfToken } = req.body;
    const cookies = parse(req.headers.cookie || '');
    const sessionCsrfToken = cookies.csrfToken;

    // Server-side input validations
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Email, username, and password are required' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (!validator.isLength(password, { min: 3 })) {
        return res.status(400).json({ message: 'Password must be at least 3 characters long' });
    }

    // Validate CSRF token
    if (!csrfToken || csrfToken !== sessionCsrfToken) {
        return res.status(403).json({ message: 'Invalid CSRF token' });
    }

    try {
        // Check if the user already exists based on email
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(409).json({ message: 'A user with this email already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the user with the username
        await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                isAdmin: false, // Change to true if necessary
            },
        });

        // Respond with success (do not send back sensitive information)
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
