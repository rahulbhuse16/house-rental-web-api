import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection.js';

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define associations after both models are defined
User.associate = (models) => {
  User.hasMany(models.House, { foreignKey: 'userId' });
};

export default User;
