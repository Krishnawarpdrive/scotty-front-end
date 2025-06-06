
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getClientTierBadge, getHiringStatusBadge } from './ClientBadges';
import { SideDrawer } from '@/components/ui/side-drawer';

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
  if (!client) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={`Client Details: ${client.name}`}
      size="default"
    >
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Account Type:</dt>
                  <dd>{client.accountType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Industry:</dt>
                  <dd>{client.industry}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Client Tier:</dt>
                  <dd>{getClientTierBadge(client.clientTier)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Currency:</dt>
                  <dd>{client.currency}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hiring Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Hiring Status:</dt>
                  <dd>{getHiringStatusBadge(client.hiringStatus)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Active Roles:</dt>
                  <dd>{client.activeRoles}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Total Requirements:</dt>
                  <dd>{client.totalRequirements}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Health & Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Client Health Score</span>
                  <span className="font-bold">{client.healthScore}/100</span>
                </div>
                <Progress value={client.healthScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Budget Utilized</span>
                  <span className="font-bold">{client.budgetUtilized}%</span>
                </div>
                <Progress value={client.budgetUtilized} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{client.notes}</p>
          </CardContent>
        </Card>
      </div>
    </SideDrawer>
  );
};

export default ClientDetailDrawer;
