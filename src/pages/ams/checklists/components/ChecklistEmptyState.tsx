
import React from 'react';
import { CheckSquare, Plus, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChecklistEmptyStateProps {
  onCreateClick: () => void;
  isFiltering: boolean;
}

export const ChecklistEmptyState: React.FC<ChecklistEmptyStateProps> = ({
  onCreateClick,
  isFiltering
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed rounded-lg bg-gray-50 space-y-4">
      {isFiltering ? (
        <>
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">No checklists found</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            No checklists match your current search or filter criteria. Try adjusting your filters or create a new checklist.
          </p>
        </>
      ) : (
        <>
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <CheckSquare className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium">No Checklists Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Create your first checklist to help standardize processes across your organization. 
            Checklists can be assigned to roles, clients or kept as general templates.
          </p>
          <Button onClick={onCreateClick} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create First Checklist
          </Button>
        </>
      )}
    </div>
  );
};
