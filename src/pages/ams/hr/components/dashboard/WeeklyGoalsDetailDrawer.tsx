
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MessageSquare } from 'lucide-react';

interface WeeklyGoalsDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalType: string | null;
}

export const WeeklyGoalsDetailDrawer: React.FC<WeeklyGoalsDetailDrawerProps> = ({
  open,
  onOpenChange,
  goalType
}) => {
  if (!goalType) return null;

  const getGoalData = () => {
    switch (goalType) {
      case 'interviews':
        return {
          title: 'Interview Schedules - This Week',
          target: 25,
          achieved: 18,
          taContributions: [
            { name: 'Sarah Johnson', contribution: 5, target: 6, progress: 83 },
            { name: 'Mike Peterson', contribution: 4, target: 5, progress: 80 },
            { name: 'Emma Wilson', contribution: 3, target: 4, progress: 75 },
            { name: 'John Taylor', contribution: 6, target: 6, progress: 100 },
            { name: 'Rachel Garcia', contribution: 0, target: 4, progress: 0 }
          ]
        };
      case 'roles':
        return {
          title: 'Roles Filled - This Week',
          target: 10,
          achieved: 7,
          details: [
            { role: 'Senior Developer', client: 'Acme Corp', ta: 'Sarah Johnson', status: 'Filled' },
            { role: 'UX Designer', client: 'Tech Inc', ta: 'Mike Peterson', status: 'Filled' },
            { role: 'Product Manager', client: 'Global Co', ta: 'Emma Wilson', status: 'Pending' }
          ]
        };
      case 'feedback':
        return {
          title: 'Candidate Feedback - This Week',
          target: 20,
          achieved: 15,
          pending: [
            { candidate: 'John Doe', role: 'Developer', ta: 'Sarah Johnson', days: 2 },
            { candidate: 'Jane Smith', role: 'Designer', ta: 'Mike Peterson', days: 1 },
            { candidate: 'Bob Wilson', role: 'Manager', ta: 'Emma Wilson', days: 3 }
          ]
        };
      default:
        return null;
    }
  };

  const goalData = getGoalData();
  if (!goalData) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={goalData.title}
      subtitle={`${goalData.achieved}/${goalData.target} completed`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Overall Progress */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="text-lg font-bold">
              {goalData.achieved}/{goalData.target}
            </span>
          </div>
          <Progress value={(goalData.achieved / goalData.target) * 100} className="mb-2" />
          <p className="text-sm text-gray-500">
            {Math.round((goalData.achieved / goalData.target) * 100)}% completed
          </p>
        </Card>

        {/* TA Contributions for Interviews */}
        {goalType === 'interviews' && goalData.taContributions && (
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              TA Contributions
            </h4>
            <div className="space-y-4">
              {goalData.taContributions.map((ta, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {ta.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{ta.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {ta.contribution}/{ta.target}
                      </span>
                      <Badge 
                        variant={ta.progress >= 100 ? 'default' : ta.progress >= 80 ? 'secondary' : 'destructive'}
                        className="ml-2"
                      >
                        {ta.progress}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={ta.progress} />
                </div>
              ))}
            </div>
          </Card>
        )}

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
      </div>
    </SideDrawer>
  );
};
