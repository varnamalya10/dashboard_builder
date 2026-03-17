const Order = require('../models/Order');
const { Op } = require('sequelize');

// Generate unique order ID
const generateOrderId = () => {
  return 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { customerName, productName, quantity, price, orderStatus } = req.body;
    
    const order = await Order.create({
      orderId: generateOrderId(),
      customerName,
      productName,
      quantity,
      price,
      orderStatus
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const { dateFilter } = req.query;
    let whereClause = {};
    
    if (dateFilter) {
      const now = new Date();
      let startDate;
      
      switch(dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case '7days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90days':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        whereClause.orderDate = { [Op.gte]: startDate };
      }
    }
    
    const orders = await Order.findAll({
      where: whereClause,
      order: [['orderDate', 'DESC']]
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
