
import { useState } from 'react';
import { Client } from '../types/ClientTypes';

export const useClientDrawers = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientDetailOpen, setClientDetailOpen] = useState(false);
  const [clientAccountOpen, setClientAccountOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  return {
    selectedClientId,
    setSelectedClientId,
    clientDetailOpen,
    setClientDetailOpen,
    clientAccountOpen,
    setClientAccountOpen,
    editingClient,
    setEditingClient
  };
};
