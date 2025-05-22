
import { useState } from 'react';

interface Role {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
}

// Mock data for testing purposes
const mockRoles: Role[] = [
  { id: 'role-1', name: 'Frontend Developer' },
  { id: 'role-2', name: 'Backend Developer' },
  { id: 'role-3', name: 'UI/UX Designer' },
  { id: 'role-4', name: 'Project Manager' },
  { id: 'role-5', name: 'DevOps Engineer' },
];

const mockClients: Client[] = [
  { id: 'client-1', name: 'Acme Corporation' },
  { id: 'client-2', name: 'Globex Industries' },
  { id: 'client-3', name: 'Stark Enterprises' },
  { id: 'client-4', name: 'Wayne Enterprises' },
  { id: 'client-5', name: 'Umbrella Corporation' },
];

export const useMockData = () => {
  const [roles] = useState<Role[]>(mockRoles);
  const [clients] = useState<Client[]>(mockClients);

  return {
    roles,
    clients
  };
};
