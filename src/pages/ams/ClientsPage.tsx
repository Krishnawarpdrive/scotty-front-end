
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ClientsTable } from './clients/components/ClientsTable';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import { Icons } from '@/components/icons';

const ClientsPage = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState([
    { id: '1', name: 'Acme Corp', contact: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Beta Co', contact: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCreateClient = () => {
    toast({
      title: "Not implemented",
      description: "This feature is not implemented yet.",
    })
  };

  const handleEditClient = (client) => {
    toast({
      title: "Not implemented",
      description: "This feature is not implemented yet.",
    })
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Client Deleted",
      description: "The client has been deleted successfully.",
    })
  };

  const handleViewClientDetails = (client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const handleSelectClient = (client) => {
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

  // Add a sort handler function
  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    console.log(`Sorting by ${column} in ${direction} order`);
    // Implement actual sorting logic here
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button onClick={handleCreateClient} className="bg-primary text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="relative">
              <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              onSort={handleSort} // Add this prop
            />
          </div>
        </CardContent>
      </Card>

      <ClientDetailDrawer
        client={selectedClient}
        open={isDetailsOpen}
        onOpenChange={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default ClientsPage;
