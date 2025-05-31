
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Mail, 
  CheckCircle,
  AlertCircle,
  Edit
} from 'lucide-react';

interface SchedulingData {
  type: 'internal' | 'external';
  date: string;
  time: string;
  interviewer?: string;
  candidateEmail?: string;
  meetingLink?: string;
  duration: string;
  notes?: string;
}

interface EnhancedInterviewStatusProps {
  status: 'not-scheduled' | 'scheduled' | 'completed';
  schedule?: SchedulingData;
  onEdit?: () => void;
  onMarkCompleted?: () => void;
}

export const EnhancedInterviewStatus: React.FC<EnhancedInterviewStatusProps> = ({
  status,
  schedule,
  onEdit,
  onMarkCompleted
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'not-scheduled':
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: 'Not Scheduled'
        };
      case 'scheduled':
        return {
          icon: Calendar,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Scheduled'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Completed'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  if (status === 'not-scheduled') {
    return (
      <Card className={`${config.borderColor} ${config.bgColor}`}>
        <CardContent className="p-4 text-center">
          <Icon className={`h-8 w-8 ${config.color} mx-auto mb-2`} />
          <p className="text-sm text-gray-600">Interview not scheduled yet</p>
        </CardContent>
      </Card>
    );
  }

  if (!schedule) return null;

  return (
    <Card className={`${config.borderColor} ${config.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-2 text-sm ${config.color}`}>
            <Icon className="h-4 w-4" />
            Interview {config.title}
          </CardTitle>
          <div className="flex gap-2">
            {status === 'scheduled' && (
              <>
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={onMarkCompleted}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mark Complete
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schedule.type === 'internal' ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{schedule.date} at {schedule.time}</span>
              </div>
              {schedule.interviewer && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-green-600" />
                  <span>{schedule.interviewer}</span>
                </div>
              )}
              {schedule.meetingLink && (
                <div className="flex items-center gap-2 text-sm">
                  <Video className="h-4 w-4 text-purple-600" />
                  <a 
                    href={schedule.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>External scheduling initiated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-green-600" />
                <span>{schedule.duration} minutes</span>
              </div>
              {schedule.candidateEmail && (
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>Sent to: {schedule.candidateEmail}</span>
                </div>
              )}
            </>
          )}
        </div>
        
        {schedule.notes && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Notes:</strong> {schedule.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
