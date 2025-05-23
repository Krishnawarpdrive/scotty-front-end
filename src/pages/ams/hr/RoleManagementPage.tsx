
import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { clientsData, rolesData, requirementsData, tasData } from './mockData';
import ClientDetailDrawer from './components/ClientDetailDrawer';
import PageHeader from './components/PageHeader';
import ClientsTabContent from './components/ClientsTabContent';
import RolesTabContent from './components/RolesTabContent';
import RequirementsTabContent from './components/RequirementsTabContent';
import TasTabContent from './components/TasTabContent';

const RoleManagementPage = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);
  
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
