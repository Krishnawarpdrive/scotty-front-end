
import React from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui-mui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface CandidateRowCheckboxProps {
  isSelected: boolean;
  onToggleSelect: () => void;
}

export const CandidateRowCheckbox: React.FC<CandidateRowCheckboxProps> = ({
  isSelected,
  onToggleSelect
}) => {
  return (
    <TableCell onClick={(e) => e.stopPropagation()}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelect}
          className="border-2 data-[state=checked]:bg-[#009933] data-[state=checked]:border-[#009933]"
        />
      </motion.div>
    </TableCell>
  );
};
