
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from 'lucide-react';
import { getClientTierBadge, getHiringStatusBadge } from './ClientBadges';

interface ClientOverviewTabsProps {
  client: any;
  onEditClient: (client: any) => void;
  onCreateRole: (clientId: string) => void;
}

const ClientOverviewTabs: React.FC<ClientOverviewTabsProps> = ({ 
  client,
  onEditClient,
  onCreateRole
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!client) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{client.accountType}</Badge>
            {getClientTierBadge(client.clientTier)}
            {getHiringStatusBadge(client.hiringStatus)}
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => onEditClient(client)}
        >
          <Edit className="h-4 w-4" />
          Edit Client
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Client Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Industry:</dt>
                    <dd>{client.industry || "Not specified"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd>{client.headquarters || "Not specified"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Contact:</dt>
                    <dd>{client.contact}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email:</dt>
                    <dd>{client.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Created On:</dt>
                    <dd>{client.createdOn}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Health Score:</dt>
                    <dd className="font-medium">{client.healthScore}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Total Roles:</dt>
                    <dd className="font-medium">{client.roles?.length || 0}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Requirements:</dt>
                    <dd className="font-medium">{client.totalRequirements}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Budget Utilized:</dt>
                    <dd className="font-medium">{client.budgetUtilized}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Assigned HR:</dt>
                    <dd className="font-medium">{client.assignedHR || "None"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Notes & Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="text-muted-foreground italic">
                    {client.notes || "No notes available for this client."}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Recent Activity</h4>
                    <ul className="space-y-2">
                      <li className="text-xs text-muted-foreground">
                        <span className="block">Last login: {client.lastActivity?.days} days ago</span>
                        <span className="block text-green-600">Status: {client.lastActivity?.active ? "Active" : "Inactive"}</span>
                      </li>
                      {/* More activity items would go here */}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto py-8 flex flex-col items-center justify-center space-y-2"
              onClick={() => onCreateRole(client.id)}
            >
              <Plus className="h-8 w-8" />
              <span>Create New Role</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-8 flex flex-col items-center justify-center space-y-2" 
            >
              <Plus className="h-8 w-8" />
              <span>Add Requirement</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-8 flex flex-col items-center justify-center space-y-2" 
            >
              <Plus className="h-8 w-8" />
              <span>Schedule Meeting</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Client Roles</h3>
            <Button 
              onClick={() => onCreateRole(client.id)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Role
            </Button>
          </div>
          
          {client.roles && client.roles.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Openings</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.roles.map((role) => (
                      <tr key={role.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{role.name}</td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                        </td>
                        <td className="p-4">5</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-8 bg-muted/20 rounded-lg border">
              <h3 className="font-medium mb-2">No roles found</h3>
              <p className="text-muted-foreground mb-4">This client doesn't have any roles yet.</p>
              <Button 
                onClick={() => onCreateRole(client.id)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Role
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contacts">
          <div className="text-center p-8 bg-muted/20 rounded-lg border">
            <h3 className="font-medium mb-2">Contact Management</h3>
            <p className="text-muted-foreground mb-4">Manage client contacts here (not implemented yet).</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="text-center p-8 bg-muted/20 rounded-lg border">
            <h3 className="font-medium mb-2">Document Management</h3>
            <p className="text-muted-foreground mb-4">Manage client documents here (not implemented yet).</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientOverviewTabs;
