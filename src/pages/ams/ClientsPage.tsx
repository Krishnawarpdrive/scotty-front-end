
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ClientsTable from './clients/components/ClientsTable';
import SearchFiltersBar from './clients/components/SearchFiltersBar';
import EmptyState from './clients/components/EmptyState';
import { clientsData } from './clients/data/clientsData';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState({ field: "", direction: "asc" });
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [hasData, setHasData] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if data exists after the component mounts
    setHasData(clientsData && clientsData.length > 0);
    console.log("Clients data:", clientsData);
  }, []);
  
  // Handle sort click
  const handleSort = (field: string) => {
    if (currentSort.field === field) {
      setCurrentSort({
        field,
        direction: currentSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setCurrentSort({
        field,
        direction: "asc",
      });
    }
  };
  
  // Handle client selection
  const toggleClientSelection = (clientId: number) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };
  
  // Select all clients
  const toggleSelectAll = () => {
    if (selectedClients.length === clientsData.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clientsData.map(client => client.id));
    }
  };
  
  console.log("Rendering ClientsPage, hasData:", hasData);
  
  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <SearchFiltersBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedClientsCount={selectedClients.length}
      />

      {/* Clients table or empty state */}
      {hasData ? (
        <Card className="w-full">
          <div className="p-0 overflow-auto">
            <ClientsTable
              clients={clientsData}
              selectedClients={selectedClients}
              currentSort={currentSort}
              onSort={handleSort}
              onSelectClient={toggleClientSelection}
              onSelectAll={toggleSelectAll}
            />
          </div>
        </Card>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ClientsPage;
