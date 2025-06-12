
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedDataTable } from '@/components/unified/UnifiedDataTable';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { useUnifiedToast } from '@/hooks/useUnifiedToast';
import { useUI } from '@/store/hooks/useUI';
import { Plus, Search, Filter } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  industry?: string;
  email: string;
  phone: string;
  status: string;
  budget: number;
  healthScore: number;
  assignedHRs: string[];
  roles: string[];
  lastActivity: string;
  description: string;
}

const ClientsPage = () => {
  const toast = useUnifiedToast();
  const { openDrawer } = useUI();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      industry: 'Technology',
      email: 'contact@acme.com',
      phone: '+1-555-0123',
      status: 'Active',
      budget: 100000,
      healthScore: 85,
      assignedHRs: ['John Doe'],
      roles: ['Developer', 'Designer'],
      lastActivity: '2023-12-15',
      description: 'Leading technology company'
    }
  ]);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (client.industry || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchTerm, statusFilter]);

  const columns: DataTableColumn<Client>[] = [
    {
      id: 'name',
      header: 'Client Name',
      accessorKey: 'name',
    },
    {
      id: 'industry',
      header: 'Industry',
      accessorKey: 'industry',
      cell: (client) => client.industry || 'N/A',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
    },
    {
      id: 'healthScore',
      header: 'Health Score',
      accessorKey: 'healthScore',
      cell: (client) => `${client.healthScore}%`,
    },
    {
      id: 'budget',
      header: 'Budget',
      accessorKey: 'budget',
      cell: (client) => `$${client.budget.toLocaleString()}`,
    },
  ];

  const handleClientCreated = (client: Client) => {
    setClients(prev => [...prev, client]);
    toast.success({
      title: 'Success',
      description: 'Client created successfully'
    });
  };

  const handleClientUpdated = (updatedClient: Client) => {
    setClients(prev => prev.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    toast.success({
      title: 'Success',
      description: 'Client updated successfully'
    });
  };

  const handleRowClick = (client: Client) => {
    openDrawer('client-detail', client);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Clients"
        subtitle="Manage your client relationships"
        actions={
          <Button 
            onClick={() => openDrawer('client-create')}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UnifiedDataTable
        data={filteredClients}
        columns={columns}
        onRowClick={handleRowClick}
        searchable={false}
        emptyMessage="No clients found"
      />
    </motion.div>
  );
};

export default ClientsPage;
