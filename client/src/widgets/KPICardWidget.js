import React, { useEffect, useState } from 'react';

const KPICardWidget = ({ data, title, config }) => {
  const [kpiValue, setKpiValue] = useState(0);
  const [kpiType, setKpiType] = useState('revenue');

  const calculateKPI = () => {
    if (!data || data.length === 0) {
      return { revenue: 0, orders: 0, customers: 0 };
    }

    // Calculate multiple KPIs from orders data
    const totalOrders = data.length;
    const totalRevenue = data.reduce((acc, order) => {
      const quantity = parseFloat(order.quantity) || 0;
      const price = parseFloat(order.price) || 0;
      return acc + (quantity * price);
    }, 0);
    const totalCustomers = new Set(data.map(order => order.customerId)).size;

    console.log('KPICardWidget - Calculated KPIs:', { totalOrders, totalRevenue, totalCustomers });
    return { revenue: totalRevenue, orders: totalOrders, customers: totalCustomers };
  };

  const formatValue = (value, type) => {
    // Ensure we never return NaN
    if (isNaN(value) || value === null || value === undefined) {
      return type === 'revenue' ? '$0.00' : '0';
    }
    
    // Format based on KPI type
    if (type === 'revenue') {
      return `$${parseFloat(value).toFixed(2)}`;
    } else {
      return value.toLocaleString();
    }
  };

  // Update KPI when data changes
  useEffect(() => {
    const kpis = calculateKPI();
    const value = kpis[kpiType] || 0;
    setKpiValue(value);
  }, [data, kpiType]);

  const formattedValue = formatValue(kpiValue, kpiType);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
      {title && <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>}
      <div className="text-4xl font-bold text-blue-600 mb-2">
        {formattedValue}
      </div>
      <div className="text-sm text-gray-600">
        {kpiType === 'revenue' && 'Total Revenue'}
        {kpiType === 'orders' && 'Total Orders'}
        {kpiType === 'customers' && 'Total Customers'}
      </div>
    </div>
  );
};

export default KPICardWidget;
