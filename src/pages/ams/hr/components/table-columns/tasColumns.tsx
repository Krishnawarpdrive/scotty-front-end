
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Phone, Mail } from "lucide-react";
import { DataTableColumn } from "@/components/ui/data-table/types";

export const getTasColumns = (): DataTableColumn<any>[] => [
  {
    id: "taName",
    header: "TA Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs">
            {ta.name.charAt(0)}
          </div>
        </Avatar>
        <span className="font-medium hover:text-primary cursor-pointer">
          {ta.name}
        </span>
      </div>
    ),
  },
  {
    id: "requirementsAssigned",
    header: "Requirements Assigned",
    accessorKey: "requirementsAssigned",
    enableSorting: true,
    enableFiltering: false,
  },
  {
    id: "rolesManaged",
    header: "Roles Managed",
    accessorKey: "rolesManaged",
    enableSorting: true,
    enableFiltering: false,
  },
  {
    id: "candidatesSourced",
    header: "Candidates Sourced",
    accessorKey: "candidatesSourced",
    enableSorting: true,
    enableFiltering: false,
  },
  {
    id: "outreachActivities",
    header: "Outreach Activities",
    accessorKey: "outreachActivities",
    enableSorting: true,
    enableFiltering: false,
  },
  {
    id: "efficiencyMetrics",
    header: "Efficiency Metrics",
    accessorKey: "conversionRate",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => (
      <div className="flex flex-col">
        <span>
          Conv: {ta.conversionRate}%
        </span>
        <span className="text-[10px] text-muted-foreground">
          Avg. Time: {ta.averageSourcingTime} days
        </span>
      </div>
    ),
  },
  {
    id: "workloadStatus",
    header: "Workload Status",
    accessorKey: "workloadStatus",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => {
      let colorClass = "bg-green-100 text-green-800 border-green-200";
      if (ta.workloadStatus === "Overloaded") {
        colorClass = "bg-red-100 text-red-800 border-red-200";
      } else if (ta.workloadStatus === "Balanced") {
        colorClass = "bg-blue-100 text-blue-800 border-blue-200";
      }
      
      return (
        <Badge variant="outline" className={colorClass}>
          {ta.workloadStatus}
        </Badge>
      );
    },
  },
  {
    id: "contactInfo",
    header: "Contact Info",
    accessorKey: "id",
    enableSorting: false,
    enableFiltering: false,
    cell: (ta: any) => (
      <div className="flex">
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
    ),
  },
];
