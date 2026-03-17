// Server Configuration
module.exports = {
  // Server Configuration
  SERVER: {
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST || 'localhost',
    NODE_ENV: process.env.NODE_ENV || 'development',
  },

  // Database Configuration
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    NAME: process.env.DB_NAME || 'dashboard_builder',
    DIALECT: 'mysql',
    POOL: {
      MAX: 5,
      MIN: 0,
      ACQUIRE: 30000,
      IDLE: 10000,
    },
  },

  // CORS Configuration
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || ['http://localhost:3000'],
    METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
    CREDENTIALS: true,
  },

  // API Configuration
  API: {
    PREFIX: '/api',
    VERSION: 'v1',
    RATE_LIMIT: {
      WINDOW_MS: 15 * 60 * 1000, // 15 minutes
      MAX_REQUESTS: 100,
    },
  },

  // Security Configuration
  SECURITY: {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    BCRYPT_ROUNDS: 10,
  },

  // Logging Configuration
  LOGGING: {
    LEVEL: process.env.LOG_LEVEL || 'info',
    FORMAT: process.env.LOG_FORMAT || 'combined',
    FILE: {
      ENABLED: process.env.LOG_FILE_ENABLED === 'true',
      PATH: process.env.LOG_FILE_PATH || './logs',
      MAX_SIZE: process.env.LOG_MAX_SIZE || '10m',
      MAX_FILES: process.env.LOG_MAX_FILES || 5,
    },
  },

  // Sample Data Configuration
  SAMPLE_DATA: {
    ORDERS_COUNT: parseInt(process.env.SAMPLE_ORDERS_COUNT) || 10,
    CUSTOMERS: [
      'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson',
      'Diana Davis', 'Edward Miller', 'Fiona Garcia', 'George Martinez', 'Helen Rodriguez',
    ],
    PRODUCTS: [
      'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Smartwatch',
      'Monitor', 'Keyboard', 'Mouse', 'Printer', 'Router',
    ],
    STATUSES: ['Delivered', 'Processing', 'Shipped', 'Pending', 'Cancelled'],
    PRICE_RANGE: { MIN: 99.99, MAX: 1999.99 },
    QUANTITY_RANGE: { MIN: 1, MAX: 5 },
  },

  // Development Configuration
  DEVELOPMENT: {
    ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',
    ENABLE_MOCK_DATA: process.env.ENABLE_MOCK_DATA === 'true',
    DEBUG_SQL: process.env.DEBUG_SQL === 'true',
  },

  // Production Configuration
  PRODUCTION: {
    ENABLE_COMPRESSION: true,
    ENABLE_RATE_LIMITING: true,
    ENABLE_HELMET: true,
    TRUST_PROXY: true,
  },
};
