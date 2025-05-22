
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Client } from '../types/ClientTypes';

export const useClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients from Supabase
  useEffect(() => {
    fetchClients();
  }, []);

  // Helper function to calculate days since a given date
  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return 0;
    
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      
      if (error) throw error;
      
      // Transform data to match the expected Client interface
      const transformedClients: Client[] = data.map(client => ({
        id: client.id,
        name: client.name,
        contact: client.contact || '',
        email: client.email || '',
        status: client.status || 'active',
        accountType: client.account_type || 'Enterprise',
        createdOn: client.created_on || new Date().toISOString(),
        lastActivity: { 
          days: calculateDaysSince(client.last_activity_date), 
          active: client.status === 'active' 
        },
        roles: [], // Will be populated with a separate query if needed
        totalRequirements: client.total_requirements || 0,
        assignedHR: client.assigned_hr || '',
        hiringStatus: client.hiring_status || 'Active',
        clientTier: client.client_tier || '',
        healthScore: client.health_score || 0,
        budgetUtilized: client.budget_utilized || 0,
        notes: client.notes
      }));
      
      setClients(transformedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to load client data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setClients(clients.filter(client => client.id !== id));
      toast({
        title: "Client Deleted",
        description: "The client has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    clients,
    isLoading,
    deleteClient,
    fetchClients
  };
};
