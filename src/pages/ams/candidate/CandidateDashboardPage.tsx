import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Briefcase,
  Search,
} from 'lucide-react';
import { CandidateLeftSidebar } from './components/CandidateLeftSidebar';
import { CandidateQuickInsights } from './components/CandidateQuickInsights';
import { CandidateRightDrawer } from './components/CandidateRightDrawer';
import CandidateApplicationsTable from './components/CandidateApplicationsTable';
import { CandidateStageDrawer } from './components/CandidateStageDrawer';
import { CandidatePendingActions } from './components/CandidatePendingActions';
import { CandidateApplicationDetailDrawer } from './components/CandidateApplicationDetailDrawer';
import { CandidateApplicationDetailPage } from './components/CandidateApplicationDetailPage';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';
import { useCandidateApplicationDetails } from './hooks/useCandidateApplicationDetails';
import { CandidateCompanyProgressDrawer } from './components/CandidateCompanyProgressDrawer';
import { SmartActionCenter } from '@/components/smart-action-center/SmartActionCenter';
import { BellIcon, MessageSquareIcon, CalendarIcon, TrendingUpIcon } from 'lucide-react';
import { CandidateApplication } from './types/CandidateTypes';

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidateId] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [showStageDrawer, setShowStageDrawer] = useState(false);
  const [showApplicationDetailDrawer, setShowApplicationDetailDrawer] = useState(false);
  const [showApplicationDetailPage, setShowApplicationDetailPage] = useState(false);
  const [showCompanyProgressDrawer, setShowCompanyProgressDrawer] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [activeMainTab, setActiveMainTab] = useState('applications');

  const { dashboardData, isLoading } = useCandidateDashboardData(selectedCandidateId);
  const { applicationDetails, submitInterviewReview } = useCandidateApplicationDetails(selectedApplicationId);

  // Mock data for the mission control interface
  const mockApplications: CandidateApplication[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      salary: '$120,000 - $140,000',
      roleName: 'Senior Frontend Developer',
      companyName: 'TechCorp Inc',
      appliedDate: '2024-01-15',
      currentStage: 'Technical Interview',
      progress: 65,
      status: 'active' as const,
      priority: 'high' as const,
      nextAction: 'Prepare for technical interview',
      daysInStage: 3,
      hasPendingActions: true,
      alertReason: 'Interview scheduled for tomorrow',
      nextDueDate: 'Tomorrow 2:00 PM',
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'document' as const,
          completedDate: '2024-01-15',
          description: 'Your application has been successfully submitted and is under initial review.',
          documents: ['Resume', 'Cover Letter'],
          notes: 'Application received and acknowledged by HR team.'
        },
        {
          id: '2',
          name: 'Phone Screening',
          status: 'completed' as const,
          type: 'interview' as const,
          completedDate: '2024-01-18',
          description: 'Initial phone screening with HR to discuss role and basic qualifications.',
          duration: '30 minutes',
          interviewer: 'Sarah Chen (HR Manager)',
          notes: 'Positive feedback on communication skills and technical background.'
        },
        {
          id: '3',
          name: 'Technical Interview',
          status: 'current' as const,
          type: 'interview' as const,
          dueDate: 'Tomorrow',
          description: 'Technical assessment focusing on React, TypeScript, and problem-solving skills.',
          duration: '1 hour',
          interviewer: 'Mike Johnson (Lead Developer)',
          location: 'Video Call (Google Meet)',
          hasAction: true,
          actionType: 'join_interview'
        },
        {
          id: '4',
          name: 'Team Interview',
          status: 'pending' as const,
          type: 'interview' as const,
          description: 'Meet with your potential team members and discuss collaboration.',
          duration: '45 minutes'
        },
        {
          id: '5',
          name: 'Final Review',
          status: 'pending' as const,
          type: 'assessment' as const,
          description: 'Final review and decision by the hiring committee.'
        }
      ]
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      location: 'New York, NY',
      salary: '$110,000 - $130,000',
      roleName: 'Full Stack Engineer',
      companyName: 'DataFlow Systems',
      appliedDate: '2024-01-20',
      currentStage: 'Document Verification',
      progress: 30,
      status: 'active' as const,
      priority: 'medium' as const,
      daysInStage: 7,
      hasPendingActions: true,
      alertReason: 'Missing documents',
      nextDueDate: 'End of week',
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'document' as const,
          completedDate: '2024-01-20',
          description: 'Application submitted successfully.',
          documents: ['Resume']
        },
        {
          id: '2',
          name: 'Document Verification',
          status: 'current' as const,
          type: 'document' as const,
          description: 'Verification of submitted documents and credentials.',
          hasAction: true,
          actionType: 'upload_documents',
          documents: ['Portfolio', 'References'],
          notes: 'Please upload your portfolio and professional references.'
        }
      ]
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$95,000 - $115,000',
      roleName: 'React Developer',
      companyName: 'StartupXYZ',
      appliedDate: '2024-01-10',
      currentStage: 'Offer Review',
      progress: 100,
      status: 'offer' as const,
      priority: 'high' as const,
      daysInStage: 2,
      hasPendingActions: true,
      alertReason: 'Offer expires in 3 days',
      nextDueDate: 'Jan 28, 2024',
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'document' as const,
          completedDate: '2024-01-10'
        },
        {
          id: '2',
          name: 'Technical Assessment',
          status: 'completed' as const,
          type: 'assessment' as const,
          completedDate: '2024-01-15',
          description: 'Online coding assessment completed.',
          duration: '2 hours',
          notes: 'Excellent performance on React and JavaScript challenges.'
        },
        {
          id: '3',
          name: 'Final Interview',
          status: 'completed' as const,
          type: 'interview' as const,
          completedDate: '2024-01-22',
          description: 'Final interview with the founding team.',
          interviewer: 'John Doe (CTO)',
          duration: '45 minutes'
        },
        {
          id: '4',
          name: 'Offer Review',
          status: 'current' as const,
          type: 'document' as const,
          description: 'Review and respond to the job offer.',
          hasAction: true,
          actionType: 'respond_offer',
          notes: 'Competitive salary package with equity options included.'
        }
      ]
    }
  ];

  const mockPendingActions = [
    {
      id: '1',
      type: 'urgent' as const,
      applicationName: 'Senior Frontend Developer - TechCorp',
      stageName: 'Technical Interview',
      actionTitle: 'Join Technical Interview',
      description: 'Your technical interview is scheduled for tomorrow at 2:00 PM',
      dueDate: 'Tomorrow 2:00 PM',
      priority: 'high' as const,
      actionType: 'interview' as const,
      estimatedTime: '1 hour'
    },
    {
      id: '2',
      type: 'overdue' as const,
      applicationName: 'Full Stack Engineer - DataFlow',
      stageName: 'Document Verification',
      actionTitle: 'Upload Missing Documents',
      description: 'Please upload your updated resume and portfolio',
      daysOverdue: 2,
      priority: 'high' as const,
      actionType: 'document' as const,
      estimatedTime: '10 minutes'
    },
    {
      id: '3',
      type: 'urgent' as const,
      applicationName: 'React Developer - StartupXYZ',
      stageName: 'Offer Review',
      actionTitle: 'Respond to Job Offer',
      description: 'You have a job offer pending your response',
      dueDate: 'Jan 28, 2024',
      priority: 'high' as const,
      actionType: 'form' as const,
      estimatedTime: '15 minutes'
    }
  ];

  const mockStageData = {
    id: '3',
    name: 'Technical Interview',
    description: 'Technical assessment focusing on React, TypeScript, and system design',
    status: 'current' as const,
    progress: 50,
    content: [
      {
        id: '1',
        type: 'video' as const,
        title: 'Interview Preparation Video',
        description: 'Watch this 15-minute video to prepare for your technical interview',
        isRequired: false,
        isCompleted: true,
        estimatedTime: '15 minutes',
        videoUrl: '#'
      },
      {
        id: '2',
        type: 'document' as const,
        title: 'Technical Guidelines',
        description: 'Download and review the technical interview guidelines',
        isRequired: true,
        isCompleted: true,
        downloadUrl: '#',
        estimatedTime: '5 minutes'
      },
      {
        id: '3',
        type: 'interview' as const,
        title: 'Technical Interview Session',
        description: 'Live technical interview with the development team',
        isRequired: true,
        isCompleted: false,
        dueDate: 'Tomorrow 2:00 PM',
        estimatedTime: '1 hour',
        instructions: 'Make sure you have a stable internet connection and a quiet environment'
      }
    ],
    nextSteps: [
      'Complete the technical interview',
      'Wait for feedback from the interview panel',
      'Proceed to team interview if selected'
    ],
    supportContact: 'sarah.recruiter@techcorp.com'
  };

  const handleApplicationClick = (application: any) => {
    console.log('Opening application details:', application.roleName);
    setSelectedApplicationId(application.id);
    setShowApplicationDetailDrawer(true);
  };

  const handleCompanyClick = (application: any) => {
    console.log('Opening company progress:', application.companyName);
    setSelectedApplicationId(application.id);
    setShowCompanyProgressDrawer(true);
  };

  const handleQuickAction = (appId: string, action: string) => {
    console.log('Quick action:', action, 'for application:', appId);
    if (action === 'continue') {
      setSelectedStage(mockStageData);
      setShowStageDrawer(true);
    }
  };

  const handlePendingActionClick = (action: any) => {
    console.log('Pending action clicked:', action);
    setSelectedStage(mockStageData);
    setShowStageDrawer(true);
  };

  const handleContentAction = (contentId: string, action: string) => {
    console.log('Content action:', action, 'for content:', contentId);
  };

  const handleStageComplete = () => {
    console.log('Stage completed');
    setShowStageDrawer(false);
  };

  const handleViewFullDetails = (appId: string) => {
    setShowApplicationDetailDrawer(false);
    setShowApplicationDetailPage(true);
  };

  const handleBackFromDetailPage = () => {
    setShowApplicationDetailPage(false);
    setSelectedApplicationId(null);
  };

  const urgentActionsCount = mockPendingActions.filter(a => a.type === 'urgent' || a.type === 'overdue').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading your mission control...</div>
      </div>
    );
  }

  // Show detail page if selected
  if (showApplicationDetailPage && selectedApplicationId) {
    return (
      <CandidateApplicationDetailPage
        applicationId={selectedApplicationId}
        onBack={handleBackFromDetailPage}
      />
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <CandidateLeftSidebar data={dashboardData} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Primary Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Candidate Mission Control</h1>
                <p className="text-gray-600">Manage all your applications and tasks in one place</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Quick Search
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BellIcon className="h-4 w-4" />
                  {urgentActionsCount > 0 && (
                    <Badge className="bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">
                      {urgentActionsCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRightDrawer(true)}
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Main Tabs Navigation */}
          <div className="bg-white border-b border-gray-200 px-6">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
              <TabsList className="h-12 bg-transparent border-none p-0">
                <TabsTrigger 
                  value="applications" 
                  className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  My Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
                >
                  <TrendingUpIcon className="h-4 w-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar" 
                  className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger 
                  value="messages" 
                  className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
                >
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
              <TabsContent value="applications" className="p-6 m-0">
                <CandidateApplicationsTable
                  applications={mockApplications}
                  onApplicationClick={handleApplicationClick}
                  onCompanyClick={handleCompanyClick}
                  onQuickAction={handleQuickAction}
                />
              </TabsContent>

              <TabsContent value="insights" className="p-6 m-0">
                <CandidateQuickInsights 
                  insights={[]} 
                  overallStats={dashboardData?.quickStats || {
                    responseRate: 0,
                    averageProgressTime: '0d',
                    interviewSuccessRate: 0,
                    activeApplications: 0
                  }} 
                />
              </TabsContent>

              <TabsContent value="calendar" className="p-6 m-0">
                <Card>
                  <CardContent className="p-12 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Interview Calendar</h3>
                    <p className="text-gray-600">Your upcoming interviews and important dates will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="p-6 m-0">
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquareIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Messages & Communications</h3>
                    <p className="text-gray-600">All your communications with recruiters and hiring teams will be here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar for Pending Actions */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <CandidatePendingActions
            actions={mockPendingActions}
            onActionClick={handlePendingActionClick}
          />
        </div>
      </div>

      {/* Smart Action Center */}
      <SmartActionCenter position="bottom-right" />

      {/* Right Drawer for Analytics */}
      <CandidateRightDrawer
        open={showRightDrawer}
        onOpenChange={setShowRightDrawer}
        data={dashboardData}
      />

      {/* Stage Content Drawer */}
      <CandidateStageDrawer
        open={showStageDrawer}
        onClose={() => setShowStageDrawer(false)}
        stageData={selectedStage}
        onContentAction={handleContentAction}
        onStageComplete={handleStageComplete}
      />

      {/* Application Detail Drawer */}
      <CandidateApplicationDetailDrawer
        open={showApplicationDetailDrawer}
        onClose={() => {
          setShowApplicationDetailDrawer(false);
          setSelectedApplicationId(null);
        }}
        application={applicationDetails}
        onViewFullDetails={handleViewFullDetails}
        onSubmitReview={submitInterviewReview}
      />

      {/* Company Progress Drawer */}
      <CandidateCompanyProgressDrawer
        open={showCompanyProgressDrawer}
        onClose={() => {
          setShowCompanyProgressDrawer(false);
          setSelectedApplicationId(null);
        }}
        application={selectedApplicationId ? mockApplications.find(app => app.id === selectedApplicationId) || null : null}
      />
    </div>
  );
};

export default CandidateDashboardPage;
