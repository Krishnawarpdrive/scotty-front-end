
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { DataTableColumn } from "@/components/ui/data-table/types";

export const getRolesColumns = (handleClientClick: (clientName: string) => void): DataTableColumn<any>[] => [
  {
    id: "roleName",
    header: "Role Name + ID",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col truncate min-w-[160px]">
              <span className="font-medium truncate hover:text-primary cursor-pointer">
                {role.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                #{role.id.substring(0, 8)}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{role.name}</p>
            <p className="text-xs">#{role.id}</p>
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
    cell: (role: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span 
              className="truncate min-w-[100px] inline-block hover:text-primary cursor-pointer"
              onClick={() => handleClientClick(role.clientName)}
            >
              {role.clientName}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{role.clientName}</p>
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
    cell: (role: any) => {
      const dueDate = new Date(role.dueDate);
      const today = new Date();
      const isOverdue = dueDate < today;
      
      return (
        <div className="flex items-center whitespace-nowrap min-w-[90px]">
          <span className={isOverdue ? "text-red-500 font-medium" : ""}>
            {dueDate.toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric'
            })}
          </span>
          {isOverdue && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-3 w-3 ml-1 text-red-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overdue</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "vacancies",
    header: "Vacancies Filled / Open",
    accessorKey: "vacanciesFilled",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => (
      <span className="whitespace-nowrap min-w-[80px] inline-block">
        {role.vacanciesFilled} / {role.vacanciesOpen + role.vacanciesFilled}
      </span>
    ),
  },
  {
    id: "taAssigned",
    header: "TA Assigned",
    accessorKey: "taAssigned",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help whitespace-nowrap min-w-[60px]">
              {role.taAssigned.length}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{role.taAssigned.join(', ')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "candidateProgress",
    header: "Candidate Progress",
    accessorKey: "candidatesProgressed",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => {
      const ratio = role.candidatesProgressed / role.candidatesTotal;
      let textColor = "text-red-500";
      if (ratio >= 0.7) textColor = "text-green-500";
      else if (ratio >= 0.4) textColor = "text-amber-500";
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={`${textColor} whitespace-nowrap min-w-[80px] inline-block`}>
                {role.candidatesProgressed} / {role.candidatesTotal}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Candidates progressed: {role.candidatesProgressed} out of {role.candidatesTotal}</p>
              <p>Progress: {Math.round(ratio * 100)}%</p>
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
    cell: (role: any) => {
      const alertReasons = [
        "TA not assigned",
        "Pipeline not configured",
        "Candidate progress stalled",
        "Low interview-to-offer ratio",
        "JD not attached",
        "Inactive TA",
        "Vacancies filled",
        "No candidates sourced",
        "Overdue vacancies",
        "Duplicate role"
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
    cell: (role: any) => {
      const ctas = [
        "Assign TA",
        "Configure Pipeline",
        "Check Pipeline Stage",
        "Investigate Interview Quality",
        "Upload JD",
        "Ping TA",
        "Mark Role as Completed",
        "Activate Sourcing",
        "Escalate Deadline",
        "Review Duplicate Roles"
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
