
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Video
} from 'lucide-react';

export const CompactInterviewDashboard: React.FC = () => {
  const todaysInterviews = [
    {
      id: '1',
      candidateName: 'John Smith',
      role: 'Senior Developer',
      time: '10:00 AM',
      panelist: 'Sarah Johnson',
      status: 'upcoming'
    },
    {
      id: '2',
      candidateName: 'Emily Davis',
      role: 'Product Manager',
      time: '2:00 PM',
      panelist: 'Mike Chen',
      status: 'upcoming'
    },
    {
      id: '3',
      candidateName: 'Alex Wilson',
      role: 'UX Designer',
      time: '4:00 PM',
      panelist: 'Lisa Rodriguez',
      status: 'completed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Video className="h-5 w-5 text-blue-600" />
          Today's Interviews
          <Badge variant="outline" className="ml-auto">
            {todaysInterviews.length} scheduled
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todaysInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(interview.status)}
              <div>
                <div className="font-medium text-sm">{interview.candidateName}</div>
                <div className="text-xs text-gray-600">
                  {interview.role} • with {interview.panelist}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{interview.time}</span>
              <Badge className={getStatusColor(interview.status)}>
                {interview.status}
              </Badge>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
