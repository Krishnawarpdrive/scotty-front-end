
import React from "react";
import { TableCell } from "@/components/ui-mui/table";
import { Badge } from "@/components/ui/badge";

interface CandidateRoleInfoProps {
  role: string;
  priority: string;
}

export const CandidateRoleInfo: React.FC<CandidateRoleInfoProps> = ({
  role,
  priority
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <TableCell>
      <div className="space-y-1">
        <div className="text-sm font-medium">{role}</div>
        <Badge variant="outline" className={getPriorityColor(priority)}>
          {priority}
        </Badge>
      </div>
    </TableCell>
  );
};
