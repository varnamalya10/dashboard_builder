const express = require('express');
const router = express.Router();
const {
  getWidgets,
  createWidget,
  updateWidget,
  deleteWidget
} = require('../controllers/widgetController');

router.route('/')
  .get(getWidgets)
  .post(createWidget);

router.route('/:widgetId')
  .put(updateWidget)
  .delete(deleteWidget);

module.exports = router;
