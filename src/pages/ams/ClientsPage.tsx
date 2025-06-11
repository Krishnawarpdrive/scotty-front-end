
import { useState } from 'react';
import ClientsPageContent from './clients/components/ClientsPageContent';
import ClientsPageHeader from './clients/components/ClientsPageHeader';
import ClientDetailDrawer from './clients/components/ClientDetailDrawer';
import ClientAccountDrawer from './clients/components/ClientAccountDrawer';
import { UnifiedClient } from '@/data/unified-types';
import { Client } from './clients/types/ClientTypes';

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

// Convert UnifiedClient to Client format
const convertToClient = (unifiedClient: UnifiedClient): Client => ({
  id: unifiedClient.id,
  name: unifiedClient.name,
  contact: unifiedClient.contact || '',
  email: unifiedClient.email || '',
  status: unifiedClient.status,
  accountType: unifiedClient.account_type || '',
  createdOn: unifiedClient.created_at,
  lastActivity: { 
    days: Math.floor((new Date().getTime() - new Date(unifiedClient.last_activity_date).getTime()) / (1000 * 3600 * 24)),
    active: unifiedClient.status === 'Active'
  },
  roles: [], // Will be populated from relationships
  totalRequirements: unifiedClient.total_requirements,
  assignedHR: unifiedClient.assigned_hr || '',
  hiringStatus: unifiedClient.hiring_status,
  clientTier: unifiedClient.client_tier || '',
  healthScore: unifiedClient.health_score || 0,
  budgetUtilized: unifiedClient.budget_utilized,
  notes: unifiedClient.notes
});

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAccountDrawer, setShowAccountDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [detailClient, setDetailClient] = useState<UnifiedClient | null>(null);

  const filteredClients = mockClients.filter(client => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const nameMatch = searchRegex.test(client.name);
    const emailMatch = searchRegex.test(client.email || '');
    const contactMatch = searchRegex.test(client.contact || '');

    return nameMatch || emailMatch || contactMatch;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // Convert to Client format for the table
  const convertedClients = filteredClients.map(convertToClient);

  const handleClientClick = (client: Client) => {
    // Find the original UnifiedClient
    const unifiedClient = mockClients.find(c => c.id === client.id);
    if (unifiedClient) {
      setDetailClient(unifiedClient);
      setShowDetailDrawer(true);
    }
  };

  const handleViewAccount = (client: Client) => {
    // Find the original UnifiedClient
    const unifiedClient = mockClients.find(c => c.id === client.id);
    if (unifiedClient) {
      setDetailClient(unifiedClient);
      setShowAccountDrawer(true);
    }
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
        filteredClients={convertedClients}
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
