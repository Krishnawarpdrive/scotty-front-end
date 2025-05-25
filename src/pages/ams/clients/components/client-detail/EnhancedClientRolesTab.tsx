
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, ChevronDown, ChevronUp, Eye, Plus, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '../../types/ClientTypes';
import { Requirement } from '../../types/RequirementTypes';
import GlobalRoleSelectionDrawer from '../drawer/GlobalRoleSelectionDrawer';
import RequirementCreationDrawer from '../drawer/RequirementCreationDrawer';
import SteppedRoleCreationDrawer from '../../../roles/components/drawer/SteppedRoleCreationDrawer';

interface EnhancedClientRolesTabProps {
  client: Client;
}

interface RoleWithRequirements {
  id: string;
  name: string;
  external_name?: string;
  employment_type: string;
  work_mode: string;
  category: string;
  min_experience: string;
  max_experience: string;
  job_description?: string;
  template_id?: string;
  source_type: string;
  created_at: string;
  updated_at: string;
  vacancies?: number;
  requirements?: Requirement[];
}

const EnhancedClientRolesTab: React.FC<EnhancedClientRolesTabProps> = ({ client }) => {
  const [roles, setRoles] = useState<RoleWithRequirements[]>([]);
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});
  const [isGlobalRoleSelectionOpen, setIsGlobalRoleSelectionOpen] = useState(false);
  const [isRoleCreationOpen, setIsRoleCreationOpen] = useState(false);
  const [isRequirementCreationOpen, setIsRequirementCreationOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleWithRequirements | null>(null);
  const [selectedGlobalRole, setSelectedGlobalRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRolesAndRequirements = async () => {
    try {
      setLoading(true);
      
      // Fetch roles for this client
      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });

      if (rolesError) throw rolesError;

      // Fetch requirements for all roles
      const roleIds = rolesData?.map(role => role.id) || [];
      const { data: requirementsData, error: requirementsError } = await supabase
        .from('requirements')
        .select('*')
        .in('role_id', roleIds)
        .order('created_at', { ascending: false });

      if (requirementsError) throw requirementsError;

      // Group requirements by role_id
      const requirementsByRole = requirementsData?.reduce((acc, req) => {
        if (!acc[req.role_id]) acc[req.role_id] = [];
        acc[req.role_id].push(req);
        return acc;
      }, {} as Record<string, Requirement[]>) || {};

      // Combine roles with their requirements
      const rolesWithRequirements = rolesData?.map(role => ({
        ...role,
        requirements: requirementsByRole[role.id] || []
      })) || [];

      setRoles(rolesWithRequirements);
    } catch (error) {
      console.error('Error fetching roles and requirements:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch roles and requirements.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesAndRequirements();
  }, [client.id]);

  const toggleRoleExpand = (roleId: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  const handleCreateRoleFromTemplate = () => {
    setIsGlobalRoleSelectionOpen(true);
  };

  const handleCreateCustomRole = () => {
    setSelectedGlobalRole(null);
    setIsRoleCreationOpen(true);
  };

  const handleGlobalRoleSelected = (globalRole: any) => {
    setSelectedGlobalRole(globalRole);
    setIsRoleCreationOpen(true);
  };

  const handleAddRequirement = (role: RoleWithRequirements) => {
    setSelectedRole(role);
    setIsRequirementCreationOpen(true);
  };

  const handleRoleCreated = (newRole: any) => {
    fetchRolesAndRequirements();
    toast({
      title: 'Success!',
      description: `Role "${newRole.roleName || newRole.name}" has been created successfully.`,
    });
  };

  const handleRequirementCreated = (newRequirement: Requirement) => {
    fetchRolesAndRequirements();
    toast({
      title: 'Success!',
      description: `Requirement "${newRequirement.name}" has been created successfully.`,
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-50 text-green-700 border-green-200';
      case 'Closed': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'On Hold': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getSourceBadge = (sourceType: string) => {
    return sourceType === 'global_template' 
      ? <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Template</Badge>
      : <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Custom</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Client Roles</h2>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-muted/20 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-muted/20 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted/20 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Client Roles</h2>
          <div className="flex gap-2">
            <Button 
              onClick={handleCreateRoleFromTemplate}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              From Template
            </Button>
            <Button 
              onClick={handleCreateCustomRole}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Custom Role
            </Button>
          </div>
        </div>
        
        {roles.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Role Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Requirements</TableHead>
                    <TableHead>Employment Type</TableHead>
                    <TableHead>Work Mode</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <React.Fragment key={role.id}>
                      <TableRow 
                        className="cursor-pointer hover:bg-muted/20"
                        onClick={() => toggleRoleExpand(role.id)}
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div>{role.name}</div>
                            {role.external_name && role.external_name !== role.name && (
                              <div className="text-sm text-muted-foreground">
                                External: {role.external_name}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getSourceBadge(role.source_type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {role.requirements?.length || 0} Requirements
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddRequirement(role);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{role.employment_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{role.work_mode}</Badge>
                        </TableCell>
                        <TableCell>{role.min_experience}-{role.max_experience} years</TableCell>
                        <TableCell>{new Date(role.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle view JD
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
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
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded Requirements View */}
                      {expandedRoles[role.id] && (
                        <TableRow>
                          <TableCell colSpan={8} className="bg-muted/30 p-0">
                            <div className="p-4 space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">Requirements for {role.name}</h4>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1"
                                  onClick={() => handleAddRequirement(role)}
                                >
                                  <PlusCircle className="h-3 w-3" />
                                  Add Requirement
                                </Button>
                              </div>
                              
                              {role.requirements && role.requirements.length > 0 ? (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Requirement ID</TableHead>
                                      <TableHead>Name</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Priority</TableHead>
                                      <TableHead>Vacancies</TableHead>
                                      <TableHead>Assigned To</TableHead>
                                      <TableHead>Due Date</TableHead>
                                      <TableHead>Variances</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {role.requirements.map((req) => (
                                      <TableRow key={req.id}>
                                        <TableCell className="font-mono text-xs">
                                          {req.id.slice(0, 8)}...
                                        </TableCell>
                                        <TableCell className="font-medium">{req.name}</TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className={getStatusBadgeClass(req.status)}>
                                            {req.status}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className={getPriorityBadgeClass(req.priority)}>
                                            {req.priority}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>{req.vacancies}</TableCell>
                                        <TableCell>{req.assigned_to || '-'}</TableCell>
                                        <TableCell>
                                          {req.due_date ? new Date(req.due_date).toLocaleDateString() : '-'}
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex flex-wrap gap-1">
                                            {req.budget_variance && (
                                              <Badge variant="outline" className="text-xs">
                                                Budget: {req.budget_variance}
                                              </Badge>
                                            )}
                                            {req.experience_variance && (
                                              <Badge variant="outline" className="text-xs">
                                                Exp: {req.experience_variance}
                                              </Badge>
                                            )}
                                            {req.custom_jd && req.custom_jd !== role.job_description && (
                                              <Badge variant="outline" className="text-xs">
                                                Custom JD
                                              </Badge>
                                            )}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              ) : (
                                <div className="text-center py-6 bg-muted/10 rounded-md">
                                  <p className="text-muted-foreground">No requirements found for this role</p>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2 flex items-center gap-1"
                                    onClick={() => handleAddRequirement(role)}
                                  >
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
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Roles Found</h3>
            <p className="text-muted-foreground mb-6">
              This client doesn't have any roles yet. Create your first role to get started.
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={handleCreateRoleFromTemplate} variant="outline" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                From Template
              </Button>
              <Button onClick={handleCreateCustomRole} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Custom Role
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Drawers */}
      <GlobalRoleSelectionDrawer
        open={isGlobalRoleSelectionOpen}
        onOpenChange={setIsGlobalRoleSelectionOpen}
        onRoleSelected={handleGlobalRoleSelected}
        clientName={client.name}
      />

      <SteppedRoleCreationDrawer
        open={isRoleCreationOpen}
        onOpenChange={setIsRoleCreationOpen}
        clientId={client.id}
        clientName={client.name}
        onRoleCreated={handleRoleCreated}
        globalRoleTemplate={selectedGlobalRole}
      />

      {selectedRole && (
        <RequirementCreationDrawer
          open={isRequirementCreationOpen}
          onOpenChange={setIsRequirementCreationOpen}
          role={selectedRole}
          clientId={client.id}
          clientName={client.name}
          onRequirementCreated={handleRequirementCreated}
        />
      )}
    </>
  );
};

export default EnhancedClientRolesTab;
