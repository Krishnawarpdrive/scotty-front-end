
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import ClientDetailDrawer from './ClientDetailDrawer';
import RolesPopover from './RolesPopover';
import HRTooltip from './HRTooltip';
import { getHiringStatusBadge, getClientTierBadge, LastActivityIndicator } from './ClientBadges';

interface ClientsTableProps {
  clients: any[];
  isLoading?: boolean;
  onEdit?: (client: any) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (client: any) => void;
  onSelectClient?: (client: any) => void;
  selectedClients?: any[];
  onSelectAll?: () => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients,
  isLoading = false,
  onEdit,
  onDelete,
  onViewDetails,
  onSelectClient,
  selectedClients = [],
  onSelectAll,
  onSort
}) => {
  const [clientDetailId, setClientDetailId] = useState<number | null>(null);
  
  const handleViewClient = (client: any) => {
    setClientDetailId(client.id);
  };
  
  const columns: DataTableColumn<any>[] = [
    {
      id: 'select',
      header: '',
      accessorKey: 'id',
      enableSorting: false,
      enableFiltering: false,
      cell: (client) => (
        <input
          type="checkbox"
          checked={selectedClients.includes(client.id)}
          onChange={() => onSelectClient(client.id)}
          className="rounded border-gray-300"
          onClick={(e) => e.stopPropagation()}
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
        <span className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">
          {client.name}
        </span>
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
      accessorKey: (client) => new Date(client.createdOn).toLocaleDateString(),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'lastActivity',
      header: 'Last Activity',
      accessorKey: (client) => client.lastActivity?.days || 0,
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
      accessorKey: (client) => client.roles?.length || 0,
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
        <div className="flex items-center">
          <Avatar className="h-5 w-5 mr-2">
            <AvatarFallback className="text-[10px] bg-green-100">
              {client.assignedHR.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {client.assignedHR}
        </div>
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
        <div className="flex items-center gap-2">
          <span className="font-medium text-xs">{client.healthScore}</span>
          <Progress value={client.healthScore} className="h-2 w-16" />
        </div>
      ),
    },
    {
      id: 'budgetUtilized',
      header: 'Budget Used',
      accessorKey: 'budgetUtilized',
      enableSorting: true,
      enableFiltering: false,
      cell: (client) => (
        <div className="w-20">
          <Progress value={client.budgetUtilized} className="h-2" />
          <span className="text-xs">{client.budgetUtilized}%</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      enableSorting: false,
      enableFiltering: false,
      cell: (client) => (
        <div className="flex gap-1 justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClient(client);
                  }}
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Client</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive Client</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="max-h-[70vh] overflow-auto">
        <DataTable
          data={clients}
          columns={columns}
          onRowClick={handleViewClient}
        />
      </div>
      
      {clientDetailId && (
        <ClientDetailDrawer 
          client={clients.find(c => c.id === clientDetailId)} 
          open={clientDetailId !== null}
          onOpenChange={() => setClientDetailId(null)}
        />
      )}
    </div>
  );
};

export default ClientsTable;
