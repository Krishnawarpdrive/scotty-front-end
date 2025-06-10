
import { useState } from 'react';
import ClientsPageContent from './clients/components/ClientsPageContent';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import ClientAccountDrawer from './clients/components/ClientAccountDrawer';
import { useClients } from './clients/hooks/useClients';
import { useClientDrawers } from './clients/hooks/useClientDrawers';

const ClientsPage = () => {
  const {
    clients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedTier,
    setSelectedTier,
    selectedStatus,
    setSelectedStatus,
    sortConfig,
    setSortConfig,
    filteredClients,
    pagination,
    handlePageChange
  } = useClients();

  const {
    selectedClientId,
    setSelectedClientId,
    clientDetailOpen,
    setClientDetailOpen,
    clientAccountOpen,
    setClientAccountOpen,
    editingClient,
    setEditingClient
  } = useClientDrawers();

  const [filterPanelVisible] = useState(false);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    setClientDetailOpen(true);
  };

  const handleCreateClient = () => {
    setEditingClient(null);
    setClientAccountOpen(true);
  };

  const handleEditClient = () => {
    const clientToEdit = clients.find(c => c.id === selectedClientId);
    if (clientToEdit) {
      setEditingClient(clientToEdit);
      setClientAccountOpen(true);
      setClientDetailOpen(false);
    }
  };

  const handleClientCreated = () => {
    setClientAccountOpen(false);
    setEditingClient(null);
    // Refresh clients list would happen here
  };

  const toggleFilterPanel = () => {
    // Filter panel toggle logic
  };

  const handleEditClientAction = (client: any) => {
    setEditingClient(client);
    setClientAccountOpen(true);
  };

  const handleDeleteClient = (id: string) => {
    console.log('Delete client:', id);
  };

  const handleViewClientDetails = (client: any) => {
    setSelectedClientId(client.id);
    setClientDetailOpen(true);
  };

  const handleSelectClient = (id: string) => {
    setSelectedClients(prev => 
      prev.includes(id) 
        ? prev.filter(clientId => clientId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(c => c.id));
    }
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key: column, direction });
  };

  return (
    <>
      <ClientsPageContent
        filteredClients={filteredClients}
        isLoading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedClients={selectedClients}
        toggleFilterPanel={toggleFilterPanel}
        onEditClient={handleEditClientAction}
        onDeleteClient={handleDeleteClient}
        onViewClientDetails={handleViewClientDetails}
        onSelectClient={handleSelectClient}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
      />

      <ClientDetailDrawer
        open={clientDetailOpen}
        onOpenChange={setClientDetailOpen}
        clientId={selectedClientId}
        onEdit={handleEditClient}
      />

      <ClientAccountDrawer
        open={clientAccountOpen}
        onOpenChange={setClientAccountOpen}
        editingClient={editingClient}
        onClientCreated={handleClientCreated}
      />
    </>
  );
};

export default ClientsPage;
