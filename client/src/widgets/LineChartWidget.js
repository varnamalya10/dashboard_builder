import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartWidget = ({ data, title, config }) => {
  const [chartData, setChartData] = useState([]);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];
  
  console.log('LineChartWidget - Data received:', data);
  console.log('LineChartWidget - Config:', config);

  const prepareData = () => {
    if (!data || data.length === 0) {
      console.log('LineChartWidget - No data available');
      return [];
    }
    
    // Group orders by orderDate and calculate total revenue per day
    const revenueByDate = {};
    
    data.forEach(item => {
      const date = item.orderDate;
      const revenue = parseFloat(item.quantity) * parseFloat(item.price) || 0;
      
      if (!revenueByDate[date]) {
        revenueByDate[date] = 0;
      }
      
      revenueByDate[date] += revenue;
    });
    
    // Convert to chart format and sort by date
    const chartData = Object.entries(revenueByDate)
      .map(([date, revenue]) => ({
        date: new Date(date).toLocaleDateString(),
        revenue: parseFloat(revenue.toFixed(2))
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    console.log('LineChartWidget - Prepared revenue data:', chartData);
    return chartData;
  };

  // Update chart data when data changes
  useEffect(() => {
    const newData = prepareData();
    setChartData(newData);
  }, [data]);

  return (
    <div className="h-full w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">No Data Available</div>
            <div className="text-sm">Try adding some orders</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineChartWidget;
