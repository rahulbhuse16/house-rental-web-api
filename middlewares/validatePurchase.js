export const validatePurchase = (req, res, next) => {
    const { userId, houseId, cardHolder, cardNumber, expiryDate, cvc } = req.body;

    if (!userId || !houseId || !cardHolder || !cardNumber || !expiryDate || !cvc) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Additional validation (e.g., card number format, date format)
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber)) {
        return res.status(400).json({ message: 'Invalid card number format' });
    }

    next();
};
