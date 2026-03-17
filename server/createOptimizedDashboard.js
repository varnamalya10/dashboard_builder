const Dashboard = require('./models/Dashboard');
const sequelize = require('./config/database');

const optimizedDashboard = {
  widgets: [
    // Top Row - KPI Cards
    {
      id: 'widget-1',
      type: 'kpi-card',
      title: 'Total Orders',
      position: { x: 0, y: 0, w: 3, h: 2 },
      config: {
        dataField: 'id',
        aggregation: 'count'
      }
    },
    {
      id: 'widget-2',
      type: 'kpi-card',
      title: 'Total Revenue',
      position: { x: 3, y: 0, w: 3, h: 2 },
      config: {
        dataField: 'price',
        aggregation: 'sum'
      }
    },
    {
      id: 'widget-3',
      type: 'kpi-card',
      title: 'Average Order Value',
      position: { x: 6, y: 0, w: 3, h: 2 },
      config: {
        dataField: 'price',
        aggregation: 'average'
      }
    },
    {
      id: 'widget-4',
      type: 'kpi-card',
      title: 'Total Quantity',
      position: { x: 9, y: 0, w: 3, h: 2 },
      config: {
        dataField: 'quantity',
        aggregation: 'sum'
      }
    },
    
    // Second Row - Charts
    {
      id: 'widget-5',
      type: 'bar-chart',
      title: 'Revenue by Product',
      position: { x: 0, y: 2, w: 6, h: 4 },
      config: {
        xAxis: 'productName',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-6',
      type: 'pie-chart',
      title: 'Order Status Distribution',
      position: { x: 6, y: 2, w: 6, h: 4 },
      config: {
        xAxis: 'orderStatus',
        yAxis: 'quantity'
      }
    },
    
    // Third Row - Line Chart and Scatter Plot
    {
      id: 'widget-7',
      type: 'line-chart',
      title: 'Revenue Trend Over Time',
      position: { x: 0, y: 6, w: 8, h: 4 },
      config: {
        xAxis: 'orderDate',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-8',
      type: 'scatter-plot',
      title: 'Quantity vs Price Analysis',
      position: { x: 8, y: 6, w: 4, h: 4 },
      config: {
        xAxis: 'quantity',
        yAxis: 'price'
      }
    },
    
    // Fourth Row - Area Chart and Data Table
    {
      id: 'widget-9',
      type: 'area-chart',
      title: 'Cumulative Revenue',
      position: { x: 0, y: 10, w: 6, h: 4 },
      config: {
        xAxis: 'orderDate',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-10',
      type: 'data-table',
      title: 'Recent Orders',
      position: { x: 6, y: 10, w: 6, h: 4 },
      config: {
        dataFields: ['orderId', 'customerName', 'productName', 'quantity', 'price', 'orderStatus']
      }
    }
  ]
};

async function createOptimizedDashboard() {
  try {
    await sequelize.sync();
    
    // Clear existing dashboard
    await Dashboard.destroy({ where: {}, truncate: true });
    
    // Create optimized dashboard
    await Dashboard.create({ widgets: optimizedDashboard.widgets });
    
    console.log('Optimized dashboard created successfully!');
    console.log(`Created ${optimizedDashboard.widgets.length} widgets with improved layout`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating optimized dashboard:', error);
    process.exit(1);
  }
}

createOptimizedDashboard();
