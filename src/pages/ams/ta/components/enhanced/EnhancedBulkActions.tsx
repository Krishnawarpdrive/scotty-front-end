
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnhancedBulkActionsProps {
  selectedCount: number;
  onBulkAction: (action: string) => void;
}

export const EnhancedBulkActions: React.FC<EnhancedBulkActionsProps> = ({
  selectedCount,
  onBulkAction
}) => {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2"
    >
      <Badge className="bg-[#009933] text-white">
        {selectedCount} Selected
      </Badge>
      <div className="flex gap-1">
        <Button
          size="sm"
          onClick={() => onBulkAction('approve')}
          className="bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105"
        >
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onBulkAction('reject')}
          className="hover:bg-red-50 hover:border-red-200 transition-all duration-200"
        >
          Reject
        </Button>
      </div>
    </motion.div>
  );
};
