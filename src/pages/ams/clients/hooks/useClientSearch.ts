
import { useState } from 'react';
import { Client } from '../types/ClientTypes';

export const useClientSearch = (clients: Client[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredClients,
    showFilterPanel,
    toggleFilterPanel
  };
};
