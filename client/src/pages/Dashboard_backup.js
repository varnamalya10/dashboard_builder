import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Save, Edit3, Grid3X3, Trash2, Download } from "lucide-react";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { ordersAPI } from "../services/api";
import WidgetRenderer from "../components/WidgetRenderer";
import WidgetSettings from "../components/WidgetSettings";
import { Responsive, WidthProvider } from "react-grid-layout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardContent = () => {
  const navigate = useNavigate();
  const { widgets, loading, loadDashboard, updateWidget, removeWidget } = useDashboard();
  const dashboardRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [layout, setLayout] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    loadDashboard();
  }, [fetchOrders, loadDashboard]);

  // Load saved layout when Dashboard mounts
  useEffect(() => {
    if (widgets.length > 0) {
      // Convert backend data to React Grid Layout format
      const savedLayout = widgets.map(widget => ({
        i: widget.id,
        x: widget.position?.x ?? 0,
        y: widget.position?.y ?? 0,
        w: widget.position?.w ?? 4,
        h: widget.position?.h ?? 3
      }));
      console.log('Dashboard: Restored saved layout:', savedLayout);
      setLayout(savedLayout);
    }
  }, [widgets]);

  const handleConfigureDashboard = () => {
    navigate("/dashboard-config");
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      saveLayoutChanges();
    }
    setIsEditMode(!isEditMode);
  };

  const saveLayoutChanges = async () => {
    try {
      setSaving(true);

      // Update each widget's position in the database
      layout.forEach((layoutItem) => {
        const widget = widgets.find((w) => w.id === layoutItem.i);
        if (widget) {
          updateWidget(widget.id, {
            position: {
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
            },
          });
        }
      });

      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Error saving layout:", error);
      alert("Error saving layout.");
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      if (!dashboardRef.current) {
        alert("Dashboard not ready for export");
        return;
      }

      // Show loading indicator
      const originalButton = document.querySelector('[data-export-pdf-button]');
      if (originalButton) {
        originalButton.disabled = true;
        originalButton.textContent = 'Exporting...';
      }

      // Capture the entire dashboard area
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: dashboardRef.current.scrollWidth,
        height: dashboardRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF in landscape orientation
      const pdf = new jsPDF("landscape", "mm", "a4");

      // Calculate dimensions to fit the entire dashboard
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate the ratio to fit the image in the PDF
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Save the PDF
      pdf.save("dashboard.pdf");

      // Restore button
      if (originalButton) {
        originalButton.disabled = false;
        originalButton.textContent = 'Export PDF';
      }

      console.log("Dashboard exported as PDF successfully");
    } catch (error) {
      console.error("Error exporting dashboard as PDF:", error);
      alert("Error exporting dashboard as PDF. Please try again.");
      
      // Restore button on error
      const originalButton = document.querySelector('[data-export-pdf-button]');
      if (originalButton) {
        originalButton.disabled = false;
        originalButton.textContent = 'Export PDF';
      }
    }
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="min-h-screen bg-gray-50 modern-transition">
      
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200 modern-transition">
        <div className="px-6 py-4 flex justify-between items-center modern-spacing">

          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 modern-transition">
              Order Analytics Dashboard
            </h1>

            {isEditMode && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center shadow-sm modern-transition">
                <Edit3 size={16} className="mr-1" />
                <span className="font-semibold">Edit Mode</span>
              </span>
            )}
          </div>

          <div className="flex space-x-3">
            {/* Export PDF Button */}
            <button
              onClick={handleExportPDF}
              data-export-pdf-button="true"
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
              title="Export dashboard as PDF"
            >
              <Download size={20} />
              <span className="font-semibold">Export PDF</span>
            </button>

            {isEditMode && (
              <button
                onClick={saveLayoutChanges}
                disabled={saving}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                <span className="font-semibold">{saving ? "Saving..." : "Save Layout"}</span>
              </button>
            )}

            <button
              onClick={toggleEditMode}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              {isEditMode ? <Grid3X3 size={20} /> : <Edit3 size={20} />}
              <span className="font-semibold">{isEditMode ? "View Mode" : "Edit Layout"}</span>
            </button>

            <button
              onClick={handleConfigureDashboard}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <Settings size={20} />
              <span className="font-semibold">Configure</span>
            </button>

          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="p-6 modern-spacing">
        <div ref={dashboardRef}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-600 font-medium modern-transition">Loading Dashboard...</div>
            </div>
          ) : widgets.length === 0 ? (

            <div className="bg-white p-12 rounded-lg shadow text-center modern-rounded-lg modern-transition">

              <h2 className="text-lg text-gray-600 mb-4 font-semibold modern-transition">
                No widgets configured
              </h2>

              <button
                onClick={handleConfigureDashboard}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <span className="font-semibold">Configure Dashboard</span>
              </button>

            </div>
            Order Analytics Dashboard
          </h1>

          {isEditMode && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center shadow-sm modern-transition">
              <Edit3 size={16} className="mr-1" />
              <span className="font-semibold">Edit Mode</span>
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            data-export-pdf-button="true"
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
            title="Export dashboard as PDF"
          >
            <Download size={20} />
            <span className="font-semibold">Export PDF</span>
          </button>

          {isEditMode && (
            <button
              onClick={saveLayoutChanges}
              disabled={saving}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              <span className="font-semibold">{saving ? "Saving..." : "Save Layout"}</span>
            </button>
          )}

          <button
            onClick={toggleEditMode}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            {isEditMode ? <Grid3X3 size={20} /> : <Edit3 size={20} />}
            <span className="font-semibold">{isEditMode ? "View Mode" : "Edit Layout"}</span>
          </button>

          <button
            onClick={handleConfigureDashboard}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <Settings size={20} />
            <span className="font-semibold">Configure</span>
          </button>

        </div>
      </div>
    </div>

    {/* MAIN */}
    <div className="p-6 modern-spacing">
      <div ref={dashboardRef}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600 font-medium modern-transition">Loading Dashboard...</div>
          </div>
        ) : widgets.length === 0 ? (

          <div className="bg-white p-12 rounded-lg shadow text-center modern-rounded-lg modern-transition">

            <h2 className="text-lg text-gray-600 mb-4 font-semibold modern-transition">
              No widgets configured
            </h2>

            <button
              onClick={handleConfigureDashboard}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 modern-transition shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <span className="font-semibold">Configure Dashboard</span>
            </button>

          </div>

        ) : (

          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            isDraggable={isEditMode}
            isResizable={isEditMode}
            draggableCancel=".no-drag"
            compactType={null}  // Disable automatic compaction
            preventCollision={true}  // Disable layout auto-correction
            onLayoutChange={setLayout}
            measureBeforeMount={false}
            useCSSTransforms={true}
          >

            {widgets.map((widget, index) => {

              const id = widget.id || `widget-${index}`;

              const layoutItem = layout.find((l) => l.i === id);

              return (
                <div
                  key={id}
                  data-grid={layoutItem}
                  className="bg-white rounded-lg shadow-md p-4 group relative"
                >
                  <WidgetRenderer widget={widget} data={orders} />

                  {isEditMode && (
                    <>
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWidget(widget);
                            setShowSettings(true);
                          }}
                          className="p-1 bg-white rounded shadow no-drag"
                        >
                          <Settings size={16} />
                        </button>
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
                      <div className="absolute top-2 left-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                        Drag
                      </div>
                    </>
                  )}
                </div>
              );

            })}

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

const Dashboard = () => (
  <DashboardProvider>
    <DashboardContent />
  </DashboardProvider>
);

export default Dashboard;