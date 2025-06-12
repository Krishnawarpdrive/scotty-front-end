import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CalendarIcon, 
  MapPinIcon, 
  BuildingIcon, 
  DollarSignIcon, 
  ClockIcon,
  EyeIcon,
  ExternalLinkIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { Input } from '@/components/ui/input';

interface CandidateApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  dateApplied: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'offered' | 'rejected';
  detailsUrl: string;
}

interface CandidateApplicationsTableProps {
  applications: CandidateApplication[];
  onViewDetails: (application: CandidateApplication) => void;
  onWithdraw: (application: CandidateApplication) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  className?: string;
}

const CandidateApplicationsTable: React.FC<CandidateApplicationsTableProps> = ({
  applications,
  onViewDetails,
  onWithdraw,
  showSearch = true,
  showFilters = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApplications = applications.filter(application => {
    const searchMatch =
      application.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === 'all' || application.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const columns: DataTableColumn<CandidateApplication>[] = [
    {
      id: 'title',
      header: 'Job Title',
      accessorKey: 'title',
      cell: (application) => (
        <div className="flex items-center gap-2">
          {application.title}
          <a href={application.detailsUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          </a>
        </div>
      ),
    },
    {
      id: 'company',
      header: 'Company',
      accessorKey: 'company',
      cell: (application) => (
        <div className="flex items-center gap-1">
          <BuildingIcon className="h-4 w-4 text-gray-500" />
          {application.company}
        </div>
      ),
    },
    {
      id: 'location',
      header: 'Location',
      accessorKey: 'location',
      cell: (application) => (
        <div className="flex items-center gap-1">
          <MapPinIcon className="h-4 w-4 text-gray-500" />
          {application.location}
        </div>
      ),
    },
    {
      id: 'salary',
      header: 'Salary',
      accessorKey: 'salary',
      cell: (application) => (
        <div className="flex items-center gap-1">
          <DollarSignIcon className="h-4 w-4 text-gray-500" />
          {application.salary}
        </div>
      ),
    },
    {
      id: 'dateApplied',
      header: 'Date Applied',
      accessorKey: 'dateApplied',
      cell: (application) => (
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          {application.dateApplied}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (application) => (
        <Badge
          variant={
            application.status === 'pending'
              ? 'secondary'
              : application.status === 'reviewed'
              ? 'default'
              : application.status === 'interviewing'
              ? 'primary'
              : application.status === 'offered'
              ? 'success'
              : 'destructive'
          }
        >
          {application.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (application) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(application)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onWithdraw(application)}>
            <ClockIcon className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>My Applications</span>
          <Badge variant="outline">{filteredApplications.length} total</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          {showSearch && (
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search applications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {showFilters && (
            <div className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-gray-500" />
              <select
                className="border rounded px-2 py-1 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="interviewing">Interviewing</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>
        
        <DataTable
          data={filteredApplications}
          columns={columns}
          onRowClick={(application) => onViewDetails(application)}
          emptyMessage="No applications found matching your criteria."
        />
      </CardContent>
    </Card>
  );
};

export default CandidateApplicationsTable;
