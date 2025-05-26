
import { useMemo } from 'react';
import { Candidate } from '../CandidateTable';
import { FilterState } from '../CandidateFilters';

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    candidateId: 'CND-001',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b776?w=150',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    type: 'Experienced',
    source: 'LinkedIn',
    appliedRoles: ['Senior Frontend Developer', 'React Developer'],
    currentStage: 'Technical Interview',
    score: 85,
    status: 'Active',
    assignedTA: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    lastUpdated: '2 hours ago',
    priority: 'High',
    nextAction: 'Schedule final interview',
    actionDueDate: '2024-01-20',
    experience: { years: 5, months: 8 }
  },
  {
    id: '2',
    name: 'Michael Chen',
    candidateId: 'CND-002',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    type: 'Experienced',
    source: 'Company Website',
    appliedRoles: ['Backend Developer', 'Node.js Developer'],
    currentStage: 'HR Screening',
    score: 78,
    status: 'Active',
    assignedTA: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    lastUpdated: '4 hours ago',
    priority: 'Medium',
    nextAction: 'Technical assessment',
    actionDueDate: '2024-01-22',
    experience: { years: 3, months: 2 }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    candidateId: 'CND-003',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    type: 'Fresher',
    source: 'University Partnership',
    appliedRoles: ['Junior Developer', 'Frontend Intern'],
    currentStage: 'Initial Screening',
    score: 72,
    status: 'Active',
    assignedTA: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    lastUpdated: '1 day ago',
    priority: 'Low',
    nextAction: 'Code review',
    actionDueDate: '2024-01-25',
    experience: { years: 0, months: 6 }
  },
  {
    id: '4',
    name: 'James Wilson',
    candidateId: 'CND-004',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 456-7890',
    type: 'Experienced',
    source: 'Referral',
    appliedRoles: ['Full Stack Developer'],
    currentStage: 'Final Interview',
    score: 92,
    status: 'Active',
    assignedTA: {
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150'
    },
    lastUpdated: '3 hours ago',
    priority: 'High',
    nextAction: 'Send offer letter',
    actionDueDate: '2024-01-19',
    experience: { years: 7, months: 3 }
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    candidateId: 'CND-005',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 567-8901',
    type: 'Experienced',
    source: 'Job Board',
    appliedRoles: ['DevOps Engineer'],
    currentStage: 'On Hold',
    score: 68,
    status: 'On Hold',
    assignedTA: {
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    lastUpdated: '2 days ago',
    priority: 'Medium',
    nextAction: 'Follow up call',
    actionDueDate: '2024-01-30',
    experience: { years: 4, months: 11 }
  },
];

export const useCandidateData = (searchTerm: string, filters: FilterState) => {
  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.email.toLowerCase().includes(searchLower) ||
          candidate.candidateId.toLowerCase().includes(searchLower) ||
          candidate.appliedRoles.some(role => role.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(candidate.status)) {
        return false;
      }

      // Source filter
      if (filters.source.length > 0 && !filters.source.includes(candidate.source)) {
        return false;
      }

      // Experience filter
      if (filters.experience.length > 0) {
        const candidateType = candidate.type;
        if (!filters.experience.includes(candidateType)) {
          return false;
        }
      }

      // Stage filter
      if (filters.stage.length > 0 && !filters.stage.includes(candidate.currentStage)) {
        return false;
      }

      // Assigned TA filter
      if (filters.assignedTA.length > 0 && !filters.assignedTA.includes(candidate.assignedTA.name)) {
        return false;
      }

      // Role type filter
      if (filters.roleType.length > 0) {
        const hasMatchingRole = candidate.appliedRoles.some(role => 
          filters.roleType.some(filterRole => 
            role.toLowerCase().includes(filterRole.toLowerCase())
          )
        );
        if (!hasMatchingRole) return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  return {
    allCandidates: mockCandidates,
    filteredCandidates,
    totalCandidates: mockCandidates.length
  };
};
