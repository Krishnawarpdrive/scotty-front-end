
import React from 'react';
import { DataTableColumn } from "@/components/ui/data-table";
import ClientSelectionCell from './ClientSelectionCell';
import ClientNameCell from './ClientNameCell';
import ClientHRCell from './ClientHRCell';
import ClientBudgetCell from './ClientBudgetCell';
import ClientHealthScoreCell from './ClientHealthScoreCell';
import ClientTableActions from './ClientTableActions';
import RolesPopover from '../RolesPopover';
import { getHiringStatusBadge, getClientTierBadge, LastActivityIndicator } from '../ClientBadges';

interface UseClientTableColumnsProps {
  selectedClients: string[];
  onSelectClient: (id: string) => void;
  onViewClient: (client: any) => void;
}

export const useClientTableColumns = ({ 
  selectedClients, 
  onSelectClient,
  onViewClient
}: UseClientTableColumnsProps) => {
  
  const columns: DataTableColumn<any>[] = [
    {
      id: 'select',
      header: '',
      accessorKey: 'id',
      enableSorting: false,
      enableFiltering: false,
      cell: (client) => (
        <ClientSelectionCell 
          clientId={client.id} 
          isSelected={selectedClients.includes(client.id)} 
          onSelectClient={onSelectClient}
        />
      ),
    },
    {
      id: 'name',
      header: 'Client Name',
      accessorKey: 'name',
      enableSorting: true,
      enableFiltering: true,
      cell: (client) => (
        <ClientNameCell name={client.name} />
      ),
    },
    {
      id: 'accountType',
      header: 'Account Type',
      accessorKey: 'accountType',
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'createdOn',
      header: 'Created On',
      accessorKey: 'createdOn',
      enableSorting: true,
      enableFiltering: true,
      cell: (client) => new Date(client.createdOn).toLocaleDateString(),
    },
    {
      id: 'lastActivity',
      header: 'Last Activity',
      accessorKey: 'lastActivity',
      enableSorting: true,
      enableFiltering: false,
      cell: (client) => (
        <LastActivityIndicator 
          days={client.lastActivity?.days || 0} 
          active={client.lastActivity?.active || false} 
        />
      ),
    },
    {
      id: 'roles',
      header: 'Active Roles',
      accessorKey: 'roles',
      enableFiltering: false,
      cell: (client) => (
        <RolesPopover client={client} />
      ),
    },
    {
      id: 'totalRequirements',
      header: 'Total Requirements',
      accessorKey: 'totalRequirements',
      enableSorting: true,
      enableFiltering: false,
    },
    {
      id: 'assignedHR',
      header: 'Assigned HR',
      accessorKey: 'assignedHR',
      enableSorting: true,
      enableFiltering: true,
      cell: (client) => (
        <ClientHRCell assignedHR={client.assignedHR} />
      ),
    },
    {
      id: 'hiringStatus',
      header: 'Hiring Status',
      accessorKey: 'hiringStatus',
      enableSorting: true,
      enableFiltering: true,
      cell: (client) => getHiringStatusBadge(client.hiringStatus),
    },
    {
      id: 'clientTier',
      header: 'Client Tier',
      accessorKey: 'clientTier',
      enableSorting: true,
      enableFiltering: true,
      cell: (client) => getClientTierBadge(client.clientTier),
    },
    {
      id: 'healthScore',
      header: 'Health Score',
      accessorKey: 'healthScore',
      enableSorting: true,
      enableFiltering: false,
      cell: (client) => (
        <ClientHealthScoreCell healthScore={client.healthScore} />
      ),
    },
    {
      id: 'budgetUtilized',
      header: 'Budget Used',
      accessorKey: 'budgetUtilized',
      enableSorting: true,
      enableFiltering: false,
      cell: (client) => (
        <ClientBudgetCell budgetUtilized={client.budgetUtilized} />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      enableSorting: false,
      enableFiltering: false,
      cell: (client) => (
        <ClientTableActions client={client} onView={onViewClient} />
      ),
    },
  ];

  return columns;
};

export default useClientTableColumns;
