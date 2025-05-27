
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardSummaryCards } from './client-dashboard/components/DashboardSummaryCards';
import { HiringProgressOverview } from './client-dashboard/components/HiringProgressOverview';
import { CandidatePoolSection } from './client-dashboard/components/CandidatePoolSection';
import { OffersCompensationSummary } from './client-dashboard/components/OffersCompensationSummary';
import { DocumentComplianceStatus } from './client-dashboard/components/DocumentComplianceStatus';
import { RecentActivityFeed } from './client-dashboard/components/RecentActivityFeed';
import { AlertsNotificationsPanel } from './client-dashboard/components/AlertsNotificationsPanel';
import { BudgetBillingSnapshot } from './client-dashboard/components/BudgetBillingSnapshot';
import { DashboardHeader } from './client-dashboard/components/DashboardHeader';
import { RoleTimelineVisualization } from './client-dashboard/components/RoleTimelineVisualization';
import { InterviewsOffersSidebar } from './client-dashboard/components/InterviewsOffersSidebar';
import { TeamActivityPanel } from './client-dashboard/components/TeamActivityPanel';
import { useDashboardData } from './client-dashboard/hooks/useDashboardData';

// Mock data for new components
const mockRoles = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active' as const,
    progress: 75,
    totalPositions: 3,
    filledPositions: 2,
    candidatesInPipeline: 8,
    targetDate: 'Feb 15',
    daysRemaining: 21,
    stages: {
      applied: 15,
      screening: 8,
      interview: 5,
      offer: 2,
      hired: 2
    }
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    status: 'Active' as const,
    progress: 90,
    totalPositions: 1,
    filledPositions: 0,
    candidatesInPipeline: 3,
    targetDate: 'Jan 30',
    daysRemaining: 7,
    stages: {
      applied: 8,
      screening: 3,
      interview: 2,
      offer: 1,
      hired: 0
    }
  }
];

const mockInterviews = [
  {
    id: '1',
    candidateName: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    date: '2024-01-25',
    time: '10:00 AM',
    type: 'video' as const,
    interviewer: 'John Smith',
    status: 'scheduled' as const
  },
  {
    id: '2',
    candidateName: 'Mike Chen',
    role: 'Product Manager',
    date: '2024-01-26',
    time: '2:00 PM',
    type: 'phone' as const,
    interviewer: 'Emily Davis',
    status: 'scheduled' as const
  }
];

const mockOffers = [
  {
    id: '1',
    candidateName: 'Alex Wilson',
    role: 'Senior Software Engineer',
    status: 'pending' as const,
    amount: '$120,000',
    date: '2024-01-20',
    expiryDate: '2024-01-27'
  }
];

const mockTeamMembers = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Technical Lead',
    status: 'online' as const,
    activeRoles: 2,
    completedInterviews: 15
  },
  {
    id: '2',
    name: 'Emily Davis',
    role: 'HR Manager',
    status: 'busy' as const,
    activeRoles: 3,
    completedInterviews: 22
  },
  {
    id: '3',
    name: 'Tom Wilson',
    role: 'Recruiter',
    status: 'online' as const,
    activeRoles: 4,
    completedInterviews: 18
  }
];

const mockActivities = [
  {
    id: '1',
    type: 'offer' as const,
    user: { name: 'Emily Davis', role: 'HR Manager' },
    action: 'extended offer to',
    target: 'Alex Wilson',
    timestamp: '2 hours ago',
    details: 'Senior Software Engineer position'
  },
  {
    id: '2',
    type: 'interview' as const,
    user: { name: 'John Smith', role: 'Technical Lead' },
    action: 'completed interview with',
    target: 'Sarah Johnson',
    timestamp: '4 hours ago',
    details: 'Technical round - positive feedback'
  },
  {
    id: '3',
    type: 'application' as const,
    user: { name: 'Tom Wilson', role: 'Recruiter' },
    action: 'reviewed application from',
    target: 'Lisa Rodriguez',
    timestamp: '6 hours ago',
    details: 'UX Designer position'
  }
];

const ClientDashboardPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30');
  const { dashboardData, isLoading } = useDashboardData(dateRange);

  const handleRoleClick = (role: any) => {
    setSelectedRole(role.id);
    console.log('Role clicked:', role);
  };

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
      
      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Dashboard Summary Cards */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardSummaryCards data={dashboardData.summaryCards} />
            </motion.section>

            {/* Role Timeline Visualization */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <RoleTimelineVisualization 
                roles={mockRoles}
                onRoleClick={handleRoleClick}
              />
            </motion.section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Hiring Progress Overview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <HiringProgressOverview 
                    data={dashboardData.hiringProgress}
                    onRoleSelect={setSelectedRole}
                  />
                </motion.section>

                {/* Candidate Pool Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CandidatePoolSection data={dashboardData.candidatePool} />
                </motion.section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Alerts & Notifications Panel */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <AlertsNotificationsPanel data={dashboardData.alerts} />
                </motion.section>

                {/* Team Activity Panel */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TeamActivityPanel 
                    activities={mockActivities}
                    teamMembers={mockTeamMembers}
                  />
                </motion.section>

                {/* Document & Compliance Status */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <DocumentComplianceStatus data={dashboardData.documents} />
                </motion.section>
              </div>
            </div>

            {/* Secondary Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Offers & Compensation Summary */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <OffersCompensationSummary data={dashboardData.offers} />
              </motion.section>

              {/* Recent Activity Feed */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <RecentActivityFeed data={dashboardData.recentActivity} />
              </motion.section>
            </div>

            {/* Budget & Billing Snapshot */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BudgetBillingSnapshot data={dashboardData.budget} />
            </motion.section>
          </div>
        </div>

        {/* Collapsible Sidebar */}
        <InterviewsOffersSidebar 
          interviews={mockInterviews}
          offers={mockOffers}
        />
      </div>
    </div>
  );
};

export default ClientDashboardPage;
