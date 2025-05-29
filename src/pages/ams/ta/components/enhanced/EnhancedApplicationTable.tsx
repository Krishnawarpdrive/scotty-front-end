
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table, TableBody } from "@/components/ui-mui/table";
import { EnhancedCandidateProfileDrawer } from "../candidate-profile/EnhancedCandidateProfileDrawer";
import { EnhancedCandidateRow } from "./EnhancedCandidateRow";
import { EnhancedTableHeader } from "./EnhancedTableHeader";
import { EnhancedTableControls } from "./EnhancedTableControls";
import { EnhancedTableFilters } from "./EnhancedTableFilters";
import { candidates } from "../data/candidatesData";
import { Candidate } from "../types/CandidateTypes";

interface TableFilters {
  stage: string;
  priority: string;
  status: string;
}

export const EnhancedApplicationTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TableFilters>({
    stage: 'all',
    priority: 'all',
    status: 'all'
  });

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === candidates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(candidates.map(candidate => candidate.id));
    }
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedIds);
  };

  return (
    <motion.div 
      className="w-full mt-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Enhanced Header Controls */}
      <EnhancedTableControls
        totalCount={candidates.length}
        selectedCount={selectedIds.length}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        onBulkAction={handleBulkAction}
      />

      {/* Filters Panel */}
      <EnhancedTableFilters
        isOpen={isFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Enhanced Table */}
      <div className="bg-white rounded-b-md shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <EnhancedTableHeader
              selectedCount={selectedIds.length}
              totalCount={candidates.length}
              onToggleSelectAll={toggleSelectAll}
            />
            <TableBody>
              {candidates.map((candidate, index) => (
                <EnhancedCandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  isSelected={selectedIds.includes(candidate.id)}
                  onToggleSelect={toggleSelect}
                  onCandidateClick={handleCandidateClick}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EnhancedCandidateProfileDrawer 
        open={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        candidate={selectedCandidate}
      />
    </motion.div>
  );
};
