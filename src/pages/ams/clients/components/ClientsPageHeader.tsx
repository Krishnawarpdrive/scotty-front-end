
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ClientsPageHeaderProps {
  onCreateClient: () => void;
}

const ClientsPageHeader: React.FC<ClientsPageHeaderProps> = ({ onCreateClient }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Clients</h1>
      <Button 
        onClick={onCreateClient} 
        className="bg-primary text-white flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Client
      </Button>
    </div>
  );
};

export default ClientsPageHeader;
