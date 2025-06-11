
import React, { useEffect, useState } from 'react';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { PageHeader } from '@/design-system/components/PageHeader/PageHeader';
import { MyInterviewsTable } from './components/MyInterviewsTable';
import { InterviewFilters } from './components/InterviewFilters';
import { InterviewerCandidateDetailDrawer } from './components/InterviewerCandidateDetailDrawer';
import { useMyInterviewsData } from './hooks/useMyInterviewsData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  roleName: string;
  clientName: string;
  scheduledDate: string;
  duration: number;
  interviewType: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  meetingLink?: string;
  location?: string;
  candidateId: string;
  requirementId: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  // Additional fields for drawer components
  role: string;
  client: string;
  date: string;
  time: string;
  type: string;
}

const MyInterviewsPage: React.FC = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'week',
    interviewType: 'all'
  });

  const { interviews, stats, loading, error } = useMyInterviewsData(filters);

  useEffect(() => {
    setCurrentScope('my-interviews');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  const handleInterviewClick = (interview: Interview) => {
    // Transform the interview data to match expected format
    const transformedInterview: Interview = {
      ...interview,
      role: interview.roleName,
      client: interview.clientName,
      date: interview.scheduledDate,
      time: new Date(interview.scheduledDate).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: interview.interviewType
    };
    
    setSelectedInterview(transformedInterview);
    setIsDetailOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDetailOpen(false);
    setSelectedInterview(null);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="My Interviews"
        breadcrumbs={[
          { label: 'AMS', href: '/ams/dashboard' },
          { label: 'Interviewer Portal', href: '/ams/interviewer/dashboard' },
          { label: 'My Interviews' }
        ]}
      />

      {/* Description */}
      <p className="text-gray-600 -mt-2">
        Manage your scheduled interviews and candidate evaluations
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Today's Interviews</p>
                <p className="text-2xl font-bold text-blue-600">{stats.todayCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-orange-600">{stats.weekCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <InterviewFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Interviews Table */}
      <MyInterviewsTable
        interviews={interviews}
        loading={loading}
        onInterviewClick={handleInterviewClick}
      />

      {/* Interview Detail Drawer */}
      <InterviewerCandidateDetailDrawer
        open={isDetailOpen}
        onClose={handleCloseDrawer}
        interview={selectedInterview}
      />
    </div>
  );
};

export default MyInterviewsPage;
