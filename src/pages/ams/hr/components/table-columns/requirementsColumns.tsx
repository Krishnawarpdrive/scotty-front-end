
import React from 'react';
import { Badge } from "@/components/ui/badge";
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
      <span className="font-medium hover:text-primary cursor-pointer">
        #{req.id.substring(0, 8)}
      </span>
    ),
  },
  {
    id: "requirementName",
    header: "Requirement Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: "linkedRole",
    header: "Linked Role",
    accessorKey: "linkedRole",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <span className="hover:text-primary cursor-pointer">
        {req.linkedRole}
      </span>
    ),
  },
  {
    id: "clientName",
    header: "Client Name",
    accessorKey: "clientName",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: "taAssigned",
    header: "TA(s) Assigned",
    accessorKey: "taAssigned",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              {req.taAssigned.length}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{req.taAssigned.join(', ')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => {
      let badgeVariant = "default";
      if (req.status === "Closed") badgeVariant = "outline";
      else if (req.status === "Pending Approval") badgeVariant = "secondary";
      
      return (
        <Badge variant={badgeVariant as any}>
          {req.status}
        </Badge>
      );
    },
  },
  {
    id: "priority",
    header: "Priority",
    accessorKey: "priority",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <Badge variant="outline" className={
        req.priority === "High" 
          ? "bg-red-100 text-red-800 border-red-200" 
          : req.priority === "Medium" 
            ? "bg-amber-100 text-amber-800 border-amber-200"
            : "bg-green-100 text-green-800 border-green-200"
      }>
        {req.priority}
      </Badge>
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
        <span className={isOverdue ? "text-red-500 font-medium" : ""}>
          {dueDate.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "candidatesSourced",
    header: "Candidates Sourced",
    accessorKey: "candidatesSourced",
    enableSorting: true,
    enableFiltering: false,
  },
  {
    id: "interviewRatio",
    header: "Interview-to-Offer Ratio",
    accessorKey: "interviewRatio",
    enableSorting: true,
    enableFiltering: false,
    cell: (req: any) => (
      <span>{req.interviewRatio}%</span>
    ),
  },
  {
    id: "candidateProgress",
    header: "Candidate Stage Progress",
    accessorKey: "candidateStageProgress",
    enableSorting: true,
    enableFiltering: false,
    cell: (req: any) => (
      <div className="flex items-center w-full">
        <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
          <div 
            className={`h-1.5 rounded-full ${
              req.candidateStageProgress < 30 ? "bg-red-500" : 
              req.candidateStageProgress < 70 ? "bg-amber-500" : "bg-green-500"
            }`} 
            style={{ width: `${req.candidateStageProgress}%` }}
          />
        </div>
        <span className="text-xs">{req.candidateStageProgress}%</span>
      </div>
    ),
  },
  {
    id: "modifiedPipeline",
    header: "Modified Pipeline Flag",
    accessorKey: "modifiedPipeline",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      req.modifiedPipeline ? (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          Modified
        </Badge>
      ) : null
    ),
  },
];
