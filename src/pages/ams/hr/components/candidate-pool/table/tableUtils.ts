
import { Candidate } from '../CandidateTable';

export const formatExperience = (candidate: Candidate): string => {
  if (candidate.experience) {
    return `${candidate.experience.years}y ${candidate.experience.months}m`;
  }
  if (candidate.experienceYears) {
    return `${candidate.experienceYears}y`;
  }
  return 'N/A';
};

export const getPriorityColor = (candidate: Candidate): string => {
  switch (candidate.priority) {
    case 'High':
      return 'text-red-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'default';
    case 'On Hold':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    case 'Hired':
      return 'default';
    default:
      return 'outline';
  }
};
