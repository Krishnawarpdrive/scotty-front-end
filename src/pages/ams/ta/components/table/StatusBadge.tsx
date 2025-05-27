
import React from "react";
import { Candidate } from "../types/CandidateTypes";

interface StatusBadgeProps {
  status: Candidate['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = '';
  let icon = null;
  
  switch (status.type) {
    case 'scheduled':
      bgColor = 'bg-gray-100 text-gray-700';
      icon = <span className="mr-1">📅</span>;
      break;
    case 'awaited':
      bgColor = 'bg-amber-100 text-amber-700';
      icon = <span className="mr-1">🔄</span>;
      break;
    case 'delay':
      bgColor = 'bg-red-100 text-red-700';
      icon = <span className="mr-1">🚫</span>;
      break;
    case 'needs':
      bgColor = 'bg-amber-100 text-amber-700';
      icon = <span className="mr-1">📝</span>;
      break;
    case 'screening':
      bgColor = 'bg-gray-100 text-gray-700';
      icon = <span className="mr-1">🔎</span>;
      break;
  }
  
  return (
    <div className={`flex items-center text-xs px-2 py-1 rounded ${bgColor}`}>
      {icon}
      {status.text} {status.time && <span className="ml-1">· {status.time}</span>}
      {status.date && <span className="ml-1">on {status.date}</span>}
    </div>
  );
};
