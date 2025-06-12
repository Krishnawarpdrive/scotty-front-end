import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  AlertTriangle, 
  Calendar,
  FileText,
  Play,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  type: 'document' | 'interview' | 'assessment' | 'video' | 'questionnaire';
  dueDate?: string;
  completedDate?: string;
  hasAction?: boolean;
  actionType?: string;
}

interface CandidateApplication {
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
  stages: ApplicationStage[];
  alertReason?: string;
  nextDueDate?: string;
}

interface CandidateApplicationsTableProps {
  applications: CandidateApplication[];
  onApplicationClick: (application: CandidateApplication) => void;
  onCompanyClick: (application: CandidateApplication) => void;
  onQuickAction: (applicationId: string, action: string) => void;
}

export const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({
  applications,
  onApplicationClick,
  onCompanyClick,
  onQuickAction
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      offer: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      withdrawn: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getPriorityIndicator = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return <div className={cn('w-2 h-8 rounded-full', colors[priority as keyof typeof colors])} />;
  };

  const getStageIcon = (stage: ApplicationStage) => {
    const iconClass = 'h-4 w-4';
    switch (stage.type) {
      case 'document':
        return <FileText className={iconClass} />;
      case 'interview':
        return <Calendar className={iconClass} />;
      case 'assessment':
        return <Clock className={iconClass} />;
      case 'video':
        return <Play className={iconClass} />;
      case 'questionnaire':
        return <FileText className={iconClass} />;
      default:
        return <CheckCircle className={iconClass} />;
    }
  };

  const columns: DataTableColumn<CandidateApplication>[] = [
    {
      id: 'priority',
      header: '',
      cell: (application) => getPriorityIndicator(application.priority)
    },
    {
      id: 'role',
      header: 'Role & Company',
      cell: (application) => (
        <div className="min-w-0">
          <button
            onClick={() => onApplicationClick(application)}
            className="font-medium text-blue-600 hover:text-blue-800 truncate block text-left underline-offset-4 hover:underline"
          >
            {application.roleName}
          </button>
          <button
            onClick={() => onCompanyClick(application)}
            className="text-sm text-gray-500 truncate hover:text-blue-600 hover:underline underline-offset-4 block text-left"
          >
            {application.companyName}
          </button>
        </div>
      )
    },
    {
      id: 'currentStage',
      header: 'Current Stage',
      cell: (application) => {
        const currentStage = application.stages.find(s => s.status === 'current');
        return (
          <div className="flex items-center gap-2">
            {currentStage && getStageIcon(currentStage)}
            <span className="text-sm">{application.currentStage}</span>
          </div>
        );
      }
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: (application) => (
        <div className="w-24">
          <Progress value={application.progress} className="h-2" />
          <div className="text-xs text-gray-500 mt-1">{application.progress}%</div>
        </div>
      )
    },
    {
      id: 'daysInStage',
      header: 'Days in Stage',
      cell: (application) => (
        <div className={cn(
          'text-sm',
          application.daysInStage > 5 ? 'text-red-600 font-medium' : 'text-gray-600'
        )}>
          {application.daysInStage}d
        </div>
      )
    },
    {
      id: 'nextDueDate',
      header: 'Next Due',
      cell: (application) => (
        <div className="text-sm text-gray-600">
          {application.nextDueDate || '-'}
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      cell: (application) => getStatusBadge(application.status)
    },
    {
      id: 'pendingActions',
      header: 'Pending Actions',
      cell: (application) => (
        <div className="flex items-center gap-2">
          {application.hasPendingActions && (
            <div className="flex items-center gap-1 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Action Required</span>
            </div>
          )}
          {application.alertReason && (
            <div className="text-xs text-red-600 max-w-32 truncate">
              {application.alertReason}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Quick Actions',
      cell: (application) => (
        <div className="flex items-center gap-1">
          {application.nextAction && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction(application.id, 'continue');
              }}
            >
              <ArrowRight className="h-3 w-3 mr-1" />
              Continue
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction(application.id, 'view');
            }}
          >
            View
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            High Priority
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Action Required
          </div>
        </div>
      </div>

      <DataTable
        data={applications}
        columns={columns}
        onRowClick={onApplicationClick}
        searchPlaceholder="Search applications..."
      />
    </div>
  );
};
