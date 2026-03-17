const mysql = require('mysql2/promise');

async function createTable() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Varna@10012006',
      database: 'dashboard_builder'
    });
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS dashboard_widgets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        widget_id VARCHAR(255) NOT NULL UNIQUE,
        widget_type VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        pos_x INT DEFAULT 0,
        pos_y INT DEFAULT 0,
        width INT DEFAULT 4,
        height INT DEFAULT 3,
        config_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_widget_id (widget_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await connection.execute(createTableSQL);
    console.log('✅ dashboard_widgets table created successfully');
    await connection.end();
  } catch (error) {
    console.error('❌ Error creating table:', error);
  }
}

createTable();
