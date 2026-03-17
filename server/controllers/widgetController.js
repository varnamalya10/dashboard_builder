const Widget = require('../models/Widget');

// @desc    Get all widgets
// @route   GET /api/widgets
exports.getWidgets = async (req, res) => {
  try {
    console.log('Controller: Fetching all widgets');
    const widgets = await Widget.findAll({
      order: [['pos_y', 'ASC'], ['pos_x', 'ASC']]
    });
    
    // Convert to frontend format
    const formattedWidgets = widgets.map(widget => ({
      id: widget.widget_id,
      type: widget.widget_type,
      title: widget.title,
      position: {
        x: widget.pos_x,
        y: widget.pos_y,
        w: widget.width,
        h: widget.height
      },
      config: widget.config_json || {}
    }));
    
    console.log(`Controller: Returning ${formattedWidgets.length} widgets`);
    res.json(formattedWidgets);
  } catch (error) {
    console.error('Controller: Error fetching widgets:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new widget
// @route   POST /api/widgets
exports.createWidget = async (req, res) => {
  try {
    console.log('Controller: Creating widget:', req.body);
    const { widget_id, widget_type, title, pos_x, pos_y, width, height, config_json } = req.body;
    
    const widget = await Widget.create({
      widget_id,
      widget_type,
      title,
      pos_x: pos_x || 0,
      pos_y: pos_y || 0,
      width: width || 4,
      height: height || 3,
      config_json: config_json || {}
    });
    
    console.log('Controller: Widget created successfully:', widget.widget_id);
    res.status(201).json({
      id: widget.widget_id,
      type: widget.widget_type,
      title: widget.title,
      position: {
        x: widget.pos_x,
        y: widget.pos_y,
        w: widget.width,
        h: widget.height
      },
      config: widget.config_json
    });
  } catch (error) {
    console.error('Controller: Error creating widget:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a widget
// @route   PUT /api/widgets/:widgetId
exports.updateWidget = async (req, res) => {
  try {
    console.log('Controller: Updating widget:', req.params.widgetId, req.body);
    const { widgetId } = req.params;
    const { pos_x, pos_y, width, height, config_json } = req.body;
    
    const widget = await Widget.findOne({ where: { widget_id: widgetId } });
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    await widget.update({
      pos_x: pos_x !== undefined ? pos_x : widget.pos_x,
      pos_y: pos_y !== undefined ? pos_y : widget.pos_y,
      width: width !== undefined ? width : widget.width,
      height: height !== undefined ? height : widget.height,
      config_json: config_json !== undefined ? config_json : widget.config_json
    });
    
    console.log('Controller: Widget updated successfully:', widget.widget_id);
    res.json({
      id: widget.widget_id,
      type: widget.widget_type,
      title: widget.title,
      position: {
        x: widget.pos_x,
        y: widget.pos_y,
        w: widget.width,
        h: widget.height
      },
      config: widget.config_json
    });
  } catch (error) {
    console.error('Controller: Error updating widget:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a widget
// @route   DELETE /api/widgets/:widgetId
exports.deleteWidget = async (req, res) => {
  try {
    console.log('Controller: Deleting widget:', req.params.widgetId);
    const { widgetId } = req.params;
    
    const widget = await Widget.findOne({ where: { widget_id: widgetId } });
    if (!widget) {
      return res.status(404).json({ message: 'Widget not found' });
    }
    
    await widget.destroy();
    console.log('Controller: Widget deleted successfully:', widgetId);
    res.json({ message: 'Widget deleted successfully' });
  } catch (error) {
    console.error('Controller: Error deleting widget:', error);
    res.status(500).json({ message: error.message });
  }
};
