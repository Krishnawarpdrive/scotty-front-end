
import React, { useState } from 'react';
import ClientsTableContainer from './ClientsTableContainer';
import useClientTableColumns from './useClientTableColumns';
import ClientDetailDrawer from '../ClientDetailDrawer';

interface ClientsTableProps {
  clients: any[];
  isLoading?: boolean;
  onEdit?: (client: any) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (client: any) => void;
  onSelectClient?: (client: any) => void;
  selectedClients?: any[];
  onSelectAll?: () => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients,
  isLoading = false,
  onEdit,
  onDelete,
  onViewDetails,
  onSelectClient,
  selectedClients = [],
  onSelectAll,
  onSort
}) => {
  const [clientDetailId, setClientDetailId] = useState<number | null>(null);
  
  const handleViewClient = (client: any) => {
    setClientDetailId(client.id);
  };

  const handleSelectClient = (id: string) => {
    onSelectClient && onSelectClient(id);
  };
  
  const columns = useClientTableColumns({
    selectedClients,
    onSelectClient: handleSelectClient,
    onViewClient: handleViewClient
  });

  return (
    <>
      <ClientsTableContainer 
        clients={clients}
        columns={columns}
        onRowClick={handleViewClient}
      />
      
      {clientDetailId && (
        <ClientDetailDrawer 
          client={clients.find(c => c.id === clientDetailId)} 
          open={clientDetailId !== null}
          onOpenChange={() => setClientDetailId(null)}
        />
      )}
    </>
  );
};

export default ClientsTable;
