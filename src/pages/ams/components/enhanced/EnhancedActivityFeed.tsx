
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, FileText, CheckCircle, UserPlus, Briefcase } from 'lucide-react';
import { ActivityItem } from '@/hooks/useEnhancedAMSDashboard';

interface EnhancedActivityFeedProps {
  activities: ActivityItem[];
  isLoading: boolean;
}

const activityIcons = {
  jd_submitted: FileText,
  approval: CheckCircle,
  role_creation: Briefcase,
  client_added: UserPlus,
  assignment: Briefcase
};

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
};

export const EnhancedActivityFeed: React.FC<EnhancedActivityFeedProps> = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Activity
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {activities.map((activity, index) => {
              const IconComponent = activityIcons[activity.type] || FileText;
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 leading-tight">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            by {activity.user}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${priorityColors[activity.priority]}`}
                          >
                            {activity.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
