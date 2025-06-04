
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Settings, 
  User, 
  Briefcase,
  TrendingUp,
  Bell,
  Search,
  Calendar,
  MessageSquare,
  Target
} from 'lucide-react';
import { CandidateLeftSidebar } from './components/CandidateLeftSidebar';
import { CandidateRolesTabs } from './components/CandidateRolesTabs';
import { CandidateQuickInsights } from './components/CandidateQuickInsights';
import { CandidateRightDrawer } from './components/CandidateRightDrawer';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidateId] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('journey');
  const { dashboardData, notifications, messages, isLoading } = useCandidateDashboardData(selectedCandidateId);

  // Mock data for the new journey-driven experience
  const mockApplications = [
    {
      id: '1',
      roleName: 'Senior Frontend Developer',
      companyName: 'TechCorp Inc',
      location: 'San Francisco, CA',
      appliedDate: '5 days ago',
      currentStage: 'Technical Interview',
      progress: 65,
      status: 'active' as const,
      priority: 'high' as const,
      nextAction: 'Prepare for technical interview',
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'application' as const,
          date: '5 days ago',
          description: 'Your application has been successfully submitted and reviewed by the hiring team.',
        },
        {
          id: '2',
          name: 'Phone Screening',
          status: 'completed' as const,
          type: 'screening' as const,
          date: '3 days ago',
          description: 'Completed initial phone screening with HR.',
          feedback: 'Great communication skills and enthusiasm for the role.',
        },
        {
          id: '3',
          name: 'Technical Interview',
          status: 'current' as const,
          type: 'interview' as const,
          date: 'Tomorrow at 2:00 PM',
          description: 'Technical interview focusing on React, TypeScript, and system design.',
          nextAction: 'Review technical concepts and prepare coding examples',
          documents: ['Updated Resume', 'Portfolio Projects'],
        },
        {
          id: '4',
          name: 'Team Interview',
          status: 'upcoming' as const,
          type: 'interview' as const,
          description: 'Meet with the development team and discuss collaboration.',
        },
        {
          id: '5',
          name: 'Final Decision',
          status: 'upcoming' as const,
          type: 'offer' as const,
          description: 'Final decision and potential offer discussion.',
        },
      ],
    },
    {
      id: '2',
      roleName: 'Full Stack Engineer',
      companyName: 'DataFlow Systems',
      location: 'Remote',
      appliedDate: '1 week ago',
      currentStage: 'Waiting for Response',
      progress: 30,
      status: 'active' as const,
      priority: 'medium' as const,
      nextAction: 'Follow up on application status',
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'application' as const,
          date: '1 week ago',
          description: 'Application submitted through company portal.',
        },
        {
          id: '2',
          name: 'Application Review',
          status: 'current' as const,
          type: 'screening' as const,
          description: 'Your application is being reviewed by the hiring team.',
          nextAction: 'Wait for initial screening call',
        },
      ],
    },
    {
      id: '3',
      roleName: 'React Developer',
      companyName: 'StartupXYZ',
      location: 'New York, NY',
      appliedDate: '2 weeks ago',
      currentStage: 'Offer Received',
      progress: 100,
      status: 'offer' as const,
      priority: 'high' as const,
      stages: [
        {
          id: '1',
          name: 'Application Submitted',
          status: 'completed' as const,
          type: 'application' as const,
          date: '2 weeks ago',
        },
        {
          id: '2',
          name: 'Technical Assessment',
          status: 'completed' as const,
          type: 'assessment' as const,
          date: '10 days ago',
          feedback: 'Excellent problem-solving skills and clean code.',
        },
        {
          id: '3',
          name: 'Team Interview',
          status: 'completed' as const,
          type: 'interview' as const,
          date: '5 days ago',
          feedback: 'Great cultural fit and technical expertise.',
        },
        {
          id: '4',
          name: 'Offer Extended',
          status: 'completed' as const,
          type: 'offer' as const,
          date: '2 days ago',
          description: 'Competitive offer with equity package.',
        },
      ],
    },
  ];

  const mockInsights = [
    {
      id: '1',
      type: 'achievement' as const,
      title: 'Great Progress!',
      value: '3',
      description: 'You have 3 active applications in advanced stages.',
      priority: 'medium' as const,
    },
    {
      id: '2',
      type: 'alert' as const,
      title: 'Interview Tomorrow',
      description: 'Technical interview with TechCorp at 2:00 PM. Make sure to prepare!',
      action: 'View Preparation Tips',
      priority: 'high' as const,
    },
    {
      id: '3',
      type: 'tip' as const,
      title: 'Profile Optimization',
      description: 'Adding Docker and Kubernetes skills could increase your match rate by 15%.',
      action: 'Update Skills',
      priority: 'low' as const,
    },
    {
      id: '4',
      type: 'metric' as const,
      title: 'Response Rate',
      value: '85%',
      description: 'Your response rate is above average. Keep up the great work!',
      trend: 'up' as const,
    },
  ];

  const mockStats = {
    responseRate: 85,
    averageProgressTime: '2.4d',
    interviewSuccessRate: 78,
    activeApplications: 3,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading your journey...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Always Visible */}
      <CandidateLeftSidebar data={dashboardData} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Career Journey</h1>
              <p className="text-gray-600">Track your progress across all applications and opportunities</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Quick Search
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <Badge className="bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">
                  2
                </Badge>
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRightDrawer(true)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Tabs Navigation */}
        <div className="bg-white border-b border-gray-200 px-6">
          <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
            <TabsList className="h-12 bg-transparent border-none p-0">
              <TabsTrigger 
                value="journey" 
                className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                My Journey
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                className="h-12 px-6 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeMainTab} onValueChange={setActiveMainTab}>
            <TabsContent value="journey" className="p-6 m-0">
              <CandidateRolesTabs applications={mockApplications} />
            </TabsContent>

            <TabsContent value="insights" className="p-6 m-0">
              <CandidateQuickInsights insights={mockInsights} overallStats={mockStats} />
            </TabsContent>

            <TabsContent value="calendar" className="p-6 m-0">
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Interview Calendar</h3>
                  <p className="text-gray-600">Your upcoming interviews and important dates will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="p-6 m-0">
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Messages & Communications</h3>
                  <p className="text-gray-600">All your communications with recruiters and hiring teams will be here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar Drawer */}
      <CandidateRightDrawer
        open={showRightDrawer}
        onOpenChange={setShowRightDrawer}
        data={dashboardData}
      />
    </div>
  );
};

export default CandidateDashboardPage;
