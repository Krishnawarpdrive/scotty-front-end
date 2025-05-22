
import React from 'react';
import { 
  TableRow, 
  TableHead, 
  TableHeader 
} from "@/components/ui/table";
import ColumnFilterPopover from './ColumnFilterPopover';
import { Skill } from '../data/mockData';

interface SkillsTableHeaderProps {
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  selectedSkills: number[];
  skills: Skill[];
  columnFilters: Record<string, string[]>;
  columnSearchTerms: Record<string, string>;
  handleSort: (column: string) => void;
  handleSelectAllSkills: () => void;
  handleColumnFilterChange: (column: string, value: string) => void;
  clearColumnFilter: (column: string) => void;
  handleColumnSearchChange: (column: string, value: string) => void;
  getColumnFilterOptions: (column: string) => string[];
}

const SkillsTableHeader: React.FC<SkillsTableHeaderProps> = ({
  sortColumn,
  selectedSkills,
  skills,
  columnFilters,
  columnSearchTerms,
  handleSort,
  handleSelectAllSkills,
  handleColumnFilterChange,
  clearColumnFilter,
  handleColumnSearchChange,
  getColumnFilterOptions
}) => {
  return (
    <TableHeader className="bg-gray-50">
      <TableRow>
        <TableHead className="w-10 py-2">
          <input
            type="checkbox"
            checked={selectedSkills.length === skills.length && skills.length > 0}
            onChange={handleSelectAllSkills}
            className="rounded border-gray-300"
          />
        </TableHead>
        <TableHead 
          className="py-2 text-[12px] font-normal text-[#262626]"
          onClick={() => handleSort('name')}
        >
          <ColumnFilterPopover
            column="name"
            columnDisplayName="Skill Name"
            sortColumn={sortColumn}
            filterOptions={getColumnFilterOptions('name')}
            columnFilters={columnFilters.name}
            searchTerm={columnSearchTerms.name}
            onSearchChange={(value) => handleColumnSearchChange('name', value)}
            onFilterChange={(value) => handleColumnFilterChange('name', value)}
            onClearFilters={() => clearColumnFilter('name')}
          />
        </TableHead>
        <TableHead 
          className="py-2 text-[12px] font-normal text-[#262626]"
          onClick={() => handleSort('category')}
        >
          <ColumnFilterPopover
            column="category"
            columnDisplayName="Category"
            sortColumn={sortColumn}
            filterOptions={getColumnFilterOptions('category')}
            columnFilters={columnFilters.category}
            searchTerm={columnSearchTerms.category}
            onSearchChange={(value) => handleColumnSearchChange('category', value)}
            onFilterChange={(value) => handleColumnFilterChange('category', value)}
            onClearFilters={() => clearColumnFilter('category')}
          />
        </TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
          Aliases
        </TableHead>
        <TableHead 
          className="py-2 text-[12px] font-normal text-[#262626]"
          onClick={() => handleSort('usageCount')}
        >
          <ColumnFilterPopover
            column="usageCount"
            columnDisplayName="Usage Count"
            sortColumn={sortColumn}
            filterOptions={getColumnFilterOptions('usageCount')}
            columnFilters={columnFilters.usageCount}
            searchTerm={columnSearchTerms.usageCount}
            onSearchChange={(value) => handleColumnSearchChange('usageCount', value)}
            onFilterChange={(value) => handleColumnFilterChange('usageCount', value)}
            onClearFilters={() => clearColumnFilter('usageCount')}
          />
        </TableHead>
        <TableHead 
          className="py-2 text-[12px] font-normal text-[#262626]"
          onClick={() => handleSort('dateAdded')}
        >
          <ColumnFilterPopover
            column="dateAdded"
            columnDisplayName="Date Added"
            sortColumn={sortColumn}
            filterOptions={getColumnFilterOptions('dateAdded')}
            columnFilters={columnFilters.dateAdded}
            searchTerm={columnSearchTerms.dateAdded}
            onSearchChange={(value) => handleColumnSearchChange('dateAdded', value)}
            onFilterChange={(value) => handleColumnFilterChange('dateAdded', value)}
            onClearFilters={() => clearColumnFilter('dateAdded')}
          />
        </TableHead>
        <TableHead className="py-2 text-[12px] font-normal text-[#262626]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SkillsTableHeader;
