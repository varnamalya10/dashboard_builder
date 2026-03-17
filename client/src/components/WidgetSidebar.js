import React from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ScatterChart, 
  Table2, 
  TrendingUp
} from 'lucide-react';
import { useDrag } from 'react-dnd';

const DraggableWidget = ({ type, name, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { type, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Icon size={20} className="text-primary-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
    </div>
  );
};

const WidgetSidebar = () => {
  const widgetCategories = [
    {
      title: 'Charts',
      widgets: [
        { type: 'bar-chart', name: 'Bar Chart', icon: BarChart3 },
        { type: 'line-chart', name: 'Line Chart', icon: LineChart },
        { type: 'pie-chart', name: 'Pie Chart', icon: PieChart },
        { type: 'area-chart', name: 'Area Chart', icon: AreaChart },
        { type: 'scatter-plot', name: 'Scatter Plot', icon: ScatterChart },
      ]
    },
    {
      title: 'Tables',
      widgets: [
        { type: 'data-table', name: 'Data Table', icon: Table2 },
      ]
    },
    {
      title: 'KPIs',
      widgets: [
        { type: 'kpi-card', name: 'KPI Card', icon: TrendingUp },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Widgets</h2>
        
        {widgetCategories.map((category, index) => (
          <div key={category.title} className={index > 0 ? 'mt-6' : ''}>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.widgets.map((widget) => (
                <DraggableWidget
                  key={widget.type}
                  type={widget.type}
                  name={widget.name}
                  icon={widget.icon}
                />
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">How to use:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Drag widgets to the canvas</li>
            <li>• Resize and position widgets</li>
            <li>• Click settings to configure</li>
            <li>• Save your configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WidgetSidebar;
