const db = require('./config/database');

const createUsersTable = async () => {
  try {
    console.log('Creating users table...');
    
    // Drop table if it exists (for development)
    await db.query('DROP TABLE IF EXISTS users');
    
    // Create users table
    await db.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Users table created successfully');
    
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  createUsersTable()
    .then(() => {
      console.log('✅ Users table setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Failed to create users table:', error);
      process.exit(1);
    });
}

module.exports = createUsersTable;
