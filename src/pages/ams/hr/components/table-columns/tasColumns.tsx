
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { DataTableColumn } from "@/components/ui/data-table/types";

export const getTasColumns = (): DataTableColumn<any>[] => [
  {
    id: "taName",
    header: "TA Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => (
      <div className="flex items-center gap-2 min-w-[120px]">
        <Avatar className="h-6 w-6">
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs">
            {ta.name.charAt(0)}
          </div>
        </Avatar>
        <span className="font-medium hover:text-primary cursor-pointer truncate">
          {ta.name}
        </span>
      </div>
    ),
  },
  {
    id: "assignedRoles",
    header: "Assigned Roles",
    accessorKey: "requirementsAssigned",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => (
      <span className="min-w-[60px] inline-block">5</span>
    ),
  },
  {
    id: "openRequirements",
    header: "Open Requirements",
    accessorKey: "rolesManaged",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => (
      <span className="min-w-[80px] inline-block">10</span>
    ),
  },
  {
    id: "efficiency",
    header: "Efficiency",
    accessorKey: "workloadStatus",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => (
      <Badge variant="outline" className="bg-gray-200 text-gray-700 border-gray-300 min-w-[70px]">
        Medium
      </Badge>
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
        <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block">
          {randomReason}
        </span>
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
      const ctas = [
        "Reassign Load",
        "Assign New Roles",
        "Follow Up",
        "Schedule Performance Review",
        "Review Screening Strategy",
        "Activate TA Sourcing",
        "Nudge TA",
        "Remind Feedback",
        "Open Investigation",
        "Assign Transition Support"
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
