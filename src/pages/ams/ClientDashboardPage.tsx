
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { InteractiveDashboardCanvas } from './client-dashboard/components/InteractiveDashboardCanvas';
import { FloatingToolbar } from './client-dashboard/components/FloatingToolbar';
import { MetricWidget, ProgressWidget, ActivityWidget, ChartWidget } from './client-dashboard/components/EnhancedWidgets';
import { DashboardHeader } from './client-dashboard/components/DashboardHeader';
import { useDashboardData } from './client-dashboard/hooks/useDashboardData';
import { useToast } from '@/hooks/use-toast';

interface DraggableWidget {
  id: string;
  component: React.ReactNode;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const ClientDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const { dashboardData, isLoading } = useDashboardData(dateRange);
  const { toast } = useToast();

  // Initialize default widgets
  const [widgets, setWidgets] = useState<DraggableWidget[]>([
    {
      id: 'metrics-1',
      title: 'Active Roles',
      component: <MetricWidget 
        title="Active Roles" 
        value={12} 
        change={8} 
        icon={<span className="text-blue-600">💼</span>}
        color="bg-blue-100"
      />,
      position: { x: 50, y: 100 },
      size: { width: 300, height: 200 },
      zIndex: 1
    },
    {
      id: 'metrics-2',
      title: 'Candidates',
      component: <MetricWidget 
        title="Total Candidates" 
        value={156} 
        change={15} 
        icon={<span className="text-green-600">👥</span>}
        color="bg-green-100"
      />,
      position: { x: 400, y: 100 },
      size: { width: 300, height: 200 },
      zIndex: 1
    },
    {
      id: 'progress-1',
      title: 'Hiring Progress',
      component: <ProgressWidget 
        title="Hiring Pipeline"
        items={[
          { label: 'Applications', value: 45, max: 50, color: 'bg-blue-500' },
          { label: 'Interviews', value: 23, max: 30, color: 'bg-green-500' },
          { label: 'Offers', value: 8, max: 15, color: 'bg-purple-500' },
        ]}
      />,
      position: { x: 50, y: 350 },
      size: { width: 350, height: 280 },
      zIndex: 1
    },
    {
      id: 'activity-1',
      title: 'Recent Activity',
      component: <ActivityWidget />,
      position: { x: 450, y: 350 },
      size: { width: 350, height: 280 },
      zIndex: 1
    },
    {
      id: 'chart-1',
      title: 'Department Overview',
      component: <ChartWidget 
        title="Roles by Department"
        data={[
          { name: 'Engineering', value: 45, color: '#3B82F6' },
          { name: 'Marketing', value: 23, color: '#10B981' },
          { name: 'Sales', value: 34, color: '#F59E0B' },
          { name: 'HR', value: 12, color: '#EF4444' },
        ]}
      />,
      position: { x: 850, y: 100 },
      size: { width: 300, height: 350 },
      zIndex: 1
    }
  ]);

  const [history, setHistory] = useState<DraggableWidget[][]>([widgets]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const saveToHistory = useCallback((newWidgets: DraggableWidget[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newWidgets);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleWidgetUpdate = useCallback((updatedWidgets: DraggableWidget[]) => {
    setWidgets(updatedWidgets);
    saveToHistory(updatedWidgets);
  }, [saveToHistory]);

  const handleAddWidget = useCallback(() => {
    const newWidget: DraggableWidget = {
      id: `widget-${Date.now()}`,
      title: 'New Widget',
      component: <div className="p-4 text-center text-gray-500">New Widget Content</div>,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      size: { width: 300, height: 200 },
      zIndex: Math.max(...widgets.map(w => w.zIndex)) + 1
    };
    
    const updatedWidgets = [...widgets, newWidget];
    handleWidgetUpdate(updatedWidgets);
    
    toast({
      title: "Widget Added",
      description: "New widget has been added to your dashboard.",
    });
  }, [widgets, handleWidgetUpdate, toast]);

  const handleSaveLayout = useCallback(() => {
    localStorage.setItem('dashboard-layout', JSON.stringify(widgets));
    toast({
      title: "Layout Saved",
      description: "Your dashboard layout has been saved successfully.",
    });
  }, [widgets, toast]);

  const handleResetLayout = useCallback(() => {
    const defaultWidgets = widgets.map((widget, index) => ({
      ...widget,
      position: { 
        x: (index % 3) * 350 + 50, 
        y: Math.floor(index / 3) * 300 + 100 
      }
    }));
    handleWidgetUpdate(defaultWidgets);
    
    toast({
      title: "Layout Reset",
      description: "Dashboard layout has been reset to default positions.",
    });
  }, [widgets, handleWidgetUpdate, toast]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setWidgets(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setWidgets(history[newIndex]);
    }
  }, [history, historyIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <DashboardHeader dateRange={dateRange} onDateRangeChange={setDateRange} />
      
      <InteractiveDashboardCanvas
        widgets={widgets}
        onWidgetUpdate={handleWidgetUpdate}
      />
      
      <FloatingToolbar
        onAddWidget={handleAddWidget}
        onSaveLayout={handleSaveLayout}
        onResetLayout={handleResetLayout}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
    </div>
  );
};

export default ClientDashboardPage;
