import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  Eye,
  ExternalLink,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable, DataTableColumn } from '@/components/ui/data-table/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CandidateApplication {
  id: string;
  role: string;
  company: string;
  status: string;
  appliedDate: string;
  lastUpdate: string;
  stage: string;
  progress: number;
  nextAction?: string;
  priority: 'high' | 'medium' | 'low';
}

interface CandidateApplicationsTableProps {
  applications: CandidateApplication[];
  onViewApplication: (application: CandidateApplication) => void;
  onQuickAction?: (action: string, application: CandidateApplication) => void;
}

export const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({
  applications,
  onViewApplication,
  onQuickAction
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CandidateApplication;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedApplications = useMemo(() => {
    if (!sortConfig) return applications;

    return [...applications].sort((a, b) => {
      const key = sortConfig.key;

      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [applications, sortConfig]);

  const filteredApplications = useMemo(() => {
    if (!searchTerm) return sortedApplications;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return sortedApplications.filter(application =>
      application.role.toLowerCase().includes(lowerSearchTerm) ||
      application.company.toLowerCase().includes(lowerSearchTerm) ||
      application.status.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm, sortedApplications]);

  const handleSort = (key: keyof CandidateApplication) => {
    setSortConfig(currentConfig => {
      if (currentConfig?.key === key) {
        return {
          key,
          direction: currentConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          key,
          direction: 'asc',
        };
      }
    });
  };

  const columns: DataTableColumn<CandidateApplication>[] = [
    {
      id: 'role',
      header: 'Role & Company',
      cell: (application) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{application.role}</span>
          <span className="text-sm text-gray-500">{application.company}</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (application) => {
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'under review': return 'bg-yellow-100 text-yellow-800';
            case 'interview': return 'bg-blue-100 text-blue-800';
            case 'on hold': return 'bg-gray-100 text-gray-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
          }
        };

        return (
          <Badge variant="secondary" className={getStatusColor(application.status)}>
            {application.status}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      id: 'stage',
      header: 'Current Stage',
      accessor: 'stage',
      sortable: true,
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: (application) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${application.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{application.progress}%</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'appliedDate',
      header: 'Applied Date',
      cell: (application) => (
        <span className="text-sm text-gray-600">
          {new Date(application.appliedDate).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'nextAction',
      header: 'Next Action',
      cell: (application) => (
        application.nextAction ? (
          <div className="flex items-center space-x-1 text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-gray-600">{application.nextAction}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">No pending actions</span>
        )
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (application) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewApplication(application)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onQuickAction?.('view-details', application)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuickAction?.('contact-recruiter', application)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Contact Recruiter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuickAction?.('schedule-interview', application)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredApplications}
        columns={columns}
        onRowClick={onViewApplication}
      />
    </div>
  );
};
