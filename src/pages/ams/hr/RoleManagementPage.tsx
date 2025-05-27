
import React, { useState, useEffect } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { clientsData, rolesData, requirementsData, tasData } from './mockData';
import ClientDetailDrawer from './components/ClientDetailDrawer';
import PageHeader from './components/PageHeader';
import ClientsTabContent from './components/ClientsTabContent';
import RolesTabContent from './components/RolesTabContent';
import RequirementsTabContent from './components/RequirementsTabContent';
import TasTabContent from './components/TasTabContent';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useRoleManagementShortcuts } from '@/hooks/useRoleManagementShortcuts';

const RoleManagementPage = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);

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
    // Handle sidebar opening here
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Page Header with Tabs */}
        <PageHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
        />

        {/* Content Area */}
        <div className="px-6 overflow-auto max-h-[calc(100vh-180px)]">
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
      </Tabs>

      {/* Client Detail Drawer */}
      <ClientDetailDrawer
        client={selectedClient}
        open={clientDrawerOpen}
        onOpenChange={setClientDrawerOpen}
      />
    </div>
  );
};

export default RoleManagementPage;
