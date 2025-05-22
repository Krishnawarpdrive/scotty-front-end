
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import ClientOverviewTabs from './components/ClientOverviewTabs';
import ClientAccountDrawer from './components/ClientAccountDrawer';
import { RoleCreationDrawer } from '../roles/components/RoleCreationDrawer';

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if we're navigating from role creation
  useEffect(() => {
    if (location.state?.fromRoleCreation) {
      toast({
        title: "Role Created Successfully",
        description: `The role has been added to ${location.state.clientName}.`,
      });
    }
  }, [location.state, toast]);
  
  // Fetch client data
  useEffect(() => {
    if (!clientId) {
      setError("No client ID provided");
      setLoading(false);
      return;
    }

    // Mock API call - in real app, this would be a Supabase query
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // This is mock data - replace with actual Supabase query
        const mockClients = [
          { 
            id: '1', 
            name: 'Acme Corp', 
            contact: 'John Doe', 
            email: 'john@example.com', 
            status: 'active',
            accountType: 'Enterprise',
            industry: 'Technology',
            headquarters: 'New York, NY',
            createdOn: '2023-05-15',
            lastActivity: { days: 3, active: true },
            roles: [
              { name: 'Software Engineer', id: 'r1' },
              { name: 'Product Manager', id: 'r2' }
            ],
            totalRequirements: 12,
            assignedHR: 'Sarah Lee',
            hiringStatus: 'Active',
            clientTier: 'A',
            healthScore: 85,
            budgetUtilized: 65,
            notes: 'Key client with strong growth potential'
          },
          { 
            id: '2', 
            name: 'Beta Co', 
            contact: 'Jane Smith', 
            email: 'jane@example.com', 
            status: 'inactive',
            accountType: 'SMB',
            industry: 'Retail',
            headquarters: 'Chicago, IL',
            createdOn: '2023-06-22',
            lastActivity: { days: 7, active: false },
            roles: [{ name: 'Data Analyst', id: 'r3' }],
            totalRequirements: 5,
            assignedHR: 'Mike Chen',
            hiringStatus: 'Paused',
            clientTier: 'B',
            healthScore: 62,
            budgetUtilized: 40,
            notes: 'Recently paused hiring due to budget constraints'
          },
        ];
        
        // Check if client exists in local storage (for newly created clients)
        const localStorageClients = localStorage.getItem('amsClients');
        let allClients = [...mockClients];
        
        if (localStorageClients) {
          const parsedClients = JSON.parse(localStorageClients);
          allClients = [...mockClients, ...parsedClients];
        }
        
        const foundClient = allClients.find(c => c.id === clientId);
        
        if (foundClient) {
          setClient(foundClient);
        } else {
          setError("Client not found");
          toast({
            title: "Client Not Found",
            description: "The requested client could not be found.",
            variant: "destructive"
          });
        }
      } catch (err) {
        setError("Error loading client data");
        toast({
          title: "Error",
          description: "Failed to load client data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [clientId, navigate, toast]);
  
  const handleEditClient = () => {
    setIsEditDrawerOpen(true);
  };
  
  const handleCreateRole = () => {
    setIsRoleDrawerOpen(true);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate('/ams/clients')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold">Client Not Found</h1>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Client
          </h3>
          <p className="text-red-700 mb-4">
            {error || "Could not find the requested client. It may have been deleted or does not exist."}
          </p>
          <Button 
            onClick={() => navigate('/ams/clients')} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Return to Clients
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={() => navigate('/ams/clients')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <h1 className="text-3xl font-bold">Client Detail</h1>
      </div>
      
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
