import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add the verified user to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(400).json({ error: 'Invalid token Please sign in again' });
    }
};

export const isAdmin = (req, res, next) => {
    const { role, username } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized. Admins only.' });
    }

    req.username = username; // Attach username to request for tracking
    next();
};
