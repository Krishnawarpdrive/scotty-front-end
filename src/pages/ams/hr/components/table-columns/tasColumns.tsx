
import React from 'react';
import { DataTableColumn } from "@/components/ui/data-table/types";
import { TANameCell } from './cells/TANameCell';
import { AssignedRolesCell } from './cells/AssignedRolesCell';
import { OpenRequirementsCell } from './cells/OpenRequirementsCell';
import { EfficiencyCell } from './cells/EfficiencyCell';
import { TAAlertReasonCell } from './cells/TAAlertReasonCell';
import { TACTACell } from './cells/TACTACell';

export const getTasColumns = (): DataTableColumn<any>[] => [
  {
    id: "taName",
    header: "TA Name",
    accessorKey: "name",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => <TANameCell ta={ta} />,
  },
  {
    id: "assignedRoles",
    header: "Assigned Roles",
    accessorKey: "requirementsAssigned",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => <AssignedRolesCell ta={ta} />,
  },
  {
    id: "openRequirements",
    header: "Open Requirements",
    accessorKey: "rolesManaged",
    enableSorting: true,
    enableFiltering: false,
    cell: (ta: any) => <OpenRequirementsCell ta={ta} />,
  },
  {
    id: "efficiency",
    header: "Efficiency",
    accessorKey: "workloadStatus",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => <EfficiencyCell ta={ta} />,
  },
  {
    id: "alertReason",
    header: "Alert Reason",
    accessorKey: "alertReason",
    enableSorting: true,
    enableFiltering: true,
    cell: (ta: any) => <TAAlertReasonCell ta={ta} />,
  },
  {
    id: "cta",
    header: "CTA",
    accessorKey: "cta",
    enableSorting: false,
    enableFiltering: false,
    cell: (ta: any) => <TACTACell ta={ta} />,
  },
];
