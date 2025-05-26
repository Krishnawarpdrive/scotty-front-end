
import { useState, useMemo } from 'react';
import { Candidate } from './CandidateTable';
import { FilterState } from './CandidateFilters';

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Nithin Chandarika',
    candidateId: 'CID-NC001',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face',
    email: 'nithin@example.com',
    phone: '+91 9876543210',
    type: 'Fresher',
    source: 'LinkedIn',
    appliedRoles: ['UI/UX Designer', 'Product Designer'],
    currentStage: 'Internal Interview',
    score: 4.2,
    status: 'Active',
    assignedTA: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=50&h=50&fit=crop&crop=face'
    },
    lastUpdated: '2 hours ago',
    priority: 'High',
    nextAction: 'Schedule technical round',
    actionDueDate: 'Today'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    candidateId: 'CID-PS002',
    avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=face',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    type: 'Experienced',
    source: 'Referral',
    appliedRoles: ['Senior Developer'],
    currentStage: 'Client Interview',
    score: 4.5,
    status: 'Active',
    assignedTA: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=50&h=50&fit=crop&crop=face'
    },
    lastUpdated: '1 day ago',
    priority: 'Medium',
    nextAction: 'Follow up after client interview',
    actionDueDate: 'Tomorrow'
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    candidateId: 'CID-RK003',
    email: 'rahul@example.com',
    phone: '+91 9876543212',
    type: 'Experienced',
    source: 'Job Board',
    appliedRoles: ['Full Stack Developer', 'Backend Developer'],
    currentStage: 'Technical Round',
    score: 3.8,
    status: 'On Hold',
    assignedTA: {
      name: 'Emma Davis'
    },
    lastUpdated: '3 days ago',
    priority: 'Low'
  },
  {
    id: '4',
    name: 'Sneha Patel',
    candidateId: 'CID-SP004',
    email: 'sneha@example.com',
    phone: '+91 9876543213',
    type: 'Fresher',
    source: 'Campus',
    appliedRoles: ['QA Engineer'],
    currentStage: 'Final Round',
    score: 4.1,
    status: 'Active',
    assignedTA: {
      name: 'John Smith'
    },
    lastUpdated: '4 hours ago',
    priority: 'High',
    nextAction: 'Prepare offer letter',
    actionDueDate: 'Today'
  },
  {
    id: '5',
    name: 'Amit Singh',
    candidateId: 'CID-AS005',
    email: 'amit@example.com',
    phone: '+91 9876543214',
    type: 'Experienced',
    source: 'LinkedIn',
    appliedRoles: ['DevOps Engineer'],
    currentStage: 'Rejected',
    score: 2.1,
    status: 'Rejected',
    assignedTA: {
      name: 'Sarah Johnson'
    },
    lastUpdated: '1 week ago',
    priority: 'Low'
  }
];

export const useCandidatePool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    source: [],
    experience: [],
    stage: [],
    assignedTA: [],
    dateRange: '',
    roleType: []
  });

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    let result = mockCandidates;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.phone.includes(searchTerm) ||
        candidate.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter(candidate => filters.status.includes(candidate.status));
    }

    // Apply source filter
    if (filters.source.length > 0) {
      result = result.filter(candidate => filters.source.includes(candidate.source));
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      result = result.filter(candidate => filters.experience.includes(candidate.type));
    }

    // Apply stage filter
    if (filters.stage.length > 0) {
      result = result.filter(candidate => filters.stage.includes(candidate.currentStage));
    }

    // Apply assigned TA filter
    if (filters.assignedTA.length > 0) {
      result = result.filter(candidate => filters.assignedTA.includes(candidate.assignedTA.name));
    }

    return result;
  }, [searchTerm, filters]);

  // Calculate metrics
  const metrics = useMemo(() => ({
    totalCandidates: mockCandidates.length,
    activeCandidates: mockCandidates.filter(c => c.status === 'Active').length,
    newThisWeek: 12,
    interviewsScheduled: 8,
    callsToday: 15,
    avgResponseTime: '2.5h'
  }), []);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return value ? count + 1 : count;
    }, 0);
  }, [filters]);

  // Handlers
  const handleCandidateSelect = (candidateId: string, selected: boolean) => {
    setSelectedCandidates(prev => 
      selected 
        ? [...prev, candidateId]
        : prev.filter(id => id !== candidateId)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedCandidates(selected ? filteredCandidates.map(c => c.id) : []);
  };

  const handleFilterChange = (key: keyof FilterState, value: string[] | string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: Array.isArray(prev[key]) ? [] : '' 
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      status: [],
      source: [],
      experience: [],
      stage: [],
      assignedTA: [],
      dateRange: '',
      roleType: []
    });
  };

  const handleBulkAction = (action: string, options?: any) => {
    console.log(`Bulk action: ${action}`, { selectedCandidates, options });
    // Implement bulk action logic here
  };

  const handleQuickAction = (action: string, candidateId: string) => {
    console.log(`Quick action: ${action} for candidate: ${candidateId}`);
    // Implement quick action logic here
  };

  return {
    // Data
    candidates: filteredCandidates,
    totalCandidates: mockCandidates.length,
    metrics,
    
    // UI State
    searchTerm,
    selectedCandidates,
    showFilters,
    filters,
    activeFilterCount,
    
    // Handlers
    setSearchTerm,
    setShowFilters,
    handleCandidateSelect,
    handleSelectAll,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters,
    handleBulkAction,
    handleQuickAction,
    setSelectedCandidates
  };
};
