const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  orderStatus: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Pending'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
