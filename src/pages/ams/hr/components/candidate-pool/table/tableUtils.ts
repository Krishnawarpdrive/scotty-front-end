
import { Candidate } from '../CandidateTable';

export const getRowClassName = (candidate: Candidate) => {
  if (candidate.status === 'Rejected') return 'bg-red-50 hover:bg-red-100';
  if (candidate.status === 'On Hold') return 'bg-yellow-50 hover:bg-yellow-100';
  if (candidate.status === 'Hired') return 'bg-blue-50 hover:bg-blue-100';
  if (candidate.priority === 'High') return 'border-l-4 border-red-400 hover:bg-red-50';
  return 'hover:bg-gray-50';
};
