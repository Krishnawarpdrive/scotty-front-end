
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui-mui/table";
import { Clock } from "lucide-react";
import { StageDots } from "../table/StageDots";
import { StatusBadge } from "../table/StatusBadge";
import { Candidate } from "../types/CandidateTypes";
import { CandidateRowCheckbox } from "./CandidateRowCheckbox";
import { CandidateAvatar } from "./CandidateAvatar";
import { CandidateScore } from "./CandidateScore";
import { CandidateRoleInfo } from "./CandidateRoleInfo";
import { CandidateActions } from "./CandidateActions";

interface EnhancedCandidateRowProps {
  candidate: Candidate;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onCandidateClick: (candidate: Candidate) => void;
}

export const EnhancedCandidateRow: React.FC<EnhancedCandidateRowProps> = ({
  candidate,
  index,
  isSelected,
  onToggleSelect,
  onCandidateClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        transition-all duration-200 cursor-pointer
        ${isSelected ? 'bg-blue-50 border-l-4 border-l-[#009933]' : 'hover:bg-gray-50'}
        ${isHovered ? 'shadow-md' : ''}
      `}
      onClick={() => onCandidateClick(candidate)}
    >
      <CandidateRowCheckbox
        isSelected={isSelected}
        onToggleSelect={() => onToggleSelect(candidate.id)}
      />

      <CandidateAvatar
        name={candidate.name}
        email={candidate.email}
        isHovered={isHovered}
      />

      <CandidateScore
        score={candidate.score || 0}
        isHovered={isHovered}
      />

      <CandidateRoleInfo
        role={candidate.role}
        priority={candidate.priority}
      />

      <TableCell>
        <motion.div
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <StageDots 
            stage={candidate.currentStage || 1} 
            totalStages={candidate.totalStages || 6} 
          />
        </motion.div>
      </TableCell>

      <TableCell>
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <StatusBadge status={candidate.status} />
        </motion.div>
      </TableCell>

      <TableCell>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {candidate.timeInStage || '0d'}
        </div>
      </TableCell>

      <CandidateActions
        candidate={candidate}
        index={index}
        onCandidateClick={onCandidateClick}
      />
    </motion.tr>
  );
};
