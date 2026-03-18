# Dashboard Builder

A full-stack web application for creating dynamic, customizable dashboards with drag-and-drop widgets. Visualize customer order data with various chart types, tables, and KPI cards.

## Features

### Dashboard Builder
- **Drag & Drop Interface**: Intuitive widget placement using react-grid-layout
- **Edit Layout Mode**: Resize and reorder widgets with save functionality
- **Multiple Widget Types**:
  - Bar Chart, Line Chart, Pie Chart, Area Chart, Scatter Plot
  - Data Tables with customizable columns
  - KPI Cards with total orders, revenue, and customers metrics
- **Widget Configuration**: Customize titles, data fields, and display options
- **Responsive Layout**: Grid-based system that adapts to different screen sizes
- **Export to PDF**: Download dashboard as PDF document

### Authentication System
- **User Registration**: Create new user accounts
- **Secure Login**: JWT-based authentication
- **Protected Routes**: Authenticated access to dashboard features
- **Session Management**: Secure token handling

### Customer Orders Management
- **Full CRUD Operations**: Create, Read, Update, Delete orders
- **Order Status Tracking**: Pending, Processing, Shipped, Delivered, Cancelled
- **Data Validation**: Ensure data integrity with proper validation
- **Sample Data Generation**: Pre-populated with realistic order data

### Data Visualization
- **Real-time Updates**: Widgets refresh when data changes
- **Interactive Charts**: Built with Recharts for smooth interactions
- **Modern UI**: Clean, professional design using Tailwind CSS
- **KPI Metrics**: Total orders, revenue, and customer counts

## Tech Stack

### Frontend
- **React.js** - UI framework with functional components and hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing with protected routes
- **Recharts** - Chart library for data visualization
- **React Grid Layout** - Drag-and-drop grid system
- **Axios** - HTTP client for API calls with interceptors
- **Lucide React** - Modern icon library
- **React Context API** - State management for dashboard and auth

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - MySQL ORM for database operations
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
dashboard_builder/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── WidgetRenderer.js
│   │   │   ├── WidgetSettings.js
│   │   │   └── WidgetSidebar.js
│   │   ├── context/           # React context
│   │   │   ├── AuthContext.js
│   │   │   ├── DashboardContext.js
│   │   │   └── ThemeContext.js
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── DashboardConfig.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── CustomerOrders.js
│   │   ├── services/           # API services
│   │   │   ├── api.js
│   │   │   └── authAPI.js
│   │   ├── styles/            # CSS files
│   │   │   ├── DashboardConfig.css
│   │   │   └── theme.css
│   │   ├── widgets/            # Widget components
│   │   │   ├── BarChartWidget.js
│   │   │   ├── LineChartWidget.js
│   │   │   ├── PieChartWidget.js
│   │   │   ├── AreaChartWidget.js
│   │   │   ├── ScatterPlotWidget.js
│   │   │   ├── DataTableWidget.js
│   │   │   └── KPICardWidget.js
│   │   ├── config/            # Configuration files
│   │   │   ├── api.config.js
│   │   │   └── dashboard.config.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                     # Node.js backend
│   ├── config/                 # Configuration files
│   │   ├── database.config.js
│   │   ├── database.js
│   │   ├── routes.config.js
│   │   └── server.config.js
│   ├── controllers/            # Route controllers
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── orderController.js
│   │   └── widgetController.js
│   ├── models/                 # Sequelize models
│   │   ├── Dashboard.js
│   │   ├── Order.js
│   │   └── Widget.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── orders.js
│   │   └── widgets.js
│   ├── scripts/                # Database scripts
│   │   ├── createDefaultDashboard.js
│   │   ├── createOptimizedDashboard.js
│   │   ├── createOrderDataWithImages.js
│   │   ├── createSampleData.js
│   │   ├── create_table.js
│   │   ├── create_users_table.js
│   │   └── create_widgets_table.sql
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── scripts/                    # Development scripts
│   └── dev-scripts.js
├── package.json                # Root package.json
├── .env.example                # Environment variables template
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (installed and running)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/varnamalya10/dashboard_builder.git
cd dashboard_builder
```

### 2. Install Dependencies
Install all dependencies for both frontend and backend:
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

### 3. Database Setup
Create a MySQL database and configure the environment:

#### Create Database
```sql
CREATE DATABASE dashboard_builder;
```

#### Configure Environment
Create `server/.env` file:
```env
# Server Configuration
PORT=5000
HOST=localhost
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dashboard_builder
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

#### Run Database Scripts
```bash
cd server
node create_table.js
node create_users_table.js
node createSampleData.js
```

### 4. Start the Application

#### Option 1: Run Both Frontend and Backend Simultaneously
```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
cd client
npm start
```

