
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientRolesTabProps {
  client: Client;
  onCreateRole: () => void;
}

interface Role {
  id: string;
  name: string;
  status: 'Open' | 'Closed';
  vacancies: number;
  hiringManager: string;
  createdDate: string;
  updatedDate: string;
  requirements?: Requirement[];
}

interface Requirement {
  id: string;
  name: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

const ClientRolesTab: React.FC<ClientRolesTabProps> = ({ client, onCreateRole }) => {
  // Expanded state for roles
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

  // Get roles from client or use demo data if not available
  const roles = client.roles && client.roles.length > 0 
    ? client.roles.map(role => ({
        id: role.id,
        name: role.name,
        status: 'Open' as const,
        vacancies: 2,
        hiringManager: 'John Doe',
        createdDate: '2025-05-10',
        updatedDate: '2025-05-15',
        requirements: [
          {
            id: `req-${role.id}-1`,
            name: `${role.name} Developer`,
            status: 'In Progress',
            assignedTo: 'Alice Smith',
            dueDate: '2025-06-15',
            priority: 'High' as const
          },
          {
            id: `req-${role.id}-2`,
            name: `Sr. ${role.name} Developer`,
            status: 'Open',
            assignedTo: 'Bob Johnson',
            dueDate: '2025-06-20',
            priority: 'Medium' as const
          }
        ]
      }))
    : [];

  const toggleRoleExpand = (roleId: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

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
        <h2 className="text-xl font-semibold">Client Roles</h2>
        <Button 
          onClick={onCreateRole}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Role
        </Button>
      </div>
      
      {roles.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Role Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vacancies</TableHead>
                  <TableHead>Hiring Manager</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <React.Fragment key={role.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleRoleExpand(role.id)}
                    >
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(role.status)}>
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{role.vacancies}</TableCell>
                      <TableCell>{role.hiringManager}</TableCell>
                      <TableCell>{role.createdDate}</TableCell>
                      <TableCell>{role.updatedDate}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRoleExpand(role.id);
                          }}
                        >
                          {expandedRoles[role.id] ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded Requirements View */}
                    {expandedRoles[role.id] && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-muted/30 p-0">
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Requirements</h4>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <PlusCircle className="h-3 w-3" />
                                Add Requirement
                              </Button>
                            </div>
                            
                            {role.requirements && role.requirements.length > 0 ? (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Requirement Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Priority</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {role.requirements.map((req) => (
                                    <TableRow key={req.id}>
                                      <TableCell>{req.name}</TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className={getStatusBadgeClass(req.status)}>
                                          {req.status}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>{req.assignedTo}</TableCell>
                                      <TableCell>{req.dueDate}</TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className={getPriorityBadgeClass(req.priority)}>
                                          {req.priority}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <div className="text-center py-6 bg-muted/10 rounded-md">
                                <p className="text-muted-foreground">No requirements found for this role</p>
                                <Button variant="outline" size="sm" className="mt-2 flex items-center gap-1">
                                  <PlusCircle className="h-3 w-3" />
                                  Create First Requirement
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="text-center p-12 bg-muted/20 rounded-lg border">
          <h3 className="text-lg font-medium mb-2">No Roles Found</h3>
          <p className="text-muted-foreground mb-6">
            This client doesn't have any roles yet. Create your first role to get started.
          </p>
          <Button onClick={onCreateRole} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create First Role
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientRolesTab;
