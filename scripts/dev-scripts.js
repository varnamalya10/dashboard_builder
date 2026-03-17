#!/usr/bin/env node

// Development Scripts for Dashboard Builder
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Logger utility
const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  server: (msg) => console.log(`${colors.blue}🔧${colors.reset} ${msg}`),
  client: (msg) => console.log(`${colors.magenta}🌐${colors.reset} ${msg}`),
};

// Check if .env file exists, copy from .env.example if not
function checkEnvFile() {
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    log.info('Creating .env file from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    log.success('.env file created successfully');
  }
}

// Start development server
function startDev() {
  checkEnvFile();
  
  log.info('Starting Dashboard Builder in development mode...');
  
  // Start server
  const serverProcess = spawn('npm', ['run', 'server'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'pipe',
    shell: true,
  });
  
  // Start client
  const clientProcess = spawn('npm', ['run', 'client'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'pipe',
    shell: true,
  });
  
  // Handle server output
  serverProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log.server(output);
    }
  });
  
  serverProcess.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log.error(`Server: ${output}`);
    }
  });
  
  // Handle client output
  clientProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log.client(output);
    }
  });
  
  clientProcess.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log.error(`Client: ${output}`);
    }
  });
  
  // Handle process termination
  const cleanup = () => {
    log.info('Shutting down development servers...');
    serverProcess.kill();
    clientProcess.kill();
    process.exit(0);
  };
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  serverProcess.on('close', (code) => {
    if (code !== 0) {
      log.error(`Server process exited with code ${code}`);
      cleanup();
    }
  });
  
  clientProcess.on('close', (code) => {
    if (code !== 0) {
      log.error(`Client process exited with code ${code}`);
      cleanup();
    }
  });
  
  log.success('Development servers started!');
  log.info('Server: http://localhost:5000');
  log.info('Client: http://localhost:3000');
  log.info('Press Ctrl+C to stop all servers');
}

// Build for production
function buildProd() {
  log.info('Building Dashboard Builder for production...');
  
  // Build client
  const clientProcess = spawn('npm', ['run', 'build'], {
    cwd: path.join(__dirname, '../client'),
    stdio: 'inherit',
    shell: true,
  });
  
  clientProcess.on('close', (code) => {
    if (code === 0) {
      log.success('Production build completed!');
    } else {
      log.error(`Build failed with code ${code}`);
      process.exit(code);
    }
  });
}

// Create sample data
function createSampleData() {
  log.info('Creating sample data...');
  
  const process = spawn('node', ['createSampleData.js'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
    shell: true,
  });
  
  process.on('close', (code) => {
    if (code === 0) {
      log.success('Sample data created successfully!');
    } else {
      log.error(`Sample data creation failed with code ${code}`);
      process.exit(code);
    }
  });
}

// Create default dashboard
function createDefaultDashboard() {
  log.info('Creating default dashboard...');
  
  const process = spawn('node', ['createDefaultDashboard.js'], {
    cwd: path.join(__dirname, '../server'),
    stdio: 'inherit',
    shell: true,
  });
  
  process.on('close', (code) => {
    if (code === 0) {
      log.success('Default dashboard created successfully!');
    } else {
      log.error(`Default dashboard creation failed with code ${code}`);
      process.exit(code);
    }
  });
}

// Clear all data
function clearData() {
  log.warning('This will clear all dashboard and order data. Are you sure?');
  log.info('Run: npm run clear-data --confirm to confirm');
  
  if (process.argv.includes('--confirm')) {
    log.info('Clearing all data...');
    
    const process = spawn('node', ['-e', `
      const sequelize = require('./config/database');
      const Dashboard = require('./models/Dashboard');
      const Order = require('./models/Order');
      
      async function clearAll() {
        await Dashboard.destroy({ where: {}, truncate: true });
        await Order.destroy({ where: {}, truncate: true });
        console.log('All data cleared successfully!');
        process.exit(0);
      }
      
      clearAll().catch(err => {
        console.error('Error clearing data:', err);
        process.exit(1);
      });
    `], {
      cwd: path.join(__dirname, '../server'),
      stdio: 'inherit',
      shell: true,
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        log.success('All data cleared successfully!');
      } else {
        log.error(`Data clearing failed with code ${code}`);
        process.exit(code);
      }
    });
  }
}

// Main script handler
const command = process.argv[2];

switch (command) {
  case 'dev':
    startDev();
    break;
  case 'build':
    buildProd();
    break;
  case 'sample-data':
    createSampleData();
    break;
  case 'default-dashboard':
    createDefaultDashboard();
    break;
  case 'clear-data':
    clearData();
    break;
  default:
    log.info('Available commands:');
    log.info('  dev              - Start development servers');
    log.info('  build            - Build for production');
    log.info('  sample-data      - Create sample data');
    log.info('  default-dashboard - Create default dashboard');
    log.info('  clear-data       - Clear all data (use --confirm to confirm)');
    break;
}
