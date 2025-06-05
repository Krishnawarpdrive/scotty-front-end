
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  Building, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react';
import { ApplicationTable } from './components/ApplicationTable';
import { CandidateDashboard } from './components/CandidateDashboard';

const TAMissionControlPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('candidates');

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalCandidates: 156,
    activeRequirements: 23,
    interviewsThisWeek: 12,
    offersPending: 5,
    placementsThisMonth: 8,
    targetAchievement: 78
  };

  const quickStats = [
    {
      title: 'Active Candidates',
      value: '89',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Open Requirements',
      value: '23',
      change: '+3',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Interviews Scheduled',
      value: '12',
      change: 'This week',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Target Achievement',
      value: '78%',
      change: '+5%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TA Mission Control</h1>
            <p className="text-gray-600 mt-1">
              Your centralized hub for talent acquisition activities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="candidates" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Candidates</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Requirements</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <CandidateDashboard />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationTable />
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requirements Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Requirements Dashboard
                  </h3>
                  <p className="text-gray-500">
                    Manage all your open requirements and hiring needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Client Dashboard
                  </h3>
                  <p className="text-gray-500">
                    View and manage all your client relationships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Interview Calendar
                  </h3>
                  <p className="text-gray-500">
                    Schedule and manage all interviews across your pipeline.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-500">
                    Track your performance metrics and hiring analytics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TAMissionControlPage;
