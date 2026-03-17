import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WidgetSettings = ({ widget, onSave, onClose, orders }) => {
  const [title, setTitle] = useState('');
  const [config, setConfig] = useState({
    dataFields: [],
    xAxis: '',
    yAxis: '',
    aggregation: 'sum'
  });

  useEffect(() => {
    if (widget) {
      setTitle(widget.title || '');
      setConfig(widget.config || {
        dataFields: [],
        xAxis: '',
        yAxis: '',
        aggregation: 'sum'
      });
    }
  }, [widget]);

  const availableFields = orders.length > 0 ? Object.keys(orders[0]) : [];

  const handleSave = () => {
    const updatedWidget = {
      ...widget,
      title,
      config
    };
    onSave(updatedWidget);
  };

  const handleDataFieldToggle = (field) => {
    setConfig(prev => ({
      ...prev,
      dataFields: prev.dataFields.includes(field)
        ? prev.dataFields.filter(f => f !== field)
        : [...prev.dataFields, field]
    }));
  };

  const renderConfigOptions = () => {
    switch (widget?.type) {
      case 'data-table':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Data Fields
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
              {availableFields.map(field => (
                <label key={field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.dataFields.includes(field)}
                    onChange={() => handleDataFieldToggle(field)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{field}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'kpi-card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Field
              </label>
              <select
                value={config.dataField || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, dataField: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a field</option>
                {availableFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aggregation
              </label>
              <select
                value={config.aggregation || 'sum'}
                onChange={(e) => setConfig(prev => ({ ...prev, aggregation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="sum">Sum</option>
                <option value="average">Average</option>
                <option value="count">Count</option>
                <option value="min">Minimum</option>
                <option value="max">Maximum</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                X-Axis Field
              </label>
              <select
                value={config.xAxis || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, xAxis: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a field</option>
                {availableFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Y-Axis Field
              </label>
              <select
                value={config.yAxis || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, yAxis: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a field</option>
                {availableFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Widget Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter widget title"
              />
            </div>
            
            {renderConfigOptions()}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSettings;
