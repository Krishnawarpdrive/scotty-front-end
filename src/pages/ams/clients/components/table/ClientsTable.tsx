
import React from 'react';
import ClientsTableContainer from './ClientsTableContainer';
import useClientTableColumns from './useClientTableColumns';
import ClientDetailDrawer from '../ClientDetailDrawer';
import { useClientDetails } from './hooks/useClientDetails';

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
  const { 
    selectedClient,
    handleViewClient, 
    handleCloseDetail,
    isDetailOpen 
  } = useClientDetails({ clients });
  
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
      
      {selectedClient && (
        <ClientDetailDrawer 
          client={selectedClient} 
          open={isDetailOpen}
          onOpenChange={handleCloseDetail}
        />
      )}
    </>
  );
};

export default ClientsTable;
