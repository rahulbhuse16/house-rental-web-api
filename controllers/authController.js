import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Payment from '../models/Payment.js';
import House from '../models/house.js';
import { signupSchema, loginSchema } from '../schemas/authSchemas.js';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { username, password, role } = await signupSchema.validateAsync(req.body);

        // Check if the user already exists
        const Existinguser = await User.findOne({ where: { username } });
        if (Existinguser) {
            throw { statusCode: 400, message: "User Already Exists" }; // Throw a custom error
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const user = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        // Handle custom errors
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'SignUP Failed' });
        }
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = await loginSchema.validateAsync(req.body);

        // Check if user exists
        const user = await User.findOne({ where: { username } });
        const id=user.id;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            userRole: user.role,
            id
        });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
};

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch user data along with associated houses and payments
      const user= await User.findByPk(id)
  
      // Check if user exists
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Calculate total houses bought (only sold houses);
      const houses= await House.findAll({where:{
         buyerId:id

      }})
      const payments=await Payment.findAll({
        where:{
            userId:id
        }
      })
      const totalHousesBought = await House.count({
        where: { buyerId: id, houseStatus: 'sold' }, // Assuming `ownerId` is the foreign key in House model
      });
  
      // Calculate total payments made by the user
      const totalPayments = await Payment.sum('totalAmount', {
        where: { userId: id }, // Assuming `userId` is the foreign key in PaymentInfo model
      });
  
      // Format the response
     
  
      // Return the response
      res.status(200).json({
        user,
        houses,
        payments,
        totalHousesBought,
        totalPayments

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  