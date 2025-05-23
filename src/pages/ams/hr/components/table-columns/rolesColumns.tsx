
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import TAProfileList from '../TAProfileList';

const getCTAColor = (alertReason: string) => {
  const highPriority = ["TA not assigned", "Overdue vacancies", "No candidates sourced"];
  const mediumPriority = ["Pipeline not configured", "Candidate progress stalled", "Inactive TA"];
  
  if (highPriority.some(reason => alertReason.includes(reason))) {
    return "bg-red-500 hover:bg-red-600 text-white";
  } else if (mediumPriority.some(reason => alertReason.includes(reason))) {
    return "bg-orange-500 hover:bg-orange-600 text-white";
  }
  return "bg-blue-500 hover:bg-blue-600 text-white";
};

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
            <div className="flex flex-col truncate min-w-[160px] cursor-help">
              <span className="font-medium truncate hover:text-primary cursor-pointer">
                {role.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                #{role.id.substring(0, 8)}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 max-w-xs">
              <p className="font-semibold">{role.name}</p>
              <p className="text-xs">Role ID: #{role.id}</p>
              <p className="text-xs">Department: {role.department || 'Engineering'}</p>
              <p className="text-xs">Level: {role.level || 'Senior'}</p>
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
            <div className="space-y-1">
              <p className="font-semibold">{role.clientName}</p>
              <p className="text-xs">Click to view client details</p>
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
    cell: (role: any) => {
      const dueDate = new Date(role.dueDate);
      const today = new Date();
      const isOverdue = dueDate < today;
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center whitespace-nowrap min-w-[90px] cursor-help">
                <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                  {dueDate.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric'
                  })}
                </span>
                {isOverdue && <AlertCircle className="h-3 w-3 ml-1 text-red-500" />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Due Date: {dueDate.toLocaleDateString()}</p>
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
    id: "vacancies",
    header: "Vacancies Filled / Open",
    accessorKey: "vacanciesFilled",
    enableSorting: true,
    enableFiltering: false,
    cell: (role: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="whitespace-nowrap min-w-[80px] inline-block cursor-help">
              {role.vacanciesFilled} / {role.vacanciesOpen + role.vacanciesFilled}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Filled: {role.vacanciesFilled}</p>
              <p>Total Open: {role.vacanciesOpen + role.vacanciesFilled}</p>
              <p>Remaining: {role.vacanciesOpen}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "taAssigned",
    header: "TA Assigned",
    accessorKey: "taAssigned",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => (
      <div className="whitespace-nowrap min-w-[120px]">
        <TAProfileList taList={role.taAssigned} maxVisible={3} />
      </div>
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
              <span className={`${textColor} whitespace-nowrap min-w-[80px] inline-block cursor-help`}>
                {role.candidatesProgressed} / {role.candidatesTotal}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Candidates progressed: {role.candidatesProgressed}</p>
                <p>Total candidates: {role.candidatesTotal}</p>
                <p>Progress rate: {Math.round(ratio * 100)}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${ratio >= 0.7 ? 'bg-green-500' : ratio >= 0.4 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${ratio * 100}%` }}
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
              <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block cursor-help">
                {randomReason}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-semibold">Alert Details</p>
                <p>{randomReason}</p>
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
      
      const randomCta = ctas[Math.floor(Math.random() * ctas.length)];
      const randomReason = alertReasons[Math.floor(Math.random() * alertReasons.length)];
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                className={`text-xs h-7 px-2 ${getCTAColor(randomReason)}`}
                onClick={() => console.log(`Executing: ${randomCta} for role: ${role.name}`)}
              >
                {randomCta}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">Action Required</p>
                <p>{randomCta}</p>
                <p className="text-xs text-gray-500">Click to execute</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
