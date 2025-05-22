
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ClientHealthScoreCellProps {
  healthScore: number;
}

export const ClientHealthScoreCell: React.FC<ClientHealthScoreCellProps> = ({ healthScore }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-xs">{healthScore}</span>
      <Progress value={healthScore} className="h-2 w-16" />
    </div>
  );
};

export default ClientHealthScoreCell;
