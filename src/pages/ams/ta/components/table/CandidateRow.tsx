
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Candidate } from "../types/CandidateTypes";
import { StatusBadge } from "./StatusBadge";
import { StageDots } from "./StageDots";
import { ActionButtons } from "./ActionButtons";

interface CandidateRowProps {
  candidate: Candidate;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onCandidateClick: (candidate: Candidate) => void;
}

export const CandidateRow: React.FC<CandidateRowProps> = ({
  candidate,
  isSelected,
  onToggleSelect,
  onCandidateClick,
}) => {
  return (
    <TableRow 
      className={cn(
        isSelected ? "bg-blue-50" : "",
        "h-12 hover:bg-gray-50"
      )}
    >
      <TableCell className="text-center py-2">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={() => onToggleSelect(candidate.id)}
          className="rounded border-gray-300"
        />
      </TableCell>
      <TableCell className="py-2">
        <ActionButtons />
      </TableCell>
      <TableCell 
        className="py-2 text-[12px] text-[#262626] cursor-pointer hover:text-blue-600 hover:underline"
        onClick={() => onCandidateClick(candidate)}
      >
        {candidate.name}
      </TableCell>
      <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.hiring}</TableCell>
      <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.interviewing}</TableCell>
      <TableCell className="py-2">
        <StageDots stage={candidate.stage} />
      </TableCell>
      <TableCell className="py-2 text-[12px] text-[#262626]">
        <div className="flex items-center">
          <Avatar className="h-5 w-5 mr-2">
            <AvatarImage src={candidate.responsible.avatar} />
            <AvatarFallback className="text-[10px] bg-green-100">
              {candidate.responsible.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {candidate.responsible.name}
        </div>
      </TableCell>
      <TableCell className="py-2">
        <StatusBadge status={candidate.status} />
      </TableCell>
      <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.timeSpent}</TableCell>
      <TableCell className="py-2 text-[12px] text-[#262626]">{candidate.targetDate}</TableCell>
    </TableRow>
  );
};
