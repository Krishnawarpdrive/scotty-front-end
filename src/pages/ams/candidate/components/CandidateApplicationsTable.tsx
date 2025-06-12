
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  ChevronRight, 
  AlertTriangle,
  Play,
  Building2,
  MapPin,
  DollarSign,
  Clock
} from 'lucide-react';
import { CandidateApplication } from '../types/CandidateTypes';

interface CandidateApplicationsTableProps {
  applications: CandidateApplication[];
  onApplicationClick?: (application: CandidateApplication) => void;
  onCompanyClick?: (application: CandidateApplication) => void;
  onQuickAction?: (applicationId: string, action: string) => void;
}

const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({
  applications,
  onApplicationClick,
  onCompanyClick,
  onQuickAction
}) => {
  const [sortBy, setSortBy] = useState<'recent' | 'priority' | 'progress'>('recent');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      case 'offer': return 'default';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
               (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      case 'progress':
        return (b.progress || 0) - (a.progress || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Applications</h2>
          <p className="text-sm text-muted-foreground">
            {applications.length} total applications • {applications.filter(a => a.status === 'active').length} active
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Recent
          </Button>
          <Button
            variant={sortBy === 'priority' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('priority')}
          >
            Priority
          </Button>
          <Button
            variant={sortBy === 'progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('progress')}
          >
            Progress
          </Button>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="space-y-4">
        {sortedApplications.map((application) => (
          <Card 
            key={application.id} 
            className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
              application.hasPendingActions ? 'ring-2 ring-orange-200 ring-opacity-50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                {/* Left Section - Job Details */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 
                          className="font-semibold text-lg hover:text-blue-600 cursor-pointer"
                          onClick={() => onApplicationClick?.(application)}
                        >
                          {application.title || application.roleName}
                        </h3>
                        {application.hasPendingActions && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      
                      <div 
                        className="flex items-center gap-2 text-gray-600 mb-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => onCompanyClick?.(application)}
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{application.company || application.companyName}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{application.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Applied {application.appliedDate}</span>
                        </div>
                      </div>

                      {/* Current Stage and Progress */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{application.currentStage}</span>
                            <span className="text-sm text-gray-500">{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Status and Actions */}
                <div className="flex flex-col items-end gap-3 ml-4">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={getStatusColor(application.status)}
                      className="capitalize"
                    >
                      {application.status}
                    </Badge>
                    {application.priority && (
                      <Badge 
                        variant="outline"
                        className={`${getPriorityColor(application.priority)} border-0 capitalize`}
                      >
                        {application.priority}
                      </Badge>
                    )}
                  </div>

                  {/* Next Action Alert */}
                  {application.hasPendingActions && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 max-w-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-800">Action Required</span>
                      </div>
                      <p className="text-xs text-orange-700 mb-2">{application.alertReason}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-orange-600">{application.nextDueDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    {application.hasPendingActions && (
                      <Button
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onQuickAction?.(application.id, 'continue')}
                      >
                        <Play className="h-3 w-3" />
                        Continue
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onApplicationClick?.(application)}
                    >
                      View Details
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Days in Stage */}
                  {application.daysInStage && (
                    <div className="text-xs text-gray-500">
                      {application.daysInStage} days in current stage
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {applications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">Start applying to jobs to see your applications here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateApplicationsTable;
