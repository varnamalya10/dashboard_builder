import React from 'react';
import BarChartWidget from '../widgets/BarChartWidget';
import LineChartWidget from '../widgets/LineChartWidget';
import PieChartWidget from '../widgets/PieChartWidget';
import AreaChartWidget from '../widgets/AreaChartWidget';
import ScatterPlotWidget from '../widgets/ScatterPlotWidget';
import DataTableWidget from '../widgets/DataTableWidget';
import KPICardWidget from '../widgets/KPICardWidget';

const WidgetRenderer = ({ widget, data, onDelete, onEdit }) => {
  const { type, title, config } = widget;
  
  console.log(`WidgetRenderer: Rendering ${type} widget`);
  console.log(`WidgetRenderer: Data passed to ${type}:`, data);
  console.log(`WidgetRenderer: Config for ${type}:`, config);

  const renderWidget = () => {
    switch (type) {
      case 'bar-chart':
        return <BarChartWidget data={data} title={title} config={config} />;
      case 'line-chart':
        return <LineChartWidget data={data} title={title} config={config} />;
      case 'pie-chart':
        return <PieChartWidget data={data} title={title} config={config} />;
      case 'area-chart':
        return <AreaChartWidget data={data} title={title} config={config} />;
      case 'scatter-plot':
        return <ScatterPlotWidget data={data} title={title} config={config} />;
      case 'data-table':
        return <DataTableWidget data={data} title={title} config={config} />;
      case 'kpi-card':
        return <KPICardWidget data={data} title={title} config={config} />;
      default:
        return <div className="p-4 text-gray-500">Unknown widget type: {type}</div>;
    }
  };

  return (
    <div className="h-full w-full p-3 overflow-hidden">
      {renderWidget()}
    </div>
  );
};

export default WidgetRenderer;