#### Option 2: Use Development Scripts
```bash
# From root directory
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: MySQL on localhost:3306

## Usage

### 1. User Registration and Login
1. Navigate to http://localhost:3000
2. Click **"Register"** to create a new account
3. Fill in your details and submit
4. Login with your credentials

### 2. Build Your Dashboard
1. Go to **Configure** page after login
2. Drag widgets from the left sidebar to the canvas
3. Arrange widgets by dragging and resizing
4. Click the settings icon on each widget to configure:
   - Widget title
   - Data fields to display
   - Chart axes (for charts)
   - Aggregation method (for KPIs)
5. Click **"Save Configuration"** when done

### 3. View and Edit Your Dashboard
1. Navigate to the **Dashboard** page
2. View your configured widgets with real-time data
3. Use **"Edit Layout"** to resize and reorder widgets
4. Click **"Save Layout"** to save changes
5. Use **"Export PDF"** to download dashboard as PDF

### 4. Manage Orders
1. Go to the **Orders** page
2. View all orders in a table format
3. Edit existing orders by clicking the edit icon
4. Delete orders using the delete icon
5. Create new orders with the **"Create Order"** button

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Dashboard
- `GET /api/dashboard` - Get saved dashboard configuration
- `POST /api/dashboard` - Save new dashboard configuration
- `PUT /api/dashboard` - Update dashboard configuration

### Widgets
- `GET /api/widgets` - Get all available widgets
- `POST /api/widgets` - Create new widget
- `PUT /api/widgets/:widgetId` - Update widget
- `DELETE /api/widgets/:widgetId` - Delete widget

## Data Models

### User
```javascript
{
  id: Number,
  name: String,
  email: String,
  password: String, // Hashed
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  id: Number,
  orderId: String,        // Auto-generated unique ID
  customerName: String,    // Customer name
  productName: String,    // Product name
  quantity: Number,        // Order quantity
  price: Number,          // Unit price
  orderDate: Date,        // Order date
  orderStatus: String,    // Order status (Pending, Processing, Shipped, Delivered, Cancelled)
  createdAt: Date,
  updatedAt: Date
}
```

### Widget
```javascript
{
  id: Number,
  widgetId: String,       // Unique widget identifier
  widgetType: String,     // Widget type (bar-chart, line-chart, etc.)
  title: String,          // Widget title
  posX: Number,           // X position in grid
  posY: Number,           // Y position in grid
  width: Number,          // Widget width
  height: Number,         // Widget height
  configJson: Object,     // Widget configuration (JSON)
  createdAt: Date,
  updatedAt: Date
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
   - Display total orders count
   - Show total revenue
   - Calculate total customers
   - Large, easy-to-read display

### Layout Management
- **Edit Mode**: Toggle between view and edit modes
- **Drag & Drop**: Move widgets to new positions
- **Resize**: Adjust widget dimensions
- **Save Layout**: Persist layout changes to database
- **Grid System**: 12-column responsive grid

### Export Features
- **PDF Export**: Download entire dashboard as PDF
- **High Quality**: 2x scale for crisp output
- **Complete Dashboard**: Captures all widgets and layout

## Troubleshooting

### Common Issues

1. **MySQL Connection Error**
   - Ensure MySQL is running
   - Check the connection string in `.env`
   - Verify database exists and credentials are correct

2. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify all dependencies are installed
   - Check browser console for errors

3. **Authentication Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration settings
   - Verify CORS configuration

4. **Widgets Not Displaying Data**
   - Ensure you have orders in the database
   - Check widget configuration settings
   - Verify data field names match the order schema

5. **Drag and Drop Not Working**
   - Check browser compatibility
   - Ensure react-grid-layout is properly installed
   - Check for JavaScript errors in console

### Development Tips

- Use browser developer tools to debug
- Check Network tab for API calls
- Use MySQL Workbench to view database contents
- Enable React DevTools for component debugging
- Check server logs for backend errors

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
HOST=localhost
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=dashboard_builder
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

## Scripts

### Development Scripts
```bash
# Start development servers
npm run dev

# Install all dependencies
npm run install-all

# Stop all servers
npm run stop
```

### Database Scripts
```bash
cd server

# Create database tables
node create_table.js
node create_users_table.js

# Create sample data
node createSampleData.js

# Create default dashboard
node createDefaultDashboard.js
```

## License

This project is licensed under the ISC License.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Support

For issues and questions, please open an issue on the GitHub repository: https://github.com/varnamalya10/dashboard_builder/issues

## Live Demo

A live demo of this application is available at: [Demo Link] (if deployed)

---

Built with ❤️ using React, Node.js, and MySQL
