import React from 'react';

const DataTableWidget = ({ data, title, config }) => {
  const prepareData = () => {
    if (!data || data.length === 0) return [];

    if (config.dataFields && config.dataFields.length > 0) {
      return data.slice(0, 10).map(item => {
        const filteredItem = {};
        config.dataFields.forEach(field => {
          filteredItem[field] = item[field];
        });
        return filteredItem;
      });
    }

    return data.slice(0, 10);
  };

  const tableData = prepareData();
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const formatCellValue = (value, key) => {
    if (key.toLowerCase().includes('date')) {
      return new Date(value).toLocaleDateString();
    }
    if (key.toLowerCase().includes('price') || key.toLowerCase().includes('revenue')) {
      return `$${parseFloat(value).toFixed(2)}`;
    }
    return value;
  };

  const formatColumnName = (column) => {
    return column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="h-full w-full overflow-auto">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatColumnName(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {formatCellValue(row[column], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {tableData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default DataTableWidget;
