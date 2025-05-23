
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DataTableColumn } from "@/components/ui/data-table/types";

export const getRequirementsColumns = (): DataTableColumn<any>[] => [
  {
    id: "requirementId",
    header: "Requirement ID",
    accessorKey: "id",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <span className="font-medium hover:text-primary cursor-pointer min-w-[80px] inline-block">
        #{req.id.substring(0, 8)}
      </span>
    ),
  },
  {
    id: "linkedRole",
    header: "Role",
    accessorKey: "linkedRole",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <span className="hover:text-primary cursor-pointer min-w-[100px] inline-block truncate">
        {req.linkedRole}
      </span>
    ),
  },
  {
    id: "clientName",
    header: "Client",
    accessorKey: "clientName",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <span className="min-w-[100px] inline-block truncate">
        {req.clientName}
      </span>
    ),
  },
  {
    id: "dueDate",
    header: "Due Date",
    accessorKey: "dueDate",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => {
      const dueDate = new Date(req.dueDate);
      const today = new Date();
      const isOverdue = dueDate < today;
      
      return (
        <span className={`min-w-[90px] inline-block ${isOverdue ? "text-red-500 font-medium" : ""}`}>
          {dueDate.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric'
          })}
        </span>
      );
    },
  },
  {
    id: "taAssigned",
    header: "TA Assigned",
    accessorKey: "taAssigned",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <div className="min-w-[60px]">
        {req.taAssigned.length > 0 ? (
          <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300">
            Yes
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300">
            No
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "candidateStageProgress",
    header: "Progress",
    accessorKey: "candidateStageProgress",
    enableSorting: true,
    enableFiltering: false,
    cell: (req: any) => {
      let status = "Stalled";
      if (req.candidateStageProgress > 70) status = "Active";
      else if (req.candidateStageProgress > 30) status = "In Progress";
      
      return (
        <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300 min-w-[80px]">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "alertReason",
    header: "Alert Reason",
    accessorKey: "alertReason",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => {
      const alertReasons = [
        "TA not assigned",
        "Requirement not approved",
        "No candidates sourced",
        "High rejection rate",
        "Due soon",
        "TA slow response",
        "No interview feedback",
        "Multiple edits",
        "Pipeline mismatch",
        "Pending for 7+ days"
      ];
      const randomReason = alertReasons[Math.floor(Math.random() * alertReasons.length)];
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block">
                {randomReason}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{randomReason}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "cta",
    header: "CTA",
    accessorKey: "cta",
    enableSorting: false,
    enableFiltering: false,
    cell: (req: any) => {
      const ctas = [
        "Assign TA",
        "Send for Approval",
        "Start Sourcing",
        "Revise Criteria",
        "Notify TA",
        "Follow Up TA",
        "Request Feedback",
        "Audit Changes",
        "Fix Hiring Flow",
        "Confirm Requirement"
      ];
      const randomCta = ctas[Math.floor(Math.random() * ctas.length)];
      
      return (
        <Button 
          size="sm" 
          variant="outline" 
          className="text-xs h-7 px-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
        >
          {randomCta}
        </Button>
      );
    },
  },
];
