import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Settings, Trash2, ArrowLeft, Save } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useDashboard, DashboardProvider } from "../context/DashboardContext";
import { ordersAPI } from "../services/api";
import WidgetRenderer from "../components/WidgetRenderer";
import WidgetSettings from "../components/WidgetSettings";
import WidgetSidebar from "../components/WidgetSidebar";
import "../styles/DashboardConfig.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardConfigContent = () => {
  const navigate = useNavigate();

  const {
    widgets,
    addWidget,
    updateWidget,
    removeWidget,
    saveDashboard,
    loadDashboard,
    loading
  } = useDashboard();

  const [orders, setOrders] = useState([]);
  const [layout, setLayout] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
    loadDashboard();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getAll();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Generate layout from widgets - only create once when widgets are loaded
  useEffect(() => {
    if (widgets.length > 0 && layout.length === 0) {
      const initialLayout = widgets.map((widget, index) => ({
        i: widget.id,
        x: (index % 3) * 4,  // Fixed grid layout for Configure page
        y: Math.floor(index / 3) * 3,
        w: 4,
        h: 3
      }));
      console.log('DashboardConfig: Created initial layout:', initialLayout);
      setLayout(initialLayout);
    }
  }, [widgets, layout.length]);

  // Drag and drop
  const [{ isOver }, drop] = useDrop({
    accept: "widget",
    drop: (item) => {
      const newWidget = {
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: item.type,
        title: item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        position: {
          x: 0,
          y: layout.length * 3,
          w: 4,
          h: 3
        },
        config: getDefaultConfig(item.type)
      };

      addWidget(newWidget);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  // Get default configuration for widget types
  const getDefaultConfig = (type) => {
    switch (type) {
      case 'bar-chart':
        return {
          xAxis: 'productName',
          yAxis: 'price',
          aggregation: 'sum'
        };
      case 'pie-chart':
        return {
          xAxis: 'productName',
          yAxis: 'quantity',
          aggregation: 'sum'
        };
      case 'line-chart':
        return {
          xAxis: 'orderDate',
          yAxis: 'price',
          aggregation: 'sum'
        };
      case 'kpi-card':
        return {
          aggregation: 'count',
          dataField: 'orderId'
        };
      default:
        return {
          xAxis: 'productName',
          yAxis: 'price',
          aggregation: 'sum'
        };
    }
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      console.log("DashboardConfig: Saving widgets:", widgets);
      
      // Ensure widgets array is valid JSON
      const widgetsToSave = widgets.map(widget => ({
        ...widget,
        position: {
          x: widget.position?.x || 0,
          y: widget.position?.y || 0,
          w: widget.position?.w || 4,
          h: widget.position?.h || 3
        }
      }));
      
      console.log("DashboardConfig: Widgets to save:", widgetsToSave);
      await saveDashboard(widgetsToSave);
      alert("Dashboard saved successfully!");
    } catch (err) {
      console.error("DashboardConfig: Error saving dashboard:", err);
      alert("Error saving dashboard. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const renderWidget = (widget, index) => {
    const id = widget.id || `widget-${index}`;
    const layoutItem = layout.find((l) => l.i === id);

    return (
      <div
        key={id}
        data-grid={layoutItem || {
          i: id,
          x: widget.position?.x ?? 0,
          y: widget.position?.y ?? 0,
          w: widget.position?.w ?? 4,
          h: widget.position?.h ?? 3
        }}
        className="bg-white rounded-lg shadow p-3 group relative"
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeWidget(widget.id);
            }}
            className="p-1 bg-white rounded shadow no-drag"
          >
            <Trash2 size={16} className="text-red-600"/>
          </button>
        </div>
        <WidgetRenderer widget={widget} data={orders} />
      </div>
    );
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen">

      <WidgetSidebar />

      <div className="flex-1 flex flex-col">

        <div className="bg-white border-b px-6 py-4 flex justify-between">

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={20}/>
              <span>Back</span>
            </button>

            <h1 className="text-xl font-bold">Configure Dashboard</h1>
          </div>

          <button
            onClick={saveChanges}
            disabled={saving}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Save size={20}/>
            <span>{saving ? "Saving..." : "Save"}</span>
          </button>

        </div>

        <div
          ref={drop}
          className={`flex-1 p-6 overflow-auto ${isOver ? "bg-blue-50" : ""}`}
        >

          {widgets.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              Drag widgets from sidebar
            </div>
          ) : (

            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={{ lg:1200, md:996, sm:768, xs:480, xxs:0 }}
              cols={{ lg:12, md:10, sm:6, xs:4, xxs:2 }}
              rowHeight={60}
              isDraggable={false}  // Disable dragging in Configure page
              isResizable={false}  // Disable resizing in Configure page
              draggableCancel=".no-drag"
              compactType={null}  // Disable automatic compaction
              preventCollision={true}  // Disable layout auto-correction
              margin={[10,10]}
              containerPadding={[10,10]}
              measureBeforeMount={false}
              useCSSTransforms={true}
            >

              {widgets.map((widget,index)=>renderWidget(widget,index))}

            </ResponsiveGridLayout>

          )}

        </div>

      </div>

      {showSettings && selectedWidget && (
        <WidgetSettings
          widget={selectedWidget}
          orders={orders}
          onClose={()=>setShowSettings(false)}
          onSave={(updated)=>{
            updateWidget(updated)
            setShowSettings(false)
          }}
        />
      )}

    </div>
  );
};

const DashboardConfig = () => (
  <DashboardProvider>
    <DndProvider backend={HTML5Backend}>
      <DashboardConfigContent/>
    </DndProvider>
  </DashboardProvider>
);

export default DashboardConfig;