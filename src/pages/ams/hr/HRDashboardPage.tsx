
import React from 'react';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { EnhancedFilters } from './components/dashboard/EnhancedFilters';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { DashboardSidebar } from './components/dashboard/DashboardSidebar';
import { MetricDetailsDrawer } from './components/dashboard/metric-details/MetricDetailsDrawer';
import { PipelineDetailSidebar } from './components/dashboard/PipelineDetailSidebar';
import { ActivityDetailDrawer } from './components/dashboard/ActivityDetailDrawer';
import { useDashboardData } from './hooks/useDashboardData';
import { useFilterOptions } from './hooks/useFilterOptions';
import { useDashboardState } from './hooks/useDashboardState';
import { useDashboardActions } from './hooks/useDashboardActions';

const HRDashboardPage: React.FC = () => {
  const dashboardState = useDashboardState();
  const {
    dateRange,
    setDateRange,
    taFilter,
    setTaFilter,
    roleFilter,
    setRoleFilter,
    clientFilter,
    setClientFilter,
    detailsDrawerOpen,
    setDetailsDrawerOpen,
    currentMetric,
    setCurrentMetric,
    activityPanelCollapsed,
    setActivityPanelCollapsed,
    pipelineDrawerOpen,
    setPipelineDrawerOpen,
    selectedPipelineStage,
    setSelectedPipelineStage,
    activityDetailOpen,
    setActivityDetailOpen,
    selectedActivity,
    setSelectedActivity
  } = dashboardState;

  const { metrics, isLoading } = useDashboardData(dateRange, taFilter, roleFilter, clientFilter);
  const { dateRangeOptions, taOptions, roleOptions, clientOptions } = useFilterOptions();

  const { handleShowDetails, handlePipelineStageClick, handleActivityClick } = useDashboardActions({
    setCurrentMetric,
    setDetailsDrawerOpen,
    setSelectedPipelineStage,
    setPipelineDrawerOpen,
    setSelectedActivity,
    setActivityDetailOpen
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <DashboardHeader />
      
      <EnhancedFilters 
        dateRange={dateRange}
        taFilter={taFilter}
        roleFilter={roleFilter}
        clientFilter={clientFilter}
        onDateRangeChange={setDateRange}
        onTaFilterChange={setTaFilter}
        onRoleFilterChange={setRoleFilter}
        onClientFilterChange={setClientFilter}
        dateRangeOptions={dateRangeOptions}
        taOptions={taOptions}
        roleOptions={roleOptions}
        clientOptions={clientOptions}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <DashboardContent
          metrics={metrics}
          isLoading={isLoading}
          onMetricClick={handleShowDetails}
          onPipelineStageClick={handlePipelineStageClick}
        />
        
        <DashboardSidebar
          activityPanelCollapsed={activityPanelCollapsed}
          onToggleActivityPanel={() => setActivityPanelCollapsed(!activityPanelCollapsed)}
          onActivityClick={handleActivityClick}
        />
      </div>
      
      <MetricDetailsDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        metric={currentMetric}
      />

      <PipelineDetailSidebar
        open={pipelineDrawerOpen}
        onOpenChange={setPipelineDrawerOpen}
        stage={selectedPipelineStage?.stage || null}
        data={selectedPipelineStage?.data || null}
      />
      
      <ActivityDetailDrawer
        open={activityDetailOpen}
        onOpenChange={setActivityDetailOpen}
        activity={selectedActivity}
      />
    </div>
  );
};

export default HRDashboardPage;
