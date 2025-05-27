
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
import { PipelineStatusIndicator } from '../PipelineStatusIndicator';
import { getRandomAlertReason, getAlertColor } from '../utils/alertReasons';

export const getRolesColumns = (handleClientClick: (clientName: string) => void): DataTableColumn<any>[] => [
  {
    id: "roleName",
    header: "Role Name + ID",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (role: any) => {
      const isPipelineConfigured = Math.random() > 0.3; // Mock data
      const hasRequirements = Math.random() > 0.2; // Mock data
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col truncate min-w-[160px] cursor-help">
                <PipelineStatusIndicator
                  roleName={role.name}
                  isPipelineConfigured={isPipelineConfigured}
                  hasRequirements={hasRequirements}
                  className="font-medium truncate hover:text-primary cursor-pointer"
                />
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
                {(!isPipelineConfigured || !hasRequirements) && (
                  <div className="pt-1 border-t">
                    <p className="text-xs text-red-600 font-medium">Action Required:</p>
                    {!isPipelineConfigured && <p className="text-xs">• Configure hiring pipeline</p>}
                    {!hasRequirements && <p className="text-xs">• Map requirements</p>}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
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
      const alertReason = getRandomAlertReason();
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block cursor-help">
                {alertReason.reason}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-semibold">Alert Details</p>
                <p>{alertReason.reason}</p>
                <p className="text-xs text-gray-500">{alertReason.description}</p>
                <p className="text-xs text-blue-600">Click CTA to resolve</p>
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
      const alertReason = getRandomAlertReason();
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                className={`text-xs h-7 px-2 ${getAlertColor(alertReason.priority)}`}
                onClick={() => {
                  console.log(`Executing: ${alertReason.cta} for role: ${role.name}`);
                  // Add actual action logic here
                }}
              >
                {alertReason.cta}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">Action Required</p>
                <p>{alertReason.cta}</p>
                <p className="text-xs text-gray-500">{alertReason.description}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
