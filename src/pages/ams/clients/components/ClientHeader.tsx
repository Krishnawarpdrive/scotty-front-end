
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';
import { getClientTierBadge, getHiringStatusBadge } from './ClientBadges';
import { Client } from '../types/ClientTypes';

interface ClientHeaderProps {
  client: Client;
  onEditClient: (client: Client) => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ client, onEditClient }) => {
  return (
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
  );
};

export default ClientHeader;
