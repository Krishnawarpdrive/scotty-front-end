
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

interface ChecklistEmptyStateProps {
  onCreateClick: () => void;
  isFiltering: boolean;
}

export const ChecklistEmptyState: React.FC<ChecklistEmptyStateProps> = ({ 
  onCreateClick, 
  isFiltering 
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {isFiltering ? (
          <Search className="h-8 w-8 text-gray-400" />
        ) : (
          <Plus className="h-8 w-8 text-gray-400" />
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isFiltering ? 'No matching checklists found' : 'No checklists created yet'}
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {isFiltering 
          ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
          : 'Get started by creating your first checklist to streamline your recruitment processes.'
        }
      </p>
      
      {!isFiltering && (
        <Button onClick={onCreateClick} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Your First Checklist
        </Button>
      )}
    </div>
  );
};
