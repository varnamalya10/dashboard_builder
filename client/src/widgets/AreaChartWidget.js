import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartWidget = ({ data, title, config }) => {
  const [chartData, setChartData] = useState([]);
  
  console.log('AreaChartWidget - Data received:', data);
  console.log('AreaChartWidget - Config:', config);

  const prepareData = () => {
    if (!data || data.length === 0) {
      console.log('AreaChartWidget - No data available');
      return [];
    }
    
    // Group orders by orderDate and calculate total revenue per day (same as LineChart)
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
    
    console.log('AreaChartWidget - Prepared revenue data:', chartData);
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
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6} 
            />
          </AreaChart>
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

export default AreaChartWidget;
