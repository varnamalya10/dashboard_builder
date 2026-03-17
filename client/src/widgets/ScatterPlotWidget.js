import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ScatterPlotWidget = ({ data, title, config }) => {
  const [chartData, setChartData] = useState([]);
  
  console.log('ScatterPlotWidget - Data received:', data);
  console.log('ScatterPlotWidget - Config:', config);

  const prepareData = () => {
    if (!data || data.length === 0) {
      console.log('ScatterPlotWidget - No data available');
      return [];
    }
    
    // Plot price vs quantity as specified
    const chartData = data.map(item => {
      const x = parseFloat(item.price) || 0;
      const y = parseFloat(item.quantity) || 0;
      
      return {
        x: x,
        y: y
      };
    });
    
    console.log('ScatterPlotWidget - Prepared price vs quantity data:', chartData);
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
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Price" 
              label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Quantity"
              label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [
                name === 'Price' ? `$${value}` : value,
                name
              ]}
            />
            <Scatter name="Orders" data={chartData} fill="#3b82f6" />
          </ScatterChart>
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

export default ScatterPlotWidget;
