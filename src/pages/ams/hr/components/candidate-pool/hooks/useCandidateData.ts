
import { useState, useEffect } from 'react';
import { Candidate } from '../CandidateTable';

// Mock data for candidates
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    candidateId: 'CND-001',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    type: 'Experienced',
    source: 'LinkedIn',
    appliedRoles: ['Senior Developer', 'Tech Lead'],
    currentStage: 'Phone Interview',
    score: 85,
    status: 'Active',
    assignedTA: {
      name: 'Mike Chen',
      avatar: undefined
    },
    lastUpdated: '2024-01-15',
    priority: 'High',
    nextAction: 'Schedule technical interview',
    actionDueDate: '2024-01-20',
    experience: {
      years: 5,
      months: 6
    },
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: '2',
    name: 'David Williams',
    candidateId: 'CND-002',
    email: 'david.williams@email.com',
    phone: '+1 (555) 987-6543',
    type: 'Fresher',
    source: 'Job Board',
    appliedRoles: ['Junior Developer'],
    currentStage: 'Screening',
    score: 72,
    status: 'Active',
    assignedTA: {
      name: 'Emma Davis',
      avatar: undefined
    },
    lastUpdated: '2024-01-14',
    priority: 'Medium',
    nextAction: 'Complete screening call',
    actionDueDate: '2024-01-18',
    experience: {
      years: 0,
      months: 6
    },
    skills: ['JavaScript', 'HTML', 'CSS']
  }
];

export const useCandidateData = () => {
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCandidates = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllCandidates(mockCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return {
    allCandidates,
    filteredCandidates: allCandidates,
    totalCandidates: allCandidates.length,
    isLoading
  };
};
