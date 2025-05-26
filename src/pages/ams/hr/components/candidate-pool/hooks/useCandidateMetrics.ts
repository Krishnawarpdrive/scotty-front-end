
import { useMemo } from 'react';
import { Candidate } from '../CandidateTable';

export const useCandidateMetrics = (allCandidates: Candidate[]) => {
  const metrics = useMemo(() => ({
    totalCandidates: allCandidates.length,
    activeCandidates: allCandidates.filter(c => c.status === 'Active').length,
    newThisWeek: 12,
    interviewsScheduled: 8,
    callsToday: 15,
    avgResponseTime: '2.5h'
  }), [allCandidates]);

  return { metrics };
};
