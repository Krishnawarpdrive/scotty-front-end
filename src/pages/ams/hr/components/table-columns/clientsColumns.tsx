
import React from 'react';
import { DataTableColumn } from "@/components/ui/data-table/types";
import { ClientNameCell } from './cells/ClientNameCell';
import { RolesProgressCell } from './cells/RolesProgressCell';
import { UnassignedRolesCell } from './cells/UnassignedRolesCell';
import { DueDateCell } from './cells/DueDateCell';
import { AlertReasonCell } from './cells/AlertReasonCell';
import { CTACell } from './cells/CTACell';
import { BasicCell } from './cells/BasicCell';

export const getClientsColumns = (handleClientClick: (clientName: string) => void): DataTableColumn<any>[] => [
  {
    id: "clientName",
    header: "Client Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => (
      <ClientNameCell client={client} onClientClick={handleClientClick} />
    ),
  },
  {
    id: "rolesProgress",
    header: "Roles Hired / Needed",
    accessorKey: "rolesProgress",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => <RolesProgressCell client={client} />,
  },
  {
    id: "unassignedRoles",
    header: "Unassigned Roles",
    accessorKey: "unassignedRoles",
    enableSorting: true,
    enableFiltering: false,
    cell: (client: any) => <UnassignedRolesCell client={client} />,
  },
  {
    id: "nextDueDate",
    header: "Next Due Date",
    accessorKey: "nextDueDate",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => <DueDateCell client={client} />,
  },
  {
    id: "priority",
    header: "Priority",
    accessorKey: "priority",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => <BasicCell value={client.priority} />,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => <BasicCell value={client.status} />,
  },
  {
    id: "alertReason",
    header: "Alert Reason",
    accessorKey: "alertReason",
    enableSorting: true,
    enableFiltering: true,
    cell: (client: any) => <AlertReasonCell client={client} />,
  },
  {
    id: "cta",
    header: "CTA",
    accessorKey: "cta",
    enableSorting: false,
    enableFiltering: false,
    cell: (client: any) => <CTACell client={client} />,
  },
];
