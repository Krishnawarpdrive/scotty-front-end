import React from 'react';
import { EnhancedDataTable, Column, TableAction, BulkAction } from '@/components/enhanced-tables';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEnhancedToast } from '@/components/feedback/EnhancedToast';
import { Eye, Edit, Trash2, UserCheck, UserX, Star } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface EnhancedVendorsTableProps {
  vendors: Vendor[];
  loading?: boolean;
  onRefresh?: () => void;
  onViewDetails?: (vendor: Vendor) => void;
  onEditVendor?: (vendor: Vendor) => void;
  onDeleteVendor?: (vendor: Vendor) => void;
  onActivateVendors?: (vendors: Vendor[]) => void;
  onDeactivateVendors?: (vendors: Vendor[]) => void;
  onExportVendors?: (vendors: Vendor[]) => void;
}

export function EnhancedVendorsTable({
  vendors,
  loading = false,
  onRefresh,
  onViewDetails,
  onEditVendor,
  onDeleteVendor,
  onActivateVendors,
  onDeactivateVendors,
  onExportVendors,
}: EnhancedVendorsTableProps) {
  const toast = useEnhancedToast();

  const columns: Column<Vendor>[] = [
    {
      key: 'name',
      header: 'Vendor Name',
      sortable: true,
      filterable: true,
      accessor: (vendor) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {vendor.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{vendor.name}</div>
            <div className="text-sm text-gray-500">{vendor.vendorId}</div>
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
      accessor: (vendor) => (
        <Badge 
          variant={
            vendor.status === 'Active' ? 'default' :
            vendor.status === 'Paused' ? 'secondary' : 'destructive'
          }
        >
          {vendor.status}
        </Badge>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Premium', label: 'Premium' },
        { value: 'Standard', label: 'Standard' },
        { value: 'Basic', label: 'Basic' },
      ],
      accessor: (vendor) => (
        <Badge 
          variant={
            vendor.tier === 'Premium' ? 'default' :
            vendor.tier === 'Standard' ? 'secondary' : 'outline'
          }
        >
          {vendor.tier}
        </Badge>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      align: 'center',
      accessor: (vendor) => (
        <div className="flex items-center justify-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="font-medium">{vendor.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'rolesAssigned',
      header: 'Active Roles',
      sortable: true,
      align: 'center',
      accessor: (vendor) => (
        <span className="font-medium">{vendor.rolesAssigned}</span>
      ),
    },
    {
      key: 'activeRequirements',
      header: 'Requirements',
      sortable: true,
      align: 'center',
      accessor: (vendor) => (
        <span className="font-medium">{vendor.activeRequirements}</span>
      ),
    },
    {
      key: 'slaStatus',
      header: 'SLA Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Good', label: 'Good' },
        { value: 'Warning', label: 'Warning' },
        { value: 'Breach', label: 'Breach' },
      ],
      accessor: (vendor) => (
        <Badge 
          variant={
            vendor.slaStatus === 'Good' ? 'default' :
            vendor.slaStatus === 'Warning' ? 'secondary' : 'destructive'
          }
        >
          {vendor.slaStatus}
        </Badge>
      ),
    },
    {
      key: 'lastActiveDate',
      header: 'Last Active',
      sortable: true,
      accessor: (vendor) => (
        <span className="text-sm text-gray-600">
          {new Date(vendor.lastActiveDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const tableActions: TableAction<Vendor>[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (vendor) => onViewDetails?.(vendor),
      variant: 'outline',
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (vendor) => onEditVendor?.(vendor),
      variant: 'outline',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (vendor) => {
        if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
          onDeleteVendor?.(vendor);
          toast.success({
            title: 'Vendor deleted',
            description: `${vendor.name} has been deleted successfully.`
          });
        }
      },
      variant: 'outline',
      condition: (vendor) => vendor.status !== 'Active',
    },
  ];

  const bulkActions: BulkAction<Vendor>[] = [
    {
      label: 'Activate Selected',
      icon: <UserCheck className="h-4 w-4 mr-2" />,
      onClick: (vendors) => {
        onActivateVendors?.(vendors);
        toast.success({
          title: 'Vendors activated',
          description: `${vendors.length} vendor(s) have been activated.`
        });
      },
      variant: 'default',
      condition: (vendors) => vendors.some(v => v.status !== 'Active'),
    },
    {
      label: 'Deactivate Selected',
      icon: <UserX className="h-4 w-4 mr-2" />,
      onClick: (vendors) => {
        onDeactivateVendors?.(vendors);
        toast.warning({
          title: 'Vendors deactivated',
          description: `${vendors.length} vendor(s) have been deactivated.`
        });
      },
      variant: 'outline',
      condition: (vendors) => vendors.some(v => v.status === 'Active'),
    },
  ];

  return (
    <EnhancedDataTable
      data={vendors}
      columns={columns}
      keyField="id"
      title="Vendor Management"
      description="Manage your vendor relationships and performance"
      searchPlaceholder="Search vendors by name, ID, or contact..."
      loading={loading}
      searchable={true}
      filterable={true}
      sortable={true}
      selectable={true}
      exportable={true}
      refreshable={true}
      pagination={true}
      pageSize={10}
      actions={tableActions}
      bulkActions={bulkActions}
      onRefresh={onRefresh}
      onExport={onExportVendors}
      onRowClick={onViewDetails}
      emptyMessage="No vendors found. Add your first vendor to get started."
      rowClassName={(vendor) => 
        vendor.slaStatus === 'Breach' ? 'bg-red-50 border-red-200' :
        vendor.slaStatus === 'Warning' ? 'bg-yellow-50 border-yellow-200' : ''
      }
    />
  );
}
