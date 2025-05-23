
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Calendar, Phone, MapPin, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ActivityDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: any;
}

export const ActivityDetailDrawer: React.FC<ActivityDetailDrawerProps> = ({
  open,
  onOpenChange,
  activity
}) => {
  if (!activity) return null;

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'candidate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'role': return 'bg-green-100 text-green-800 border-green-200';
      case 'client': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'good': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderActivityDetails = () => {
    if (!activity.details) return null;

    switch (activity.type) {
      case 'candidate':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Candidate Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Role:</span>
                  <p className="font-medium">{activity.details.role}</p>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <p className="font-medium">{activity.details.client}</p>
                </div>
                {activity.details.interviewDate && (
                  <div>
                    <span className="text-gray-500">Interview Date:</span>
                    <p className="font-medium">{new Date(activity.details.interviewDate).toLocaleDateString()}</p>
                  </div>
                )}
                {activity.details.salary && (
                  <div>
                    <span className="text-gray-500">Salary:</span>
                    <p className="font-medium">{activity.details.salary}</p>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                View Profile
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Schedule Interview
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Message TA
              </Button>
            </div>
          </div>
        );

      case 'role':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Role Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Title:</span>
                  <p className="font-medium">{activity.details.title || activity.target}</p>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <p className="font-medium">{activity.details.client || 'N/A'}</p>
                </div>
                {activity.details.seniority && (
                  <div>
                    <span className="text-gray-500">Seniority:</span>
                    <p className="font-medium">{activity.details.seniority}</p>
                  </div>
                )}
                {activity.details.expectedSalary && (
                  <div>
                    <span className="text-gray-500">Expected Salary:</span>
                    <p className="font-medium">{activity.details.expectedSalary}</p>
                  </div>
                )}
                {activity.details.timeToHire && (
                  <div>
                    <span className="text-gray-500">Time to Hire:</span>
                    <p className="font-medium">{activity.details.timeToHire}</p>
                  </div>
                )}
                {activity.details.hiredCandidate && (
                  <div>
                    <span className="text-gray-500">Hired Candidate:</span>
                    <p className="font-medium">{activity.details.hiredCandidate}</p>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                View Role Details
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                View Candidates
              </Button>
            </div>
          </div>
        );

      case 'client':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Client Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <p className="font-medium">{activity.details.industry || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">{activity.details.location || 'N/A'}</p>
                </div>
                {activity.details.contactPerson && (
                  <div>
                    <span className="text-gray-500">Contact Person:</span>
                    <p className="font-medium">{activity.details.contactPerson}</p>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                View Client Profile
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Contact Client
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Activity Details"
      subtitle={`${activity.type} activity`}
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Activity Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {activity.user.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{activity.user}</h3>
              <p className="text-sm text-gray-600">{activity.action} {activity.target}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getActivityTypeColor(activity.type)}>
                  {activity.type}
                </Badge>
                {activity.alert && (
                  <Badge variant="outline" className={getAlertColor(activity.alertLevel)}>
                    {activity.alert}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {activity.time}
            </div>
          </div>
        </div>

        {/* Activity Details */}
        {renderActivityDetails()}

        {/* Timeline or Additional Actions */}
        <Card className="p-4">
          <h4 className="font-medium mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              View Related Activities
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Export Activity Report
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Set Follow-up Reminder
            </Button>
          </div>
        </Card>
      </div>
    </SideDrawer>
  );
};
