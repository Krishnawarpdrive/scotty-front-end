
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TableRow, TableCell } from "@/components/ui-mui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Eye, Clock, Star } from "lucide-react";
import { StageDots } from "../table/StageDots";
import { StatusBadge } from "../table/StatusBadge";
import { Candidate } from "../types/CandidateTypes";

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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

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
      <TableCell onClick={(e) => e.stopPropagation()}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(candidate.id)}
            className="border-2 data-[state=checked]:bg-[#009933] data-[state=checked]:border-[#009933]"
          />
        </motion.div>
      </TableCell>

      <TableCell>
        <motion.div 
          className="flex items-center space-x-3"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{candidate.name}</div>
            <div className="text-sm text-gray-500">{candidate.email}</div>
          </div>
        </motion.div>
      </TableCell>

      <TableCell>
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Badge className={`${getScoreColor(candidate.score)} border`}>
            <Star className="h-3 w-3 mr-1" />
            {candidate.score}%
          </Badge>
        </motion.div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="text-sm font-medium">{candidate.role}</div>
          <Badge variant="outline" className={getPriorityColor(candidate.priority)}>
            {candidate.priority}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <motion.div
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <StageDots 
            currentStage={candidate.currentStage} 
            totalStages={candidate.totalStages} 
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
          {candidate.timeInStage}
        </div>
      </TableCell>

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
    </motion.tr>
  );
};
