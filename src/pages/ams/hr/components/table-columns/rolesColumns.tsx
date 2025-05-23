
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle } from "lucide-react";
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
            <div className="flex flex-col truncate max-w-[200px]">
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
    header: "Client Name",
    accessorKey: "clientName",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span 
              className="truncate max-w-[150px] inline-block hover:text-primary cursor-pointer"
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
        <div className="flex items-center whitespace-nowrap">
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
    header: "Vacancies",
    accessorKey: "vacanciesFilled",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => (
      <span className="whitespace-nowrap">
        {role.vacanciesFilled} / {role.vacanciesOpen + role.vacanciesFilled}
      </span>
    ),
  },
  {
    id: "activeRole",
    header: "Status",
    accessorKey: "isActive",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => (
      <Badge variant={role.isActive ? "default" : "outline"} className={role.isActive ? "bg-green-500" : "bg-gray-200 text-gray-600"}>
        {role.isActive ? "Active" : "Inactive"}
      </Badge>
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
            <div className="cursor-help whitespace-nowrap">
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
              <span className={`${textColor} whitespace-nowrap`}>
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
    id: "stageConfigured",
    header: "Stage Configured",
    accessorKey: "stageConfiguredPercent",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => {
      const isComplete = role.stageConfiguredPercent === 100;
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className={isComplete ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                {isComplete ? "100%" : "Incomplete"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{role.stageConfiguredPercent}% configured</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "interviewRatio",
    header: "Interview-to-Offer",
    accessorKey: "interviewRatio",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => {
      const isLow = role.interviewRatio < 40;
      
      return (
        <span className={isLow ? "text-red-500" : ""}>
          {role.interviewRatio}%
        </span>
      );
    },
  },
  {
    id: "alerts",
    header: "Alerts",
    accessorKey: "alerts",
    enableSorting: false,
    enableFiltering: false,
    cell: (role: any) => {
      const hasAlerts = role.openActions > 0 || role.alerts > 0;
      
      return hasAlerts ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex">
                {role.openActions > 0 && (
                  <Badge variant="destructive" className="mr-1">
                    {role.openActions}
                  </Badge>
                )}
                {role.alerts > 0 && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {role.alerts}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {role.openActions > 0 && <p>{role.openActions} pending actions</p>}
              {role.alerts > 0 && <p>{role.alerts} alerts</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <CheckCircle className="h-4 w-4 text-green-500 opacity-50" />
      );
    },
  },
];
