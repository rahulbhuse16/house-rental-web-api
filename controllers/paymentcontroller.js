// controllers/paymentController.js

import User from '../models/userModel.js';
import House from '../models/house.js';
import Payment from '../models/Payment.js';



export const listPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Fetch payments made by the user, including related house and user details
    const payments = await Payment.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'], // Include only necessary user fields
        },
        {
          model: House,
          attributes: ['id', 'houseName', 'address', 'rentalOfferPrice'], // Include house details
        },
      ],
      order: [['createdAt', 'DESC']], // Order payments by most recent
    });

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this user.' });
    }

    // Return payments data
    return res.status(200).json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return res.status(500).json({ message: 'An error occurred while fetching payments.' });
  }
};
