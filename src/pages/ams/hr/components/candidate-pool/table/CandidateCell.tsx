import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Candidate } from '../CandidateTable';
interface CandidateCellProps {
  candidate: Candidate;
}
export const CandidateCell: React.FC<CandidateCellProps> = ({
  candidate
}) => {
  return <div className="flex items-center gap-3 min-w-0">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={candidate.avatar} />
        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 truncate">{candidate.name}</p>
          {candidate.priority === 'High' && <Star className="h-4 w-4 text-red-500 fill-current" />}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="truncate">{candidate.candidateId}</span>
          
        </div>
      </div>
    </div>;
};