
import { useState } from 'react';
import { ClientsPageContent } from './clients/components/ClientsPageContent';
import { ClientDetailDrawer } from './clients/components/ClientDetailDrawer';
import { ClientAccountDrawer } from './clients/components/ClientAccountDrawer';
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

  return (
    <>
      <ClientsPageContent
        clients={filteredClients}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        onClientSelect={handleClientSelect}
        onCreateClient={handleCreateClient}
        pagination={pagination}
        onPageChange={handlePageChange}
        filterPanelVisible={filterPanelVisible}
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
