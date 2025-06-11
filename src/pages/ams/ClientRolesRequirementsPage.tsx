
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, Users } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import type { DataTableColumn } from '@/components/ui/data-table/types';

interface Requirement {
  id: string;
  name: string;
  client: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  vacancies: number;
  filled: number;
  dueDate: string;
  assignedTo: string;
  budget: string;
  lastUpdated: string;
}

// Mock data for requirements
const mockRequirements: Requirement[] = [
  {
    id: 'REQ-001',
    name: 'Senior Frontend Developer',
    client: 'TechCorp Inc',
    status: 'Open',
    priority: 'High',
    vacancies: 3,
    filled: 1,
    dueDate: '2024-02-15',
    assignedTo: 'John Smith',
    budget: '$80,000 - $120,000',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'REQ-002',
    name: 'DevOps Engineer',
    client: 'StartupXYZ',
    status: 'In Progress',
    priority: 'Medium',
    vacancies: 2,
    filled: 0,
    dueDate: '2024-02-28',
    assignedTo: 'Sarah Johnson',
    budget: '$70,000 - $100,000',
    lastUpdated: '2024-01-08'
  },
  {
    id: 'REQ-003',
    name: 'Data Scientist',
    client: 'DataDriven Co',
    status: 'Open',
    priority: 'Critical',
    vacancies: 1,
    filled: 0,
    dueDate: '2024-01-30',
    assignedTo: 'Mike Wilson',
    budget: '$90,000 - $130,000',
    lastUpdated: '2024-01-12'
  }
];

const StatusBadge: React.FC<{ status: Requirement['status'] }> = ({ status }) => {
  const variants = {
    'Open': 'bg-green-100 text-green-800 border-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Closed': 'bg-gray-100 text-gray-800 border-gray-200',
    'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  );
};

const PriorityBadge: React.FC<{ priority: Requirement['priority'] }> = ({ priority }) => {
  const variants = {
    'Low': 'bg-gray-100 text-gray-800 border-gray-200',
    'Medium': 'bg-blue-100 text-blue-800 border-blue-200',
    'High': 'bg-orange-100 text-orange-800 border-orange-200',
    'Critical': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Badge variant="outline" className={variants[priority]}>
      {priority}
    </Badge>
  );
};

const ClientRolesRequirementsPage: React.FC = () => {
  const [requirements] = useState<Requirement[]>(mockRequirements);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleView = useCallback((requirement: Requirement) => {
    console.log('View requirement:', requirement);
  }, []);

  const handleEdit = useCallback((requirement: Requirement) => {
    console.log('Edit requirement:', requirement);
  }, []);

  const handleDelete = useCallback((requirement: Requirement) => {
    console.log('Delete requirement:', requirement);
  }, []);

  const columns: DataTableColumn<Requirement>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Requirement Name',
      enableSorting: true,
      enableFiltering: true,
      cell: (requirement) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{requirement.name}</span>
          <span className="text-sm text-gray-500">{requirement.id}</span>
        </div>
      )
    },
    {
      id: 'client',
      accessorKey: 'client',
      header: 'Client',
      enableSorting: true,
      cell: (requirement) => (
        <span className="text-gray-900">{requirement.client}</span>
      )
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      enableSorting: true,
      cell: (requirement) => (
        <StatusBadge status={requirement.status} />
      )
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: 'Priority',
      enableSorting: true,
      cell: (requirement) => (
        <PriorityBadge priority={requirement.priority} />
      )
    },
    {
      id: 'progress',
      accessorKey: 'filled',
      header: 'Progress',
      cell: (requirement) => (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              {requirement.filled}/{requirement.vacancies}
            </span>
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(requirement.filled / requirement.vacancies) * 100}%`
              }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'dueDate',
      accessorKey: 'dueDate',
      header: 'Due Date',
      enableSorting: true,
      cell: (requirement) => (
        <span className="text-gray-700">
          {new Date(requirement.dueDate).toLocaleDateString()}
        </span>
      )
    },
    {
      id: 'assignedTo',
      accessorKey: 'assignedTo',
      header: 'Assigned To',
      cell: (requirement) => (
        <span className="text-gray-700">{requirement.assignedTo}</span>
      )
    },
    {
      id: 'budget',
      accessorKey: 'budget',
      header: 'Budget',
      cell: (requirement) => (
        <span className="text-gray-700 font-medium">{requirement.budget}</span>
      )
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: 'Actions',
      cell: (requirement) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(requirement)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(requirement)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(requirement)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Roles & Requirements</h1>
          <p className="text-gray-600 mt-1">Manage and track all client requirements</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Requirement</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search requirements or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requirements ({filteredRequirements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredRequirements}
            columns={columns}
            searchable={false} // We handle search externally
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientRolesRequirementsPage;
