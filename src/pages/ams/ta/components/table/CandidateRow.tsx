
import React from "react";
import { TableRow, TableCell } from "@/components/ui-mui/Table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui-mui/Checkbox";
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
        "hover:bg-gray-50"
      )}
      data-state={isSelected ? 'selected' : undefined}
    >
      <TableCell className="text-center">
        <Checkbox 
          checked={isSelected} 
          onChange={() => onToggleSelect(candidate.id)}
        />
      </TableCell>
      <TableCell>
        <ActionButtons />
      </TableCell>
      <TableCell 
        className="cursor-pointer hover:text-blue-600 hover:underline"
        onClick={() => onCandidateClick(candidate)}
      >
        {candidate.name}
      </TableCell>
      <TableCell>{candidate.hiring}</TableCell>
      <TableCell>{candidate.interviewing}</TableCell>
      <TableCell>
        <StageDots stage={candidate.stage} />
      </TableCell>
      <TableCell>
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
      <TableCell>
        <StatusBadge status={candidate.status} />
      </TableCell>
      <TableCell>{candidate.timeSpent}</TableCell>
      <TableCell>{candidate.targetDate}</TableCell>
    </TableRow>
  );
};
