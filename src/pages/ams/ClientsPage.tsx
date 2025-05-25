
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useClients } from './clients/hooks/useClients';
import { useClientSelection } from './clients/hooks/useClientSelection';
import { useClientSearch } from './clients/hooks/useClientSearch';
import ClientsPageHeader from './clients/components/ClientsPageHeader';
import ClientsPageContent from './clients/components/ClientsPageContent';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import ClientAccountDrawer from './clients/components/ClientAccountDrawer';
import { Client } from './clients/types/ClientTypes';

const ClientsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { clients, isLoading, deleteClient } = useClients();
  const { 
    selectedClients, 
    selectedClient, 
    isDetailsOpen, 
    setIsDetailsOpen,
    handleViewClientDetails,
    handleSelectClient,
    handleSelectAll,
    setSelectedClient
  } = useClientSelection(clients);
  
  const {
    searchTerm,
    setSearchTerm,
    filteredClients,
    showFilterPanel,
    toggleFilterPanel
  } = useClientSearch(clients);

  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

  const handleCreateClient = () => {
    setIsAccountDrawerOpen(true);
  };

  const handleEditClient = (client: Client) => {
    toast({
      title: "Not implemented",
      description: "This feature is not implemented yet.",
    });
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Add a sort handler function
  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    console.log(`Sorting by ${column} in ${direction} order`);
    // Implement sorting logic if needed
  };

  // Handle client creation success
  const handleClientCreated = (newClient: Client) => {
    toast({
      title: "Awesome!",
      description: `Client ${newClient.name} has been created successfully.`,
    });
    
    // Option to navigate to client details page
    navigate(`/ams/clients/${newClient.id}`);
  };

  // Fix the client selection handler to match expected signature
  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      handleSelectClient(client);
    }
  };

  return (
    <div className="space-y-4">
      <ClientsPageHeader onCreateClient={handleCreateClient} />

      <ClientsPageContent 
        filteredClients={filteredClients}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedClients={selectedClients}
        toggleFilterPanel={toggleFilterPanel}
        onEditClient={handleEditClient}
        onDeleteClient={deleteClient}
        onViewClientDetails={handleViewClientDetails}
        onSelectClient={handleClientSelect}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
      />

      <ClientDetailDrawer
        client={selectedClient}
        open={isDetailsOpen}
        onOpenChange={() => setIsDetailsOpen(false)}
      />

      <ClientAccountDrawer
        open={isAccountDrawerOpen}
        onOpenChange={setIsAccountDrawerOpen}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};

export default ClientsPage;
