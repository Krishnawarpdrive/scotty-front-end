
import React from 'react';
import { EnhancedDataTable, Column, TableAction, BulkAction } from '@/components/enhanced-tables';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Eye, Edit, User, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  current_stage: string;
  source: string;
  experience_years: number;
  skills: string[];
  current_position?: string;
  current_employer?: string;
  status: 'Active' | 'Inactive' | 'Hired' | 'Rejected';
  applied_date: string;
  last_updated: string;
}

interface EnhancedCandidateTableProps {
  candidates: Candidate[];
  loading?: boolean;
  onRefresh?: () => void;
  onViewProfile?: (candidate: Candidate) => void;
  onEditCandidate?: (candidate: Candidate) => void;
  onScheduleInterview?: (candidate: Candidate) => void;
  onMoveToStage?: (candidates: Candidate[], stage: string) => void;
  onExportCandidates?: (candidates: Candidate[]) => void;
}

export function EnhancedCandidateTable({
  candidates,
  loading = false,
  onRefresh,
  onViewProfile,
  onEditCandidate,
  onScheduleInterview,
  onMoveToStage,
  onExportCandidates,
}: EnhancedCandidateTableProps) {
  const toast = useEnhancedToast();

  const columns: Column<Candidate>[] = [
    {
      key: 'name',
      header: 'Candidate',
      sortable: true,
      filterable: true,
      accessor: (candidate) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{candidate.name}</div>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>{candidate.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'current_stage',
      header: 'Current Stage',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Applied', label: 'Applied' },
        { value: 'Phone Screening', label: 'Phone Screening' },
        { value: 'Technical Interview', label: 'Technical Interview' },
        { value: 'Final Interview', label: 'Final Interview' },
        { value: 'Offer', label: 'Offer' },
      ],
      accessor: (candidate) => (
        <Badge variant="outline">
          {candidate.current_stage}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Hired', label: 'Hired' },
        { value: 'Rejected', label: 'Rejected' },
      ],
      accessor: (candidate) => (
        <Badge 
          variant={
            candidate.status === 'Active' ? 'default' :
            candidate.status === 'Hired' ? 'default' :
            candidate.status === 'Rejected' ? 'destructive' : 'secondary'
          }
        >
          {candidate.status}
        </Badge>
      ),
    },
    {
      key: 'experience_years',
      header: 'Experience',
      sortable: true,
      align: 'center',
      accessor: (candidate) => (
        <span className="font-medium">{candidate.experience_years} years</span>
      ),
    },
    {
      key: 'current_position',
      header: 'Current Role',
      sortable: true,
      filterable: true,
      accessor: (candidate) => (
        <div>
          {candidate.current_position && (
            <div className="font-medium text-gray-900">{candidate.current_position}</div>
          )}
          {candidate.current_employer && (
            <div className="text-sm text-gray-500">{candidate.current_employer}</div>
          )}
        </div>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Direct', label: 'Direct' },
        { value: 'Referral', label: 'Referral' },
        { value: 'Vendor', label: 'Vendor' },
        { value: 'LinkedIn', label: 'LinkedIn' },
        { value: 'Job Board', label: 'Job Board' },
      ],
      accessor: (candidate) => (
        <Badge variant="outline">
          {candidate.source}
        </Badge>
      ),
    },
    {
      key: 'skills',
      header: 'Key Skills',
      accessor: (candidate) => (
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'applied_date',
      header: 'Applied',
      sortable: true,
      accessor: (candidate) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(candidate.applied_date).toLocaleDateString()}
          </span>
        </div>
      ),
    },
  ];

  const tableActions: TableAction<Candidate>[] = [
    {
      label: 'View Profile',
      icon: <Eye className="h-4 w-4" />,
      onClick: (candidate) => onViewProfile?.(candidate),
      variant: 'ghost',
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (candidate) => onEditCandidate?.(candidate),
      variant: 'ghost',
    },
    {
      label: 'Schedule Interview',
      icon: <Clock className="h-4 w-4" />,
      onClick: (candidate) => onScheduleInterview?.(candidate),
      variant: 'ghost',
      condition: (candidate) => candidate.status === 'Active',
    },
  ];

  const bulkActions: BulkAction<Candidate>[] = [
    {
      label: 'Move to Phone Screening',
      icon: <Phone className="h-4 w-4 mr-2" />,
      onClick: (candidates) => {
        onMoveToStage?.(candidates, 'Phone Screening');
        toast.success({
          title: 'Candidates moved',
          description: `${candidates.length} candidate(s) moved to Phone Screening.`
        });
      },
      variant: 'default',
      condition: (candidates) => candidates.some(c => c.current_stage === 'Applied'),
    },
    {
      label: 'Schedule Interviews',
      icon: <Calendar className="h-4 w-4 mr-2" />,
      onClick: (candidates) => {
        console.log('Schedule interviews for:', candidates);
        toast.info({
          title: 'Schedule Interviews',
          description: `Opening scheduler for ${candidates.length} candidate(s).`
        });
      },
      variant: 'outline',
      condition: (candidates) => candidates.every(c => c.status === 'Active'),
    },
  ];

  return (
    <EnhancedDataTable
      data={candidates}
      columns={columns}
      keyField="id"
      title="Candidate Pipeline"
      description="Track candidates through your hiring process"
      searchPlaceholder="Search candidates by name, email, skills, or company..."
      loading={loading}
      searchable={true}
      filterable={true}
      sortable={true}
      selectable={true}
      exportable={true}
      refreshable={true}
      pagination={true}
      pageSize={12}
      actions={tableActions}
      bulkActions={bulkActions}
      onRefresh={onRefresh}
      onExport={onExportCandidates}
      onRowClick={onViewProfile}
      emptyMessage="No candidates found. Start sourcing candidates for your open positions."
      rowClassName={(candidate) => 
        candidate.status === 'Hired' ? 'bg-green-50 border-green-200' :
        candidate.status === 'Rejected' ? 'bg-red-50 border-red-200' : ''
      }
    />
  );
}
