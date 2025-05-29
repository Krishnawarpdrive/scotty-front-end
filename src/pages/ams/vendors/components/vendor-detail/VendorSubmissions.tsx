
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { FileTextIcon } from 'lucide-react';
import { Vendor, VendorSubmission } from '../../types/VendorTypes';
import { format } from 'date-fns';

interface VendorSubmissionsProps {
  vendor: Vendor;
  submissions: VendorSubmission[];
}

export const VendorSubmissions: React.FC<VendorSubmissionsProps> = ({ 
  vendor, 
  submissions 
}) => {
  const getStatusBadgeVariant = (status: VendorSubmission['status']) => {
    switch (status) {
      case 'Submitted': return 'secondary';
      case 'Shortlisted': return 'default';
      case 'Rejected': return 'destructive';
      case 'Interview': return 'outline';
      case 'Offered': return 'default';
      default: return 'outline';
    }
  };

  const columns: DataTableColumn<VendorSubmission>[] = [
    {
      id: 'candidateName',
      header: 'Candidate Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (submission) => (
        <div className="font-medium">{submission.candidateName}</div>
      )
    },
    {
      id: 'roleName',
      header: 'Role',
      enableSorting: true,
      enableFiltering: true,
      cell: (submission) => (
        <div className="text-sm">{submission.roleName}</div>
      )
    },
    {
      id: 'submissionDate',
      header: 'Submission Date',
      enableSorting: true,
      cell: (submission) => (
        <div className="text-sm">
          {format(new Date(submission.submissionDate), 'MMM dd, yyyy')}
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: true,
      enableFiltering: true,
      cell: (submission) => (
        <Badge variant={getStatusBadgeVariant(submission.status)}>
          {submission.status}
        </Badge>
      )
    },
    {
      id: 'stage',
      header: 'Current Stage',
      cell: (submission) => (
        <div className="text-sm text-gray-600">{submission.stage}</div>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Candidate Submissions ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={submissions}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
};
