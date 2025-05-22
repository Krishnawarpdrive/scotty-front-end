import React, { useState, useEffect, useRef } from 'react';
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
import ClientProfileHeader from './components/client-detail/profile-header';
import ClientOverviewTab from './components/client-detail/ClientOverviewTab';
import ClientRolesTab from './components/client-detail/ClientRolesTab';
import ClientRequirementsTab from './components/client-detail/ClientRequirementsTab';
import ClientActivityTab from './components/client-detail/ClientActivityTab';
import ClientAgreementsTab from './components/client-detail/ClientAgreementsTab';
import { cn } from '@/lib/utils';

const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    client,
    loading,
    error
  } = useClientDetail();
  const [activeTab, setActiveTab] = useState("overview");
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  const [isRequirementDrawerOpen, setIsRequirementDrawerOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollPosition(contentRef.current.scrollTop);
      }
    };
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  const isHeaderCollapsed = scrollPosition > 100;
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
      description: `The role "${values.roleName || 'New role'}" has been created successfully.`
    });

    // If we're not on the roles tab, switch to it to show the new role
    if (activeTab !== "roles") {
      setActiveTab("roles");
    }
  };
  
  const handleEditClient = (updatedClient: any) => {
    // This would normally update the client data via API
    console.log("Updating client data:", updatedClient);
    toast({
      title: "Client Updated",
      description: "Client information has been successfully updated."
    });
  };
  
  return <div className="flex flex-col h-full">
      {/* Header with animation on scroll */}
      <div className={cn("transition-all duration-300 ease-in-out", isHeaderCollapsed ? "max-h-20 overflow-hidden opacity-90" : "max-h-[500px]")}>
        <ClientProfileHeader client={client} onEditClient={handleEditClient} isCollapsed={isHeaderCollapsed} />
      </div>

      {/* Tabs and content */}
      <div ref={contentRef} className="flex-1 overflow-auto flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className={cn("w-full border-b bg-background transition-all duration-300 z-10 sticky top-0", isHeaderCollapsed ? "shadow-sm" : "")}>
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabsTrigger value="overview" className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-sm">
                Roles
              </TabsTrigger>
              <TabsTrigger value="requirements" className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-sm">
                Requirements
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-sm">
                Activity Logs
              </TabsTrigger>
              <TabsTrigger value="agreements" className="flex-shrink-0 h-10 px-4 border-b-2 data-[state=active]:border-primary border-transparent rounded-none text-sm">
                Agreements
              </TabsTrigger>
            </div>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="mt-6 p-4 h-full my-0 px-card-padding py-[8px]">
              <ClientOverviewTab client={client} />
            </TabsContent>

            <TabsContent value="roles" className="mt-6 p-4 h-full">
              <ClientRolesTab client={client} onCreateRole={handleCreateRole} />
            </TabsContent>

            <TabsContent value="requirements" className="mt-6 p-4 h-full">
              <ClientRequirementsTab client={client} onCreateRequirement={handleCreateRequirement} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6 p-4 h-full">
              <ClientActivityTab client={client} />
            </TabsContent>

            <TabsContent value="agreements" className="mt-6 p-4 h-full">
              <ClientAgreementsTab client={client} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <RoleCreationDrawer open={isRoleDrawerOpen} onOpenChange={setIsRoleDrawerOpen} clientId={client.id} clientName={client.name} onRoleCreated={handleRoleCreated} />

      {/* Floating action button for quick actions */}
      <Button className="fixed bottom-6 right-6 rounded-full shadow-lg" size="icon">
        <PlusCircle className="h-5 w-5" />
      </Button>
    </div>;
};
export default ClientDetailsPage;
