// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 10000,
  },

  // Widget Types
  WIDGET_TYPES: {
    PIE_CHART: {
      type: 'pie-chart',
      name: 'Pie Chart',
      icon: 'PieChart',
      defaultSize: { w: 6, h: 4 },
      defaultConfig: { xAxis: 'orderStatus', yAxis: 'quantity' },
    },
    BAR_CHART: {
      type: 'bar-chart',
      name: 'Bar Chart',
      icon: 'BarChart3',
      defaultSize: { w: 6, h: 4 },
      defaultConfig: { xAxis: 'productName', yAxis: 'price' },
    },
    LINE_CHART: {
      type: 'line-chart',
      name: 'Line Chart',
      icon: 'LineChart',
      defaultSize: { w: 6, h: 4 },
      defaultConfig: { xAxis: 'orderDate', yAxis: 'price' },
    },
    AREA_CHART: {
      type: 'area-chart',
      name: 'Area Chart',
      icon: 'AreaChart',
      defaultSize: { w: 6, h: 4 },
      defaultConfig: { xAxis: 'orderDate', yAxis: 'price' },
    },
    SCATTER_PLOT: {
      type: 'scatter-plot',
      name: 'Scatter Plot',
      icon: 'ScatterChart',
      defaultSize: { w: 6, h: 4 },
      defaultConfig: { xAxis: 'quantity', yAxis: 'price' },
    },
    KPI_CARD: {
      type: 'kpi-card',
      name: 'KPI Card',
      icon: 'TrendingUp',
      defaultSize: { w: 4, h: 3 },
      defaultConfig: { aggregation: 'count', dataField: 'orderId' },
    },
  },

  // Grid Layout Configuration
  GRID_LAYOUT: {
    BREAKPOINTS: {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    },
    COLS: {
      lg: 12,
      md: 10,
      sm: 6,
      xs: 4,
      xxs: 2,
    },
    ROW_HEIGHT: 60,
    MARGIN: [10, 10],
    CONTAINER_PADDING: [10, 10],
  },

  // Widget Categories
  WIDGET_CATEGORIES: [
    {
      title: 'Charts',
      widgets: ['pie-chart', 'bar-chart', 'line-chart', 'area-chart', 'scatter-plot'],
    },
    {
      title: 'KPIs',
      widgets: ['kpi-card'],
    },
  ],

  // Data Configuration
  DATA: {
    ORDER_FIELDS: [
      { key: 'orderId', label: 'Order ID', type: 'string' },
      { key: 'customerName', label: 'Customer Name', type: 'string' },
      { key: 'productName', label: 'Product Name', type: 'string' },
      { key: 'quantity', label: 'Quantity', type: 'number' },
      { key: 'price', label: 'Price', type: 'number' },
      { key: 'orderDate', label: 'Order Date', type: 'date' },
      { key: 'orderStatus', label: 'Order Status', type: 'string' },
    ],
    AGGREGATION_TYPES: [
      { key: 'sum', label: 'Sum' },
      { key: 'average', label: 'Average' },
      { key: 'count', label: 'Count' },
      { key: 'min', label: 'Minimum' },
      { key: 'max', label: 'Maximum' },
    ],
  },

  // Default Dashboard Configuration
  DEFAULT_DASHBOARD: {
    name: 'Order Analytics Dashboard',
    description: 'Default dashboard for order analytics',
    widgets: [
      {
        id: 'widget-1',
        type: 'pie-chart',
        title: 'Order Status Distribution',
        position: { x: 0, y: 0, w: 6, h: 4 },
        config: { xAxis: 'orderStatus', yAxis: 'quantity' },
      },
      {
        id: 'widget-2',
        type: 'bar-chart',
        title: 'Product Sales',
        position: { x: 6, y: 0, w: 6, h: 4 },
        config: { xAxis: 'productName', yAxis: 'price' },
      },
      {
        id: 'widget-3',
        type: 'line-chart',
        title: 'Order Trends',
        position: { x: 0, y: 4, w: 6, h: 4 },
        config: { xAxis: 'orderDate', yAxis: 'price' },
      },
      {
        id: 'widget-4',
        type: 'kpi-card',
        title: 'Total Orders',
        position: { x: 6, y: 4, w: 6, h: 4 },
        config: { aggregation: 'count', dataField: 'orderId' },
      },
    ],
  },

  // UI Configuration
  UI: {
    COLORS: [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
    ],
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
  },

  // Feature Flags
  FEATURES: {
    ENABLE_DRAG_DROP: true,
    ENABLE_RESIZE: true,
    ENABLE_EXPORT: false,
    ENABLE_THEMES: false,
    ENABLE_REAL_TIME: false,
  },
};

export default DASHBOARD_CONFIG;
