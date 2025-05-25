
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <TableHeader className="bg-gray-50">
      <TableRow>
        <TableHead className="w-10 py-2">
          <input 
            type="checkbox" 
            checked={selectedCount === totalCount && totalCount > 0}
            onChange={onToggleSelectAll}
            className="rounded border-gray-300"
          />
        </TableHead>
        <TableHead className="w-10 py-2 text-[12px] font-normal text-[#262626]">ACTIONS</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">CANDIDATE</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">HIRING FOR</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">INTERVIEWING FOR</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">STAGES</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">RESPONSIBLE PERSON</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">ACTION STATUS</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">TIME SPENT</TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">TARGET DATE</TableHead>
      </TableRow>
    </TableHeader>
  );
};
