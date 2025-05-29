
import React from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui-mui/table";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Eye } from "lucide-react";
import { Candidate } from "../types/CandidateTypes";

interface CandidateActionsProps {
  candidate: Candidate;
  index: number;
  onCandidateClick: (candidate: Candidate) => void;
}

export const CandidateActions: React.FC<CandidateActionsProps> = ({
  candidate,
  index,
  onCandidateClick
}) => {
  return (
    <TableCell onClick={(e) => e.stopPropagation()}>
      <motion.div 
        className="flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-[#009933]/10 hover:text-[#009933] transition-all duration-200"
            onClick={() => console.log('Call:', candidate.name)}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            onClick={() => console.log('Message:', candidate.name)}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-50 hover:text-gray-600 transition-all duration-200"
            onClick={() => onCandidateClick(candidate)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </TableCell>
  );
};
