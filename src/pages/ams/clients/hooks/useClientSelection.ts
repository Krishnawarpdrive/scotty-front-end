
import { useState } from 'react';
import { Client } from '../types/ClientTypes';

export const useClientSelection = (clients: Client[]) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewClientDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleSelectClient = (client: Client) => {
    const clientId = client.id;
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(client => client.id));
    }
  };

  return {
    selectedClients,
    selectedClient,
    isDetailsOpen,
    setIsDetailsOpen,
    handleViewClientDetails,
    handleSelectClient,
    handleSelectAll,
    setSelectedClient
  };
};
