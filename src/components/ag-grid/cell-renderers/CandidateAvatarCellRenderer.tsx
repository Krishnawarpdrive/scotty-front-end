
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CandidateData {
  name: string;
  email: string;
  avatar?: string;
}

export const CandidateAvatarCellRenderer: React.FC<ICellRendererParams> = (params) => {
  const candidate: CandidateData = params.data;
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={candidate.avatar} />
        <AvatarFallback className="text-xs bg-green-100 text-green-700">
          {getInitials(candidate.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm text-gray-900">{candidate.name}</span>
        <span className="text-xs text-gray-500">{candidate.email}</span>
      </div>
    </div>
  );
};
