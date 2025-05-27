
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, ArrowRight, MessageSquare, FileText, UserCheck } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'candidate_moved' | 'feedback_received' | 'offer_sent' | 'role_approved';
  title: string;
  description: string;
  timestamp: string;
  actionable: boolean;
  actionLabel?: string;
  priority: 'high' | 'medium' | 'low';
}

interface RecentActivityFeedProps {
  data: ActivityItem[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ data }) => {
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'feedback_received',
      title: 'Feedback Received',
      description: 'Interview feedback for John Smith (Senior Software Engineer)',
      timestamp: '2 hours ago',
      actionable: true,
      actionLabel: 'Review Feedback',
      priority: 'high'
    },
    {
      id: '2',
      type: 'offer_sent',
      title: 'Offer Extended',
      description: 'Offer letter sent to Sarah Wilson (Product Manager)',
      timestamp: '4 hours ago',
      actionable: true,
      actionLabel: 'Track Status',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'candidate_moved',
      title: 'Candidate Advanced',
      description: 'Mike Johnson moved to Client Interview stage',
      timestamp: '6 hours ago',
      actionable: false,
      priority: 'low'
    },
    {
      id: '4',
      type: 'role_approved',
      title: 'Role Approved',
      description: 'UX Designer role approved and published',
      timestamp: '1 day ago',
      actionable: true,
      actionLabel: 'View Applications',
      priority: 'medium'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'feedback_received': return <MessageSquare className="h-4 w-4" />;
      case 'offer_sent': return <FileText className="h-4 w-4" />;
      case 'candidate_moved': return <UserCheck className="h-4 w-4" />;
      case 'role_approved': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="border rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-gray-500">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <Badge className={getPriorityColor(activity.priority)} variant="outline">
                    {activity.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  {activity.actionable && (
                    <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                      {activity.actionLabel}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {mockActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
