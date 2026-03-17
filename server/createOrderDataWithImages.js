const Order = require('./models/Order');
const sequelize = require('./config/database');

const orderDataWithImages = [
  {
    orderId: 'ORD-001',
    customerName: 'John Smith',
    productName: 'Laptop Pro',
    quantity: 1,
    price: 1299.99,
    orderDate: new Date('2024-01-15'),
    orderStatus: 'Delivered',
    imageUrl: 'https://picsum.photos/seed/laptop-pro/400/300'
  },
  {
    orderId: 'ORD-002',
    customerName: 'Sarah Johnson',
    productName: 'Wireless Mouse',
    quantity: 2,
    price: 79.99,
    orderDate: new Date('2024-01-16'),
    orderStatus: 'Delivered',
    imageUrl: 'https://picsum.photos/seed/mouse/400/300'
  },
  {
    orderId: 'ORD-003',
    customerName: 'Mike Davis',
    productName: 'USB-C Hub',
    quantity: 1,
    price: 49.99,
    orderDate: new Date('2024-01-17'),
    orderStatus: 'Processing',
    imageUrl: 'https://picsum.photos/seed/usb-hub/400/300'
  },
  {
    orderId: 'ORD-004',
    customerName: 'Emily Wilson',
    productName: 'Mechanical Keyboard',
    quantity: 1,
    price: 149.99,
    orderDate: new Date('2024-01-18'),
    orderStatus: 'Shipped',
    imageUrl: 'https://picsum.photos/seed/keyboard/400/300'
  },
  {
    orderId: 'ORD-005',
    customerName: 'David Brown',
    productName: 'Monitor Stand',
    quantity: 1,
    price: 89.99,
    orderDate: new Date('2024-01-19'),
    orderStatus: 'Pending',
    imageUrl: 'https://picsum.photos/seed/monitor-stand/400/300'
  },
  {
    orderId: 'ORD-006',
    customerName: 'Lisa Anderson',
    productName: 'Webcam HD',
    quantity: 3,
    price: 129.99,
    orderDate: new Date('2024-01-20'),
    orderStatus: 'Delivered',
    imageUrl: 'https://picsum.photos/seed/webcam/400/300'
  }
];

async function createOrderDataWithImages() {
  try {
    await sequelize.sync();
    
    // Clear existing orders
    await Order.destroy({ where: {}, truncate: true });
    
    // Create orders with images
    for (const orderData of orderDataWithImages) {
      await Order.create({
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        productName: orderData.productName,
        quantity: orderData.quantity,
        price: orderData.price,
        orderDate: orderData.orderDate,
        orderStatus: orderData.orderStatus,
        imageUrl: orderData.imageUrl
      });
    }
    
    console.log('Created order data with images successfully!');
    console.log(`Created ${orderDataWithImages.length} orders with image URLs`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating order data with images:', error);
    process.exit(1);
  }
}

createOrderDataWithImages();
