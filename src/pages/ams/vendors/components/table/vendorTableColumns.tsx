
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  MoreHorizontalIcon, 
  EditIcon, 
  TrashIcon, 
  EyeIcon,
  MailIcon,
  PhoneIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Vendor } from '../../types/VendorTypes';
import { format } from 'date-fns';
import { getStatusBadgeVariant, getSLABadgeVariant } from './badgeUtils';

interface ColumnProps {
  onVendorClick: (vendor: Vendor) => void;
}

export const createVendorTableColumns = ({ onVendorClick }: ColumnProps): DataTableColumn<Vendor>[] => [
  {
    id: 'name',
    header: 'Vendor Name',
    enableSorting: true,
    enableFiltering: true,
    cell: (vendor) => (
      <div className="space-y-1">
        <button
          onClick={() => onVendorClick(vendor)}
          className="text-blue-600 hover:text-blue-800 font-medium text-left"
        >
          {vendor.name}
        </button>
        <div className="text-xs text-gray-500">{vendor.vendorId}</div>
      </div>
    )
  },
  {
    id: 'tier',
    header: 'Tier',
    enableSorting: true,
    enableFiltering: true,
    cell: (vendor) => (
      <Badge variant="outline" className="text-xs">
        {vendor.tier}
      </Badge>
    )
  },
  {
    id: 'status',
    header: 'Status',
    enableSorting: true,
    enableFiltering: true,
    cell: (vendor) => (
      <Badge variant={getStatusBadgeVariant(vendor.status)}>
        {vendor.status}
      </Badge>
    )
  },
  {
    id: 'slaStatus',
    header: 'SLA Status',
    enableSorting: true,
    enableFiltering: true,
    cell: (vendor) => (
      <Badge variant={getSLABadgeVariant(vendor.slaStatus)}>
        {vendor.slaStatus}
      </Badge>
    )
  },
  {
    id: 'rolesAssigned',
    header: 'Roles',
    enableSorting: true,
    cell: (vendor) => (
      <div className="text-center">
        <div className="font-medium">{vendor.rolesAssigned}</div>
        <div className="text-xs text-gray-500">assigned</div>
      </div>
    )
  },
  {
    id: 'activeRequirements',
    header: 'Active Req.',
    enableSorting: true,
    cell: (vendor) => (
      <div className="text-center">
        <div className="font-medium">{vendor.activeRequirements}</div>
        <div className="text-xs text-gray-500">active</div>
      </div>
    )
  },
  {
    id: 'rating',
    header: 'Rating',
    enableSorting: true,
    cell: (vendor) => (
      <div className="flex items-center gap-1">
        <span className="font-medium">{vendor.rating}</span>
        <span className="text-yellow-400">★</span>
      </div>
    )
  },
  {
    id: 'contact',
    header: 'Contact',
    cell: (vendor) => (
      <div className="flex items-center gap-2">
        <MailIcon className="h-3 w-3 text-gray-400" />
        <PhoneIcon className="h-3 w-3 text-gray-400" />
        <span className="text-xs text-gray-600">
          {vendor.contactInfo.primaryContact}
        </span>
      </div>
    )
  },
  {
    id: 'lastActive',
    header: 'Last Active',
    enableSorting: true,
    cell: (vendor) => (
      <div className="text-xs text-gray-600">
        {format(new Date(vendor.lastActiveDate), 'MMM dd, yyyy')}
      </div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (vendor) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onVendorClick(vendor)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EditIcon className="h-4 w-4 mr-2" />
            Edit Vendor
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
