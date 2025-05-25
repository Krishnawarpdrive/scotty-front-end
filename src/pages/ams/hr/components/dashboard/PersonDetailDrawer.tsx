
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';

interface PersonDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personName: string | null;
}

export const PersonDetailDrawer: React.FC<PersonDetailDrawerProps> = ({
  open,
  onOpenChange,
  personName
}) => {
  if (!personName) return null;

  // Mock data for person details
  const personData = {
    name: personName,
    role: 'Talent Acquisition Specialist',
    email: `${personName.toLowerCase().replace(' ', '.')}@company.com`,
    joinDate: 'Jan 2023',
    totalInterviews: 47,
    completedInterviews: 42,
    rolesHandled: [
      { name: 'Senior Developer', status: 'Active', candidates: 8 },
      { name: 'UX Designer', status: 'Filled', candidates: 5 },
      { name: 'Product Manager', status: 'Active', candidates: 12 }
    ],
    weeklyContribution: {
      target: 25,
      achieved: 18,
      pending: 7
    },
    recentActivities: [
      { action: 'Scheduled interview', target: 'Senior Developer', time: '2 hours ago' },
      { action: 'Completed feedback', target: 'Alice Smith', time: '5 hours ago' },
      { action: 'Updated role requirements', target: 'UX Designer', time: '1 day ago' }
    ]
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`${personData.name} Profile`}
      subtitle={personData.role}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {personData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{personData.name}</h3>
            <p className="text-gray-600">{personData.role}</p>
            <p className="text-sm text-gray-500">{personData.email}</p>
            <p className="text-sm text-gray-500">Joined: {personData.joinDate}</p>
          </div>
        </div>

        {/* Interview Stats */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Interview Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Interviews</p>
              <p className="text-2xl font-bold text-blue-600">{personData.totalInterviews}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{personData.completedInterviews}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Completion Rate</span>
              <span>{Math.round((personData.completedInterviews / personData.totalInterviews) * 100)}%</span>
            </div>
            <Progress value={(personData.completedInterviews / personData.totalInterviews) * 100} />
          </div>
        </Card>

        {/* Weekly Contribution */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Weekly Goals Progress
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Interview Schedules</span>
              <span className="text-sm font-medium">
                {personData.weeklyContribution.achieved}/{personData.weeklyContribution.target}
              </span>
            </div>
            <Progress value={(personData.weeklyContribution.achieved / personData.weeklyContribution.target) * 100} />
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-green-600 font-medium">{personData.weeklyContribution.achieved}</p>
                <p className="text-gray-500">Achieved</p>
              </div>
              <div>
                <p className="text-amber-600 font-medium">{personData.weeklyContribution.pending}</p>
                <p className="text-gray-500">Pending</p>
              </div>
              <div>
                <p className="text-blue-600 font-medium">{personData.weeklyContribution.target}</p>
                <p className="text-gray-500">Target</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Roles Handled */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Current Roles ({personData.rolesHandled.length})
          </h4>
          <div className="space-y-3">
            {personData.rolesHandled.map((role, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium">{role.name}</p>
                  <p className="text-sm text-gray-500">{role.candidates} candidates</p>
                </div>
                <Badge variant={role.status === 'Active' ? 'default' : 'secondary'}>
                  {role.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activities
          </h4>
          <div className="space-y-2">
            {personData.recentActivities.map((activity, index) => (
              <div key={index} className="text-sm">
                <p>
                  <span className="font-medium">{activity.action}</span>
                  {' for '}
                  <span className="text-blue-600">{activity.target}</span>
                </p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SideDrawer>
  );
};
