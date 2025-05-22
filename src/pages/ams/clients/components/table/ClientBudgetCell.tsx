
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ClientBudgetCellProps {
  budgetUtilized: number;
}

export const ClientBudgetCell: React.FC<ClientBudgetCellProps> = ({ budgetUtilized }) => {
  return (
    <div className="w-20">
      <Progress value={budgetUtilized} className="h-2" />
      <span className="text-xs">{budgetUtilized}%</span>
    </div>
  );
};

export default ClientBudgetCell;
