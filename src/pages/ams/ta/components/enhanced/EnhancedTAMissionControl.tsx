
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedCandidateTable } from './EnhancedCandidateTable';
import { ApplicationStages } from '../ApplicationStages';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  BookOpen,
  UserCheck,
  Target,
  Activity
} from 'lucide-react';

interface EnhancedTAMissionControlProps {
  onCandidateSelect?: (candidate: any) => void;
}

export const EnhancedTAMissionControl: React.FC<EnhancedTAMissionControlProps> = ({
  onCandidateSelect
}) => {
  const [activeView, setActiveView] = useState('pipeline');

  // Mock data - replace with actual data
  const metrics = {
    totalCandidates: 324,
    activeInterviews: 18,
    completedToday: 12,
    pendingActions: 7,
    conversion: 78,
    avgTimeToHire: 14
  };

  const urgentActions = [
    {
      id: 1,
      type: 'interview',
      title: 'Technical Interview - Sarah Johnson',
      description: 'Scheduled for today at 2:00 PM',
      priority: 'high',
      dueIn: '2 hours'
    },
    {
      id: 2,
      type: 'aptitude',
      title: 'Aptitude Test Results Review',
      description: '5 candidates awaiting result review',
      priority: 'medium',
      dueIn: '4 hours'
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Interview Feedback Pending',
      description: '3 interviews missing feedback forms',
      priority: 'high',
      dueIn: '1 day'
    }
  ];

  const mockCandidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      current_stage: 'Technical Interview',
      source: 'LinkedIn',
      experience_years: 5,
      skills: ['React', 'TypeScript', 'Node.js'],
      current_position: 'Frontend Developer',
      current_employer: 'TechCorp',
      status: 'Active' as const,
      applied_date: '2024-01-15',
      last_updated: '2024-01-16'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      current_stage: 'Aptitude Test',
      source: 'Referral',
      experience_years: 3,
      skills: ['Python', 'Django', 'PostgreSQL'],
      current_position: 'Backend Developer',
      current_employer: 'StartupXYZ',
      status: 'Active' as const,
      applied_date: '2024-01-14',
      last_updated: '2024-01-16'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Calendar className="h-4 w-4" />;
      case 'aptitude': return <BookOpen className="h-4 w-4" />;
      case 'feedback': return <UserCheck className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">TA Mission Control</h1>
          <p className="text-gray-600">Centralized technical assessment and interview management</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalCandidates}</p>
                <p className="text-xs text-gray-600">Total Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeInterviews}</p>
                <p className="text-xs text-gray-600">Active Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.completedToday}</p>
                <p className="text-xs text-gray-600">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.pendingActions}</p>
                <p className="text-xs text-gray-600">Pending Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.conversion}%</p>
                <p className="text-xs text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.avgTimeToHire}d</p>
                <p className="text-xs text-gray-600">Avg Time to Hire</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Urgent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                Urgent Actions Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentActions.map((action) => (
                  <div key={action.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getActionIcon(action.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge className={getPriorityColor(action.priority)}>
                        Due in {action.dueIn}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Interview
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Create Aptitude Test
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Add New Candidate
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="interviews">Interview Management</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          {/* Application Stages */}
          <Card>
            <CardContent className="p-0">
              <ApplicationStages />
            </CardContent>
          </Card>

          {/* Enhanced Candidate Table */}
          <EnhancedCandidateTable
            candidates={mockCandidates}
            onViewProfile={onCandidateSelect}
            onEditCandidate={(candidate) => console.log('Edit candidate:', candidate)}
            onScheduleInterview={(candidate) => console.log('Schedule interview:', candidate)}
            onMoveToStage={(candidates, stage) => console.log('Move to stage:', candidates, stage)}
            onExportCandidates={(candidates) => console.log('Export candidates:', candidates)}
          />
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Interview scheduling and management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aptitude" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aptitude Test Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aptitude test creation and management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
