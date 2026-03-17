const Order = require('./models/Order');
const sequelize = require('./config/database');

const sampleOrders = [
  {
    orderId: 'ORD001',
    customerName: 'John Doe',
    productName: 'Laptop',
    quantity: 2,
    price: 999.99,
    orderStatus: 'Delivered',
    orderDate: new Date('2024-01-15')
  },
  {
    orderId: 'ORD002',
    customerName: 'Jane Smith',
    productName: 'Smartphone',
    quantity: 1,
    price: 699.99,
    orderStatus: 'Delivered',
    orderDate: new Date('2024-01-16')
  },
  {
    orderId: 'ORD003',
    customerName: 'Bob Johnson',
    productName: 'Tablet',
    quantity: 3,
    price: 299.99,
    orderStatus: 'Processing',
    orderDate: new Date('2024-01-17')
  },
  {
    orderId: 'ORD004',
    customerName: 'Alice Brown',
    productName: 'Headphones',
    quantity: 2,
    price: 149.99,
    orderStatus: 'Shipped',
    orderDate: new Date('2024-01-18')
  },
  {
    orderId: 'ORD005',
    customerName: 'Charlie Wilson',
    productName: 'Laptop',
    quantity: 1,
    price: 1299.99,
    orderStatus: 'Pending',
    orderDate: new Date('2024-01-19')
  },
  {
    orderId: 'ORD006',
    customerName: 'Diana Davis',
    productName: 'Smartphone',
    quantity: 2,
    price: 899.99,
    orderStatus: 'Delivered',
    orderDate: new Date('2024-01-20')
  },
  {
    orderId: 'ORD007',
    customerName: 'Edward Miller',
    productName: 'Tablet',
    quantity: 1,
    price: 499.99,
    orderStatus: 'Processing',
    orderDate: new Date('2024-01-21')
  },
  {
    orderId: 'ORD008',
    customerName: 'Fiona Garcia',
    productName: 'Headphones',
    quantity: 4,
    price: 199.99,
    orderStatus: 'Shipped',
    orderDate: new Date('2024-01-22')
  },
  {
    orderId: 'ORD009',
    customerName: 'George Martinez',
    productName: 'Laptop',
    quantity: 1,
    price: 1599.99,
    orderStatus: 'Delivered',
    orderDate: new Date('2024-01-23')
  },
  {
    orderId: 'ORD010',
    customerName: 'Helen Rodriguez',
    productName: 'Smartphone',
    quantity: 3,
    price: 799.99,
    orderStatus: 'Cancelled',
    orderDate: new Date('2024-01-24')
  }
];

async function createSampleData() {
  try {
    await sequelize.sync();
    
    // Clear existing orders
    await Order.destroy({ where: {}, truncate: true });
    
    // Insert sample orders
    await Order.bulkCreate(sampleOrders);
    
    console.log('Sample orders created successfully!');
    console.log(`Created ${sampleOrders.length} sample orders`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

createSampleData();
