
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CandidateData {
  id: string;
  name: string;
  candidateId: string;
  avatar?: string;
  email: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export const CandidateInfoCellRenderer: React.FC<ICellRendererParams> = (params) => {
  const candidate: CandidateData = params.data;
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={candidate.avatar} />
        <AvatarFallback className="text-xs bg-green-100 text-green-700">
          {getInitials(candidate.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-900 truncate">{candidate.name}</span>
          {candidate.priority === 'High' && <Star className="h-4 w-4 text-red-500 fill-current" />}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate">{candidate.candidateId}</span>
        </div>
      </div>
    </div>
  );
};
