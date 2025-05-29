
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExecutiveDashboardHeader } from './components/ExecutiveDashboardHeader';
import { ExecutiveKPICards } from './components/ExecutiveKPICards';
import { ExecutiveFilters } from './components/ExecutiveFilters';
import { CompanyPerformanceChart } from './components/CompanyPerformanceChart';
import { HiringTrendsChart } from './components/HiringTrendsChart';
import { DepartmentBreakdown } from './components/DepartmentBreakdown';
import { HiringProcessPentagon } from './components/HiringProcessPentagon';
import { TAPerformanceMetrics } from './components/TAPerformanceMetrics';
import { ClientWiseHiringBreakdown } from './components/ClientWiseHiringBreakdown';
import { ExecutiveNotificationSidebar } from './components/ExecutiveNotificationSidebar';
import { useExecutiveDashboardData } from './hooks/useExecutiveDashboardData';

const ExecutiveDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('90');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  const {
    kpiData,
    performanceData,
    hiringTrends,
    departmentData,
    pentagonData,
    taPerformanceData,
    clientHiringData,
    isLoading
  } = useExecutiveDashboardData({
    dateRange,
    departmentFilter,
    regionFilter
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ExecutiveDashboardHeader 
        onNotificationsToggle={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
        notificationsOpen={notificationsPanelOpen}
      />
      
      <div className="flex">
        <div className="flex-1 p-6 space-y-6">
          <ExecutiveFilters
            dateRange={dateRange}
            departmentFilter={departmentFilter}
            regionFilter={regionFilter}
            onDateRangeChange={setDateRange}
            onDepartmentChange={setDepartmentFilter}
            onRegionChange={setRegionFilter}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExecutiveKPICards data={kpiData} isLoading={isLoading} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CompanyPerformanceChart data={performanceData} isLoading={isLoading} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <HiringTrendsChart data={hiringTrends} isLoading={isLoading} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HiringProcessPentagon data={pentagonData} isLoading={isLoading} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TAPerformanceMetrics data={taPerformanceData} isLoading={isLoading} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ClientWiseHiringBreakdown data={clientHiringData} isLoading={isLoading} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <DepartmentBreakdown data={departmentData} isLoading={isLoading} />
          </motion.div>
        </div>

        <ExecutiveNotificationSidebar 
          open={notificationsPanelOpen}
          onClose={() => setNotificationsPanelOpen(false)}
        />
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
