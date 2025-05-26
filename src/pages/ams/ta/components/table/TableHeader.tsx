
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
      <TableRow className="h-[48px]">
        <TableHead className="w-10 text-[12px] text-[#262626] font-rubik font-medium uppercase">
          <Checkbox 
            checked={selectedCount === totalCount && totalCount > 0}
            indeterminate={selectedCount > 0 && selectedCount < totalCount}
            onChange={onToggleSelectAll}
          />
        </TableHead>
        <TableHead className="w-10 text-[12px] text-[#262626] font-rubik font-medium uppercase">ACTIONS</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">CANDIDATE</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">HIRING FOR</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">INTERVIEWING FOR</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">STAGES</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">RESPONSIBLE PERSON</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">ACTION STATUS</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">TIME SPENT</TableHead>
        <TableHead className="text-[12px] text-[#262626] font-rubik font-medium uppercase">TARGET DATE</TableHead>
      </TableRow>
    </TableHeader>
  );
};
