
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ClientsTable from './clients/components/ClientsTable';
import SearchFiltersBar from './clients/components/SearchFiltersBar';
import EmptyState from './clients/components/EmptyState';
import { clientsData } from './clients/data/clientsData';
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState({ field: "", direction: "asc" });
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [hasData, setHasData] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if data exists after the component mounts
    const dataExists = clientsData && clientsData.length > 0;
    setHasData(dataExists);
    console.log("Clients data:", clientsData, "Has data:", dataExists);
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
    
    toast({
      title: "Sorting changed",
      description: `Sorted by ${field} ${currentSort.field === field && currentSort.direction === "asc" ? "descending" : "ascending"}`,
    });
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
        <h1 className="text-2xl font-medium text-[#262626]">Clients</h1>
        <Link to="/ams/clients/account-creation">
          <Button className="bg-primary hover:bg-primary/90 h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      <SearchFiltersBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedClientsCount={selectedClients.length}
      />

      {/* Clients table or empty state */}
      {hasData ? (
        <ClientsTable
          clients={clientsData}
          selectedClients={selectedClients}
          currentSort={currentSort}
          onSort={handleSort}
          onSelectClient={toggleClientSelection}
          onSelectAll={toggleSelectAll}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ClientsPage;
