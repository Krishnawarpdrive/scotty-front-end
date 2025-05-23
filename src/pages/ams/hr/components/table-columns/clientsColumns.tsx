
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Phone, Mail } from "lucide-react";
import { DataTableColumn } from "@/components/ui/data-table/types";

export const getClientsColumns = (handleClientClick: (clientName: string) => void): DataTableColumn<any>[] => [
  {
    id: "clientName",
    header: "Client Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="flex flex-col min-w-[140px]">
        <span 
          className="font-medium hover:text-primary cursor-pointer truncate"
          onClick={() => handleClientClick(client.name)}
        >
          {client.name}
        </span>
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
      <div className="flex items-center min-w-[100px]">
        <span>{client.rolesHired} / {client.rolesNeeded}</span>
      </div>
    ),
  },
  {
    id: "unassignedRoles",
    header: "Unassigned Roles",
    accessorKey: "unassignedRoles",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => (
      <div className="flex items-center min-w-[80px]">
        <span className={client.unassignedRoles > 0 ? "text-amber-600" : ""}>
          {client.unassignedRoles} / {client.totalRoles}
        </span>
      </div>
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
    id: "priority",
    header: "Priority",
    accessorKey: "priority",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="min-w-[70px]">
        <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300">
          {client.priority}
        </Badge>
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
        <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300">
          {client.status}
        </Badge>
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
    cell: (client: any) => {
      const ctas = [
        "Add Role",
        "Assign TA to Roles",
        "Follow Up with Client",
        "Approve Pending Items",
        "Upload Agreement",
        "Escalate to Exec Team",
        "Review Pipeline Bottlenecks",
        "Reassign TA",
        "Request JD from Client",
        "Notify Client of Rework"
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
