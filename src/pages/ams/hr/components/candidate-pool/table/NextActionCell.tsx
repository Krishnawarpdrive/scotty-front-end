
import React from 'react';
import { Candidate } from '../CandidateTable';

interface NextActionCellProps {
  candidate: Candidate;
}

export const NextActionCell: React.FC<NextActionCellProps> = ({ candidate }) => {
  if (!candidate.nextAction) {
    return <span className="text-gray-400 text-sm">No action required</span>;
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">{candidate.nextAction}</div>
      {candidate.actionDueDate && (
        <div className="text-xs text-gray-500">Due: {candidate.actionDueDate}</div>
      )}
    </div>
  );
};
