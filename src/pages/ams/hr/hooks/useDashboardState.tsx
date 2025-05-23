
import { useState } from 'react';
import { MetricData } from './useDashboardData';

export const useDashboardState = () => {
  const [dateRange, setDateRange] = useState('30');
  const [taFilter, setTaFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [currentMetric, setCurrentMetric] = useState<MetricData | null>(null);
  const [activityPanelCollapsed, setActivityPanelCollapsed] = useState(false);
  const [pipelineDrawerOpen, setPipelineDrawerOpen] = useState(false);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<{ stage: string; data: any } | null>(null);
  const [activityDetailOpen, setActivityDetailOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  return {
    // Filter states
    dateRange,
    setDateRange,
    taFilter,
    setTaFilter,
    roleFilter,
    setRoleFilter,
    clientFilter,
    setClientFilter,
    
    // Drawer states
    detailsDrawerOpen,
    setDetailsDrawerOpen,
    currentMetric,
    setCurrentMetric,
    
    // Activity panel states
    activityPanelCollapsed,
    setActivityPanelCollapsed,
    
    // Pipeline states
    pipelineDrawerOpen,
    setPipelineDrawerOpen,
    selectedPipelineStage,
    setSelectedPipelineStage,
    
    // Activity detail states
    activityDetailOpen,
    setActivityDetailOpen,
    selectedActivity,
    setSelectedActivity
  };
};
