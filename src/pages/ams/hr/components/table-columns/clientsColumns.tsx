
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
    header: "Client Name + ID",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="flex flex-col">
        <span className="font-medium hover:text-primary cursor-pointer">
          {client.name}
        </span>
        <span className="text-[10px] text-muted-foreground">
          #{client.id.substring(0, 8)}
        </span>
      </div>
    ),
  },
  {
    id: "contactPerson",
    header: "Contact Person",
    accessorKey: "contactPerson",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <div className="flex items-center gap-1">
        <span>{client.contactPerson}</span>
        <div className="flex ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                  <Phone className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Call via operator</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6 p-1">
                  <Mail className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    ),
  },
  {
    id: "rolesProgress",
    header: "Roles Needed / Hired",
    accessorKey: "rolesProgress",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => (
      <div className="flex items-center">
        <span>{client.rolesHired} / {client.rolesNeeded}</span>
      </div>
    ),
  },
  {
    id: "requirementsCount",
    header: "Requirements Count",
    accessorKey: "requirementsCount",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: "unassignedItems",
    header: "Roles / Requirements Unassigned",
    accessorKey: "unassignedRoles",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => (
      <div className="flex items-center">
        <span className={client.unassignedRoles > 0 ? "text-amber-600" : ""}>
          {client.unassignedRoles} / {client.totalRoles}
        </span>
      </div>
    ),
  },
  {
    id: "tasAssigned",
    header: "TAs Assigned",
    accessorKey: "tasAssigned",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              {client.tasAssigned.length}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{client.tasAssigned.join(', ')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "status",
    header: "Client Status",
    accessorKey: "status",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <Badge variant={client.status === "Active" ? "default" : "outline"}>
        {client.status}
      </Badge>
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
        <span className={isOverdue ? "text-red-500 font-medium" : ""}>
          {dueDate.toLocaleDateString()}
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
      <Badge variant="outline" className={
        client.priority === "High" 
          ? "bg-red-100 text-red-800 border-red-200" 
          : client.priority === "Medium" 
            ? "bg-amber-100 text-amber-800 border-amber-200"
            : "bg-green-100 text-green-800 border-green-200"
      }>
        {client.priority}
      </Badge>
    ),
  },
  {
    id: "lastActivity",
    header: "Last Activity Date",
    accessorKey: "lastActivity",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <span className="text-muted-foreground text-sm">
        {new Date(client.lastActivity).toLocaleDateString()}
      </span>
    ),
  },
];
