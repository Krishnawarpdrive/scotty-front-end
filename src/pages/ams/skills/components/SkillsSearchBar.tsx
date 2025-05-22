
import React from 'react';
import { Search, Trash2, Download } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SkillsSearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCount: number;
  onFilterClick: () => void;
  onDeleteClick: () => void;
  onExportClick: () => void;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const SkillsSearchBar: React.FC<SkillsSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCount,
  onDeleteClick,
  onExportClick
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          className="pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDeleteClick}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onExportClick}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      )}
    </div>
  );
};

export default SkillsSearchBar;
