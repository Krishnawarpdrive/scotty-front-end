
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SkillsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

const SkillsSearchBar: React.FC<SkillsSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by Skill Name, Category, Aliases..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        onClick={onFilterClick}
        className="flex items-center gap-2 h-9"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
};

export default SkillsSearchBar;
