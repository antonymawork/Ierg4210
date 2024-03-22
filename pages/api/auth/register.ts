// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prismaClient'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password } = req.body; // Include username in the destructuring

    // Basic validation for email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
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
        const user = await prisma.user.create({
            data: {
                email,
                username, // Include the username here
                password: hashedPassword,
                isAdmin: true, // Default to false, adjust based on your needs
            },
        });

        // Respond with the created user (excluding the password)
        return res.status(201).json({ email: user.email, username: user.username, isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error creating user', message: error.message });
    }
}
