
import React from "react";
import { Candidate } from "../types/CandidateTypes";

interface StatusBadgeProps {
  status: Candidate['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = '';
  let icon = null;
  let displayText = '';
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-100 text-green-700';
      icon = <span className="mr-1">🟢</span>;
      displayText = 'Active';
      break;
    case 'pending':
      bgColor = 'bg-amber-100 text-amber-700';
      icon = <span className="mr-1">🔄</span>;
      displayText = 'Pending';
      break;
    case 'completed':
      bgColor = 'bg-blue-100 text-blue-700';
      icon = <span className="mr-1">✅</span>;
      displayText = 'Completed';
      break;
    case 'rejected':
      bgColor = 'bg-red-100 text-red-700';
      icon = <span className="mr-1">🚫</span>;
      displayText = 'Rejected';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-700';
      icon = <span className="mr-1">❓</span>;
      displayText = 'Unknown';
      break;
  }
  
  return (
    <div className={`flex items-center text-xs px-2 py-1 rounded ${bgColor}`}>
      {icon}
      {displayText}
    </div>
  );
};
