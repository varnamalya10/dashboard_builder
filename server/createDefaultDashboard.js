const Dashboard = require('./models/Dashboard');
const sequelize = require('./config/database');

const defaultDashboard = {
  widgets: [
    {
      id: 'widget-1',
      type: 'bar-chart',
      title: 'Orders by Product',
      position: { x: 0, y: 0, w: 6, h: 4 },
      config: {
        xAxis: 'productName',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-2',
      type: 'pie-chart',
      title: 'Order Status Distribution',
      position: { x: 6, y: 0, w: 6, h: 4 },
      config: {
        xAxis: 'orderStatus',
        yAxis: 'quantity'
      }
    },
    {
      id: 'widget-3',
      type: 'line-chart',
      title: 'Orders Over Time',
      position: { x: 0, y: 4, w: 6, h: 4 },
      config: {
        xAxis: 'orderDate',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-4',
      type: 'kpi-card',
      title: 'Total Orders',
      position: { x: 6, y: 4, w: 3, h: 2 },
      config: {
        dataField: 'id',
        aggregation: 'count'
      }
    },
    {
      id: 'widget-5',
      type: 'kpi-card',
      title: 'Total Revenue',
      position: { x: 9, y: 4, w: 3, h: 2 },
      config: {
        dataField: 'price',
        aggregation: 'sum'
      }
    },
    {
      id: 'widget-6',
      type: 'data-table',
      title: 'Recent Orders',
      position: { x: 0, y: 8, w: 12, h: 4 },
      config: {
        dataFields: ['orderId', 'customerName', 'productName', 'quantity', 'price', 'orderStatus']
      }
    },
    {
      id: 'widget-7',
      type: 'area-chart',
      title: 'Revenue Trend',
      position: { x: 0, y: 12, w: 6, h: 4 },
      config: {
        xAxis: 'orderDate',
        yAxis: 'price'
      }
    },
    {
      id: 'widget-8',
      type: 'kpi-card',
      title: 'Average Order Value',
      position: { x: 6, y: 6, w: 3, h: 2 },
      config: {
        dataField: 'price',
        aggregation: 'average'
      }
    },
    {
      id: 'widget-9',
      type: 'scatter-plot',
      title: 'Quantity vs Price',
      position: { x: 9, y: 6, w: 3, h: 2 },
      config: {
        xAxis: 'quantity',
        yAxis: 'price'
      }
    }
  ]
};

async function createDefaultDashboard() {
  try {
    await sequelize.sync();
    
    // Clear existing dashboard
    await Dashboard.destroy({ where: {}, truncate: true });
    
    // Create default dashboard
    await Dashboard.create({ widgets: defaultDashboard.widgets });
    
    console.log('Default dashboard created successfully!');
    console.log(`Created ${defaultDashboard.widgets.length} widgets`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating default dashboard:', error);
    process.exit(1);
  }
}

createDefaultDashboard();
