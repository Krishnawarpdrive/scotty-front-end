
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientRequirementsTabProps {
  client: Client;
  onCreateRequirement: () => void;
}

interface Requirement {
  id: string;
  name: string;
  roleName: string;
  roleId: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

const ClientRequirementsTab: React.FC<ClientRequirementsTabProps> = ({ 
  client, 
  onCreateRequirement 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Demo data for requirements
  const requirements: Requirement[] = client.roles?.flatMap(role => [
    {
      id: `req-${role.id}-1`,
      name: `${role.name} Developer`,
      roleName: role.name,
      roleId: role.id,
      status: 'Open',
      assignedTo: 'Alice Smith',
      dueDate: '2025-06-15',
      priority: 'High' as const
    },
    {
      id: `req-${role.id}-2`,
      name: `Sr. ${role.name} Developer`,
      roleName: role.name,
      roleId: role.id,
      status: 'In Progress',
      assignedTo: 'Bob Johnson',
      dueDate: '2025-06-20',
      priority: 'Medium' as const
    }
  ]) || [];

  // Filter requirements based on search term
  const filteredRequirements = requirements.filter(req => 
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client Requirements</h2>
        <Button 
          onClick={onCreateRequirement}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Requirement
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      {filteredRequirements.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Requirement Name</TableHead>
                  <TableHead className="w-[15%]">Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequirements.map((requirement) => (
                  <TableRow key={requirement.id}>
                    <TableCell className="font-medium">
                      {requirement.name}
                    </TableCell>
                    <TableCell>{requirement.roleName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeClass(requirement.status)}>
                        {requirement.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{requirement.assignedTo}</TableCell>
                    <TableCell>{requirement.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityBadgeClass(requirement.priority)}>
                        {requirement.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="text-center p-12 bg-muted/20 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">No Requirements Found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm 
              ? "No requirements match your search criteria." 
              : "This client doesn't have any requirements yet. Create your first requirement to get started."}
          </p>
          {!searchTerm && (
            <Button onClick={onCreateRequirement} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create First Requirement
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientRequirementsTab;
