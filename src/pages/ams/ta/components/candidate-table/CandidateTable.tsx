
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui-mui/table';
import { Checkbox } from '@/components/ui-mui/Checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { TACandidate } from '../../types/CandidateTypes';
import { CandidateTableRow } from './CandidateTableRow';
import { CandidateDetailRow } from './CandidateDetailRow';

interface CandidateTableProps {
  candidates: TACandidate[];
  selectedCandidates: string[];
  onSelectCandidate: (id: string) => void;
  onSelectAll: () => void;
  onCandidateClick: (candidate: TACandidate) => void;
  onScheduleInterview: (candidateId: string, roleId: string) => void;
  onRequestFeedback: (candidateId: string) => void;
  onMoveToNextStage: (candidateId: string, roleId: string) => void;
  onAddNote: (candidateId: string, note: string) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onSelectCandidate,
  onSelectAll,
  onCandidateClick,
  onScheduleInterview,
  onRequestFeedback,
  onMoveToNextStage,
  onAddNote
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.appliedRoles.some(role => 
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleRowExpansion = (candidateId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedRows(newExpanded);
  };

  const allSelected = filteredCandidates.length > 0 && 
    filteredCandidates.every(candidate => selectedCandidates.includes(candidate.id));
  const someSelected = selectedCandidates.length > 0 && !allSelected;

  const tableColumns = [
    { id: 'select', width: 'w-12' },
    { id: 'expand', width: 'w-12' },
    { id: 'candidate', width: 'w-[200px]' },
    { id: 'appliedRoles', width: 'w-[180px]' },
    { id: 'source', width: 'w-[120px]' },
    { id: 'experience', width: 'w-[100px]' },
    { id: 'lastStage', width: 'w-[140px]' },
    { id: 'score', width: 'w-[80px]' },
    { id: 'status', width: 'w-[100px]' },
    { id: 'assignedTA', width: 'w-[80px]' },
    { id: 'nextAction', width: 'w-[150px]' },
    { id: 'lastUpdated', width: 'w-[120px]' }
  ];

  const totalColumns = tableColumns.length;

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {selectedCandidates.length > 0 && (
            <Badge variant="secondary" className="px-3 py-1">
              {selectedCandidates.length} selected
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedCandidates.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Bulk Schedule
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{filteredCandidates.length} candidates</span>
        </div>
        <span>•</span>
        <span>{selectedCandidates.length} selected</span>
        <span>•</span>
        <span>{expandedRows.size} expanded</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-[200px]">CANDIDATE</TableHead>
              <TableHead className="w-[180px]">APPLIED ROLES</TableHead>
              <TableHead className="w-[120px]">SOURCE</TableHead>
              <TableHead className="w-[100px]">EXPERIENCE</TableHead>
              <TableHead className="w-[140px]">LAST STAGE</TableHead>
              <TableHead className="w-[80px]">SCORE</TableHead>
              <TableHead className="w-[100px]">STATUS</TableHead>
              <TableHead className="w-[80px]">TA</TableHead>
              <TableHead className="w-[150px]">NEXT ACTION</TableHead>
              <TableHead className="w-[120px]">LAST UPDATED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <CandidateTableRow
                  candidate={candidate}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  isExpanded={expandedRows.has(candidate.id)}
                  onToggleSelect={onSelectCandidate}
                  onToggleExpand={toggleRowExpansion}
                  onCandidateClick={onCandidateClick}
                />
                {expandedRows.has(candidate.id) && (
                  <CandidateDetailRow
                    candidate={candidate}
                    colSpan={totalColumns}
                    onScheduleInterview={onScheduleInterview}
                    onRequestFeedback={onRequestFeedback}
                    onMoveToNextStage={onMoveToNextStage}
                    onAddNote={onAddNote}
                  />
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or add new candidates.</p>
        </div>
      )}
    </div>
  );
};
