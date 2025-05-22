
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientOverviewTabProps {
  client: Client;
  onCreateRole: (clientId: string) => void;
}

const ClientOverviewTab: React.FC<ClientOverviewTabProps> = ({ client, onCreateRole }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ClientOverviewTab;
