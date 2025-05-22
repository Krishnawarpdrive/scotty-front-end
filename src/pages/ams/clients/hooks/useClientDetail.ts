
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
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

    const fetchClientData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch client from Supabase
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('*')
          .eq('id', clientId)
          .single();
        
        if (clientError) throw new Error(clientError.message);
        if (!clientData) throw new Error("Client not found");
        
        // Fetch client roles from Supabase
        const { data: rolesData, error: rolesError } = await supabase
          .from('roles')
          .select('id, name')
          .eq('client_id', clientId);

        if (rolesError) throw new Error(rolesError.message);
        
        // Transform client data to match the Client interface
        const client: Client = {
          id: clientData.id,
          name: clientData.name,
          contact: clientData.contact || '',
          email: clientData.email || '',
          status: clientData.status || 'active',
          accountType: clientData.account_type || 'Enterprise',
          createdOn: clientData.created_on || new Date().toISOString(),
          lastActivity: { 
            days: calculateDaysSince(clientData.last_activity_date), 
            active: clientData.status === 'active' 
          },
          roles: rolesData || [],
          totalRequirements: clientData.total_requirements || 0,
          assignedHR: clientData.assigned_hr || '',
          hiringStatus: clientData.hiring_status || 'Active',
          clientTier: clientData.client_tier || '',
          healthScore: clientData.health_score || 0,
          budgetUtilized: clientData.budget_utilized || 0,
          notes: clientData.notes || null,
          industry: clientData.industry || '',
          headquarters: clientData.headquarters || '',
        };
        
        setClient(client);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError(err instanceof Error ? err.message : "Failed to load client data");
        toast({
          title: "Error",
          description: "Failed to load client data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientData();
  }, [clientId, toast]);

  // Helper function to calculate days since a given date
  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return 0;
    
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return {
    client,
    clientId,
    loading,
    error,
    navigate
  };
};
