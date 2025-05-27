
import React, { useState, useEffect } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { clientsData, rolesData, requirementsData, tasData } from './mockData';
import ClientDetailDrawer from './components/ClientDetailDrawer';
import PageHeader from './components/PageHeader';
import ClientsTabContent from './components/ClientsTabContent';
import RolesTabContent from './components/RolesTabContent';
import RequirementsTabContent from './components/RequirementsTabContent';
import TasTabContent from './components/TasTabContent';
import { TAAssignmentCard } from './components/TAAssignmentCard';
import { RoleConfigurationDrawer } from './components/RoleConfigurationDrawer';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useRoleManagementShortcuts } from '@/hooks/useRoleManagementShortcuts';

const RoleManagementPage = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleConfigDrawerOpen, setRoleConfigDrawerOpen] = useState(false);

  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('role-management');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);
  
  // Function to handle client click
  const handleClientClick = (clientName: string) => {
    // Find client by name
    const client = clientsData.find(c => c.name === clientName);
    if (client) {
      setSelectedClient(client);
      setClientDrawerOpen(true);
    }
  };
  
  const handleRowClick = (item: any) => {
    console.log('Row clicked:', item);
    // Check if it's a role item and open role configuration drawer
    if (item.name && item.client && activeTab === 'roles') {
      setSelectedRole(item);
      setRoleConfigDrawerOpen(true);
    }
  };

  const handleCreateRole = () => {
    console.log('Creating new role...');
    // Implementation for creating role
  };

  const handleCreateClient = () => {
    console.log('Creating new client...');
    // Implementation for creating client
  };

  const handleExportData = () => {
    console.log('Exporting data for tab:', activeTab);
    // Implementation for exporting current tab data
  };

  const handleImportData = () => {
    console.log('Importing data for tab:', activeTab);
    // Implementation for importing data
  };

  // Register role management specific shortcuts
  useRoleManagementShortcuts({
    onCreateRole: handleCreateRole,
    onCreateClient: handleCreateClient,
    onExportData: handleExportData,
    onImportData: handleImportData,
    onSwitchToRoles: () => setActiveTab('roles'),
    onSwitchToClients: () => setActiveTab('clients'),
    onSwitchToRequirements: () => setActiveTab('requirements'),
    onSwitchToTAs: () => setActiveTab('tas')
  });

  // Tab count data for badges
  const tabCounts = {
    clients: clientsData.length,
    roles: rolesData.length,
    requirements: requirementsData.length,
    tas: tasData.length
  };

  // Mock TA data for the assignment cards
  const mockTAs = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      currentLoad: 8,
      maxLoad: 10,
      dailyTargets: {
        interviews: 5,
        completedInterviews: 3,
        sourcing: 10,
        completedSourcing: 7,
        offers: 2,
        completedOffers: 1
      },
      assignedRoles: 8,
      efficiency: 87
    },
    {
      name: 'Mike Chen',
      email: 'mike.c@company.com',
      currentLoad: 12,
      maxLoad: 10,
      dailyTargets: {
        interviews: 6,
        completedInterviews: 6,
        sourcing: 8,
        completedSourcing: 5,
        offers: 3,
        completedOffers: 2
      },
      assignedRoles: 12,
      efficiency: 72
    },
    {
      name: 'Emma Davis',
      email: 'emma.d@company.com',
      currentLoad: 6,
      maxLoad: 10,
      dailyTargets: {
        interviews: 4,
        completedInterviews: 4,
        sourcing: 12,
        completedSourcing: 10,
        offers: 1,
        completedOffers: 1
      },
      assignedRoles: 6,
      efficiency: 92
    }
  ];

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Page Header with Tabs */}
        <PageHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
        />

        {/* Content Area */}
        <div className="px-6">
          {/* TA Assignment Dashboard - show on TAs tab */}
          {activeTab === "tas" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">TA Assignment Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {mockTAs.map((ta, index) => (
                  <TAAssignmentCard key={index} ta={ta} />
                ))}
              </div>
            </div>
          )}

          <div className="overflow-auto max-h-[calc(100vh-280px)]">
            {activeTab === "clients" && (
              <ClientsTabContent 
                clientsData={clientsData} 
                handleClientClick={handleClientClick}
                handleRowClick={handleRowClick}
              />
            )}

            {activeTab === "roles" && (
              <RolesTabContent 
                rolesData={rolesData}
                handleClientClick={handleClientClick}
                handleRowClick={handleRowClick}
              />
            )}

            {activeTab === "requirements" && (
              <RequirementsTabContent 
                requirementsData={requirementsData}
                handleRowClick={handleRowClick}
              />
            )}

            {activeTab === "tas" && (
              <TasTabContent 
                tasData={tasData}
                handleRowClick={handleRowClick}
              />
            )}
          </div>
        </div>
      </Tabs>

      {/* Client Detail Drawer */}
      <ClientDetailDrawer
        client={selectedClient}
        open={clientDrawerOpen}
        onOpenChange={setClientDrawerOpen}
      />

      {/* Role Configuration Drawer */}
      <RoleConfigurationDrawer
        role={selectedRole}
        open={roleConfigDrawerOpen}
        onOpenChange={setRoleConfigDrawerOpen}
      />
    </div>
  );
};

export default RoleManagementPage;
