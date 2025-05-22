
import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
      
      {isFiltering ? (
        <>
          <h3 className="text-lg font-semibold mb-2">No checklists match your filters</h3>
          <p className="text-muted-foreground text-[12px] mb-4 max-w-md">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">No checklists found</h3>
          <p className="text-muted-foreground text-[12px] mb-4 max-w-md">
            You haven't created any checklists yet. Start by creating your first checklist template.
          </p>
          <Button onClick={onCreateClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Checklist
          </Button>
        </>
      )}
    </div>
  );
};
