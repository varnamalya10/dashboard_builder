const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orders'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/widgets', require('./routes/widgets'));
app.use('/api/auth', require('./routes/auth'));

// Connect to MySQL
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('✅ Database synchronized successfully');
    
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || 'localhost';
    
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://${HOST}:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Dashboard Builder API Server' });
});
