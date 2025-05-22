
import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ClientsTable } from './clients/components/table/ClientsTable';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import ClientAccountDrawer from './clients/components/ClientAccountDrawer';
import SearchFiltersBar from './clients/components/SearchFiltersBar';

interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  accountType: string;
  createdOn: string;
  lastActivity: { days: number; active: boolean };
  roles: { name: string; id: string }[];
  totalRequirements: number;
  assignedHR: string;
  hiringStatus: string;
  clientTier: string;
  healthScore: number;
  budgetUtilized: number;
  notes: string | null;
}

const ClientsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*');
        
        if (error) throw error;
        
        // Transform data to match the expected Client interface
        const transformedClients: Client[] = data.map(client => ({
          id: client.id,
          name: client.name,
          contact: client.contact || '',
          email: client.email || '',
          status: client.status || 'active',
          accountType: client.account_type || 'Enterprise',
          createdOn: client.created_on || new Date().toISOString(),
          lastActivity: { 
            days: calculateDaysSince(client.last_activity_date), 
            active: client.status === 'active' 
          },
          roles: [], // Will be populated with a separate query if needed
          totalRequirements: client.total_requirements || 0,
          assignedHR: client.assigned_hr || '',
          hiringStatus: client.hiring_status || 'Active',
          clientTier: client.client_tier || '',
          healthScore: client.health_score || 0,
          budgetUtilized: client.budget_utilized || 0,
          notes: client.notes
        }));
        
        setClients(transformedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Error",
          description: "Failed to load client data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClients();
  }, [toast]);
  
  // Helper function to calculate days since a given date
  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return 0;
    
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const handleCreateClient = () => {
    setIsAccountDrawerOpen(true);
  };

  const handleEditClient = (client: Client) => {
    toast({
      title: "Not implemented",
      description: "This feature is not implemented yet.",
    });
  };

  const handleDeleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setClients(clients.filter(client => client.id !== id));
      toast({
        title: "Client Deleted",
        description: "The client has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewClientDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleSelectClient = (client: Client) => {
    const clientId = client.id;
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(client => client.id));
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    setClients(prev => [...prev, newClient]);
    toast({
      title: "Awesome!",
      description: `Client ${newClient.name} has been created successfully.`,
    });
    
    // Option to navigate to client details page
    navigate(`/ams/clients/${newClient.id}`);
  };

  // Handle filter toggle
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button 
          onClick={handleCreateClient} 
          className="bg-primary text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card className="mt-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-2/5">
              <SearchFiltersBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
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
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
            onViewDetails={handleViewClientDetails}
            onSelectClient={handleSelectClient}
            selectedClients={selectedClients}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
          />
        </CardContent>
      </Card>

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
