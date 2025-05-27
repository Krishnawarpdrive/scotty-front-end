
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  PlusIcon, 
  BriefcaseIcon, 
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  EditIcon,
  EyeIcon,
  CopyIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Vendor } from '../../types/VendorTypes';
import { format } from 'date-fns';

interface VendorRolesProps {
  vendor: Vendor;
}

interface VendorRole {
  id: string;
  name: string;
  source: 'Template' | 'Custom';
  requirements: number;
  employmentType: string;
  workMode: string;
  experience: string;
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Draft';
}

const mockRoles: VendorRole[] = [
  {
    id: '1',
    name: 'Senior Software Engineer',
    source: 'Template',
    requirements: 3,
    employmentType: 'Full-time',
    workMode: 'Remote',
    experience: '5-8 years',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Product Manager',
    source: 'Custom',
    requirements: 2,
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    experience: '3-5 years',
    createdAt: '2024-01-10T14:20:00Z',
    status: 'Active'
  },
  {
    id: '3',
    name: 'DevOps Engineer',
    source: 'Template',
    requirements: 1,
    employmentType: 'Contract',
    workMode: 'On-site',
    experience: '4-6 years',
    createdAt: '2024-01-08T09:15:00Z',
    status: 'Draft'
  }
];

export const VendorRoles: React.FC<VendorRolesProps> = ({ vendor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const getStatusBadgeVariant = (status: VendorRole['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'destructive';
      case 'Draft': return 'secondary';
      default: return 'outline';
    }
  };

  const getSourceBadgeVariant = (source: VendorRole['source']) => {
    return source === 'Template' ? 'outline' : 'secondary';
  };

  const columns: DataTableColumn<VendorRole>[] = [
    {
      id: 'name',
      header: 'Role Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <div className="space-y-1">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-left">
            {role.name}
          </button>
          <div className="flex items-center gap-2">
            <Badge variant={getSourceBadgeVariant(role.source)} className="text-xs">
              {role.source}
            </Badge>
          </div>
        </div>
      )
    },
    {
      id: 'requirements',
      header: 'Requirements',
      enableSorting: true,
      cell: (role) => (
        <div className="text-center">
          <div className="font-medium">{role.requirements}</div>
          <div className="text-xs text-gray-500">active</div>
        </div>
      )
    },
    {
      id: 'employmentType',
      header: 'Employment Type',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <span className="text-sm">{role.employmentType}</span>
      )
    },
    {
      id: 'workMode',
      header: 'Work Mode',
      enableSorting: true,
      enableFiltering: true,
      cell: (role) => (
        <span className="text-sm">{role.workMode}</span>
      )
    },
    {
      id: 'experience',
      header: 'Experience',
      enableSorting: true,
      cell: (role) => (
        <span className="text-sm">{role.experience}</span>
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
      id: 'createdAt',
      header: 'Date Created',
      enableSorting: true,
      cell: (role) => (
        <span className="text-sm">
          {format(new Date(role.createdAt), 'MMM dd, yyyy')}
        </span>
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
            <DropdownMenuItem>
              <EyeIcon className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon className="h-4 w-4 mr-2" />
              Duplicate Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const filteredRoles = mockRoles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || role.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              Vendor Roles ({filteredRoles.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add from Template
              </Button>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Custom Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Template">Template</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            data={filteredRoles}
            columns={columns}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{mockRoles.length}</div>
            <div className="text-sm text-gray-600">Total Roles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockRoles.filter(r => r.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Roles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {mockRoles.reduce((sum, role) => sum + role.requirements, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Requirements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {mockRoles.filter(r => r.source === 'Template').length}
            </div>
            <div className="text-sm text-gray-600">From Templates</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
