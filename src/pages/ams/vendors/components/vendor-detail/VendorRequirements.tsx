
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { 
  ClipboardListIcon, 
  SearchIcon,
  CalendarIcon,
  UserIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Vendor } from '../../types/VendorTypes';
import { format, isAfter } from 'date-fns';

interface VendorRequirementsProps {
  vendor: Vendor;
}

interface Requirement {
  id: string;
  requirementId: string;
  roleName: string;
  vacancies: number;
  filled: number;
  shortlisted: number;
  interviewed: number;
  offered: number;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'On Hold';
  taAssigned: string;
  priority: 'High' | 'Medium' | 'Low';
}

const mockRequirements: Requirement[] = [
  {
    id: '1',
    requirementId: 'REQ-001',
    roleName: 'Senior Software Engineer',
    vacancies: 3,
    filled: 1,
    shortlisted: 8,
    interviewed: 5,
    offered: 2,
    dueDate: '2024-02-15',
    status: 'In Progress',
    taAssigned: 'Sarah Johnson',
    priority: 'High'
  },
  {
    id: '2',
    requirementId: 'REQ-002',
    roleName: 'Product Manager',
    vacancies: 2,
    filled: 0,
    shortlisted: 12,
    interviewed: 8,
    offered: 3,
    dueDate: '2024-02-28',
    status: 'Open',
    taAssigned: 'Michael Chen',
    priority: 'Medium'
  },
  {
    id: '3',
    requirementId: 'REQ-003',
    roleName: 'DevOps Engineer',
    vacancies: 1,
    filled: 1,
    shortlisted: 5,
    interviewed: 3,
    offered: 1,
    dueDate: '2024-01-30',
    status: 'Closed',
    taAssigned: 'Emily Davis',
    priority: 'Low'
  }
];

export const VendorRequirements: React.FC<VendorRequirementsProps> = ({ vendor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getStatusBadgeVariant = (status: Requirement['status']) => {
    switch (status) {
      case 'Open': return 'secondary';
      case 'In Progress': return 'default';
      case 'Closed': return 'outline';
      case 'On Hold': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority: Requirement['priority']) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getDueDateStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilDue < 0) return { text: 'Overdue', color: 'text-red-600' };
    if (daysUntilDue <= 7) return { text: 'Due Soon', color: 'text-orange-600' };
    return { text: format(due, 'MMM dd, yyyy'), color: 'text-gray-600' };
  };

  const columns: DataTableColumn<Requirement>[] = [
    {
      id: 'requirementId',
      header: 'Requirement ID',
      enableSorting: true,
      enableFiltering: true,
      cell: (req) => (
        <div className="space-y-1">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            {req.requirementId}
          </button>
          <div className="text-xs text-gray-500">{req.roleName}</div>
        </div>
      )
    },
    {
      id: 'vacancies',
      header: 'Vacancies',
      enableSorting: true,
      cell: (req) => (
        <div className="text-center">
          <div className="font-medium">{req.vacancies}</div>
          <div className="text-xs text-gray-500">total</div>
        </div>
      )
    },
    {
      id: 'progress',
      header: 'Hiring Progress',
      cell: (req) => {
        const progress = (req.filled / req.vacancies) * 100;
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Filled: {req.filled}/{req.vacancies}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-2 text-xs text-gray-500">
              <span>S: {req.shortlisted}</span>
              <span>I: {req.interviewed}</span>
              <span>O: {req.offered}</span>
            </div>
          </div>
        );
      }
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      enableSorting: true,
      cell: (req) => {
        const dueDateStatus = getDueDateStatus(req.dueDate);
        return (
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3 text-gray-400" />
            <span className={`text-sm ${dueDateStatus.color}`}>
              {dueDateStatus.text}
            </span>
          </div>
        );
      }
    },
    {
      id: 'status',
      header: 'Status',
      enableSorting: true,
      enableFiltering: true,
      cell: (req) => (
        <Badge variant={getStatusBadgeVariant(req.status)}>
          {req.status}
        </Badge>
      )
    },
    {
      id: 'priority',
      header: 'Priority',
      enableSorting: true,
      enableFiltering: true,
      cell: (req) => (
        <Badge variant={getPriorityBadgeVariant(req.priority)}>
          {req.priority}
        </Badge>
      )
    },
    {
      id: 'taAssigned',
      header: 'TA Assigned',
      enableSorting: true,
      enableFiltering: true,
      cell: (req) => (
        <div className="flex items-center gap-1">
          <UserIcon className="h-3 w-3 text-gray-400" />
          <span className="text-sm">{req.taAssigned}</span>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (req) => (
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
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Reassign TA
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const filteredRequirements = mockRequirements.filter(req => {
    const matchesSearch = req.requirementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.roleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardListIcon className="h-5 w-5" />
              Requirements ({filteredRequirements.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search requirements..."
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
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            data={filteredRequirements}
            columns={columns}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {mockRequirements.reduce((sum, req) => sum + req.vacancies, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Vacancies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {mockRequirements.reduce((sum, req) => sum + req.filled, 0)}
            </div>
            <div className="text-sm text-gray-600">Positions Filled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {mockRequirements.filter(req => req.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {mockRequirements.filter(req => isAfter(new Date(), new Date(req.dueDate))).length}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
