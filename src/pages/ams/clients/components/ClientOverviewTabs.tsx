
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientHeader from './ClientHeader';
import ClientOverviewTab from './tabs/ClientOverviewTab';
import ClientRolesTab from './tabs/ClientRolesTab';
import PlaceholderTab from './tabs/PlaceholderTab';
import { Client } from '../types/ClientTypes';

interface ClientOverviewTabsProps {
  client: Client;
  onEditClient?: (client: Client) => void;
  onCreateRole?: (clientId: string) => void;
  onAddRole?: () => void;
}

const ClientOverviewTabs: React.FC<ClientOverviewTabsProps> = ({ 
  client,
  onEditClient = () => {},
  onCreateRole = () => {},
  onAddRole = () => {}
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!client) return null;
  
  return (
    <div className="space-y-4">
      <ClientHeader client={client} onEditClient={onEditClient} />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ClientOverviewTab client={client} onCreateRole={() => onAddRole()} />
        </TabsContent>
        
        <TabsContent value="roles">
          <ClientRolesTab client={client} onCreateRole={() => onAddRole()} />
        </TabsContent>
        
        <TabsContent value="contacts">
          <PlaceholderTab 
            title="Contact Management" 
            description="Manage client contacts here (not implemented yet)."
          />
        </TabsContent>
        
        <TabsContent value="documents">
          <PlaceholderTab 
            title="Document Management" 
            description="Manage client documents here (not implemented yet)."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientOverviewTabs;
