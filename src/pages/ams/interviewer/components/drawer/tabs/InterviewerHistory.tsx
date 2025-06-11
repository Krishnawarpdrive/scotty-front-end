
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Phone,
  Video
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerHistoryProps {
  interview: Interview;
}

interface HistoryEvent {
  id: string;
  type: 'scheduled' | 'completed' | 'rescheduled' | 'cancelled' | 'feedback' | 'note';
  title: string;
  description: string;
  timestamp: string;
  author: string;
  metadata?: {
    rating?: number;
    status?: string;
    previousDate?: string;
    newDate?: string;
  };
}

export const InterviewerHistory: React.FC<InterviewerHistoryProps> = ({
  interview
}) => {
  const historyEvents: HistoryEvent[] = [
    {
      id: '1',
      type: 'scheduled',
      title: 'Interview Scheduled',
      description: 'Technical interview scheduled with John Smith',
      timestamp: '2024-01-10 09:00 AM',
      author: 'System',
      metadata: { status: 'scheduled' }
    },
    {
      id: '2',
      type: 'rescheduled',
      title: 'Interview Rescheduled',
      description: 'Interview moved due to candidate request',
      timestamp: '2024-01-12 02:30 PM',
      author: 'Sarah Johnson',
      metadata: { 
        previousDate: '2024-01-14 10:00 AM',
        newDate: '2024-01-15 10:00 AM'
      }
    },
    {
      id: '3',
      type: 'note',
      title: 'Pre-interview Note Added',
      description: 'Candidate has strong background in React and Node.js',
      timestamp: '2024-01-14 04:00 PM',
      author: 'John Smith'
    },
    {
      id: '4',
      type: 'completed',
      title: 'Interview Completed',
      description: 'Technical interview conducted successfully',
      timestamp: '2024-01-15 11:00 AM',
      author: 'John Smith',
      metadata: { status: 'completed' }
    },
    {
      id: '5',
      type: 'feedback',
      title: 'Feedback Submitted',
      description: 'Interview feedback and rating submitted',
      timestamp: '2024-01-15 11:30 AM',
      author: 'John Smith',
      metadata: { rating: 4, status: 'positive' }
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rescheduled':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'feedback':
        return <Star className="h-4 w-4 text-purple-600" />;
      case 'note':
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'feedback':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'note':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Current Interview Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Technical Interview</p>
                <p className="text-sm text-blue-700">{interview.scheduledDate} - {interview.duration} minutes</p>
              </div>
            </div>
            <Badge className={getEventColor(interview.status)} variant="secondary">
              {interview.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Interview Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyEvents.map((event, index) => (
              <div key={event.id}>
                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="p-2 bg-white border-2 border-gray-200 rounded-full">
                      {getEventIcon(event.type)}
                    </div>
                    {index < historyEvents.length - 1 && (
                      <div className="w-px h-8 bg-gray-200 mt-2" />
                    )}
                  </div>

                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <span className="text-xs text-gray-500">{event.timestamp}</span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{event.description}</p>

                    {/* Event metadata */}
                    {event.metadata && (
                      <div className="flex items-center space-x-3 mb-2">
                        {event.metadata.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{event.metadata.rating}/5</span>
                          </div>
                        )}
                        {event.metadata.previousDate && event.metadata.newDate && (
                          <div className="text-xs text-gray-600">
                            From: {event.metadata.previousDate} → {event.metadata.newDate}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Event author */}
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="" alt={event.author} />
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                          {getInitials(event.author)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{event.author}</span>
                    </div>
                  </div>
                </div>
                {index < historyEvents.length - 1 && <div className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Total Rounds</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Schedule Changes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
