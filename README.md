# Custom Dashboard Builder

A full-stack web application for creating dynamic, customizable dashboards with drag-and-drop widgets. Visualize customer order data with various chart types, tables, and KPI cards.

## Features

### Dashboard Builder
- **Drag & Drop Interface**: Intuitive widget placement using react-grid-layout
- **Multiple Widget Types**:
  - Bar Chart, Line Chart, Pie Chart, Area Chart, Scatter Plot
  - Data Tables with customizable columns
  - KPI Cards with various aggregation options
- **Widget Configuration**: Customize titles, data fields, axes, and aggregation methods
- **Responsive Layout**: Grid-based system that adapts to different screen sizes

### Customer Orders Management
- **Full CRUD Operations**: Create, Read, Update, Delete orders
- **Order Status Tracking**: Pending, Processing, Shipped, Delivered, Cancelled
- **Data Validation**: Ensure data integrity with proper validation

### Data Visualization
- **Real-time Updates**: Widgets refresh when data changes
- **Date Filtering**: Filter data by time periods (All Time, Today, Last 7/30/90 Days)
- **Interactive Charts**: Built with Recharts for smooth interactions
- **Modern UI**: Clean, professional design using Tailwind CSS

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart library
- **React Grid Layout** - Drag-and-drop grid system
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
custom-dashboard-builder/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── WidgetRenderer.js
│   │   │   ├── WidgetSidebar.js
│   │   │   └── WidgetSettings.js
│   │   ├── context/           # React context
│   │   │   └── DashboardContext.js
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── DashboardConfig.js
│   │   │   └── CustomerOrders.js
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── widgets/            # Widget components
│   │   │   ├── BarChartWidget.js
│   │   │   ├── LineChartWidget.js
│   │   │   ├── PieChartWidget.js
│   │   │   ├── AreaChartWidget.js
│   │   │   ├── ScatterPlotWidget.js
│   │   │   ├── DataTableWidget.js
│   │   │   └── KPICardWidget.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                     # Node.js backend
│   ├── controllers/            # Route controllers
│   │   ├── orderController.js
│   │   └── dashboardController.js
│   ├── models/                 # Mongoose models
│   │   ├── Order.js
│   │   └── Dashboard.js
│   ├── routes/                 # API routes
│   │   ├── orders.js
│   │   └── dashboard.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── package.json                # Root package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd custom-dashboard-builder
```

### 2. Install Dependencies
Install all dependencies for both frontend and backend:
```bash
npm run install-all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Configuration
Configure the backend environment variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dashboard-builder
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### 5. Run the Application

#### Option 1: Run Both Frontend and Backend Simultaneously
```bash
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

### 1. Create Sample Data
1. Navigate to the **Orders** page
2. Click **"Create Order"** to add sample customer orders
3. Fill in order details (customer name, product, quantity, price, status)
4. Create multiple orders to have data for visualization

### 2. Build Your Dashboard
1. Go to **Configure** page
2. Drag widgets from the left sidebar to the canvas
3. Arrange widgets by dragging and resizing
4. Click the settings icon on each widget to configure:
   - Widget title
   - Data fields to display
   - Chart axes (for charts)
   - Aggregation method (for KPIs)
5. Click **"Save Configuration"** when done

### 3. View Your Dashboard
1. Navigate to the **Dashboard** page
2. View your configured widgets with real-time data
3. Use the date filter to filter data by time period
4. Widgets will automatically update based on the selected filter

### 4. Manage Orders
1. Go to the **Orders** page
2. View all orders in a table format
3. Edit existing orders by clicking the edit icon
4. Delete orders using the delete icon
5. Create new orders with the **"Create Order"** button

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders (supports date filtering)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Dashboard
- `GET /api/dashboard` - Get saved dashboard configuration
- `POST /api/dashboard` - Save new dashboard configuration
- `PUT /api/dashboard` - Update dashboard configuration

## Data Models

### Order
```javascript
{
  orderId: String,        // Auto-generated unique ID
  customerName: String,    // Customer name
  productName: String,    // Product name
  quantity: Number,        // Order quantity
  price: Number,          // Unit price
  orderDate: Date,        // Order date
  orderStatus: String     // Order status (Pending, Processing, Shipped, Delivered, Cancelled)
}
```

### Dashboard
```javascript
{
  widgets: [{
    type: String,         // Widget type (bar-chart, line-chart, etc.)
    title: String,        // Widget title
    position: {           // Grid position
      x: Number,
      y: Number,
      w: Number,          // Width
      h: Number           // Height
    },
    config: {             // Widget configuration
      dataFields: [String],
      xAxis: String,
      yAxis: String,
      aggregation: String
    }
  }]
}
```

## Features in Detail

### Widget Types

1. **Charts**
   - Bar Chart: Compare values across categories
   - Line Chart: Show trends over time
   - Pie Chart: Display proportional data
   - Area Chart: Show cumulative trends
   - Scatter Plot: Show relationships between variables

2. **Data Table**
   - Display tabular data
   - Select which columns to show
   - Automatic formatting for dates and currency

3. **KPI Cards**
   - Display single key metrics
   - Support for sum, average, count, min, max
   - Large, easy-to-read display

### Date Filtering
- All Time: Show all data
- Today: Show today's orders only
- Last 7 Days: Show orders from the past week
- Last 30 Days: Show orders from the past month
- Last 90 Days: Show orders from the past three months

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB is accessible on the specified port

2. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify all dependencies are installed
   - Check browser console for errors

3. **Widgets Not Displaying Data**
   - Ensure you have orders in the database
   - Check widget configuration settings
   - Verify data field names match the order schema

4. **Drag and Drop Not Working**
   - Check browser compatibility
   - Ensure react-grid-layout is properly installed
   - Check for JavaScript errors in console

### Development Tips

- Use browser developer tools to debug
- Check Network tab for API calls
- Use MongoDB Compass to view database contents
- Enable React DevTools for component debugging

## License

This project is licensed under the ISC License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please open an issue on the GitHub repository.
