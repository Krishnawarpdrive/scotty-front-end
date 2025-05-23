
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface DueDateCellProps {
  client: any;
}

export const DueDateCell = ({ client }: DueDateCellProps) => {
  const dueDate = new Date(client.nextDueDate);
  const today = new Date();
  const isOverdue = dueDate < today;
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`min-w-[90px] inline-block cursor-help ${isOverdue ? "text-red-500 font-medium" : ""}`}>
            {dueDate.toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric'
            })}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Due Date: {dueDate.toLocaleDateString()}</p>
            {isOverdue ? (
              <p className="text-red-500">Overdue by {Math.abs(daysUntilDue)} days</p>
            ) : (
              <p>Due in {daysUntilDue} days</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
