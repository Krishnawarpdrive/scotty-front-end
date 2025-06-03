
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Users, 
  UserCheck, 
  UserX, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { EnhancedCandidateTable } from './EnhancedCandidateTable';
import { Candidate } from './CandidateTable';

interface CandidatePoolContentProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  showFilters: boolean;
  searchTerm: string;
  metrics: {
    totalCandidates: number;
    activeCandidates: number;
    newThisWeek: number;
    interviewsScheduled: number;
    callsToday: number;
    avgResponseTime: string;
  };
  activeFilterCount: number;
  onCandidateClick?: (candidate: Candidate) => void;
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onQuickAction: (action: string, candidateId: string) => void;
  setSearchTerm: (term: string) => void;
  setShowFilters: (show: boolean) => void;
  setSelectedCandidates: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CandidatePoolContent: React.FC<CandidatePoolContentProps> = ({
  candidates,
  selectedCandidates,
  showFilters,
  searchTerm,
  metrics,
  activeFilterCount,
  onCandidateSelect,
  onSelectAll,
  onQuickAction,
  setSearchTerm,
  setShowFilters,
  setSelectedCandidates
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold">{metrics.totalCandidates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{metrics.activeCandidates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-bold">{metrics.interviewsScheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">New This Week</p>
                <p className="text-2xl font-bold">{metrics.newThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search candidates by name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedCandidates.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {selectedCandidates.length} selected
              </Badge>
              <Button size="sm" variant="outline">
                Bulk Actions
              </Button>
            </div>
          )}
          
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Enhanced Table */}
      <EnhancedCandidateTable
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        onCandidateSelect={onCandidateSelect}
        onSelectAll={onSelectAll}
        onQuickAction={onQuickAction}
      />
    </div>
  );
};
