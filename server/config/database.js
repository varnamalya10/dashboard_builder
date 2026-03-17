const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dashboard_builder', 'root', 'Varna@10012006', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
