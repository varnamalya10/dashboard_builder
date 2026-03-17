const express = require('express');
const router = express.Router();
const {
  saveDashboard,
  getDashboard,
  updateDashboard
} = require('../controllers/dashboardController');

router.post('/', saveDashboard);
router.get('/', getDashboard);
router.put('/', updateDashboard);

module.exports = router;
