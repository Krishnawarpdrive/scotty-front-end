import React from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { UnifiedClient } from '@/data/unified-types';

interface ClientAccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: UnifiedClient | null;
  onClose: () => void;
}

const ClientAccountDrawer: React.FC<ClientAccountDrawerProps> = ({
  open,
  onOpenChange,
  client,
  onClose
}) => {
  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={client ? `Edit ${client.name}` : "Create New Client"}
      size="lg"
    >
      <div className="p-6">
        <p className="text-gray-600">
          {client ? `Editing client: ${client.name}` : "Creating a new client account"}
        </p>
        {/* Add your client form content here */}
      </div>
    </SideDrawer>
  );
};

export default ClientAccountDrawer;
