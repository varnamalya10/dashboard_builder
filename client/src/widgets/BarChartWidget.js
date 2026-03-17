import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartWidget = ({ data, title, config }) => {
  const [chartData, setChartData] = useState([]);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];
  
  console.log('BarChartWidget - Data received:', data);
  console.log('BarChartWidget - Config:', config);

  const prepareData = () => {
    if (!data || data.length === 0) {
      console.log('BarChartWidget - No data available');
      return [];
    }
    
    // Use default configuration if not provided
    const xAxis = config?.xAxis || 'productName';
    const yAxis = config?.yAxis || 'price';
    
    console.log(`BarChartWidget - Using xAxis: ${xAxis}, yAxis: ${yAxis}`);
    
    // Group data by xAxis field and aggregate yAxis values
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
    const chartData = Object.entries(groupedData).map(([name, value], index) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      fill: COLORS[index % COLORS.length]
    }));
    
    // Sort by value for better visualization
    chartData.sort((a, b) => b.value - a.value);
    
    console.log('BarChartWidget - Prepared grouped data:', chartData);
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
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  const value = data.value;
                  const formattedValue = config?.yAxis?.toLowerCase().includes('price') || config?.yAxis?.toLowerCase().includes('revenue') 
                    ? `$${value}` 
                    : value.toString();
                  
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold text-gray-900">{data.payload.name}</p>
                      <p className="text-sm text-gray-600">{config?.yAxis || 'value'}: {formattedValue}</p>
                      <div className="w-full h-2 mt-2" style={{ backgroundColor: data.fill }}></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="#3b82f6"
            />
          </BarChart>
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

export default BarChartWidget;
