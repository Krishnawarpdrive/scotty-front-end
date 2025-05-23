
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { DataTableColumn } from "@/components/ui/data-table/types";

const getCTAColor = (alertReason: string) => {
  const highPriority = ["No roles created", "Overdue roles for priority client", "Agreement not uploaded"];
  const mediumPriority = ["Multiple roles pending TA", "Client uncontacted for 14+ days", "Unapproved items pending"];
  
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
    "No roles created": "Add Role",
    "Multiple roles pending TA": "Assign TA to Roles",
    "Client uncontacted for 14+ days": "Follow Up with Client",
    "Unapproved items pending": "Approve Pending Items",
    "Agreement not uploaded": "Upload Agreement",
    "Overdue roles for priority client": "Escalate to Exec Team",
    "Stalled progress on roles": "Review Pipeline Bottlenecks",
    "TA overload/mismatch": "Reassign TA",
    "Missing JD": "Request JD from Client",
    "Frequent rejections": "Notify Client of Rework"
  };
  
  return ctaMapping[alertReason] || "Take Action";
};

export const getClientsColumns = (handleClientClick: (clientName: string) => void): DataTableColumn<any>[] => [
  {
    id: "clientName",
    header: "Client Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="flex flex-col min-w-[140px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span 
                className="font-medium hover:text-primary cursor-pointer truncate"
                onClick={() => handleClientClick(client.name)}
              >
                {client.name}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">{client.name}</p>
                <p className="text-xs">Client ID: #{client.id.substring(0, 8)}</p>
                <p className="text-xs">Account Type: {client.accountType || 'Standard'}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-[10px] text-muted-foreground truncate">
          #{client.id.substring(0, 8)}
        </span>
      </div>
    ),
  },
  {
    id: "rolesProgress",
    header: "Roles Hired / Needed",
    accessorKey: "rolesProgress",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center min-w-[100px] cursor-help">
              <span>{client.rolesHired} / {client.rolesNeeded}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Roles Hired: {client.rolesHired}</p>
              <p>Roles Needed: {client.rolesNeeded}</p>
              <p>Progress: {Math.round((client.rolesHired / client.rolesNeeded) * 100)}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "unassignedRoles",
    header: "Unassigned Roles",
    accessorKey: "unassignedRoles",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center min-w-[80px] cursor-help">
              <span className={client.unassignedRoles > 0 ? "text-amber-600 font-medium" : ""}>
                {client.unassignedRoles} / {client.totalRoles}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p>Unassigned: {client.unassignedRoles}</p>
              <p>Total Roles: {client.totalRoles}</p>
              {client.unassignedRoles > 0 && (
                <p className="text-amber-600">⚠️ Needs attention</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "nextDueDate",
    header: "Next Due Date",
    accessorKey: "nextDueDate",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => {
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
    },
  },
  {
    id: "priority",
    header: "Priority",
    accessorKey: "priority",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="min-w-[70px]">
        <span className="text-gray-600 text-sm">
          {client.priority}
        </span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="min-w-[70px]">
        <span className="text-gray-600 text-sm">
          {client.status}
        </span>
      </div>
    ),
  },
  {
    id: "alertReason",
    header: "Alert Reason",
    accessorKey: "alertReason",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => {
      const alertReasons = [
        "No roles created",
        "Multiple roles pending TA",
        "Client uncontacted for 14+ days",
        "Unapproved items pending",
        "Agreement not uploaded",
        "Overdue roles for priority client",
        "Stalled progress on roles",
        "TA overload/mismatch",
        "Missing JD",
        "Frequent rejections"
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
    cell: (client: any) => {
      const alertReasons = [
        "No roles created",
        "Multiple roles pending TA",
        "Client uncontacted for 14+ days",
        "Unapproved items pending",
        "Agreement not uploaded",
        "Overdue roles for priority client",
        "Stalled progress on roles",
        "TA overload/mismatch",
        "Missing JD",
        "Frequent rejections"
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
                onClick={() => console.log(`Executing: ${cta} for client: ${client.name}`)}
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
