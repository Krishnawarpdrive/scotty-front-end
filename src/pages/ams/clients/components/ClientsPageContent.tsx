
import React from 'react';
import { Card } from "@/components/ui-mui/Card";
import ClientsTable from './table/ClientsTable';
import SearchFiltersBar from './SearchFiltersBar';
import EmptyState from './EmptyState';
import { Client } from '../types/ClientTypes';

interface ClientsPageContentProps {
  filteredClients: Client[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (query: string) => void;
  selectedClients: string[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onViewClientDetails: (client: Client) => void;
  onSelectClient: (id: string) => void;
  onSelectAll: () => void;
  onSort: (column: string, direction: 'asc' | 'desc') => void;
}

const ClientsPageContent: React.FC<ClientsPageContentProps> = ({
  filteredClients,
  isLoading,
  searchTerm,
  onSearchChange,
  selectedClients,
  onEditClient,
  onDeleteClient,
  onViewClientDetails,
  onSelectClient,
  onSelectAll,
  onSort
}) => {
  const toggleFilterPanel = () => {
    // Empty implementation for now
  };

  if (!isLoading && filteredClients.length === 0 && !searchTerm) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <SearchFiltersBar 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        toggleFilterPanel={toggleFilterPanel}
      />
      
      <Card className="p-0">
        <ClientsTable
          clients={filteredClients}
          isLoading={isLoading}
          onEdit={onEditClient}
          onDelete={onDeleteClient}
          onViewDetails={onViewClientDetails}
          onSelectClient={onSelectClient}
          selectedClients={selectedClients}
          onSelectAll={onSelectAll}
          onSort={onSort}
        />
      </Card>
    </div>
  );
};

export default ClientsPageContent;
