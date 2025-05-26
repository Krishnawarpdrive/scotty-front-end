
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Upload, UserPlus } from 'lucide-react';

interface CandidatePoolHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCandidates: number;
  filteredCount: number;
  activeFilters: number;
  onAdvancedFilters: () => void;
  onExport: () => void;
  onImport: () => void;
  onAddCandidate: () => void;
}

export const CandidatePoolHeader: React.FC<CandidatePoolHeaderProps> = ({
  searchTerm,
  onSearchChange,
  totalCandidates,
  filteredCount,
  activeFilters,
  onAdvancedFilters,
  onExport,
  onImport,
  onAddCandidate,
}) => {
  return (
    <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidate Pool</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all candidates across your hiring pipeline
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {filteredCount} of {totalCandidates} candidates
            </Badge>
            {activeFilters > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilters} filter{activeFilters > 1 ? 's' : ''} active
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={onAddCandidate}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, phone, or candidate ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={onAdvancedFilters}
          className={activeFilters > 0 ? 'border-blue-500 text-blue-600' : ''}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilters > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};
