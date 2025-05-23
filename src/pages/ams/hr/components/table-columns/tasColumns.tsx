
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DataTableColumn } from "@/components/ui/data-table/types";

// Define alert reasons and their corresponding CTAs
const alertReasonToCta: Record<string, { action: string; priority: 'high' | 'medium' | 'low' }> = {
  "TA overloaded": { action: "Reassign Load", priority: 'high' },
  "TA underloaded": { action: "Assign New Roles", priority: 'low' },
  "Inactive TA": { action: "Follow Up", priority: 'high' },
  "Low conversion rate": { action: "Schedule Performance Review", priority: 'medium' },
  "High rejection": { action: "Review Screening Strategy", priority: 'medium' },
  "No sourcing logged": { action: "Activate TA Sourcing", priority: 'medium' },
  "No outreach logged": { action: "Nudge TA", priority: 'low' },
  "Poor feedback submission": { action: "Remind Feedback", priority: 'low' },
  "Escalation record": { action: "Open Investigation", priority: 'high' },
  "TA switched mid-req": { action: "Assign Transition Support", priority: 'medium' }
};

// Function to get CTA color based on priority
const getCTAColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return "bg-red-500 hover:bg-red-600 text-white";
    case 'medium':
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case 'low':
      return "bg-blue-500 hover:bg-blue-600 text-white";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
  }
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
                <AvatarImage src={ta.avatarUrl} alt={ta.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {ta.name.charAt(0)}
                </AvatarFallback>
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
      const { action, priority } = alertReasonToCta[randomReason] || { action: "Take Action", priority: 'low' };
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                className={`text-xs h-7 px-2 ${getCTAColor(priority)}`}
                onClick={() => console.log(`Executing: ${action} for TA: ${ta.name}`)}
              >
                {action}
              </Button>
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
