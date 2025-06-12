
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface VendorTableColumnsProps {
  onVendorClick: (vendor: Vendor) => void;
}

export const createVendorTableColumns = ({ onVendorClick }: VendorTableColumnsProps) => [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Vendor Name',
    enableSorting: true,
    enableFiltering: true,
    cell: (vendor: Vendor) => (
      <div className="flex flex-col">
        <span className="font-medium">{vendor.name}</span>
        <span className="text-sm text-gray-500">{vendor.vendorId}</span>
      </div>
    )
  },
  {
    id: 'contact',
    accessorKey: 'contactInfo.email',
    header: 'Contact',
    enableSorting: false,
    cell: (vendor: Vendor) => (
      <div className="flex flex-col">
        <span className="text-sm">{vendor.contactInfo.primaryContact}</span>
        <span className="text-xs text-gray-500">{vendor.contactInfo.email}</span>
      </div>
    )
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true,
    cell: (vendor: Vendor) => (
      <Badge 
        variant={vendor.status === 'Active' ? 'default' : 'secondary'}
        className={vendor.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
      >
        {vendor.status}
      </Badge>
    )
  },
  {
    id: 'tier',
    accessorKey: 'tier',
    header: 'Tier',
    enableSorting: true,
    cell: (vendor: Vendor) => (
      <Badge variant="outline">{vendor.tier}</Badge>
    )
  },
  {
    id: 'rating',
    accessorKey: 'rating',
    header: 'Rating',
    enableSorting: true,
    cell: (vendor: Vendor) => (
      <div className="flex items-center gap-1">
        <span>{vendor.rating.toFixed(1)}</span>
        <span className="text-yellow-500">★</span>
      </div>
    )
  },
  {
    id: 'roles',
    accessorKey: 'rolesAssigned',
    header: 'Roles',
    enableSorting: true,
    cell: (vendor: Vendor) => (
      <span className="font-medium">{vendor.rolesAssigned}</span>
    )
  },
  {
    id: 'sla',
    accessorKey: 'slaStatus',
    header: 'SLA',
    enableSorting: true,
    cell: (vendor: Vendor) => (
      <Badge 
        variant={vendor.slaStatus === 'Good' ? 'default' : 'destructive'}
        className={
          vendor.slaStatus === 'Good' ? 'bg-green-100 text-green-800' :
          vendor.slaStatus === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }
      >
        {vendor.slaStatus}
      </Badge>
    )
  },
  {
    id: 'actions',
    accessorKey: 'id',
    header: 'Actions',
    enableSorting: false,
    cell: (vendor: Vendor) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onVendorClick(vendor)}
      >
        <Eye className="h-4 w-4" />
      </Button>
    )
  }
];
