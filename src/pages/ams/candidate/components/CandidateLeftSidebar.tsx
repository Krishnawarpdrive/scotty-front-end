import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  MessageSquare, 
  FileText,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';

interface CandidateLeftSidebarProps {
  dashboardData: any;
  notifications: any[];
  messages: any[];
}

export const CandidateLeftSidebar: React.FC<CandidateLeftSidebarProps> = ({ dashboardData, notifications, messages }) => {
  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm mb-2">
            <span>{dashboardData.profileCompletion}%</span>
            <span>Complete your profile</span>
          </div>
          <Progress value={dashboardData.profileCompletion} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Notifications</CardTitle>
            <Badge variant="secondary">{notifications.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {notifications.map((notification: any) => (
            <div key={notification.id} className="flex items-start gap-2">
              <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-gray-500">{notification.message}</p>
              </div>
            </div>
          ))}
          <Button variant="link" className="w-full justify-start">
            View All
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Messages</CardTitle>
            <Badge variant="secondary">{messages.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {messages.map((message: any) => (
            <div key={message.id} className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{message.sender}</p>
                <p className="text-xs text-gray-500">{message.preview}</p>
              </div>
            </div>
          ))}
          <Button variant="link" className="w-full justify-start">
            View All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
