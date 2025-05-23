
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, MessageSquare, User, Briefcase, Building, Clock } from 'lucide-react';

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
  
  // Determine activity type icon
  const getActivityTypeIcon = () => {
    switch (activity.type) {
      case 'candidate':
        return <User className="h-5 w-5" />;
      case 'role':
        return <Briefcase className="h-5 w-5" />;
      case 'client':
        return <Building className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  // Determine activity detail content based on type
  const renderActivityDetail = () => {
    const details = activity.details || {};
    
    if (activity.type === 'candidate') {
      return (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Candidate Information</h3>
              </div>
              <Badge>{details.role || 'No role specified'}</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned to:</span>
                <span className="font-medium">{activity.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Client:</span>
                <span className="font-medium">{details.client || 'N/A'}</span>
              </div>
              {details.interviewDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Interview Date:</span>
                  <span className="font-medium">{new Date(details.interviewDate).toLocaleString()}</span>
                </div>
              )}
              {details.offerDeadline && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Offer Deadline:</span>
                  <span className="font-medium">{new Date(details.offerDeadline).toLocaleString()}</span>
                </div>
              )}
              {details.oldStage && details.newStage && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Status Change:</span>
                  <span className="font-medium">{details.oldStage} → {details.newStage}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full">View Candidate Profile</Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Message TA
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </>
      );
    }
    
    if (activity.type === 'role') {
      return (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                <h3 className="font-medium">Role Information</h3>
              </div>
              <Badge variant="outline">{details.seniority || 'N/A'}</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Title:</span>
                <span className="font-medium">{details.title || activity.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Client:</span>
                <span className="font-medium">{details.client || 'N/A'}</span>
              </div>
              {details.expectedSalary && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Salary:</span>
                  <span className="font-medium">{details.expectedSalary}</span>
                </div>
              )}
              {details.hiredCandidate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Hired Candidate:</span>
                  <span className="font-medium">{details.hiredCandidate}</span>
                </div>
              )}
              {details.timeToHire && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Time to Hire:</span>
                  <span className="font-medium">{details.timeToHire}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full">View Role Details</Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <User className="h-4 w-4" />
                View Candidates
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Message TA
              </Button>
            </div>
          </div>
        </>
      );
    }
    
    if (activity.type === 'client') {
      return (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-emerald-600" />
                <h3 className="font-medium">Client Information</h3>
              </div>
              <Badge variant="outline">{details.industry || 'N/A'}</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Client Name:</span>
                <span className="font-medium">{activity.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium">{details.location || 'N/A'}</span>
              </div>
              {details.contactPerson && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-medium">{details.contactPerson}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full">View Client Profile</Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <Briefcase className="h-4 w-4" />
                View Active Roles
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Contact Client
              </Button>
            </div>
          </div>
        </>
      );
    }
    
    // Default generic view
    return (
      <>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-medium mb-3">Activity Detail</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">User:</span>
              <span className="font-medium">{activity.user}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Action:</span>
              <span className="font-medium">{activity.action}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Target:</span>
              <span className="font-medium">{activity.target}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time:</span>
              <span className="font-medium">{activity.time}</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full">View Details</Button>
      </>
    );
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Activity Detail"
      subtitle={`${activity.user} ${activity.action} ${activity.target}`}
      size="md"
    >
      <div className="p-6 space-y-6">
        {/* Activity Header Card */}
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {activity.user.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{activity.user}</h3>
                <div className="flex items-center">
                  {getActivityTypeIcon()}
                  <span className="ml-1 text-sm capitalize text-gray-500">{activity.type}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">
                {activity.action} <span className="font-medium text-blue-600">{activity.target}</span>
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">{activity.time}</span>
                {activity.alert && (
                  <Badge 
                    variant={activity.alertLevel === 'critical' ? 'destructive' : 'outline'}
                    className={
                      activity.alertLevel === 'warning' 
                        ? 'bg-amber-100 text-amber-800 border-amber-200' 
                        : activity.alertLevel === 'good'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : ''
                    }
                  >
                    {activity.alertLevel === 'critical' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {activity.alert}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Activity-specific detail */}
        {renderActivityDetail()}
      </div>
    </SideDrawer>
  );
};
