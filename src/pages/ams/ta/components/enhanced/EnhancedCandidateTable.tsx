
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnhancedDataTable } from '@/components/enhanced-tables/EnhancedDataTable';
import { Search, Filter, Download, RefreshCw, Eye, Edit, Calendar, MoreHorizontal, Phone, Video, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EnhancedCandidateTableProps {
  candidates: any[];
  loading: boolean;
  onRefresh: () => void;
  onViewProfile: (candidate: any) => void;
  onEditCandidate: (candidate: any) => void;
  onScheduleInterview: (candidate: any) => void;
  onMoveToStage: (candidates: any[], stage: string) => void;
  onExportCandidates: (candidates: any[]) => void;
}

export const EnhancedCandidateTable: React.FC<EnhancedCandidateTableProps> = ({
  candidates,
  loading,
  onRefresh,
  onViewProfile,
  onEditCandidate,
  onScheduleInterview,
  onMoveToStage,
  onExportCandidates
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Phone Screening': 'bg-blue-50 text-blue-700 border-blue-200',
      'Technical Interview': 'bg-purple-50 text-purple-700 border-purple-200',
      'Aptitude Test': 'bg-orange-50 text-orange-700 border-orange-200',
      'Final Interview': 'bg-green-50 text-green-700 border-green-200',
      'Offer Discussion': 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return colors[stage] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStageAction = (stage: string) => {
    switch (stage) {
      case 'Phone Screening':
        return { label: 'Conduct Call', icon: Phone, variant: 'default' as const };
      case 'Technical Interview':
        return { label: 'Schedule Interview', icon: Video, variant: 'default' as const };
      case 'Aptitude Test':
        return { label: 'Assign Test', icon: FileText, variant: 'default' as const };
      case 'Final Interview':
        return { label: 'Schedule Final', icon: Calendar, variant: 'default' as const };
      default:
        return { label: 'Next Step', icon: Calendar, variant: 'outline' as const };
    }
  };

  const columns = [
    {
      id: 'name',
      header: 'Candidate',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {row.original.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.original.name}</div>
            <div className="text-sm text-gray-500">{row.original.email}</div>
          </div>
        </div>
      )
    },
    {
      id: 'current_stage',
      header: 'Current Stage',
      accessorKey: 'current_stage',
      cell: ({ row }: any) => (
        <Badge className={getStageColor(row.original.current_stage)}>
          {row.original.current_stage}
        </Badge>
      )
    },
    {
      id: 'applications',
      header: 'Active Applications',
      cell: ({ row }: any) => (
        <div className="space-y-1">
          {row.original.role_applications?.slice(0, 2).map((app: any, index: number) => (
            <div key={index} className="text-sm">
              <div className="font-medium text-gray-900">{app.role_name}</div>
              <div className="text-gray-500">{app.client_name}</div>
            </div>
          ))}
          {row.original.role_applications?.length > 2 && (
            <div className="text-xs text-gray-500">
              +{row.original.role_applications.length - 2} more
            </div>
          )}
        </div>
      )
    },
    {
      id: 'experience',
      header: 'Experience',
      accessorKey: 'experience_years',
      cell: ({ row }: any) => (
        <div>
          <div className="text-sm font-medium">{row.original.experience_years} years</div>
          <div className="text-xs text-gray-500">{row.original.current_position}</div>
        </div>
      )
    },
    {
      id: 'skills',
      header: 'Skills',
      cell: ({ row }: any) => (
        <div className="flex flex-wrap gap-1">
          {row.original.skills?.slice(0, 3).map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {row.original.skills?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{row.original.skills.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    {
      id: 'score',
      header: 'Score',
      accessorKey: 'overall_score',
      cell: ({ row }: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {row.original.overall_score || '--'}
          </div>
          <div className="text-xs text-gray-500">
            {row.original.overall_score ? '/100' : 'No score'}
          </div>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const stageAction = getStageAction(row.original.current_stage);
        const StageIcon = stageAction.icon;
        
        return (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={stageAction.variant}
              onClick={() => onScheduleInterview(row.original)}
              className="flex items-center gap-1 text-xs"
            >
              <StageIcon className="h-3 w-3" />
              {stageAction.label}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" style={{ zIndex: 9999 }}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewProfile(row.original)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEditCandidate(row.original)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onScheduleInterview(row.original)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || candidate.current_stage === stageFilter;
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Candidate Pipeline</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => onExportCandidates(filteredCandidates)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent style={{ zIndex: 9999 }}>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Phone Screening">Phone Screening</SelectItem>
              <SelectItem value="Technical Interview">Technical Interview</SelectItem>
              <SelectItem value="Aptitude Test">Aptitude Test</SelectItem>
              <SelectItem value="Final Interview">Final Interview</SelectItem>
              <SelectItem value="Offer Discussion">Offer Discussion</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent style={{ zIndex: 9999 }}>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Enhanced Data Table */}
        <EnhancedDataTable
          data={filteredCandidates}
          columns={columns}
          loading={loading}
          emptyMessage="No candidates found"
          className="border-0"
        />
      </CardContent>
    </Card>
  );
};
