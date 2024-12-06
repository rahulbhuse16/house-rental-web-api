import express from 'express';
import { getAllNotifications,deleteNotification } from '../controllers/notificationController.js';
const router = express.Router();

// Fetch unread notifications
router.get('/all', getAllNotifications);

// Delete a notification by ID
router.delete('/:id', deleteNotification);

export default router;
