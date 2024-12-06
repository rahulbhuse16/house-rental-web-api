import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection.js';
import User from './userModel.js';
import House from './house.js';
const Payment = sequelize.define(
    'Payment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cardHolder: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cardNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cvc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        houseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: House,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
    }
);

// Define associations
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

House.hasMany(Payment, { foreignKey: 'houseId' });
Payment.belongsTo(House, { foreignKey: 'houseId' });

export default Payment;
