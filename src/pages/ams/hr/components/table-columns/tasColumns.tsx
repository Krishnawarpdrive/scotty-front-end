import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DataTableColumn } from "@/components/ui/data-table/types";

const getCTAColor = (alertReason: string) => {
  const highPriority = ["TA overloaded", "Inactive TA", "Escalation record"];
  const mediumPriority = ["TA underloaded", "Low conversion rate", "High rejection"];
  
  if (highPriority.some(reason => alertReason.includes(reason))) {
    return "bg-red-500 hover:bg-red-600 text-white";
  } else if (mediumPriority.some(reason => alertReason.includes(reason))) {
    return "bg-orange-500 hover:bg-orange-600 text-white";
  }
  return "bg-blue-500 hover:bg-blue-600 text-white";
};

// Mapping from alert reasons to appropriate CTAs
const getCtaForAlert = (alertReason: string) => {
  const ctaMapping: Record<string, string> = {
    "TA overloaded": "Reassign Load",
    "TA underloaded": "Assign New Roles",
    "Inactive TA": "Follow Up",
    "Low conversion rate": "Schedule Performance Review",
    "High rejection": "Review Screening Strategy",
    "No sourcing logged": "Activate TA Sourcing",
    "No outreach logged": "Nudge TA",
    "Poor feedback submission": "Remind Feedback",
    "Escalation record": "Open Investigation",
    "TA switched mid-req": "Assign Transition Support"
  };
  
  return ctaMapping[alertReason] || "Take Action";
};

export const getTasColumns = (): DataTableColumn<any>[] => [
  {
    id: "taName",
    header: "TA Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 min-w-[120px] cursor-help">
              <Avatar className="h-6 w-6">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium">
                  {ta.name.charAt(0)}
                </div>
              </Avatar>
              <span className="font-medium hover:text-primary cursor-pointer truncate">
                {ta.name}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-semibold">{ta.name}</p>
              <p className="text-xs">TA ID: #{ta.id?.substring(0, 8) || 'N/A'}</p>
              <p className="text-xs">Department: {ta.department || 'Engineering'}</p>
              <p className="text-xs">Experience: {ta.experience || '3+ years'}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "assignedRoles",
    header: "Assigned Roles",
    accessorKey: "requirementsAssigned",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="min-w-[60px] inline-block cursor-help">5</span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Currently assigned: 5 roles</p>
              <p className="text-xs">Capacity utilization: 83%</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "openRequirements",
    header: "Open Requirements",
    accessorKey: "rolesManaged",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="min-w-[80px] inline-block cursor-help">10</span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Open requirements: 10</p>
              <p className="text-xs">Active sourcing: 8</p>
              <p className="text-xs">On hold: 2</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "efficiency",
    header: "Efficiency",
    accessorKey: "workloadStatus",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-600 text-sm min-w-[70px] inline-block cursor-help">
              Medium
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Efficiency Rating: Medium</p>
              <p className="text-xs">Conversion rate: 65%</p>
              <p className="text-xs">Avg. time to fill: 28 days</p>
              <p className="text-xs">Client satisfaction: 4.2/5</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "alertReason",
    header: "Alert Reason",
    accessorKey: "alertReason",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => {
      const alertReasons = [
        "TA overloaded",
        "TA underloaded",
        "Inactive TA",
        "Low conversion rate",
        "High rejection",
        "No sourcing logged",
        "No outreach logged",
        "Poor feedback submission",
        "Escalation record",
        "TA switched mid-req"
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
    cell: (ta: any) => {
      const alertReasons = [
        "TA overloaded",
        "TA underloaded",
        "Inactive TA",
        "Low conversion rate",
        "High rejection",
        "No sourcing logged",
        "No outreach logged",
        "Poor feedback submission",
        "Escalation record",
        "TA switched mid-req"
      ];
      
      const randomReason = alertReasons[Math.floor(Math.random() * alertReasons.length)];
      const cta = getCtaForAlert(randomReason);
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                className={`text-xs h-7 px-2 ${getCTAColor(randomReason)}`}
                onClick={() => console.log(`Executing: ${cta} for TA: ${ta.name}`)}
              >
                {cta}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">Action Required</p>
                <p>{cta}</p>
                <p className="text-xs text-gray-500">Click to execute</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
