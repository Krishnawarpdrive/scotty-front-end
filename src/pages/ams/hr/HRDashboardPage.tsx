
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Download } from 'lucide-react';
import { MetricCard } from './components/dashboard/MetricCard';
import { EnhancedFilters } from './components/dashboard/EnhancedFilters';
import { MetricDetailsDrawer } from './components/dashboard/MetricDetailsDrawer';
import { RecentActivityPanel } from './components/dashboard/RecentActivityPanel';
import { CandidatePipelineChart } from './components/dashboard/CandidatePipelineChart';
import { SecondaryMetrics } from './components/dashboard/SecondaryMetrics';
import { PipelineDetailSidebar } from './components/dashboard/PipelineDetailSidebar';
import { PersonDetailDrawer } from './components/dashboard/PersonDetailDrawer';
import { RoleDetailDrawer } from './components/dashboard/RoleDetailDrawer';
import { WeeklyGoalsSection } from './components/dashboard/WeeklyGoalsSection';
import { AdvancedFiltersDrawer } from './components/dashboard/AdvancedFiltersDrawer';
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
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<{
    stage: string;
    data: any;
  } | null>(null);
  const [personDrawerOpen, setPersonDrawerOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [roleDrawerOpen, setRoleDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  
  const {
    metrics,
    isLoading
  } = useDashboardData(dateRange, taFilter, roleFilter, clientFilter);
  
  const {
    dateRangeOptions,
    taOptions,
    roleOptions,
    clientOptions
  } = useFilterOptions();
  
  const handleShowDetails = (metric: MetricData) => {
    setCurrentMetric(metric);
    setDetailsDrawerOpen(true);
  };
  
  const handlePipelineStageClick = (stage: string, data: any) => {
    setSelectedPipelineStage({
      stage,
      data
    });
    setPipelineDrawerOpen(true);
  };
  
  const handlePersonClick = (person: string) => {
    setSelectedPerson(person);
    setPersonDrawerOpen(true);
  };
  
  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    setRoleDrawerOpen(true);
  };
  
  const handleAdvancedFiltersApply = (filters: any) => {
    console.log('Advanced filters applied:', filters);
    // Apply filters to dashboard data
  };
  
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header with improved spacing and typography */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="page-title text-slate-900">Hiring Analytics Dashboard</h1>
            <p className="text-slate-500 text-sm">Track and optimize your recruitment performance</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="default" className="flex items-center gap-2" onClick={() => setAdvancedFiltersOpen(true)}>
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button size="default" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Filters with better spacing */}
      <div className="bg-white border-b border-slate-200 px-8 py-4">
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
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto space-y-8">
          {/* Candidate Pipeline Overview with improved spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="card"
          >
            <CandidatePipelineChart onStageClick={handlePipelineStageClick} />
          </motion.div>
          
          {/* Weekly Goals Progress */}
          <WeeklyGoalsSection className="card" />
          
          {/* Primary Metrics with improved grid and spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="section-heading">Primary Hiring Metrics</h2>
              <p className="text-slate-500 text-sm">Key performance indicators for your hiring process</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array(5).fill(null).map((_, i) => (
                  <div key={i} className="h-[240px] bg-white animate-pulse rounded-xl border border-slate-200"></div>
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
        </div>
        
        {/* Activity Feed Sidebar with improved styling */}
        <div className="hidden lg:block border-l border-slate-200">
          <RecentActivityPanel 
            collapsed={activityPanelCollapsed} 
            onToggle={() => setActivityPanelCollapsed(!activityPanelCollapsed)} 
            onPersonClick={handlePersonClick} 
            onRoleClick={handleRoleClick} 
          />
        </div>
      </div>
      
      {/* Drawers */}
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

      <PersonDetailDrawer 
        open={personDrawerOpen} 
        onOpenChange={setPersonDrawerOpen} 
        personName={selectedPerson} 
      />

      <RoleDetailDrawer 
        open={roleDrawerOpen} 
        onOpenChange={setRoleDrawerOpen} 
        roleName={selectedRole} 
      />

      <AdvancedFiltersDrawer 
        open={advancedFiltersOpen} 
        onOpenChange={setAdvancedFiltersOpen} 
        onFiltersApply={handleAdvancedFiltersApply} 
      />
    </div>
  );
};

export default HRDashboardPage;
