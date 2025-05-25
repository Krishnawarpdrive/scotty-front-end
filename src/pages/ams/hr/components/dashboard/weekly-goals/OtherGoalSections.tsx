
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare } from 'lucide-react';
import { GoalData } from './types';

interface OtherGoalSectionsProps {
  goalType: string;
  goalData: GoalData;
}

export const OtherGoalSections: React.FC<OtherGoalSectionsProps> = ({ goalType, goalData }) => {
  return (
    <>
      {/* Role Details */}
      {goalType === 'roles' && goalData.details && (
        <Card className="p-4">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Role Details
          </h4>
          <div className="space-y-3">
            {goalData.details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{detail.role}</p>
                  <p className="text-sm text-gray-500">{detail.client}</p>
                  <p className="text-xs text-gray-400">TA: {detail.ta}</p>
                </div>
                <Badge variant={detail.status === 'Filled' ? 'default' : 'secondary'}>
                  {detail.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Feedback Pending */}
      {goalType === 'feedback' && goalData.pending && (
        <Card className="p-4">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Pending Feedback
          </h4>
          <div className="space-y-3">
            {goalData.pending.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{item.candidate}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                  <p className="text-xs text-gray-400">TA: {item.ta}</p>
                </div>
                <Badge 
                  variant={item.days <= 1 ? 'destructive' : item.days <= 2 ? 'secondary' : 'outline'}
                >
                  {item.days} days
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};
