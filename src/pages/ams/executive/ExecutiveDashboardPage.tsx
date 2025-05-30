
import React, { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExecutiveDashboardHeader } from './components/ExecutiveDashboardHeader';
import { EnhancedExecutiveKPICards } from './components/EnhancedExecutiveKPICards';
import { ExecutiveFilters } from './components/ExecutiveFilters';
import { CompanyPerformanceChart } from './components/CompanyPerformanceChart';
import { HiringTrendsChart } from './components/HiringTrendsChart';
import { DepartmentBreakdown } from './components/DepartmentBreakdown';
import { HiringProcessPentagon } from './components/HiringProcessPentagon';
import { TAPerformanceMetrics } from './components/TAPerformanceMetrics';
import { ClientWiseHiringBreakdown } from './components/ClientWiseHiringBreakdown';
import { ExecutiveNotificationSidebar } from './components/ExecutiveNotificationSidebar';
import { ExecutiveDetailDrawer } from './components/ExecutiveDetailDrawer';
import { useExecutiveDashboardData } from './hooks/useExecutiveDashboardData';

const ExecutiveDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('90');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [drawerData, setDrawerData] = useState<any>(null);

  const filters = useMemo(() => ({
    dateRange,
    departmentFilter,
    regionFilter
  }), [dateRange, departmentFilter, regionFilter]);

  const {
    kpiData,
    performanceData,
    hiringTrends,
    departmentData,
    pentagonData,
    taPerformanceData,
    clientHiringData,
    isLoading
  } = useExecutiveDashboardData(filters);

  const handleCardClick = useCallback((cardType: string, data: any) => {
    setDrawerType(cardType);
    setDrawerData(data);
    setDetailDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDetailDrawerOpen(false);
    setDrawerType(null);
    setDrawerData(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <ExecutiveDashboardHeader 
        onNotificationsToggle={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
        notificationsOpen={notificationsPanelOpen}
      />
      
      <div className="flex">
        <motion.div 
          className="flex-1 p-6 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={sectionVariants}>
            <ExecutiveFilters
              dateRange={dateRange}
              departmentFilter={departmentFilter}
              regionFilter={regionFilter}
              onDateRangeChange={setDateRange}
              onDepartmentChange={setDepartmentFilter}
              onRegionChange={setRegionFilter}
            />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <EnhancedExecutiveKPICards 
              data={kpiData} 
              isLoading={isLoading}
              onCardClick={handleCardClick}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <CompanyPerformanceChart data={performanceData} isLoading={isLoading} />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <HiringTrendsChart data={hiringTrends} isLoading={isLoading} />
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <HiringProcessPentagon data={pentagonData} isLoading={isLoading} />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <TAPerformanceMetrics data={taPerformanceData} isLoading={isLoading} />
            </motion.div>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <ClientWiseHiringBreakdown data={clientHiringData} isLoading={isLoading} />
            </motion.div>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <DepartmentBreakdown data={departmentData} isLoading={isLoading} />
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {notificationsPanelOpen && (
            <ExecutiveNotificationSidebar 
              open={notificationsPanelOpen}
              onClose={() => setNotificationsPanelOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <ExecutiveDetailDrawer
        open={detailDrawerOpen}
        onClose={handleCloseDrawer}
        drawerType={drawerType}
        drawerData={drawerData}
      />
    </div>
  );
};

export default ExecutiveDashboardPage;
