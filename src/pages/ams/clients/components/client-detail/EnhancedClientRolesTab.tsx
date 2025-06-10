
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable, DataTableColumn } from '@/design-system/components/DataTable/DataTable';

interface Requirement {
  id: string;
  name: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed' | 'On Hold';
  vacancies: number;
  due_date?: string;
  assigned_to?: string;
  hiring_manager?: string;
  budget_variance?: string;
  experience_variance?: string;
  custom_jd?: string;
  role_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;
}

interface RoleWithRequirements {
  id: string;
  name: string;
  external_name?: string;
  category: string;
  employment_type: string;
  work_mode: string;
  min_experience: string;
  max_experience: string;
  job_description?: string;
  is_template: boolean;
  source_type?: string;
  client_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  template_id?: string;
  usage_count?: number;
  requirements: Requirement[];
}

interface EnhancedClientRolesTabProps {
  client: any;
  onCreateRole: () => void;
}

export const EnhancedClientRolesTab: React.FC<EnhancedClientRolesTabProps> = ({
  client
}) => {
  const [roles, setRoles] = useState<RoleWithRequirements[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data with proper type handling
    const mockRoles: RoleWithRequirements[] = [
      {
        id: '1',
        name: 'Senior Frontend Developer',
        external_name: 'Senior Frontend Developer',
        category: 'Engineering',
        employment_type: 'Full-time',
        work_mode: 'Remote',
        min_experience: '3 years',
        max_experience: '7 years',
        job_description: 'Senior frontend developer role',
        is_template: false,
        source_type: 'custom',
        client_id: client?.id,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        created_by: 'HR Team',
        template_id: undefined,
        usage_count: 0,
        requirements: [
          {
            id: '1',
            name: 'Frontend Developer - Q1 2024',
            description: 'Urgent requirement for frontend developer',
            priority: 'High' as const,
            status: 'Open' as const,
            vacancies: 2,
            due_date: '2024-02-15',
            assigned_to: 'John Doe',
            hiring_manager: 'Jane Smith',
            budget_variance: undefined,
            experience_variance: undefined,
            custom_jd: undefined,
            role_id: '1',
            client_id: client?.id || '',
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          }
        ]
      }
    ];

    setRoles(mockRoles);
    setIsLoading(false);
  }, [client?.id]);

  const columns: DataTableColumn<RoleWithRequirements>[] = [
    {
      id: 'name',
      header: 'Role Name',
      accessor: 'name',
      sortable: true,
    },
    {
      id: 'category',
      header: 'Category',
      accessor: 'category',
      sortable: true,
    },
    {
      id: 'employment_type',
      header: 'Type',
      accessor: 'employment_type',
      sortable: true,
    },
    {
      id: 'work_mode',
      header: 'Work Mode',
      accessor: 'work_mode',
      sortable: true,
    },
    {
      id: 'requirements_count',
      header: 'Active Requirements',
      cell: (role: RoleWithRequirements) => (
        <Badge variant="secondary">
          {role.requirements?.length || 0}
        </Badge>
      ),
    },
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Client Roles</h3>
          <p className="text-sm text-gray-600">
            Manage roles and requirements for {client?.name}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">All Roles</TabsTrigger>
          <TabsTrigger value="active">Active Requirements</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Client Roles ({filteredRoles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredRoles}
                columns={columns}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Active requirements view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Role Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Templates view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
