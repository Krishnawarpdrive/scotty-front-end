
import React from 'react';
import { useClientDetail } from './hooks/useClientDetail';
import { useClientDrawers } from './hooks/useClientDrawers';
import ClientOverviewTabs from './components/ClientOverviewTabs';
import ClientAccountDrawer from './components/ClientAccountDrawer';
import ClientDetailLoading from './components/ClientDetailLoading';
import ClientDetailError from './components/ClientDetailError';
import ClientBackHeader from './components/ClientBackHeader';
import { RoleCreationDrawer } from '../roles/components/RoleCreationDrawer';

const ClientDetailsPage = () => {
  const { client, clientId, loading, error, navigate } = useClientDetail();
  const { 
    isEditDrawerOpen, 
    setIsEditDrawerOpen, 
    isRoleDrawerOpen, 
    setIsRoleDrawerOpen,
    handleEditClient,
    handleCreateRole
  } = useClientDrawers();
  
  if (loading) {
    return <ClientDetailLoading />;
  }

  if (error || !client) {
    return <ClientDetailError error={error || ""} onBackClick={() => navigate('/ams/clients')} />;
  }
  
  return (
    <div className="space-y-6">
      <ClientBackHeader onBackClick={() => navigate('/ams/clients')} />
      
      <ClientOverviewTabs 
        client={client}
        onEditClient={handleEditClient}
        onCreateRole={handleCreateRole}
      />
      
      {/* Edit Client Drawer */}
      <ClientAccountDrawer
        open={isEditDrawerOpen}
        onOpenChange={setIsEditDrawerOpen}
      />
      
      {/* Role Creation Drawer */}
      <RoleCreationDrawer
        open={isRoleDrawerOpen}
        onOpenChange={setIsRoleDrawerOpen}
        clientId={clientId}
        clientName={client?.name}
      />
    </div>
  );
};

export default ClientDetailsPage;
