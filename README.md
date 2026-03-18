# Dashboard Builder

A full-stack web application for creating dynamic, customizable dashboards with drag-and-drop widgets. Visualize customer order data using charts, tables, and KPI cards.

## 🎥 Demo Video

▶️ Click below to watch the project demo:

[![Dashboard Demo](https://img.youtube.com/vi/6AtcIEjnB4g/0.jpg)](https://youtu.be/6AtcIEjnB4g)

## 🚀 Features

### 📊 Dashboard Builder

* Drag & Drop Interface using react-grid-layout
* Multiple Widget Types:

  * Bar Chart, Line Chart, Pie Chart, Area Chart, Scatter Plot
  * Data Tables with customizable columns
  * KPI Cards with aggregation options
* Widget Configuration:

  * Titles, data fields, axes, aggregation methods
* Responsive Layout for different screen sizes


### 📦 Customer Orders Management

* Full CRUD Operations (Create, Read, Update, Delete)
* Order Status Tracking:

  * Pending, Processing, Shipped, Delivered, Cancelled
* Data validation for consistency


### 📈 Data Visualization

* Real-time updates when data changes
* Interactive charts using Recharts
* Clean UI built with Tailwind CSS


## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Recharts
* React Grid Layout
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MySQL
* mysql2
* CORS
* dotenv


## 📁 Project Structure

custom-dashboard-builder/
├── client/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── .env
│   └── server.js
├── package.json
└── README.md


## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v14+)
* MySQL installed and running
* npm or yarn


### 1. Clone Repository

git clone <repository-url>
cd custom-dashboard-builder


### 2. Install Dependencies

npm install

cd server && npm install
cd ../client && npm install


### 3. Configure Environment

Create `.env` inside server:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=dashboard_builder


### 4. Setup MySQL Database

CREATE DATABASE dashboard_builder;


### 5. Run Application

Run both frontend & backend:

npm run dev

OR separately:

Backend:
cd server
npm start

Frontend:
cd client
npm start


### 6. Access App

Frontend: http://localhost:3000
Backend: http://localhost:5000


## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Orders

GET /api/orders
GET /api/orders/:id
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id


### Dashboard

GET /api/dashboard
POST /api/dashboard
PUT /api/dashboard


## 🗄️ Database Schema (MySQL)

### Orders Table

* id (Primary Key)
* customer_name
* product_name
* quantity
* price
* order_date
* order_status


### Dashboard Table

* id (Primary Key)
* widgets (JSON column for layout & config)


## 🎯 Features in Detail

### 📊 Charts

* Bar Chart → Compare categories
* Line Chart → Show trends
* Pie Chart → Show distribution
* Area Chart → Show cumulative data
* Scatter Plot → Show relationships


### 📋 Data Table

* Dynamic column selection
* Auto formatting for values


### 📌 KPI Cards

* Total Revenue
* Total Orders
* Total Customers
* Supports aggregation functions (sum, avg, count, min, max)


## ⚠️ Troubleshooting

### MySQL Connection Error

* Ensure MySQL is running
* Check `.env` credentials
* Verify database exists


### Frontend Not Loading

* Ensure backend is running
* Check browser console


### Widgets Not Showing Data

* Ensure orders exist in database
* Verify field mappings


### Drag & Drop Issues

* Check browser console
* Ensure react-grid-layout is installed


## 💡 Development Tips

* Use browser DevTools (Network tab)
* Use MySQL Workbench to inspect data
* Use React DevTools


## 📄 License

ISC License


## 🤝 Contributing

* Fork repository
* Create feature branch
* Make changes
* Submit pull request


## 📞 Support

For issues, open a GitHub issue
