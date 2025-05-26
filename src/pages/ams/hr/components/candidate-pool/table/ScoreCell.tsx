
import React from 'react';
import { Star } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface ScoreCellProps {
  candidate: Candidate;
}

export const ScoreCell: React.FC<ScoreCellProps> = ({ candidate }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-medium">{candidate.score}</span>
      <Star className="h-3 w-3 text-yellow-500 fill-current" />
    </div>
  );
};
