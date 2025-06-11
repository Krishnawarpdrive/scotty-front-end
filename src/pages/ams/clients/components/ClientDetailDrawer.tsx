
import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { UnifiedClient } from '@/data/unified-types';

interface ClientDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: UnifiedClient | null;
}

const ClientDetailDrawer: React.FC<ClientDetailDrawerProps> = ({
  open,
  onOpenChange,
  client
}) => {
  if (!client) return null;

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={client.name}
      subtitle="Client Details"
      size="lg"
    >
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-medium">Contact Information</h3>
          <p className="text-sm text-gray-600">Email: {client.email}</p>
          <p className="text-sm text-gray-600">Contact: {client.contact}</p>
        </div>
        
        <div>
          <h3 className="font-medium">Account Details</h3>
          <p className="text-sm text-gray-600">Type: {client.account_type}</p>
          <p className="text-sm text-gray-600">Tier: {client.client_tier}</p>
          <p className="text-sm text-gray-600">Status: {client.status}</p>
        </div>

        <div>
          <h3 className="font-medium">Performance</h3>
          <p className="text-sm text-gray-600">Health Score: {client.health_score}%</p>
          <p className="text-sm text-gray-600">Budget Utilized: ${client.budget_utilized?.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Requirements: {client.total_requirements}</p>
        </div>
      </div>
    </SideDrawer>
  );
};

export default ClientDetailDrawer;
