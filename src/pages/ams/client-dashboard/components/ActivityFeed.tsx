
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActivityIcon, BriefcaseIcon, UserIcon, FileTextIcon, CalendarIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'placement' | 'interview' | 'application' | 'document';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'placement': return BriefcaseIcon;
      case 'interview': return CalendarIcon;
      case 'application': return UserIcon;
      case 'document': return FileTextIcon;
      default: return ActivityIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'placement': return 'text-green-600 bg-green-100';
      case 'interview': return 'text-blue-600 bg-blue-100';
      case 'application': return 'text-purple-600 bg-purple-100';
      case 'document': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
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
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = getActivityIcon(activity.type);
          const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                <IconComponent className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  <Badge className={`${getPriorityColor(activity.priority)} text-xs`}>
                    {activity.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{timeAgo}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};
