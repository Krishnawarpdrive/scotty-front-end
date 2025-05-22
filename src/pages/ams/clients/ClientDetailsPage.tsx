
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ClientDetailDrawer from './components/ClientDetailDrawer';
import ClientOverviewTabs from './components/ClientOverviewTabs';
import ClientBackHeader from './components/ClientBackHeader';
import RoleCreationDrawer from '../roles/components/RoleCreationDrawer';
import { ClientDetailLoading } from './components/ClientDetailLoading';
import { ClientDetailError } from './components/ClientDetailError';
import { useClientDetail } from './hooks/useClientDetail';
import { useClientDrawers } from './hooks/useClientDrawers';

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { client, loading, error } = useClientDetail(id);
  const { isRoleDrawerOpen, setIsRoleDrawerOpen } = useClientDrawers();

  if (loading) {
    return <ClientDetailLoading />;
  }
  
  if (error || !client) {
    return <ClientDetailError error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ClientBackHeader name={client.name} />

      <ClientOverviewTabs client={client} onAddRole={() => setIsRoleDrawerOpen(true)} />

      {/* Role creation drawer */}
      <RoleCreationDrawer
        open={isRoleDrawerOpen}
        onOpenChange={setIsRoleDrawerOpen}
        clientId={client.id}
        onRoleCreated={(role) => {
          toast({
            title: "Role Created",
            description: `The role "${role.name}" has been created successfully.`,
          });
        }}
      />
    </div>
  );
};

export default ClientDetailsPage;
