import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection.js';

// Define the Notification model
const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  // Use table name as a string
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Export the model first (without associations)
export default Notification;
