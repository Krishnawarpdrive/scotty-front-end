
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  Briefcase, 
  Calendar, 
  FileText, 
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'application' | 'interview' | 'document' | 'message' | 'status_update';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  company?: string;
  role?: string;
}

interface CandidateActivityFeedProps {
  data: any;
}

export const CandidateActivityFeed: React.FC<CandidateActivityFeedProps> = ({ data }) => {
  // Mock activity data - in real implementation, this would come from props or API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Technical interview with TechCorp Inc for Senior Frontend Developer position',
      timestamp: '2024-01-16T10:00:00Z',
      status: 'scheduled',
      company: 'TechCorp Inc',
      role: 'Senior Frontend Developer'
    },
    {
      id: '2',
      type: 'application',
      title: 'Application Submitted',
      description: 'Successfully submitted application for Full Stack Engineer at DataFlow Systems',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'submitted',
      company: 'DataFlow Systems',
      role: 'Full Stack Engineer'
    },
    {
      id: '3',
      type: 'document',
      title: 'Document Verified',
      description: 'Your educational certificates have been verified successfully',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'verified'
    },
    {
      id: '4',
      type: 'status_update',
      title: 'Application Progress',
      description: 'Your application for React Developer at StartupXYZ moved to technical assessment stage',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'in_progress',
      company: 'StartupXYZ',
      role: 'React Developer'
    },
    {
      id: '5',
      type: 'message',
      title: 'New Message',
      description: 'Received message from HR team regarding interview preparation guidelines',
      timestamp: '2024-01-14T11:20:00Z',
      status: 'unread'
    }
  ];

  const getActivityIcon = (type: string, status?: string) => {
    switch (type) {
      case 'application':
        return <Briefcase className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'status_update':
        return status === 'completed' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'submitted':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Submitted</Badge>;
      case 'verified':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Verified</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case 'unread':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Unread</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="flex-1 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
          <p className="text-gray-600">Stay updated with your latest application activities</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(activity.status)}
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  
                  {(activity.company || activity.role) && (
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {activity.company && (
                        <span className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {activity.company}
                        </span>
                      )}
                      {activity.role && (
                        <span>• {activity.role}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Activities
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
