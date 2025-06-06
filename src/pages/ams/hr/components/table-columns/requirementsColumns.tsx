
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { getRequirementAlertReason, requirementAlertReasonToCta, getRequirementCTAColor } from './utils/requirementAlertUtils';

export const getRequirementsColumns = (): DataTableColumn<any>[] => [
  {
    id: "requirementId",
    header: "Requirement ID",
    accessorKey: "id",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-medium hover:text-primary cursor-pointer min-w-[80px] inline-block">
              #{req.id.substring(0, 8)}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Full ID: {req.id}</p>
              <p className="text-xs">Click to view details</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "linkedRole",
    header: "Role",
    accessorKey: "linkedRole",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="hover:text-primary cursor-pointer min-w-[100px] inline-block truncate">
              {req.linkedRole}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-semibold">{req.linkedRole}</p>
              <p className="text-xs">Click to view role details</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "clientName",
    header: "Client",
    accessorKey: "clientName",
    enableSorting: true,
    enableFiltering: true,
    cell: (req: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="min-w-[100px] inline-block truncate cursor-help">
              {req.clientName}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-semibold">{req.clientName}</p>
              <p className="text-xs">Client details</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
                <p>Due: {dueDate.toLocaleDateString()}</p>
                {isOverdue ? (
                  <p className="text-red-500">⚠️ Overdue by {Math.abs(daysUntilDue)} days</p>
                ) : (
                  <p>Due in {daysUntilDue} days</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <span className="text-gray-600 text-sm">
          {req.taAssigned.length > 0 ? "Yes" : "No"}
        </span>
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
      let colorClass = "text-red-500";
      
      if (req.candidateStageProgress > 70) {
        status = "Active";
        colorClass = "text-green-500";
      } else if (req.candidateStageProgress > 30) {
        status = "In Progress";
        colorClass = "text-amber-500";
      }
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={`${colorClass} min-w-[80px] inline-block cursor-help`}>
                {status}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Status: {status}</p>
                <p>Progress: {req.candidateStageProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${req.candidateStageProgress > 70 ? 'bg-green-500' : req.candidateStageProgress > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${req.candidateStageProgress}%` }}
                  ></div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
      const alertReason = getRequirementAlertReason(req.id);
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm text-gray-600 truncate max-w-[150px] cursor-help">
                {alertReason}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-semibold">Alert Details</p>
                <p>{alertReason}</p>
                <p className="text-xs text-gray-500">Click CTA to resolve</p>
              </div>
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
      const alertReason = getRequirementAlertReason(req.id);
      const { action, priority } = requirementAlertReasonToCta[alertReason] || { action: "Take Action", priority: 'low' as const };
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
                <Button 
                  size="sm" 
                  className={`text-xs h-7 px-2 ${getRequirementCTAColor(priority)}`}
                  onClick={() => console.log(`Executing: ${action} for requirement: ${req.id}`)}
                >
                  {action}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">Action Required</p>
                <p>{action}</p>
                <p className="text-xs text-gray-500">Click to execute</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
