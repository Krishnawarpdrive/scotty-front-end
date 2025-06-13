
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Video,
  MapPin,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TodaysInterviews } from './TodaysInterviews';
import { UpcomingInterviews } from './UpcomingInterviews';
import { InterviewMetrics } from './InterviewMetrics';
import { RecentFeedback } from './RecentFeedback';

export const InterviewDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      title: 'Today\'s Interviews',
      value: '8',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'This Week',
      value: '24',
      change: '+15% from last week',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Pending Feedback',
      value: '6',
      change: '3 overdue',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      title: 'Available Panelists',
      value: '12',
      change: '8 active today',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track all interview activities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today's Interviews</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <TodaysInterviews searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <UpcomingInterviews searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <InterviewMetrics />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <RecentFeedback searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
