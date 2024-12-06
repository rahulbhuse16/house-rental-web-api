import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/userModel.js';
import cors from 'cors'
import houseRoutes from './routes/houseRoutes.js';
import notificationRoute from './routes/notificationRoutes.js'
import paymentRoute from './routes/paymentRoutes.js'
import { sequelize } from './db/connection.js';
dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.use(cors())
// Routes
app.use('/api/v1/auth', authRoutes);
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use('/uploads', express.static('uploads'));


// Middleware


// Routes
app.use('/api/v1/houses', houseRoutes);
app.use('/api/v1/notifications',notificationRoute);
app.use('/api/v1/payments',paymentRoute)



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
