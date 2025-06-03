
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  AlertCircle,
  User 
} from 'lucide-react';
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
  const timelineSteps = [
    {
      key: 'not-scheduled',
      title: 'Initial State',
      description: 'Interview not yet scheduled',
      icon: <Clock className="h-4 w-4" />,
      completed: status !== 'not-scheduled'
    },
    {
      key: 'scheduled',
      title: 'Scheduled',
      description: scheduleDetails ? `With ${scheduleDetails.interviewerName}` : 'Interview scheduled',
      icon: <Calendar className="h-4 w-4" />,
      completed: ['scheduled', 'in-progress', 'completed'].includes(status)
    },
    {
      key: 'in-progress',
      title: 'In Progress',
      description: 'Interview is ongoing',
      icon: <Video className="h-4 w-4" />,
      completed: ['in-progress', 'completed'].includes(status)
    },
    {
      key: 'completed',
      title: 'Completed',
      description: feedback ? `Rating: ${feedback.overallRating}/5` : 'Interview completed',
      icon: <CheckCircle className="h-4 w-4" />,
      completed: status === 'completed'
    }
  ];

  if (status === 'cancelled') {
    timelineSteps.push({
      key: 'cancelled',
      title: 'Cancelled',
      description: 'Interview was cancelled',
      icon: <AlertCircle className="h-4 w-4" />,
      completed: true
    });
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Interview Progress</h3>
        <div className="space-y-4">
          {timelineSteps.map((step, index) => (
            <div key={step.key} className="flex items-start gap-4">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2
                ${step.completed 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
                }
                ${status === step.key ? 'ring-4 ring-blue-100' : ''}
              `}>
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h4>
                  {status === step.key && (
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                
                {/* Additional details for specific steps */}
                {step.key === 'scheduled' && scheduleDetails && (
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <div>📅 {new Date(scheduleDetails.scheduledDate).toLocaleDateString()}</div>
                    <div>⏰ {new Date(scheduleDetails.scheduledDate).toLocaleTimeString()}</div>
                    <div>⏱️ {scheduleDetails.duration} minutes</div>
                  </div>
                )}
                
                {step.key === 'completed' && feedback && (
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <div>📊 Overall Rating: {feedback.overallRating}/5</div>
                    <div>💡 Recommendation: {feedback.recommendation}</div>
                    <div>👤 By: {feedback.submittedBy}</div>
                  </div>
                )}
              </div>
              
              {/* Connecting line */}
              {index < timelineSteps.length - 1 && (
                <div className={`
                  w-0.5 h-8 ml-4 -mb-4
                  ${step.completed ? 'bg-blue-200' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
