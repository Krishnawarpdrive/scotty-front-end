
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui-mui/Table";
import { Checkbox } from "@/components/ui-mui/Checkbox";

interface TableHeaderProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
}

export const CandidateTableHeader: React.FC<TableHeaderProps> = ({
  selectedCount,
  totalCount,
  onToggleSelectAll,
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10">
          <Checkbox 
            checked={selectedCount === totalCount && totalCount > 0}
            indeterminate={selectedCount > 0 && selectedCount < totalCount}
            onChange={onToggleSelectAll}
          />
        </TableHead>
        <TableHead className="w-10">ACTIONS</TableHead>
        <TableHead>CANDIDATE</TableHead>
        <TableHead>HIRING FOR</TableHead>
        <TableHead>INTERVIEWING FOR</TableHead>
        <TableHead>STAGES</TableHead>
        <TableHead>RESPONSIBLE PERSON</TableHead>
        <TableHead>ACTION STATUS</TableHead>
        <TableHead>TIME SPENT</TableHead>
        <TableHead>TARGET DATE</TableHead>
      </TableRow>
    </TableHeader>
  );
};
