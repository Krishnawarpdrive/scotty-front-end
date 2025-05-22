
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Phone, Mail, PlusCircle, Edit, AlertCircle } from "lucide-react";
import ClientDetailLoading from './components/ClientDetailLoading';
import ClientDetailError from './components/ClientDetailError';
import { useClientDetail } from './hooks/useClientDetail';
import RoleCreationDrawer from '../roles/components/RoleCreationDrawer';
import ClientProfileHeader from './components/client-detail/ClientProfileHeader';
import ClientOverviewTab from './components/client-detail/ClientOverviewTab';
import ClientRolesTab from './components/client-detail/ClientRolesTab';
import ClientRequirementsTab from './components/client-detail/ClientRequirementsTab';
import ClientActivityTab from './components/client-detail/ClientActivityTab';
import ClientAgreementsTab from './components/client-detail/ClientAgreementsTab';
import { ScrollArea } from '@/components/ui/scroll-area';

const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { client, loading, error } = useClientDetail();
  const [activeTab, setActiveTab] = useState("overview");
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  const [isRequirementDrawerOpen, setIsRequirementDrawerOpen] = useState(false);
  
  if (loading) {
    return <ClientDetailLoading />;
  }
  
  if (error || !client) {
    return <ClientDetailError error={error} />;
  }

  const handleCreateRole = () => {
    setIsRoleDrawerOpen(true);
  };

  const handleCreateRequirement = () => {
    setIsRequirementDrawerOpen(true);
  };

  const handleRoleCreated = (values: any) => {
    toast({
      title: "Role Created",
      description: `The role "${values.roleName || 'New role'}" has been created successfully.`,
    });
    
    // If we're not on the roles tab, switch to it to show the new role
    if (activeTab !== "roles") {
      setActiveTab("roles");
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] flex flex-col">
      <div className="container px-4 py-4">
        <ClientProfileHeader 
          client={client}
          onEditClient={() => {}} // To be implemented
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="container px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="w-full border-b mb-0 bg-transparent p-0 h-auto sticky top-0 z-10 bg-background">
              <div className="flex overflow-x-auto scrollbar-hide">
                <TabsTrigger 
                  value="overview" 
                  className="flex-shrink-0 h-8 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-xs"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="roles" 
                  className="flex-shrink-0 h-8 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-xs"
                >
                  Roles
                </TabsTrigger>
                <TabsTrigger 
                  value="requirements" 
                  className="flex-shrink-0 h-8 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-xs"
                >
                  Requirements
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="flex-shrink-0 h-8 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-xs"
                >
                  Activity Logs
                </TabsTrigger>
                <TabsTrigger 
                  value="agreements" 
                  className="flex-shrink-0 h-8 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-xs"
                >
                  Agreements
                </TabsTrigger>
              </div>
            </TabsList>

            <ScrollArea className="flex-1 overflow-y-auto pr-2">
              <TabsContent value="overview" className="mt-4 min-h-full data-[state=active]:animate-fade-in">
                <ClientOverviewTab client={client} />
              </TabsContent>

              <TabsContent value="roles" className="mt-4 min-h-full data-[state=active]:animate-fade-in">
                <ClientRolesTab 
                  client={client} 
                  onCreateRole={handleCreateRole} 
                />
              </TabsContent>

              <TabsContent value="requirements" className="mt-4 min-h-full data-[state=active]:animate-fade-in">
                <ClientRequirementsTab
                  client={client}
                  onCreateRequirement={handleCreateRequirement}
                />
              </TabsContent>

              <TabsContent value="activity" className="mt-4 min-h-full data-[state=active]:animate-fade-in">
                <ClientActivityTab client={client} />
              </TabsContent>

              <TabsContent value="agreements" className="mt-4 min-h-full data-[state=active]:animate-fade-in">
                <ClientAgreementsTab client={client} />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      <RoleCreationDrawer
        open={isRoleDrawerOpen}
        onOpenChange={setIsRoleDrawerOpen}
        clientId={client.id}
        clientName={client.name}
        onRoleCreated={handleRoleCreated}
      />

      {/* Requirement drawer would be implemented here */}
    </div>
  );
};

export default ClientDetailsPage;
