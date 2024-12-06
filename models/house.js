import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection.js';

// Define the House model
const House = sequelize.define('House', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  houseName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sellerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rentalOfferPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rentalOriginalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  FlatType: {
    type: DataTypes.ENUM('1BHK', '2BHK', '3BHK', '1RK'),
    allowNull: false,
  },
  houseArea: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',  // String reference to avoid circular dependency
      key: 'id',
    },
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',  // String reference to avoid circular dependency
      key: 'id',
    },
  },
  
  images: {
    type: DataTypes.JSON, // Use JSON to store an array of image paths
    allowNull: false,
  },
  houseType: {
    type: DataTypes.ENUM('villa', 'apartment', 'bungalow'),
    allowNull: false,
  },
  houseStatus: {
    type: DataTypes.ENUM('sold', 'unsold'),
    allowNull: false,
    defaultValue: 'unsold',
  },
}, {
  timestamps: true,
});

// Add associations after model definitions
House.associate = (models) => {
  // Now that both models are defined, we can establish associations
  House.belongsTo(models.User, { foreignKey: 'userId' });
};

export default House;
