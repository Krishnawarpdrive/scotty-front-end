import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'application' | 'interview' | 'offer';
  message: string;
}

interface CandidateActivityFeedProps {
  activities: ActivityItem[];
}

const CandidateActivityFeed: React.FC<CandidateActivityFeedProps> = ({ activities }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Activity Feed</span>
          <Badge variant="secondary">{activities.length} updates</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{activity.message}</span>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No recent activity.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateActivityFeed;
