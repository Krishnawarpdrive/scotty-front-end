
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Mail, Phone } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface ActionsCellProps {
  candidate: Candidate;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({
  candidate,
  onCandidateClick,
  onQuickAction,
}) => {
  return (
    <div className="flex gap-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onCandidateClick(candidate);
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onQuickAction('email', candidate.id);
        }}
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onQuickAction('call', candidate.id);
        }}
      >
        <Phone className="h-4 w-4" />
      </Button>
    </div>
  );
};
