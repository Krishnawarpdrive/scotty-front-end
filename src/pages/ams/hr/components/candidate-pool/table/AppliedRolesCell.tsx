
import React from 'react';
import { Candidate } from '../CandidateTable';

interface AppliedRolesCellProps {
  candidate: Candidate;
}

export const AppliedRolesCell: React.FC<AppliedRolesCellProps> = ({ candidate }) => {
  return (
    <div className="space-y-1">
      {candidate.appliedRoles.slice(0, 2).map((role, index) => (
        <div key={index} className="text-sm truncate max-w-32">{role}</div>
      ))}
      {candidate.appliedRoles.length > 2 && (
        <div className="text-xs text-gray-500">
          +{candidate.appliedRoles.length - 2} more
        </div>
      )}
    </div>
  );
};
