
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, ArrowUpDown } from "lucide-react";

interface SearchFiltersBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedClientsCount: number;
}

const SearchFiltersBar: React.FC<SearchFiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedClientsCount
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="relative max-w-xs">
          <Input
            className="pl-10 h-9"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="h-9 flex items-center gap-1.5">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        
        {selectedClientsCount > 0 && (
          <span className="text-sm text-gray-500 ml-2">
            {selectedClientsCount} {selectedClientsCount === 1 ? 'client' : 'clients'} selected
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 flex items-center gap-1.5">
          <Download className="h-4 w-4" />
          Export
        </Button>
        
        <Button variant="outline" size="sm" className="h-9 flex items-center gap-1.5">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </div>
    </div>
  );
};

export default SearchFiltersBar;
