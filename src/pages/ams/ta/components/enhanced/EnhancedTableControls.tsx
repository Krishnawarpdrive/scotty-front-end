
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, TrendingUp } from "lucide-react";
import { EnhancedBulkActions } from "./EnhancedBulkActions";

interface EnhancedTableControlsProps {
  totalCount: number;
  selectedCount: number;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  onBulkAction: (action: string) => void;
}

export const EnhancedTableControls: React.FC<EnhancedTableControlsProps> = ({
  totalCount,
  selectedCount,
  isFilterOpen,
  onToggleFilter,
  onBulkAction
}) => {
  return (
    <motion.div 
      className="bg-white rounded-t-md border border-b-0 border-gray-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {totalCount} Total
          </Badge>
          <EnhancedBulkActions 
            selectedCount={selectedCount}
            onBulkAction={onBulkAction}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilter}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button
            size="sm"
            className="bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
