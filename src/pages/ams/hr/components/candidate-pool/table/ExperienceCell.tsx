
import React from 'react';
import { Candidate } from '../CandidateTable';

interface ExperienceCellProps {
  candidate: Candidate;
}

export const ExperienceCell: React.FC<ExperienceCellProps> = ({ candidate }) => {
  const formatExperience = (years: number, months: number) => {
    return `${years}y ${months}m`;
  };

  return (
    <span className="text-sm text-gray-900">
      {formatExperience(candidate.experience.years, candidate.experience.months)}
    </span>
  );
};
