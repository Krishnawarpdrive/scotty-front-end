
import React from 'react';
import { DataTable, DataTableColumn } from '@/design-system/components/DataTable/DataTable';
import { Badge } from '@/components/ui/badge';

interface Application {
  id: string;
  role: string;
  company: string;
  status: string;
  appliedDate: string;
  stage: string;
  progress: number;
}

interface CandidateDataTablesProps {
  applications: Application[];
  onViewApplication: (application: Application) => void;
}

export const CandidateDataTables: React.FC<CandidateDataTablesProps> = ({
  applications,
  onViewApplication
}) => {
  const columns: DataTableColumn<Application>[] = [
    {
      id: 'role',
      header: 'Role',
      accessor: 'role',
      sortable: true,
    },
    {
      id: 'company',
      header: 'Company',
      accessor: 'company',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (application: Application) => (
        <Badge variant="secondary">{application.status}</Badge>
      ),
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
      cell: (application: Application) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${application.progress}%` }}
            />
          </div>
          <span className="text-sm">{application.progress}%</span>
        </div>
      ),
    },
    {
      id: 'appliedDate',
      header: 'Applied Date',
      cell: (application: Application) => (
        <span className="text-sm">
          {new Date(application.appliedDate).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <DataTable
      data={applications}
      columns={columns}
      onRowClick={onViewApplication}
    />
  );
};
