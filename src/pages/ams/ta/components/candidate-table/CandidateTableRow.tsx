
import React from 'react';
import { TableRow, TableCell } from '@/components/ui-mui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui-mui/Checkbox';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';
import { TACandidate } from '../../types/CandidateTypes';
import { cn } from '@/lib/utils';

interface CandidateTableRowProps {
  candidate: TACandidate;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onCandidateClick: (candidate: TACandidate) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'Hired':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'Direct':
      return 'bg-blue-100 text-blue-800';
    case 'Vendor':
      return 'bg-purple-100 text-purple-800';
    case 'Referral':
      return 'bg-green-100 text-green-800';
    case 'Job Board':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const CandidateTableRow: React.FC<CandidateTableRowProps> = ({
  candidate,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
  onCandidateClick
}) => {
  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox or expand button
    if ((e.target as HTMLElement).closest('.checkbox-cell') || 
        (e.target as HTMLElement).closest('.expand-cell')) {
      return;
    }
    onCandidateClick(candidate);
  };

  return (
    <TableRow
      className={cn(
        "cursor-pointer hover:bg-gray-50 transition-colors h-[60px]",
        isSelected && "bg-blue-50",
        isExpanded && "border-b-0"
      )}
      data-state={isSelected ? 'selected' : undefined}
      onClick={handleRowClick}
    >
      <TableCell className="checkbox-cell w-12">
        <Checkbox
          checked={isSelected}
          onChange={() => onToggleSelect(candidate.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </TableCell>
      
      <TableCell className="expand-cell w-12">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(candidate.id);
          }}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </TableCell>

      <TableCell className="w-[200px]">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback className="text-xs bg-gray-100">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {candidate.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {candidate.email}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="w-[180px]">
        <div className="space-y-1">
          {candidate.appliedRoles.slice(0, 2).map((role, index) => (
            <div key={role.id} className="text-xs">
              <span className="font-medium text-gray-900">{role.roleName}</span>
              <span className="text-gray-500 ml-1">@ {role.clientName}</span>
            </div>
          ))}
          {candidate.appliedRoles.length > 2 && (
            <span className="text-xs text-gray-400">
              +{candidate.appliedRoles.length - 2} more
            </span>
          )}
        </div>
      </TableCell>

      <TableCell className="w-[120px]">
        <Badge className={cn("text-xs", getSourceColor(candidate.source))}>
          {candidate.source}
        </Badge>
      </TableCell>

      <TableCell className="w-[100px]">
        <span className="text-sm text-gray-900">{candidate.experience}</span>
      </TableCell>

      <TableCell className="w-[140px]">
        <span className="text-sm text-gray-900">{candidate.lastStage}</span>
      </TableCell>

      <TableCell className="w-[80px]">
        {candidate.score && (
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{candidate.score}</span>
          </div>
        )}
      </TableCell>

      <TableCell className="w-[100px]">
        <Badge className={cn("text-xs", getStatusColor(candidate.status))}>
          {candidate.status}
        </Badge>
      </TableCell>

      <TableCell className="w-[80px]">
        <span className="text-sm text-gray-900">{candidate.assignedTA}</span>
      </TableCell>

      <TableCell className="w-[150px]">
        <span className="text-sm text-gray-900">{candidate.nextAction}</span>
      </TableCell>

      <TableCell className="w-[120px]">
        <span className="text-sm text-gray-500">{candidate.lastUpdated}</span>
      </TableCell>
    </TableRow>
  );
};
