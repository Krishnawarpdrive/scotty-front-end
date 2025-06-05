
import React from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, ExternalLink } from 'lucide-react';
import { Interview } from '../MyInterviewsPage';
import { format } from 'date-fns';

interface MyInterviewsTableProps {
  interviews: Interview[];
  loading: boolean;
  onInterviewClick: (interview: Interview) => void;
}

export const MyInterviewsTable: React.FC<MyInterviewsTableProps> = ({
  interviews,
  loading,
  onInterviewClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const columns = [
    {
      accessorKey: 'candidateName',
      header: 'Candidate',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.candidateName}</div>
          <div className="text-sm text-gray-500">{row.original.candidateEmail}</div>
        </div>
      ),
    },
    {
      accessorKey: 'roleName',
      header: 'Role & Client',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.roleName}</div>
          <div className="text-sm text-gray-500">{row.original.clientName}</div>
        </div>
      ),
    },
    {
      accessorKey: 'scheduledDate',
      header: 'Schedule',
      cell: ({ row }: any) => {
        const date = new Date(row.original.scheduledDate);
        return (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">
                {format(date, 'MMM dd, yyyy')}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {format(date, 'hh:mm a')} ({row.original.duration}min)
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'interviewType',
      header: 'Type',
      cell: ({ row }: any) => (
        <Badge variant="outline" className="capitalize">
          {row.original.interviewType}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge className={getStatusColor(row.original.status)}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }: any) => {
        const interview = row.original;
        if (interview.meetingLink) {
          return (
            <div className="flex items-center space-x-1">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">Virtual</span>
            </div>
          );
        }
        if (interview.location) {
          return (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">{interview.location}</span>
            </div>
          );
        }
        return <span className="text-sm text-gray-400">Not specified</span>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const interview = row.original;
        return (
          <div className="flex items-center space-x-2">
            {interview.meetingLink && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(interview.meetingLink, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Join
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onInterviewClick(interview);
              }}
            >
              View Details
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Scheduled Interviews</h3>
        <p className="text-sm text-gray-600 mt-1">
          {interviews.length} interview{interviews.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <DataTable
        data={interviews}
        columns={columns}
        onRowClick={onInterviewClick}
      />
    </div>
  );
};
