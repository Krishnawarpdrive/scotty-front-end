
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  User,
  MessageSquare,
  FileText,
  Video
} from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface HistoryEvent {
  id: string;
  type: 'interview' | 'note' | 'status_change' | 'document' | 'message';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  metadata?: any;
}

interface InterviewerHistoryProps {
  interview: Interview;
}

export const InterviewerHistory: React.FC<InterviewerHistoryProps> = ({
  interview
}) => {
  // Mock history data
  const historyEvents: HistoryEvent[] = [
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Technical interview scheduled with Sarah Johnson',
      timestamp: '2024-01-10 09:00 AM',
      user: 'John Doe',
      metadata: { type: 'technical', duration: 60 }
    },
    {
      id: '2',
      type: 'document',
      title: 'Resume Reviewed',
      description: 'Candidate resume reviewed and assessment notes added',
      timestamp: '2024-01-10 09:15 AM',
      user: 'John Doe'
    },
    {
      id: '3',
      type: 'interview',
      title: 'Interview Started',
      description: 'Technical interview session began',
      timestamp: '2024-01-15 10:00 AM',
      user: 'John Doe',
      metadata: { platform: 'video' }
    },
    {
      id: '4',
      type: 'note',
      title: 'Interview Notes Added',
      description: 'Technical assessment notes and observations recorded',
      timestamp: '2024-01-15 10:30 AM',
      user: 'John Doe'
    },
    {
      id: '5',
      type: 'status_change',
      title: 'Status Updated',
      description: 'Interview status changed to "Completed"',
      timestamp: '2024-01-15 11:00 AM',
      user: 'System'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'note':
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'status_change':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'document':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'interview':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Interview</Badge>;
      case 'note':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Note</Badge>;
      case 'status_change':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Status</Badge>;
      case 'document':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Document</Badge>;
      case 'message':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Message</Badge>;
      default:
        return <Badge variant="secondary">Event</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <div className="text-sm text-gray-600">Documents</div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyEvents.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4 relative">
                {/* Timeline line */}
                {index < historyEvents.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-200"></div>
                )}
                
                {/* Event icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  {getEventIcon(event.type)}
                </div>
                
                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    {getEventBadge(event.type)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.timestamp}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{event.user}</span>
                    </div>
                  </div>
                  
                  {event.metadata && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      {event.metadata.type && (
                        <span className="font-medium">Type: {event.metadata.type}</span>
                      )}
                      {event.metadata.duration && (
                        <span className="ml-2">Duration: {event.metadata.duration} min</span>
                      )}
                      {event.metadata.platform && (
                        <span className="ml-2">Platform: {event.metadata.platform}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
