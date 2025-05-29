
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TableFilters {
  stage: string;
  priority: string;
  status: string;
}

interface EnhancedTableFiltersProps {
  isOpen: boolean;
  filters: TableFilters;
  onFiltersChange: (filters: TableFilters) => void;
}

export const EnhancedTableFilters: React.FC<EnhancedTableFiltersProps> = ({
  isOpen,
  filters,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof TableFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Stage</label>
              <select 
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={filters.stage}
                onChange={(e) => handleFilterChange('stage', e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <select 
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select 
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
