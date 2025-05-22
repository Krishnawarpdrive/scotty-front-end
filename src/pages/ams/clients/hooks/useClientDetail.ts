
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Client } from '../types/ClientTypes';

export const useClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
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

  return {
    client,
    clientId,
    loading,
    error,
    navigate
  };
};
