
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  Video
} from 'lucide-react';

interface InterviewsScheduleProps {
  // Remove unused dashboardData prop
}

export const InterviewsSchedule: React.FC<InterviewsScheduleProps> = () => {
  const mockInterviews = [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'Technical',
      interviewer: 'John Smith',
      mode: 'Video Call'
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'DataFlow Systems',
      date: '2024-01-28',
      time: '10:00 AM',
      type: 'HR Round',
      interviewer: 'Sarah Johnson',
      mode: 'Phone'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockInterviews.length > 0 ? (
          <div className="space-y-4">
            {mockInterviews.map((interview) => (
              <div key={interview.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{interview.role}</h3>
                    <p className="text-sm text-gray-600">{interview.company}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        {interview.mode}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      Interviewer: {interview.interviewer}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline">{interview.type}</Badge>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No upcoming interviews</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
