
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, User } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  interviewer: string;
  role: string;
  status: 'scheduled' | 'confirmed' | 'pending';
}

interface UpcomingInterviewsProps {
  data: Interview[];
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ data }) => {
  const mockInterviews: Interview[] = [
    {
      id: '1',
      candidateName: 'John D.',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'video',
      interviewer: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      status: 'confirmed'
    },
    {
      id: '2',
      candidateName: 'Jane S.',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'phone',
      interviewer: 'Mike Chen',
      role: 'Product Manager',
      status: 'scheduled'
    },
    {
      id: '3',
      candidateName: 'Alex R.',
      date: '2024-01-16',
      time: '11:30 AM',
      type: 'video',
      interviewer: 'Emily Davis',
      role: 'UX Designer',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Clock className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInterviews.map((interview) => (
          <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{interview.candidateName}</h4>
                <p className="text-sm text-gray-600">{interview.role}</p>
              </div>
              <Badge className={getStatusColor(interview.status)}>
                {interview.status}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {interview.date} at {interview.time}
              </div>
              <div className="flex items-center gap-2">
                {getTypeIcon(interview.type)}
                {interview.type} with {interview.interviewer}
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">
                Reschedule
              </Button>
              <Button variant="default" size="sm" className="flex-1">
                Join/Review
              </Button>
            </div>
          </div>
        ))}
        
        {mockInterviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No upcoming interviews scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
