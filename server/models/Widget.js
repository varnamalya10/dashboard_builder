const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Widget = sequelize.define('Widget', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  widget_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  widget_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pos_x: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pos_y: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  },
  height: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  config_json: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  tableName: 'dashboard_widgets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Widget;
