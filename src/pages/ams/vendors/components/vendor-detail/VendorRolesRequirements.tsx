
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  PlusIcon, 
  BriefcaseIcon, 
  CalendarIcon,
  UsersIcon,
  MoreHorizontalIcon,
  EditIcon,
  EyeIcon,
  UserPlusIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Vendor, VendorRole } from '../../types/VendorTypes';
import { format } from 'date-fns';

interface VendorRolesRequirementsProps {
  vendor: Vendor;
  roles: VendorRole[];
}

export const VendorRolesRequirements: React.FC<VendorRolesRequirementsProps> = ({ 
  vendor, 
  roles 
}) => {
  const [selectedRole, setSelectedRole] = useState<VendorRole | null>(null);

  const getStatusBadgeVariant = (status: VendorRole['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'On Hold': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority: VendorRole['priority']) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const columns: DataTableColumn<VendorRole>[] = [
    {
      id: 'roleName',
      header: 'Role Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <div className="space-y-1">
          <button
            onClick={() => setSelectedRole(role)}
            className="text-blue-600 hover:text-blue-800 font-medium text-left"
          >
            {role.roleName}
          </button>
          <div className="text-xs text-gray-500">{role.clientName}</div>
        </div>
      )
    },
    {
      id: 'vacancies',
      header: 'Vacancies',
      enableSorting: true,
      cell: (role) => (
        <div className="text-center">
          <div className="font-medium">{role.vacancies}</div>
          <div className="text-xs text-gray-500">total</div>
        </div>
      )
    },
    {
      id: 'filled',
      header: 'Filled',
      enableSorting: true,
      cell: (role) => (
        <div className="text-center">
          <div className="font-medium text-green-600">{role.filledPositions}</div>
          <div className="text-xs text-gray-500">positions</div>
        </div>
      )
    },
    {
      id: 'progress',
      header: 'Progress',
      cell: (role) => {
        const progress = (role.filledPositions / role.vacancies) * 100;
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium">{progress.toFixed(0)}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        );
      }
    },
    {
      id: 'priority',
      header: 'Priority',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <Badge variant={getPriorityBadgeVariant(role.priority)}>
          {role.priority}
        </Badge>
      )
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <Badge variant={getStatusBadgeVariant(role.status)}>
          {role.status}
        </Badge>
      )
    },
    {
      id: 'deadline',
      header: 'Deadline',
      enableSorting: true,
      cell: (role) => (
        <div className="flex items-center gap-1 text-sm">
          <CalendarIcon className="h-3 w-3 text-gray-400" />
          {format(new Date(role.deadline), 'MMM dd, yyyy')}
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (role) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedRole(role)}>
              <EyeIcon className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add Candidate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              Roles & Requirements ({roles.length})
            </CardTitle>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Role Vacancy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={roles}
            columns={columns}
            onRowClick={setSelectedRole}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BriefcaseIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold">{roles.length}</div>
                <div className="text-sm text-gray-600">Total Roles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UsersIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {roles.reduce((sum, role) => sum + role.vacancies, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Vacancies</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UsersIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {roles.reduce((sum, role) => sum + role.filledPositions, 0)}
                </div>
                <div className="text-sm text-gray-600">Filled Positions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {roles.filter(role => role.status === 'Active').length}
                </div>
                <div className="text-sm text-gray-600">Active Roles</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
