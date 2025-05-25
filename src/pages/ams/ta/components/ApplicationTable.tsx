
import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui-mui/Table";
import { Drawer, DrawerContent } from "@/components/ui-mui/Drawer";
import { CandidateDetails } from "./CandidateDetails";
import { CandidateRow } from "./table/CandidateRow";
import { CandidateTableHeader } from "./table/TableHeader";
import { candidates } from "./data/candidatesData";
import { Candidate } from "./types/CandidateTypes";

export const ApplicationTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

  return (
    <div className="w-full mt-1">
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <CandidateTableHeader
              selectedCount={selectedIds.length}
              totalCount={candidates.length}
              onToggleSelectAll={toggleSelectAll}
            />
            <TableBody>
              {candidates.map(candidate => (
                <CandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedIds.includes(candidate.id)}
                  onToggleSelect={toggleSelect}
                  onCandidateClick={handleCandidateClick}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Drawer open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} side="right">
        <DrawerContent onClose={() => setIsDetailsOpen(false)}>
          <CandidateDetails onClose={() => setIsDetailsOpen(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
