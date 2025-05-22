
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
    <div className="container mx-auto px-4 py-6">
      <ClientProfileHeader 
        client={client}
        onEditClient={() => {}} // To be implemented
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="w-full border-b mb-0 bg-transparent p-0 h-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            <TabsTrigger 
              value="overview" 
              className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="roles" 
              className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none"
            >
              Roles
            </TabsTrigger>
            <TabsTrigger 
              value="requirements" 
              className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none"
            >
              Requirements
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none"
            >
              Activity Logs
            </TabsTrigger>
            <TabsTrigger 
              value="agreements" 
              className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none"
            >
              Agreements
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ClientOverviewTab client={client} />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <ClientRolesTab 
            client={client} 
            onCreateRole={handleCreateRole} 
          />
        </TabsContent>

        <TabsContent value="requirements" className="mt-6">
          <ClientRequirementsTab
            client={client}
            onCreateRequirement={handleCreateRequirement}
          />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ClientActivityTab client={client} />
        </TabsContent>

        <TabsContent value="agreements" className="mt-6">
          <ClientAgreementsTab client={client} />
        </TabsContent>
      </Tabs>

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
