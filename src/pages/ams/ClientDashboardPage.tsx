
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSummaryCards } from './client-dashboard/components/DashboardSummaryCards';
import { HiringProgressOverview } from './client-dashboard/components/HiringProgressOverview';
import { UpcomingInterviews } from './client-dashboard/components/UpcomingInterviews';
import { CandidatePoolSection } from './client-dashboard/components/CandidatePoolSection';
import { OffersCompensationSummary } from './client-dashboard/components/OffersCompensationSummary';
import { DocumentComplianceStatus } from './client-dashboard/components/DocumentComplianceStatus';
import { RecentActivityFeed } from './client-dashboard/components/RecentActivityFeed';
import { AlertsNotificationsPanel } from './client-dashboard/components/AlertsNotificationsPanel';
import { BudgetBillingSnapshot } from './client-dashboard/components/BudgetBillingSnapshot';
import { QuickActionsToolbar } from './client-dashboard/components/QuickActionsToolbar';
import { DashboardHeader } from './client-dashboard/components/DashboardHeader';
import { useDashboardData } from './client-dashboard/hooks/useDashboardData';

const ClientDashboardPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30');
  const { dashboardData, isLoading } = useDashboardData(dateRange);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader dateRange={dateRange} onDateRangeChange={setDateRange} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Dashboard Summary Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardSummaryCards data={dashboardData.summaryCards} />
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hiring Progress Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <HiringProgressOverview 
                data={dashboardData.hiringProgress}
                onRoleSelect={setSelectedRole}
              />
            </motion.section>

            {/* Candidate Pool & Feedback Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CandidatePoolSection data={dashboardData.candidatePool} />
            </motion.section>

            {/* Offers & Compensation Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <OffersCompensationSummary data={dashboardData.offers} />
            </motion.section>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            {/* Upcoming Interview Schedule */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <UpcomingInterviews data={dashboardData.upcomingInterviews} />
            </motion.section>

            {/* Alerts & Notifications Panel */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertsNotificationsPanel data={dashboardData.alerts} />
            </motion.section>

            {/* Document & Compliance Status */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <DocumentComplianceStatus data={dashboardData.documents} />
            </motion.section>

            {/* Recent Activity Feed */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RecentActivityFeed data={dashboardData.recentActivity} />
            </motion.section>
          </div>
        </div>

        {/* Budget & Billing Snapshot */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <BudgetBillingSnapshot data={dashboardData.budget} />
        </motion.section>
      </div>

      {/* Quick Actions Toolbar */}
      <QuickActionsToolbar />
    </div>
  );
};

export default ClientDashboardPage;
