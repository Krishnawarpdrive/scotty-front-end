
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientsTableContainer from './ClientsTableContainer';
import useClientTableColumns from './useClientTableColumns';
import { Drawer, DrawerContent } from '@/components/ui-mui/Drawer';
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
  const navigate = useNavigate();
  
  const { 
    selectedClient,
    handleViewClient, 
    handleCloseDetail,
    isDetailOpen 
  } = useClientDetails({ clients });
  
  const handleSelectClient = (id: string) => {
    onSelectClient && onSelectClient(id);
  };
  
  const handleRowClick = (client: any) => {
    // Navigate to client details page
    navigate(`/ams/clients/${client.id}`);
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
        onRowClick={handleRowClick}
      />
      
      {selectedClient && (
        <Drawer open={isDetailOpen} onClose={handleCloseDetail} side="right">
          <DrawerContent onClose={handleCloseDetail}>
            <ClientDetailDrawer 
              client={selectedClient} 
              open={isDetailOpen}
              onOpenChange={handleCloseDetail}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ClientsTable;
