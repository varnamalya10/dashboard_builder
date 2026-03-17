import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { widgetsAPI, dashboardAPI } from '../services/api';

const DashboardContext = createContext();

const initialState = {
  widgets: [],
  loading: false,
  error: null,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_WIDGETS':
      return { ...state, widgets: action.payload, loading: false, error: null };
    case 'ADD_WIDGET':
      return { ...state, widgets: [...state.widgets, action.payload] };
    case 'UPDATE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.map((widget) =>
          widget.id === action.payload.id ? action.payload : widget
        ),
      };
    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter((widget) => widget.id !== action.payload),
      };
    default:
      return state;
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Generate unique widget ID
  const generateWidgetId = () => {
    return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

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

  // Load widgets from database - runs only once
  const loadDashboard = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      console.log('DashboardContext: Loading widgets from database...');
      
      const response = await widgetsAPI.getAll();
      const widgets = response.data || [];
      
      console.log(`DashboardContext: Loaded ${widgets.length} widgets from database`);
      dispatch({ type: 'SET_WIDGETS', payload: widgets });
    } catch (error) {
      console.error('DashboardContext: Error loading widgets:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Add widget with functional state update
  const addWidget = useCallback(async (widgetData) => {
    try {
      console.log('DashboardContext: Adding widget:', widgetData);
      
      // Generate unique ID if not provided
      const widgetId = widgetData.id || generateWidgetId();
      
      // Create widget object with proper structure
      const newWidget = {
        id: widgetId,
        type: widgetData.type,
        title: widgetData.title || widgetData.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        position: {
          x: widgetData.position?.x || 0,
          y: widgetData.position?.y || 0,
          w: widgetData.position?.w || 4,
          h: widgetData.position?.h || 3
        },
        config: widgetData.config || getDefaultConfig(widgetData.type)
      };

      // Save to database first
      const response = await widgetsAPI.create({
        widget_id: newWidget.id,
        widget_type: newWidget.type,
        title: newWidget.title,
        pos_x: newWidget.position.x,
        pos_y: newWidget.position.y,
        width: newWidget.position.w,
        height: newWidget.position.h,
        config_json: newWidget.config
      });

      console.log('DashboardContext: Widget saved to database:', response.data);

      // Update local state
      dispatch({ type: 'ADD_WIDGET', payload: newWidget });
      
      console.log('DashboardContext: Widget added successfully:', newWidget);
      return newWidget;
    } catch (error) {
      console.error('DashboardContext: Error adding widget:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  // Update widget position and configuration
  const updateWidget = useCallback(async (widgetId, updates) => {
    try {
      console.log('DashboardContext: Updating widget:', widgetId, updates);
      
      // Find current widget
      const currentWidget = state.widgets.find(w => w.id === widgetId);
      if (!currentWidget) {
        throw new Error('Widget not found');
      }

      // Create updated widget object
      const updatedWidget = {
        ...currentWidget,
        ...updates,
        id: widgetId // Ensure ID is preserved
      };

      // Update database
      await widgetsAPI.update(widgetId, {
        pos_x: updatedWidget.position?.x || currentWidget.position.x,
        pos_y: updatedWidget.position?.y || currentWidget.position.y,
        width: updatedWidget.position?.w || currentWidget.position.w,
        height: updatedWidget.position?.h || currentWidget.position.h,
        config_json: updatedWidget.config || currentWidget.config
      });

      console.log('DashboardContext: Widget updated in database');

      // Update local state
      dispatch({ type: 'UPDATE_WIDGET', payload: updatedWidget });
      
      console.log('DashboardContext: Widget updated successfully:', updatedWidget);
      return updatedWidget;
    } catch (error) {
      console.error('DashboardContext: Error updating widget:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, [state.widgets]);

  // Remove widget
  const removeWidget = useCallback(async (widgetId) => {
    try {
      console.log('DashboardContext: Removing widget:', widgetId);
      
      // Delete from database
      await widgetsAPI.delete(widgetId);
      
      console.log('DashboardContext: Widget deleted from database');

      // Update local state
      dispatch({ type: 'REMOVE_WIDGET', payload: widgetId });
      
      console.log('DashboardContext: Widget removed successfully');
    } catch (error) {
      console.error('DashboardContext: Error removing widget:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  // Save all widgets (for bulk operations)
  const saveDashboard = useCallback(async (widgets) => {
    try {
      console.log('DashboardContext: Saving dashboard with widgets:', widgets);
      
      // Call the backend API with proper data structure
      await dashboardAPI.save({ widgets });
      
      // Update local state
      dispatch({ type: 'SET_WIDGETS', payload: widgets });
      
      console.log('DashboardContext: Dashboard saved successfully');
    } catch (error) {
      console.error('DashboardContext: Error saving dashboard:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const value = {
    widgets: state.widgets,
    loading: state.loading,
    error: state.error,
    loadDashboard,
    addWidget,
    updateWidget,
    removeWidget,
    saveDashboard
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext;
