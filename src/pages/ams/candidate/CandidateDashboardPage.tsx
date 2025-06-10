
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandidateMetricsCards } from './components/CandidateMetricsCards';
import { CandidateApplicationsTable } from './components/CandidateApplicationsTable';
import { ProfileCompletionWidget } from './components/ProfileCompletionWidget';
import { CandidateActivityFeed } from './components/CandidateActivityFeed';
import { NotificationsPanel } from './components/NotificationsPanel';
import { MessagesPanel } from './components/MessagesPanel';
import { InterviewsSchedule } from './components/InterviewsSchedule';
import { CandidateApplicationDetailDrawer } from './components/CandidateApplicationDetailDrawer';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';

const CandidateDashboardPage = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [applicationDetailOpen, setApplicationDetailOpen] = useState(false);

  const {
    dashboardData,
    notifications,
    messages,
    isLoading
  } = useCandidateDashboardData(candidateId || '');

  const mockApplications = [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      status: 'Interview',
      appliedDate: '2024-01-15',
      lastUpdate: '2024-01-20',
      stage: 'Technical Interview',
      progress: 65,
      nextAction: 'Prepare for interview',
      priority: 'high' as const
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      status: 'Under Review',
      appliedDate: '2024-01-10',
      lastUpdate: '2024-01-18',
      stage: 'Document Verification',
      progress: 30,
      priority: 'medium' as const
    }
  ];

  const handleViewApplication = () => {
    setApplicationDetailOpen(true);
  };

  const handleQuickAction = (action: string, applicationData: any) => {
    console.log('Quick action:', action, 'for application:', applicationData);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading candidate dashboard...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <div className="text-center">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
            <p className="text-gray-600">Track your job applications and career progress</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <CandidateMetricsCards data={dashboardData} />

        {/* Profile Completion Widget */}
        <ProfileCompletionWidget 
          completionPercentage={dashboardData.profileCompletion}
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CandidateApplicationsTable
                      applications={mockApplications}
                      onViewApplication={handleViewApplication}
                      onQuickAction={handleQuickAction}
                    />
                  </CardContent>
                </Card>

                {/* Upcoming Interviews */}
                <InterviewsSchedule candidateId={candidateId || ''} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Notifications */}
                <NotificationsPanel notifications={notifications} />
                
                {/* Messages */}
                <MessagesPanel messages={messages} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <CandidateApplicationsTable
                  applications={mockApplications}
                  onViewApplication={handleViewApplication}
                  onQuickAction={handleQuickAction}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews">
            <InterviewsSchedule candidateId={candidateId || ''} />
          </TabsContent>

          <TabsContent value="activity">
            <CandidateActivityFeed activities={dashboardData.recentActivities} />
          </TabsContent>
        </Tabs>

        {/* Application Detail Drawer */}
        <CandidateApplicationDetailDrawer
          open={applicationDetailOpen}
          onOpenChange={setApplicationDetailOpen}
          application={mockApplications[0]}
        />
      </div>
    </div>
  );
};

export default CandidateDashboardPage;
