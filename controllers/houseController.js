import House from "../models/house.js";
import User from "../models/userModel.js";
import Payment from "../models/Payment.js";
import Notification from "../models/Notification.js";


export const createHouse = async (req, res) => {
    try {
        const {
            houseName,
            address,
            sellerName,
            rentalOfferPrice,
            rentalOriginalPrice,
            FlatType,
            houseArea,
            description,
            userId,
            images,
            houseType // Accepting image URLs from the body
        } = req.body;

        // Validate required fields
        if (!houseName || !houseType || !address || !sellerName || !rentalOfferPrice || !rentalOriginalPrice || !FlatType || !houseArea || !userId) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Validate images
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }
        

        // Create a new house
        const newHouse = await House.create({
            houseName,
            address,
            sellerName,
            rentalOfferPrice,
            rentalOriginalPrice,
            FlatType,
            houseArea,
            description,
            userId,
            images,
            houseType,
            
             // Directly store the URLs from the body
        });

        res.status(201).json({ message: 'House created successfully.', house: newHouse });
    } catch (error) {
        console.error('Error creating house:', error.stack);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




// Get list of houses
export const getHouses = async (req, res) => {
    try {
        const houses = await House.findAll();
        res.status(200).json({ houses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a house
export const deleteHouse = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized. Only admins can delete houses.' });
        }

        const house = await House.findByPk(id);

        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }

        await house.destroy();
        res.status(200).json({ message: 'House deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getHouseById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the route parameters

        const house = await House.findByPk(id); // Fetch house by primary key (ID)

        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }

        res.status(200).json({ house });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Handle house purchase
export const purchaseHouse = async (req, res) => {
    const { userId, houseId, cardHolder, cardNumber, expiryDate, cvc } = req.body;

    try {
        // Fetch user and house details
        const user = await User.findByPk(userId);
        const house = await House.findByPk(houseId);

        if (!user || !house) {
            return res.status(404).json({ message: 'User or House not found' });
        }
        if(user.role==='admin'){
            return res.status(404).json({ message: 'Admin is not allowed to buy house' });


        }

        // Check if the house is already sold
        if (house.houseStatus === 'sold') {
            return res.status(400).json({ message: 'This house has already been sold' });
        }

        // Extract email and total amount from user and house models
        const email = user.username; // Use user.email if it exists
        const totalAmount = house.rentalOfferPrice;

       

        // Create a payment record
        const payment = await Payment.create({
            email,
            cardHolder,
            cardNumber,
            expiryDate,
            cvc,
            totalAmount,
            userId,
            houseId,
        });

        // Update the house status to 'sold'
        await house.update({ houseStatus: 'sold',buyerId:userId });

        // Create a notification for the user or the house seller/admin
        await Notification.create({
            message: `New house "${house.houseName}" sold by ${house.sellerName} at ${new Date().toLocaleString()}`,
            userId: user.id, // Notification for the house creator/admins can be customized
        });

        res.status(201).json({ message: 'House purchased successfully', payment });
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
