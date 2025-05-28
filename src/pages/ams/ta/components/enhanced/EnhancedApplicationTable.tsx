
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody } from "@/components/ui-mui/table";
import { Drawer, DrawerContent } from "@/components/ui-mui/Drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Eye, Clock, TrendingUp, Filter } from "lucide-react";
import { EnhancedCandidateProfileDrawer } from "../candidate-profile/EnhancedCandidateProfileDrawer";
import { EnhancedCandidateRow } from "./EnhancedCandidateRow";
import { EnhancedTableHeader } from "./EnhancedTableHeader";
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

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'screening': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'offer': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div 
      className="w-full mt-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Enhanced Header Controls */}
      <motion.div 
        className="bg-white rounded-t-md border border-b-0 border-gray-200 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {candidates.length} Total
            </Badge>
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <Badge className="bg-[#009933] text-white">
                  {selectedIds.length} Selected
                </Badge>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => handleBulkAction('approve')}
                    className="bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('reject')}
                    className="hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                  >
                    Reject
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              size="sm"
              className="bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Stage</label>
                  <select 
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={filters.stage}
                    onChange={(e) => setFilters({...filters, stage: e.target.value})}
                  >
                    <option value="all">All Stages</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <select 
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select 
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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
