import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ClientsPageContent from './components/ClientsPageContent';
import ClientDrawer from './components/drawer/ClientDrawer';
import { Client } from './types/ClientTypes';
import { generateMockClients } from '@/data/mock-data-generator';
import { useTableSelection } from '@/design-system/hooks/useDesignSystem';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockClients = generateMockClients(15);
      setClients(mockClients);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedClients = React.useMemo(() => {
    if (!sortColumn) return filteredClients;

    return [...filteredClients].sort((a, b) => {
      const aValue = a[sortColumn as keyof Client];
      const bValue = b[sortColumn as keyof Client];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredClients, sortColumn, sortDirection]);

  const {
    selectedItems: selectedClients,
    toggleItem: toggleClient,
    toggleAll: toggleSelectAll,
    isSelected: isClientSelected,
    isAllSelected: areAllClientsSelected,
    isPartiallySelected: areSomeClientsSelected,
    selectedCount
  } = useTableSelection(sortedClients);

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowCreateDrawer(true);
  };

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const handleViewClientDetails = (client: Client) => {
    console.log('View client details:', client);
  };

  const handleSelectClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      toggleClient(client);
    }
  };

  const handleSelectAll = () => {
    toggleSelectAll();
  };

  const handleBulkAction = (action: string, clients: Client[]) => {
    console.log(`Bulk action: ${action}`, clients);
    switch (action) {
      case 'delete':
        console.log('Deleting clients:', clients.map(c => c.id));
        break;
      case 'export':
        console.log('Exporting clients:', clients.map(c => c.id));
        break;
    }
  };

  const handleClientCreated = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
    setShowCreateDrawer(false);
  };

  const handleClientUpdated = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  return (
    <div className="container mx-auto py-10">
      <PageHeader
        title="Clients"
        subtitle="Manage your clients and their information"
        actions={
          <Button onClick={() => setShowCreateDrawer(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        }
        badge={{
          label: clients.length.toString(),
        }}
      />

      <ClientsPageContent
        filteredClients={sortedClients}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedClients={selectedClients.map(c => c.id)}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
        onViewClientDetails={handleViewClientDetails}
        onSelectClient={handleSelectClient}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
      />

      <ClientDrawer
        open={showCreateDrawer}
        onOpenChange={setShowCreateDrawer}
        onClientCreated={handleClientCreated}
        onClientUpdated={handleClientUpdated}
        client={selectedClient}
      />
    </div>
  );
};

export default ClientsPage;
