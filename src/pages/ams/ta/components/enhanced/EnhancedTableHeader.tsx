
import React from "react";
import { motion } from "framer-motion";
import { TableHeader, TableHead, TableRow } from "@/components/ui-mui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnhancedTableHeaderProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
}

export const EnhancedTableHeader: React.FC<EnhancedTableHeaderProps> = ({
  selectedCount,
  totalCount,
  onToggleSelectAll
}) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  return (
    <TableHeader>
      <TableRow className="hover:bg-gray-50/50">
        <TableHead className="w-12">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Checkbox
              checked={isAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onCheckedChange={onToggleSelectAll}
              className="border-2 data-[state=checked]:bg-[#009933] data-[state=checked]:border-[#009933]"
            />
          </motion.div>
        </TableHead>
        
        <TableHead>
          <Button 
            variant="ghost" 
            className="h-auto p-0 font-medium text-xs uppercase tracking-wide hover:text-[#009933] transition-colors duration-200"
          >
            Candidate
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </TableHead>
        
        <TableHead>
          <Button 
            variant="ghost" 
            className="h-auto p-0 font-medium text-xs uppercase tracking-wide hover:text-[#009933] transition-colors duration-200"
          >
            Score
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </TableHead>
        
        <TableHead>
          <Button 
            variant="ghost" 
            className="h-auto p-0 font-medium text-xs uppercase tracking-wide hover:text-[#009933] transition-colors duration-200"
          >
            Role
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </TableHead>
        
        <TableHead>
          <span className="font-medium text-xs uppercase tracking-wide">Stage</span>
        </TableHead>
        
        <TableHead>
          <Button 
            variant="ghost" 
            className="h-auto p-0 font-medium text-xs uppercase tracking-wide hover:text-[#009933] transition-colors duration-200"
          >
            Status
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </TableHead>
        
        <TableHead>
          <Button 
            variant="ghost" 
            className="h-auto p-0 font-medium text-xs uppercase tracking-wide hover:text-[#009933] transition-colors duration-200"
          >
            Time in Stage
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        </TableHead>
        
        <TableHead>
          <span className="font-medium text-xs uppercase tracking-wide">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
