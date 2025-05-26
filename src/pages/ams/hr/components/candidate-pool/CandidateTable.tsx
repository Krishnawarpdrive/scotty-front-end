
import React from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Mail, Phone, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Candidate {
  id: string;
  name: string;
  candidateId: string;
  avatar?: string;
  email: string;
  phone: string;
  type: 'Fresher' | 'Experienced';
  source: string;
  appliedRoles: string[];
  currentStage: string;
  score: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired' | 'Withdrawn';
  assignedTA: {
    name: string;
    avatar?: string;
  };
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low';
  nextAction?: string;
  actionDueDate?: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectAll,
  onCandidateClick,
  onQuickAction,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Hired': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Withdrawn': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRowClassName = (candidate: Candidate) => {
    if (candidate.status === 'Rejected') return 'bg-red-50 hover:bg-red-100';
    if (candidate.status === 'On Hold') return 'bg-yellow-50 hover:bg-yellow-100';
    if (candidate.status === 'Hired') return 'bg-blue-50 hover:bg-blue-100';
    if (candidate.priority === 'High') return 'border-l-4 border-red-400 hover:bg-red-50';
    return 'hover:bg-gray-50';
  };

  const columns: DataTableColumn<Candidate>[] = [
    {
      id: 'select',
      header: '',
      cell: (candidate) => (
        <Checkbox
          checked={selectedCandidates.includes(candidate.id)}
          onCheckedChange={(checked) => onCandidateSelect(candidate.id, !!checked)}
        />
      ),
      width: '50px',
    },
    {
      id: 'candidate',
      header: 'Candidate',
      cell: (candidate) => (
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900 truncate">{candidate.name}</p>
              {candidate.priority === 'High' && (
                <Star className="h-4 w-4 text-red-500 fill-current" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="truncate">{candidate.candidateId}</span>
              <Badge variant="outline" className="text-xs">
                {candidate.type}
              </Badge>
            </div>
          </div>
        </div>
      ),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'contact',
      header: 'Contact',
      cell: (candidate) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-gray-400" />
            <span className="truncate max-w-40">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{candidate.phone}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      accessorKey: 'source',
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'appliedRoles',
      header: 'Applied Roles',
      cell: (candidate) => (
        <div className="space-y-1">
          {candidate.appliedRoles.slice(0, 2).map((role, index) => (
            <div key={index} className="text-sm truncate max-w-32">{role}</div>
          ))}
          {candidate.appliedRoles.length > 2 && (
            <div className="text-xs text-gray-500">
              +{candidate.appliedRoles.length - 2} more
            </div>
          )}
        </div>
      ),
      enableFiltering: true,
    },
    {
      id: 'currentStage',
      header: 'Current Stage',
      cell: (candidate) => (
        <Badge variant="outline" className="text-xs">
          {candidate.currentStage}
        </Badge>
      ),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'score',
      header: 'Score',
      cell: (candidate) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{candidate.score}</span>
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
        </div>
      ),
      enableSorting: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (candidate) => (
        <Badge className={cn('text-xs border', getStatusColor(candidate.status))}>
          {candidate.status}
        </Badge>
      ),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'assignedTA',
      header: 'Assigned TA',
      cell: (candidate) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={candidate.assignedTA.avatar} />
            <AvatarFallback className="text-xs">
              {candidate.assignedTA.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm truncate max-w-24">{candidate.assignedTA.name}</span>
        </div>
      ),
      enableFiltering: true,
    },
    {
      id: 'nextAction',
      header: 'Next Action',
      cell: (candidate) => (
        candidate.nextAction ? (
          <div className="space-y-1">
            <div className="text-sm font-medium">{candidate.nextAction}</div>
            {candidate.actionDueDate && (
              <div className="text-xs text-gray-500">Due: {candidate.actionDueDate}</div>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">No action required</span>
        )
      ),
    },
    {
      id: 'lastUpdated',
      header: 'Last Updated',
      cell: (candidate) => (
        <span className="text-sm text-gray-600">{candidate.lastUpdated}</span>
      ),
      enableSorting: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (candidate) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onCandidateClick(candidate);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction('email', candidate.id);
            }}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction('call', candidate.id);
            }}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Add custom row rendering with status-based styling
  const customDataTable = (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className={cn(
            'border rounded-lg p-4 cursor-pointer transition-colors',
            getRowClassName(candidate),
            selectedCandidates.includes(candidate.id) && 'ring-2 ring-blue-500'
          )}
          onClick={() => onCandidateClick(candidate)}
        >
          {/* Custom row content would go here if needed */}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header with select all */}
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-3">
        <Checkbox
          checked={selectedCandidates.length === candidates.length && candidates.length > 0}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm font-medium text-gray-700">
          Select All ({candidates.length} candidates)
        </span>
      </div>

      <DataTable
        data={candidates}
        columns={columns}
        onRowClick={onCandidateClick}
      />
    </div>
  );
};
