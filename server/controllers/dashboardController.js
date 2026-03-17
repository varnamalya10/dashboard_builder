const Dashboard = require('../models/Dashboard');

// @desc    Save dashboard configuration
// @route   POST /api/dashboard
exports.saveDashboard = async (req, res) => {
  try {
    console.log('Controller: Request received');
    console.log('Controller: Request body:', req.body);
    console.log('Controller: Request headers:', req.headers);
    console.log('Controller: Content-Type:', req.headers['content-type']);
    
    const { widgets } = req.body;
    
    console.log('Controller: Extracted widgets:', widgets);
    console.log('Controller: Widgets type:', typeof widgets);
    console.log('Controller: Widgets length:', widgets?.length);
    
    // Remove existing dashboard configuration
    await Dashboard.destroy({
      where: {},
      truncate: true
    });
    
    console.log('Controller: Old dashboard cleared');
    
    // Create new dashboard configuration
    const dashboard = await Dashboard.create({ widgets });
    
    console.log('Controller: Dashboard created:', dashboard.toJSON());
    console.log('Controller: Saved widgets:', dashboard.widgets);
    
    res.status(201).json(dashboard);
  } catch (error) {
    console.error('Controller: Error saving dashboard:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get dashboard configuration
// @route   GET /api/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      order: [['createdAt', 'DESC']]
    });
    
    if (!dashboard) {
      return res.json({ widgets: [] });
    }
    
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update dashboard configuration
// @route   PUT /api/dashboard
exports.updateDashboard = async (req, res) => {
  try {
    const { widgets } = req.body;
    
    let dashboard = await Dashboard.findOne({
      order: [['createdAt', 'DESC']]
    });
    
    if (!dashboard) {
      dashboard = await Dashboard.create({ widgets });
    } else {
      await dashboard.update({ widgets });
    }
    
    res.json(dashboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
