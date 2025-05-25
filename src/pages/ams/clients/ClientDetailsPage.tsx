import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ClientDetailLoading from './components/ClientDetailLoading';
import ClientDetailError from './components/ClientDetailError';
import { useClientDetail } from './hooks/useClientDetail';
import SteppedRoleCreationDrawer from '../roles/components/drawer/SteppedRoleCreationDrawer';
import CompactClientHeader from './components/client-detail/profile-header/CompactClientHeader';
import ClientOverviewTab from './components/client-detail/ClientOverviewTab';
import ClientRolesTab from './components/client-detail/ClientRolesTab';
import ClientRequirementsTab from './components/client-detail/ClientRequirementsTab';
import ClientActivityTab from './components/client-detail/ClientActivityTab';
import ClientAgreementsTab from './components/client-detail/ClientAgreementsTab';
import { cn } from '@/lib/utils';

const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { client, loading, error } = useClientDetail();
  const [activeTab, setActiveTab] = useState("roles"); // Changed default to roles
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);

  if (loading) {
    return <ClientDetailLoading />;
  }
  
  if (error || !client) {
    return <ClientDetailError error={error} />;
  }

  const handleCreateRole = () => {
    setIsRoleDrawerOpen(true);
  };

  const handleRoleCreated = (values: any) => {
    toast({
      title: "Role Created",
      description: `The role "${values.roleName || 'New role'}" has been created successfully.`
    });

    // If we're not on the roles tab, switch to it to show the new role
    if (activeTab !== "roles") {
      setActiveTab("roles");
    }
  };
  
  const handleEditClient = (updatedClient: any) => {
    console.log("Updating client data:", updatedClient);
    toast({
      title: "Client Updated",
      description: "Client information has been successfully updated."
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <CompactClientHeader 
        client={client} 
        onEditClient={handleEditClient} 
      />

      {/* Tabs and content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full border-b bg-background shadow-sm sticky top-0 z-10">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabsTrigger 
                value="roles" 
                className="flex-shrink-0 h-12 px-6 border-b-2 data-[state=active]:border-primary data-[state=active]:font-semibold border-transparent rounded-none text-sm"
              >
                Roles
              </TabsTrigger>
              <TabsTrigger 
                value="requirements" 
                className="flex-shrink-0 h-12 px-6 border-b-2 data-[state=active]:border-primary data-[state=active]:font-semibold border-transparent rounded-none text-sm"
              >
                Requirements
              </TabsTrigger>
              <TabsTrigger 
                value="overview" 
                className="flex-shrink-0 h-12 px-6 border-b-2 data-[state=active]:border-primary data-[state=active]:font-semibold border-transparent rounded-none text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="agreements" 
                className="flex-shrink-0 h-12 px-6 border-b-2 data-[state=active]:border-primary data-[state=active]:font-semibold border-transparent rounded-none text-sm"
              >
                Agreements
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="flex-shrink-0 h-12 px-6 border-b-2 data-[state=active]:border-primary data-[state=active]:font-semibold border-transparent rounded-none text-sm"
              >
                Activity Logs
              </TabsTrigger>
            </div>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="roles" className="mt-0 p-6 h-full">
              <ClientRolesTab client={client} onCreateRole={handleCreateRole} />
            </TabsContent>

            <TabsContent value="requirements" className="mt-0 p-6 h-full">
              <ClientRequirementsTab client={client} onCreateRequirement={() => {}} />
            </TabsContent>

            <TabsContent value="overview" className="mt-0 p-6 h-full">
              <ClientOverviewTab client={client} />
            </TabsContent>

            <TabsContent value="agreements" className="mt-0 p-6 h-full">
              <ClientAgreementsTab client={client} />
            </TabsContent>

            <TabsContent value="activity" className="mt-0 p-6 h-full">
              <ClientActivityTab client={client} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <SteppedRoleCreationDrawer 
        open={isRoleDrawerOpen} 
        onOpenChange={setIsRoleDrawerOpen} 
        clientId={client.id} 
        clientName={client.name} 
        onRoleCreated={handleRoleCreated} 
      />

      {/* Floating action button for quick actions */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full shadow-lg" 
        size="icon"
        onClick={handleCreateRole}
      >
        <PlusCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ClientDetailsPage;
