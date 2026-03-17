const { Sequelize } = require('sequelize');
const config = require('./server.config');

// Database connection configuration
const dbConfig = {
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  dialect: config.DATABASE.DIALECT,
  pool: config.DATABASE.POOL,
  logging: config.DEVELOPMENT.DEBUG_SQL ? console.log : false,
};

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
    return false;
  }
};

// Sync database models
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Database synchronized successfully (force: ${force})`);
    return true;
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    return false;
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection,
  config: dbConfig,
};
