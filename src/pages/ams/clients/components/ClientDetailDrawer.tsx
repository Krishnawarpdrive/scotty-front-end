
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getClientTierBadge, getHiringStatusBadge } from './ClientBadges';
import { SideDrawer } from '@/components/ui/side-drawer';
import RoleCreationDrawer from './role-creation/RoleCreationDrawer';
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Building, 
  Users, 
  Briefcase,
  TrendingUp,
  Calendar
} from "lucide-react";

interface ClientDetailDrawerProps {
  client: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientDetailDrawer: React.FC<ClientDetailDrawerProps> = ({ 
  client, 
  open,
  onOpenChange 
}) => {
  const { toast } = useToast();
  const [roleDrawerOpen, setRoleDrawerOpen] = useState(false);

  if (!client) return null;

  const handleCreateRole = () => {
    setRoleDrawerOpen(true);
  };

  const handleRoleCreated = (roleData: any) => {
    toast({
      title: "Role Created",
      description: `Role "${roleData.roleName}" has been created successfully for ${client.name}.`,
    });
  };

  const mockRoles = [
    {
      id: '1',
      name: 'Senior Frontend Developer',
      status: 'Active',
      vacancies: 2,
      filled: 0,
      dueDate: '2024-02-15',
      progress: 25
    },
    {
      id: '2',
      name: 'Product Manager',
      status: 'Active',
      vacancies: 1,
      filled: 0,
      dueDate: '2024-02-20',
      progress: 40
    }
  ];

  return (
    <>
      <SideDrawer
        open={open}
        onOpenChange={onOpenChange}
        title={`Client Details: ${client.name}`}
        size="xl"
      >
        <div className="p-6 space-y-6">
          {/* Client Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-medium">{client.accountType || 'Enterprise'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Industry</p>
                  <p className="font-medium">{client.industry || 'Technology'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client Tier</p>
                  <div>{getClientTierBadge(client.clientTier)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hiring Status</p>
                  <div>{getHiringStatusBadge(client.hiringStatus)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health & Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Health & Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Client Health Score</span>
                  <span className="text-sm font-bold">{client.healthScore || 85}/100</span>
                </div>
                <Progress value={client.healthScore || 85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Budget Utilized</span>
                  <span className="text-sm font-bold">{client.budgetUtilized || 60}%</span>
                </div>
                <Progress value={client.budgetUtilized || 60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Active Roles */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Active Roles ({mockRoles.length})
              </CardTitle>
              <Button size="sm" onClick={handleCreateRole}>
                <Plus className="h-4 w-4 mr-1" />
                Create Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRoles.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <Badge variant={role.status === 'Active' ? 'default' : 'outline'}>
                          {role.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-gray-600">
                          Filled: {role.filled} / {role.vacancies}
                        </p>
                        <p className="text-gray-600">
                          Due: {new Date(role.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs text-gray-600">{role.progress}%</span>
                      </div>
                      <Progress value={role.progress} className="h-1.5" />
                    </div>
                  </div>
                ))}
                
                {mockRoles.length === 0 && (
                  <div className="text-center py-8 border rounded-lg bg-gray-50">
                    <Briefcase className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-3">No active roles found</p>
                    <Button variant="outline" size="sm" onClick={handleCreateRole}>
                      <Plus className="h-4 w-4 mr-1" />
                      Create First Role
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{client.totalRequirements || 12}</p>
                <p className="text-sm text-gray-600">Total Requirements</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {client.nextDueDate ? new Date(client.nextDueDate).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-sm text-gray-600">Next Due Date</p>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          {client.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{client.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </SideDrawer>

      <RoleCreationDrawer
        open={roleDrawerOpen}
        onOpenChange={setRoleDrawerOpen}
        clientId={client.id}
        clientName={client.name}
        onRoleCreated={handleRoleCreated}
      />
    </>
  );
};

export default ClientDetailDrawer;
