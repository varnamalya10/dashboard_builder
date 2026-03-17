const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dashboard = sequelize.define('Dashboard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  widgets: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  tableName: 'dashboards',
  timestamps: true
});

module.exports = Dashboard;
