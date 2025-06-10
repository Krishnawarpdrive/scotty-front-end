
import React from 'react';
import { EnhancedClientRolesTab } from './EnhancedClientRolesTab';

interface ClientRolesTabProps {
  client: any;
  onCreateRole: () => void;
}

export const ClientRolesTab: React.FC<ClientRolesTabProps> = ({ client, onCreateRole }) => {
  return (
    <EnhancedClientRolesTab 
      client={client}
      onCreateRole={onCreateRole}
    />
  );
};
