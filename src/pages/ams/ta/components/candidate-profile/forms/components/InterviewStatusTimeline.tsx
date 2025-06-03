import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, CheckCircle, AlertCircle, User } from 'lucide-react';
import type { TechnicalInterviewData } from '../hooks/useTechnicalInterviewManagement';
interface InterviewStatusTimelineProps {
  status: TechnicalInterviewData['status'];
  scheduleDetails?: TechnicalInterviewData['scheduleDetails'];
  feedback?: TechnicalInterviewData['feedback'];
}
export const InterviewStatusTimeline: React.FC<InterviewStatusTimelineProps> = ({
  status,
  scheduleDetails,
  feedback
}) => {
  const timelineSteps = [{
    key: 'not-scheduled',
    title: 'Initial State',
    description: 'Interview not yet scheduled',
    icon: <Clock className="h-4 w-4" />,
    completed: status !== 'not-scheduled'
  }, {
    key: 'scheduled',
    title: 'Scheduled',
    description: scheduleDetails ? `With ${scheduleDetails.interviewerName}` : 'Interview scheduled',
    icon: <Calendar className="h-4 w-4" />,
    completed: ['scheduled', 'in-progress', 'completed'].includes(status)
  }, {
    key: 'in-progress',
    title: 'In Progress',
    description: 'Interview is ongoing',
    icon: <Video className="h-4 w-4" />,
    completed: ['in-progress', 'completed'].includes(status)
  }, {
    key: 'completed',
    title: 'Completed',
    description: feedback ? `Rating: ${feedback.overallRating}/5` : 'Interview completed',
    icon: <CheckCircle className="h-4 w-4" />,
    completed: status === 'completed'
  }];
  if (status === 'cancelled') {
    timelineSteps.push({
      key: 'cancelled',
      title: 'Cancelled',
      description: 'Interview was cancelled',
      icon: <AlertCircle className="h-4 w-4" />,
      completed: true
    });
  }
  return <Card>
      
    </Card>;
};