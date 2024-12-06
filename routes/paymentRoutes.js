// routes/paymentRoutes.js

import express from 'express';
import { listPaymentsByUser } from '../controllers/paymentcontroller.js';
const router = express.Router();

// Route to get list of payments for a specific user
router.get('/user/:userId', listPaymentsByUser);

export default router;
