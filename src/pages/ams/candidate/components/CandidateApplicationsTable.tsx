
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  AlertTriangle,
  CheckCircle,
  Eye,
  ExternalLink,
  MessageSquare,
  Phone
} from 'lucide-react';

interface Application {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'offer' | 'rejected' | 'withdrawn';
  priority: 'high' | 'medium' | 'low';
  nextAction?: string;
  daysInStage: number;
  hasPendingActions: boolean;
  alertReason?: string;
  nextDueDate?: string;
}

interface CandidateApplicationsTableProps {
  applications: Application[];
  onApplicationClick: (application: Application) => void;
  onRequirementClick?: (application: Application) => void;
  onCompanyClick: (application: Application) => void;
  onQuickAction: (applicationId: string, action: string) => void;
}

export const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({
  applications,
  onApplicationClick,
  onRequirementClick,
  onCompanyClick,
  onQuickAction
}) => {
  const [sortBy, setSortBy] = useState<'date' | 'progress' | 'priority'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'pending' | 'offer'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'offer':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const sortedAndFilteredApplications = applications
    .filter(app => filterBy === 'all' || app.status === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      }
    });

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">My Applications</CardTitle>
            <div className="flex items-center space-x-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="all">All Applications</option>
                <option value="active">Active</option>
                <option value="offer">Offers</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="date">Sort by Date</option>
                <option value="progress">Sort by Progress</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              <div className="text-sm text-blue-700">Total Applications</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'active').length}
              </div>
              <div className="text-sm text-green-700">Active</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {applications.filter(app => app.status === 'offer').length}
              </div>
              <div className="text-sm text-purple-700">Offers</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {applications.filter(app => app.hasPendingActions).length}
              </div>
              <div className="text-sm text-orange-700">Pending Actions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {sortedAndFilteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Application Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.roleName}
                      </h3>
                      <div 
                        className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600"
                        onClick={() => onCompanyClick(application)}
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{application.companyName}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Applied: {application.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Progress */}
                <div className="lg:col-span-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(application.priority)}>
                        {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Current: <span className="font-medium">{application.currentStage}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={application.progress} className="flex-1 h-2" />
                      <span className={`text-sm font-medium ${getProgressColor(application.progress)}`}>
                        {application.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Action */}
                <div className="lg:col-span-3">
                  {application.hasPendingActions ? (
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-orange-800">
                          {application.nextAction}
                        </div>
                        {application.nextDueDate && (
                          <div className="flex items-center space-x-1 text-xs text-orange-600">
                            <Clock className="h-3 w-3" />
                            <span>Due: {application.nextDueDate}</span>
                          </div>
                        )}
                        {application.alertReason && (
                          <div className="text-xs text-gray-600 mt-1">
                            {application.alertReason}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">No pending actions</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col space-y-2">
                    {onRequirementClick && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onRequirementClick(application)}
                        className="w-full justify-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onApplicationClick(application)}
                        className="flex-1"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Quick View
                      </Button>
                      
                      {application.hasPendingActions && (
                        <Button
                          size="sm"
                          onClick={() => onQuickAction(application.id, 'continue')}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedAndFilteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-600">
              {filterBy === 'all' 
                ? "You haven't applied to any positions yet." 
                : `No applications found with status: ${filterBy}`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
