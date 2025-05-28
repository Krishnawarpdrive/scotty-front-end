
import React from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui-mui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CandidateScoreProps {
  score: number;
  isHovered: boolean;
}

export const CandidateScore: React.FC<CandidateScoreProps> = ({
  score,
  isHovered
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <TableCell>
      <motion.div
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Badge className={`${getScoreColor(score)} border`}>
          <Star className="h-3 w-3 mr-1" />
          {score}%
        </Badge>
      </motion.div>
    </TableCell>
  );
};
