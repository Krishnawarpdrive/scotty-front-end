
import React from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui-mui/table";

interface CandidateAvatarProps {
  name: string;
  email: string;
  isHovered: boolean;
}

export const CandidateAvatar: React.FC<CandidateAvatarProps> = ({
  name,
  email,
  isHovered
}) => {
  return (
    <TableCell>
      <motion.div 
        className="flex items-center space-x-3"
        animate={isHovered ? { x: 5 } : { x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </motion.div>
    </TableCell>
  );
};
