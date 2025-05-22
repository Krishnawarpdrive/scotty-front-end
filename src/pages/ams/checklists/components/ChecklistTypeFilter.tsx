
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { checklistTypeOptions } from '../types';

interface ChecklistTypeFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

export const ChecklistTypeFilter: React.FC<ChecklistTypeFilterProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 h-9 ${selectedType ? 'bg-muted' : ''}`}
        >
          <Filter className="h-4 w-4" />
          {selectedType ? `Type: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` : 'Filter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {checklistTypeOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={`cursor-pointer ${selectedType === option.value ? 'bg-muted' : ''}`}
              onClick={() => onTypeChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
          {selectedType && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive"
                onClick={() => onTypeChange(null)}
              >
                Clear Filter
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
