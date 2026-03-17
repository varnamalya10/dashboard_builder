const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUsers = await sequelize.query(
      'SELECT id FROM users WHERE email = ?',
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT
      }
    );

    console.log('Auth: Checking existing user for email:', email, 'Found:', existingUsers);

    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await sequelize.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      {
        replacements: [name, email, hashedPassword],
        type: sequelize.QueryTypes.INSERT
      }
    );

    console.log('Auth: User registered successfully:', { result, email });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result, name, email }
    });

  } catch (error) {
    console.error('Auth: Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Login user and return JWT token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const users = await sequelize.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT
      }
    );

    console.log('Auth: Query result for email:', email, 'Users found:', users);

    if (!users || users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    console.log('Auth: Found user:', { id: user.id, email: user.email });

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Auth: Password comparison result:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Auth: User logged in successfully:', { id: user.id, email: user.email });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Auth: Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
