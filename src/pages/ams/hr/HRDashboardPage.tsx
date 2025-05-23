
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';
import { MetricCard } from './components/dashboard/MetricCard';
import { EnhancedFilters } from './components/dashboard/EnhancedFilters';
import { MetricDetailsDrawer } from './components/dashboard/MetricDetailsDrawer';
import { RecentActivityPanel, CollapsedActivityPanel } from './components/dashboard/RecentActivityPanel';
import { GamificationBadges } from './components/dashboard/GamificationBadges';
import { ProgressBar } from './components/dashboard/ProgressBar';
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
  
  const { metrics, isLoading } = useDashboardData(dateRange, taFilter, roleFilter, clientFilter);
  const { dateRangeOptions, taOptions, roleOptions, clientOptions } = useFilterOptions();

  const handleShowDetails = (metric: MetricData) => {
    setCurrentMetric(metric);
    setDetailsDrawerOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-semibold">HR Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm">Export</Button>
        </div>
      </div>
      
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
          {/* Weekly Goals Progress */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">Weekly Goals</h2>
              <span className="text-sm text-gray-500">3 days remaining</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <ProgressBar 
                  value={18} 
                  max={25} 
                  label="Interviews Scheduled" 
                  color="#4C51BF"
                />
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <ProgressBar 
                  value={7} 
                  max={10} 
                  label="Roles Filled" 
                  color="#38A169" 
                />
              </div>
              <div className="bg-white p-4 rounded-lg border">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <GamificationBadges />
          </motion.div>
          
          {/* Main Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {isLoading ? (
              // Placeholder loading state
              Array(5).fill(null).map((_, i) => (
                <div 
                  key={i} 
                  className="h-[280px] bg-gray-100 animate-pulse rounded-lg"
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
          
          {/* Secondary Metrics can be added here */}
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
    </div>
  );
};

export default HRDashboardPage;
