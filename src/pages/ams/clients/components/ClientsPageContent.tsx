
import React from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientsTable } from './table/ClientsTable';
import SearchFiltersBar from './SearchFiltersBar';
import { Client } from '../types/ClientTypes';

interface ClientsPageContentProps {
  filteredClients: Client[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedClients: string[];
  toggleFilterPanel: () => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onViewClientDetails: (client: Client) => void;
  onSelectClient: (client: Client) => void;
  onSelectAll: () => void;
  onSort: (column: string, direction: 'asc' | 'desc') => void;
}

const ClientsPageContent: React.FC<ClientsPageContentProps> = ({
  filteredClients,
  isLoading,
  searchTerm,
  onSearchChange,
  selectedClients,
  toggleFilterPanel,
  onEditClient,
  onDeleteClient,
  onViewClientDetails,
  onSelectClient,
  onSelectAll,
  onSort
}) => {
  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-2/5">
            <SearchFiltersBar 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              selectedClientsCount={selectedClients.length}
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleFilterPanel}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default ClientsPageContent;
