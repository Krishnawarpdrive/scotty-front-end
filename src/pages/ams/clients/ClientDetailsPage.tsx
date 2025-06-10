
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientDetailError from './components/ClientDetailError';
import ClientDetailLoading from './components/ClientDetailLoading';
import ClientBackHeader from './components/ClientBackHeader';
import CompactClientHeader from './components/client-detail/profile-header/CompactClientHeader';
import ClientOverviewTab from './components/client-detail/ClientOverviewTab';
import ClientRolesTab from './components/client-detail/ClientRolesTab';
import ClientRequirementsTab from './components/client-detail/ClientRequirementsTab';
import ClientActivityTab from './components/client-detail/ClientActivityTab';
import ClientAgreementsTab from './components/client-detail/ClientAgreementsTab';
import { useClientDetail } from './hooks/useClientDetail';

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { client, loading, error } = useClientDetail(clientId || '');

  const handleCreateRole = () => {
    console.log('Create role clicked');
  };

  if (loading) return <ClientDetailLoading />;
  if (error || !client) return <ClientDetailError error={error} />;

  return (
    <div className="min-h-screen bg-background">
      <ClientBackHeader />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <CompactClientHeader client={client} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="agreements">Agreements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <ClientOverviewTab client={client} />
          </TabsContent>
          
          <TabsContent value="roles" className="mt-6">
            <ClientRolesTab client={client} onCreateRole={handleCreateRole} />
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-6">
            <ClientRequirementsTab client={client} />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <ClientActivityTab client={client} />
          </TabsContent>
          
          <TabsContent value="agreements" className="mt-6">
            <ClientAgreementsTab client={client} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
