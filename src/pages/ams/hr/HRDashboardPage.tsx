
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Download } from 'lucide-react';
import { MetricCard } from './components/dashboard/MetricCard';
import { EnhancedFilters } from './components/dashboard/EnhancedFilters';
import { MetricDetailsDrawer } from './components/dashboard/MetricDetailsDrawer';
import { RecentActivityPanel, CollapsedActivityPanel } from './components/dashboard/RecentActivityPanel';
import { GamificationBadges } from './components/dashboard/GamificationBadges';
import { ProgressBar } from './components/dashboard/ProgressBar';
import { CandidatePipelineChart } from './components/dashboard/CandidatePipelineChart';
import { SecondaryMetrics } from './components/dashboard/SecondaryMetrics';
import { PipelineDetailSidebar } from './components/dashboard/PipelineDetailSidebar';
import { useDashboardData, MetricData } from './hooks/useDashboardData';
import { useFilterOptions } from './hooks/useFilterOptions';
import { motion } from 'framer-motion';

const HRDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [taFilter, setTaFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [currentMetric, setCurrentMetric] = useState<MetricData | null>(null);
  const [activityPanelCollapsed, setActivityPanelCollapsed] = useState(false);
  const [pipelineDrawerOpen, setPipelineDrawerOpen] = useState(false);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<{ stage: string; data: any } | null>(null);
  
  const { metrics, isLoading } = useDashboardData(dateRange, taFilter, roleFilter, clientFilter);
  const { dateRangeOptions, taOptions, roleOptions, clientOptions } = useFilterOptions();

  const handleShowDetails = (metric: MetricData) => {
    setCurrentMetric(metric);
    setDetailsDrawerOpen(true);
  };

  const handlePipelineStageClick = (stage: string, data: any) => {
    setSelectedPipelineStage({ stage, data });
    setPipelineDrawerOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <div className="text-sm text-gray-500 mb-1">HR / Hiring Dashboard</div>
          <h1 className="text-2xl font-bold">Hiring Analytics Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Filters */}
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
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Candidate Pipeline Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CandidatePipelineChart onStageClick={handlePipelineStageClick} />
          </motion.div>
          
          {/* Weekly Goals Progress */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl">Weekly Goals</h2>
              <span className="text-sm text-gray-500 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                3 days remaining
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <ProgressBar 
                  value={18} 
                  max={25} 
                  label="Interviews Scheduled" 
                  color="#4C51BF"
                />
              </div>
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <ProgressBar 
                  value={7} 
                  max={10} 
                  label="Roles Filled" 
                  color="#38A169" 
                />
              </div>
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <ProgressBar 
                  value={15} 
                  max={20} 
                  label="Candidate Feedback" 
                  color="#D69E2E" 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Gamification Badges */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GamificationBadges />
          </motion.div>
          
          {/* Primary Metrics Pentagrid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-bold text-xl mb-4">Primary Hiring Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {isLoading ? (
                Array(5).fill(null).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-[280px] bg-white animate-pulse rounded-xl border"
                  ></div>
                ))
              ) : (
                metrics.map((metric, index) => (
                  <MetricCard 
                    key={index} 
                    metric={metric} 
                    onClick={() => handleShowDetails(metric)} 
                  />
                ))
              )}
            </div>
          </motion.div>
          
          {/* Secondary Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-bold text-xl mb-4">Secondary Metrics & Insights</h2>
            <SecondaryMetrics />
          </motion.div>
        </div>
        
        {/* Activity Feed Sidebar */}
        {activityPanelCollapsed ? (
          <CollapsedActivityPanel onToggle={() => setActivityPanelCollapsed(false)} />
        ) : (
          <RecentActivityPanel 
            collapsed={activityPanelCollapsed} 
            onToggle={() => setActivityPanelCollapsed(true)} 
          />
        )}
      </div>
      
      {/* Metric Details Drawer */}
      <MetricDetailsDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        metric={currentMetric}
      />

      {/* Pipeline Detail Sidebar */}
      <PipelineDetailSidebar
        open={pipelineDrawerOpen}
        onOpenChange={setPipelineDrawerOpen}
        stage={selectedPipelineStage?.stage || null}
        data={selectedPipelineStage?.data || null}
      />
    </div>
  );
};

export default HRDashboardPage;
