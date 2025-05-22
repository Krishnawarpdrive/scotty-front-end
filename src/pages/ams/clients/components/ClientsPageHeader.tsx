
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

interface ClientsPageHeaderProps {
  onCreateClient: () => void;
}

const ClientsPageHeader: React.FC<ClientsPageHeaderProps> = ({ onCreateClient }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Clients Management</h1>
        <p className="text-muted-foreground">
          Manage your client accounts, roles, and requirements
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={onCreateClient}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default ClientsPageHeader;
