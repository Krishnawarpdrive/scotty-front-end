
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientOverviewTabProps {
  client: Client;
}

const ClientOverviewTab: React.FC<ClientOverviewTabProps> = ({ client }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                {client.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Type:</span>
              <span>{client.accountType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Industry:</span>
              <span>{client.industry || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Headquarters:</span>
              <span>{client.headquarters || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created On:</span>
              <span>{new Date(client.createdOn).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact:</span>
              <span>{client.contact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{client.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned HR:</span>
              <span>{client.assignedHR || 'Not assigned'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Health Score:</span>
              <span className="font-semibold">{client.healthScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Roles:</span>
              <span className="font-semibold">{client.roles?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requirements:</span>
              <span className="font-semibold">{client.totalRequirements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Budget Utilized:</span>
              <span className="font-semibold">{client.budgetUtilized}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notes & Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-muted-foreground">
                {client.notes || "No notes available for this client."}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="text-sm text-muted-foreground">
                <span>Last activity: {client.lastActivity?.days} days ago</span>
                <Badge 
                  variant={client.lastActivity?.active ? 'default' : 'secondary'}
                  className="ml-2"
                >
                  {client.lastActivity?.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Requirement
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOverviewTab;
