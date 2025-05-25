
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Calendar, AlertCircle } from 'lucide-react';

interface RoleDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleName: string | null;
}

export const RoleDetailDrawer: React.FC<RoleDetailDrawerProps> = ({
  open,
  onOpenChange,
  roleName
}) => {
  if (!roleName) return null;

  // Mock data for role details
  const roleData = {
    name: roleName,
    client: 'Acme Corporation',
    status: 'Active',
    priority: 'High',
    deadline: '2025-02-15',
    description: 'We are looking for an experienced developer to join our team...',
    requirements: ['5+ years experience', 'React expertise', 'Node.js knowledge'],
    totalCandidates: 24,
    candidatesInPipeline: {
      screening: 8,
      interview: 6,
      offer: 3,
      onboarding: 1
    },
    assignedTA: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      workload: 75
    },
    recentActivity: [
      { candidate: 'John Doe', stage: 'Interview', action: 'Scheduled', time: '2 hours ago' },
      { candidate: 'Jane Smith', stage: 'Screening', action: 'Completed', time: '5 hours ago' },
      { candidate: 'Bob Wilson', stage: 'Offer', action: 'Sent', time: '1 day ago' }
    ],
    timeline: {
      created: '2025-01-10',
      firstCandidate: '2025-01-12',
      expectedClose: '2025-02-15'
    }
  };

  const daysLeft = Math.ceil((new Date(roleData.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={roleData.name}
      subtitle={`${roleData.client} • ${roleData.status}`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Role Overview */}
        <Card className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{roleData.name}</h3>
              <p className="text-gray-600">{roleData.client}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant={roleData.status === 'Active' ? 'default' : 'secondary'}>
                {roleData.status}
              </Badge>
              <Badge variant={roleData.priority === 'High' ? 'destructive' : 'outline'}>
                {roleData.priority}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{roleData.description}</p>
          
          {/* Deadline Alert */}
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            daysLeft <= 7 ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
          }`}>
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              {daysLeft <= 0 ? 'Deadline passed!' : `${daysLeft} days left until deadline`}
            </span>
          </div>
        </Card>

        {/* Assigned TA */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assigned Talent Acquisition
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {roleData.assignedTA.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{roleData.assignedTA.name}</p>
                <p className="text-sm text-gray-500">{roleData.assignedTA.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Workload</p>
              <p className="text-lg font-semibold">{roleData.assignedTA.workload}%</p>
            </div>
          </div>
        </Card>

        {/* Candidate Pipeline */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Candidate Pipeline ({roleData.totalCandidates} total)
          </h4>
          <div className="space-y-3">
            {Object.entries(roleData.candidatesInPipeline).map(([stage, count]) => (
              <div key={stage} className="flex justify-between items-center">
                <span className="capitalize text-sm">{stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{count}</span>
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded" 
                      style={{ width: `${(count / roleData.totalCandidates) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Requirements */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Key Requirements</h4>
          <ul className="space-y-1">
            {roleData.requirements.map((req, index) => (
              <li key={index} className="text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {req}
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Activity
          </h4>
          <div className="space-y-3">
            {roleData.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">{activity.candidate}</p>
                  <p className="text-gray-500">{activity.stage} - {activity.action}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1">View Full Details</Button>
          <Button variant="outline" className="flex-1">Message TA</Button>
        </div>
      </div>
    </SideDrawer>
  );
};
