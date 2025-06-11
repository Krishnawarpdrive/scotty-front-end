
import { useState } from 'react';
import ClientsPageContent from './clients/components/ClientsPageContent';
import ClientsPageHeader from './clients/components/ClientsPageHeader';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import ClientAccountDrawer from './clients/components/ClientAccountDrawer';
import { UnifiedClient } from '@/data/unified-types';

const mockClients: UnifiedClient[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'info@acme.com',
    contact: 'John Doe',
    account_type: 'Enterprise',
    client_tier: 'Premium',
    status: 'Active',
    hiring_status: 'Active',
    assigned_hr: 'Jane Smith',
    total_requirements: 10,
    budget_utilized: 500000,
    health_score: 90,
    last_activity_date: '2024-01-20',
    notes: 'Strategic client',
    created_at: '2023-01-01',
    updated_at: '2024-01-20',
  },
  {
    id: '2',
    name: 'Beta Industries',
    email: 'contact@beta.com',
    contact: 'Alice Johnson',
    account_type: 'SMB',
    client_tier: 'Standard',
    status: 'Active',
    hiring_status: 'Inactive',
    assigned_hr: 'Bob Williams',
    total_requirements: 5,
    budget_utilized: 200000,
    health_score: 75,
    last_activity_date: '2024-01-15',
    notes: '',
    created_at: '2023-02-15',
    updated_at: '2024-01-15',
  },
];

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAccountDrawer, setShowAccountDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [detailClient, setDetailClient] = useState<UnifiedClient | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  const filteredClients = mockClients.filter(client => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const nameMatch = searchRegex.test(client.name);
    const emailMatch = searchRegex.test(client.email);
    const contactMatch = searchRegex.test(client.contact || '');

    const statusMatch = filterStatus === 'all' || client.status === filterStatus;
    const tierMatch = filterTier === 'all' || client.client_tier === filterTier;

    return (nameMatch || emailMatch || contactMatch) && statusMatch && tierMatch;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'health') {
      return (b.health_score || 0) - (a.health_score || 0);
    }
    return 0;
  });

  const handleClientClick = (client: UnifiedClient) => {
    setDetailClient(client);
    setShowDetailDrawer(true);
  };

  const handleViewAccount = (client: UnifiedClient) => {
    setDetailClient(client);
    setShowAccountDrawer(true);
  };

  const handleCreateClient = () => {
    setDetailClient(null);
    setShowAccountDrawer(true);
  };

  return (
    <div className="space-y-6">
      <ClientsPageHeader
        onCreateClient={handleCreateClient}
      />

      <ClientsPageContent
        filteredClients={filteredClients}
        isLoading={false}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedClients={[]}
        toggleFilterPanel={() => {}}
        onEditClient={handleViewAccount}
        onDeleteClient={() => {}}
        onViewClientDetails={handleClientClick}
        onSelectClient={() => {}}
        onSelectAll={() => {}}
        onSort={() => {}}
      />

      <ClientDetailDrawer
        open={showDetailDrawer}
        onOpenChange={setShowDetailDrawer}
        client={detailClient}
      />

      <ClientAccountDrawer
        open={showAccountDrawer}
        onOpenChange={setShowAccountDrawer}
        client={detailClient}
        onClose={() => setShowAccountDrawer(false)}
      />
    </div>
  );
};

export default ClientsPage;
