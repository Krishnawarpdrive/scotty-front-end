
import React from 'react';
import { Client } from '../../types/ClientTypes';
import EnhancedClientRolesTab from './EnhancedClientRolesTab';

interface ClientRolesTabProps {
  client: Client;
  onCreateRole?: () => void;
}

const ClientRolesTab: React.FC<ClientRolesTabProps> = ({ client, onCreateRole }) => {
  return <EnhancedClientRolesTab client={client} />;
};

export default ClientRolesTab;
