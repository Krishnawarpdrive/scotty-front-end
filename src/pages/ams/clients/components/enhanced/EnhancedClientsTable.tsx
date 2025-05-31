
import React from 'react';
import { EnhancedDataTable, Column, TableAction, BulkAction } from '@/components/enhanced-tables';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Eye, Edit, Building2, Users, DollarSign, Activity } from 'lucide-react';
import { UnifiedClient } from '@/data/unified-types';

interface EnhancedClientsTableProps {
  clients: UnifiedClient[];
  loading?: boolean;
  onRefresh?: () => void;
  onViewDetails?: (client: UnifiedClient) => void;
  onEditClient?: (client: UnifiedClient) => void;
  onCreateRequirement?: (client: UnifiedClient) => void;
  onExportClients?: (clients: UnifiedClient[]) => void;
}

export function EnhancedClientsTable({
  clients,
  loading = false,
  onRefresh,
  onViewDetails,
  onEditClient,
  onCreateRequirement,
  onExportClients,
}: EnhancedClientsTableProps) {
  const toast = useEnhancedToast();

  const columns: Column<UnifiedClient>[] = [
    {
      key: 'name',
      header: 'Client Name',
      sortable: true,
      filterable: true,
      accessor: (client) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{client.name}</div>
            {client.email && (
              <div className="text-sm text-gray-500">{client.email}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Paused', label: 'Paused' },
      ],
      accessor: (client) => (
        <Badge 
          variant={
            client.status === 'Active' ? 'default' :
            client.status === 'Paused' ? 'secondary' : 'destructive'
          }
        >
          {client.status}
        </Badge>
      ),
    },
    {
      key: 'hiring_status',
      header: 'Hiring Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Active', label: 'Actively Hiring' },
        { value: 'Inactive', label: 'Not Hiring' },
      ],
      accessor: (client) => (
        <Badge 
          variant={client.hiring_status === 'Active' ? 'default' : 'outline'}
        >
          {client.hiring_status === 'Active' ? 'Actively Hiring' : 'Not Hiring'}
        </Badge>
      ),
    },
    {
      key: 'client_tier',
      header: 'Tier',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Premium', label: 'Premium' },
        { value: 'Standard', label: 'Standard' },
        { value: 'Basic', label: 'Basic' },
      ],
      accessor: (client) => client.client_tier ? (
        <Badge 
          variant={
            client.client_tier === 'Premium' ? 'default' :
            client.client_tier === 'Standard' ? 'secondary' : 'outline'
          }
        >
          {client.client_tier}
        </Badge>
      ) : '-',
    },
    {
      key: 'total_requirements',
      header: 'Requirements',
      sortable: true,
      align: 'center',
      accessor: (client) => (
        <div className="flex items-center justify-center space-x-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{client.total_requirements}</span>
        </div>
      ),
    },
    {
      key: 'budget_utilized',
      header: 'Budget Used',
      sortable: true,
      align: 'center',
      accessor: (client) => (
        <div className="flex items-center justify-center space-x-1">
          <DollarSign className="h-4 w-4 text-green-400" />
          <span className="font-medium">${client.budget_utilized.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'health_score',
      header: 'Health Score',
      sortable: true,
      align: 'center',
      accessor: (client) => client.health_score ? (
        <div className="flex items-center justify-center">
          <div className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${client.health_score >= 80 ? 'bg-green-100 text-green-800' :
              client.health_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}
          `}>
            {client.health_score}%
          </div>
        </div>
      ) : '-',
    },
    {
      key: 'assigned_hr',
      header: 'Assigned HR',
      sortable: true,
      filterable: true,
      accessor: (client) => client.assigned_hr || (
        <span className="text-gray-400 italic">Unassigned</span>
      ),
    },
    {
      key: 'last_activity_date',
      header: 'Last Activity',
      sortable: true,
      accessor: (client) => (
        <div className="flex items-center space-x-1">
          <Activity className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(client.last_activity_date).toLocaleDateString()}
          </span>
        </div>
      ),
    },
  ];

  const tableActions: TableAction<UnifiedClient>[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (client) => onViewDetails?.(client),
      variant: 'ghost',
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (client) => onEditClient?.(client),
      variant: 'ghost',
    },
    {
      label: 'New Requirement',
      icon: <Users className="h-4 w-4" />,
      onClick: (client) => onCreateRequirement?.(client),
      variant: 'ghost',
      condition: (client) => client.status === 'Active',
    },
  ];

  const bulkActions: BulkAction<UnifiedClient>[] = [
    {
      label: 'Export Selected',
      icon: <Eye className="h-4 w-4 mr-2" />,
      onClick: (clients) => {
        onExportClients?.(clients);
        toast.success({
          title: 'Export completed',
          description: `${clients.length} client(s) exported successfully.`
        });
      },
      variant: 'outline',
    },
  ];

  return (
    <EnhancedDataTable
      data={clients}
      columns={columns}
      keyField="id"
      title="Client Management"
      description="Track and manage your client relationships and requirements"
      searchPlaceholder="Search clients by name, contact, or HR..."
      loading={loading}
      searchable={true}
      filterable={true}
      sortable={true}
      selectable={true}
      exportable={true}
      refreshable={true}
      pagination={true}
      pageSize={15}
      actions={tableActions}
      bulkActions={bulkActions}
      onRefresh={onRefresh}
      onExport={onExportClients}
      onRowClick={onViewDetails}
      emptyMessage="No clients found. Add your first client to get started."
      rowClassName={(client) => 
        client.health_score && client.health_score < 40 ? 'bg-red-50 border-red-200' :
        client.hiring_status === 'Active' ? 'bg-green-50 border-green-200' : ''
      }
    />
  );
}
