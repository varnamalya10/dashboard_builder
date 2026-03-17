import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PieChartWidget = ({ data, title, config }) => {
  const [chartData, setChartData] = useState([]);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#a855f7'];
  
  console.log('PieChartWidget - Data received:', data);
  console.log('PieChartWidget - Config:', config);

  const prepareData = () => {
    if (!data || data.length === 0) {
      console.log('PieChartWidget - No data available');
      return [];
    }
    
    // Use default configuration if not provided
    const xAxis = config?.xAxis || 'productName';
    const yAxis = config?.yAxis || 'quantity';
    
    console.log(`PieChartWidget - Using xAxis: ${xAxis}, yAxis: ${yAxis}`);
    
    // Group data by the specified field
    const groupedData = {};
    
    data.forEach(item => {
      const key = item[xAxis] || 'Unknown';
      const value = parseFloat(item[yAxis]) || 0;
      
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      
      // Apply aggregation
      if (config?.aggregation === 'sum') {
        groupedData[key] += value;
      } else if (config?.aggregation === 'count') {
        groupedData[key] += 1;
      } else if (config?.aggregation === 'avg') {
        groupedData[key] = (groupedData[key] + value) / 2;
      } else {
        groupedData[key] += value; // default to sum
      }
    });
    
    // Convert to chart format
    const chartData = Object.entries(groupedData).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
    
    console.log('PieChartWidget - Prepared grouped data:', chartData);
    return chartData;
  };

  // Update chart data when data or config changes
  useEffect(() => {
    const newData = prepareData();
    setChartData(newData);
  }, [data, config]);

  return (
    <div className="h-full w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [
                config?.yAxis?.toLowerCase().includes('price') || config?.yAxis?.toLowerCase().includes('revenue') 
                  ? `$${value}` 
                  : value, 
                name
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">No Data Available</div>
            <div className="text-sm">Try configuring the widget or add some orders</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartWidget;
