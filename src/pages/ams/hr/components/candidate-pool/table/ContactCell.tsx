
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface ContactCellProps {
  candidate: Candidate;
}

export const ContactCell: React.FC<ContactCellProps> = ({ candidate }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm">
        <Mail className="h-3 w-3 text-gray-400" />
        <span className="truncate max-w-40">{candidate.email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="h-3 w-3 text-gray-400" />
        <span>{candidate.phone}</span>
      </div>
    </div>
  );
};
