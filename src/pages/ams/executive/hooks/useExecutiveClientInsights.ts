
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ClientInsight {
  id: string;
  client_id: string;
  insight_type: 'performance' | 'risk' | 'opportunity' | 'alert';
  insight_data: any;
  generated_at: string;
  is_active: boolean;
  priority_score: number;
  created_at: string;
}

export interface EnhancedClientData {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  health_score: number;
  total_requirements: number;
  budget_utilized: number;
  insights: ClientInsight[];
  risk_indicators: {
    budget_overrun: boolean;
    timeline_delays: boolean;
    low_satisfaction: boolean;
    communication_gaps: boolean;
  };
  performance_metrics: {
    fulfillment_rate: number;
    avg_time_to_fill: number;
    cost_efficiency: number;
    quality_score: number;
  };
}

export const useExecutiveClientInsights = () => {
  const [clientInsights, setClientInsights] = useState<EnhancedClientData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientInsights = async () => {
    try {
      // Fetch clients with their insights
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('health_score', { ascending: false });

      if (clientsError) throw clientsError;

      // Fetch insights for all clients
      const { data: insights, error: insightsError } = await supabase
        .from('executive_client_insights')
        .select('*')
        .eq('is_active', true)
        .order('priority_score', { ascending: false });

      if (insightsError) throw insightsError;

      // Combine clients with their insights and generate enhanced data
      const enhancedClients: EnhancedClientData[] = (clients || []).map(client => {
        const clientInsights = (insights || []).filter(insight => insight.client_id === client.id).map(insight => ({
          id: insight.id,
          client_id: insight.client_id || '',
          insight_type: (insight.insight_type as 'performance' | 'risk' | 'opportunity' | 'alert') || 'alert',
          insight_data: insight.insight_data,
          generated_at: insight.generated_at,
          is_active: insight.is_active || false,
          priority_score: insight.priority_score || 0,
          created_at: insight.created_at
        }));
        
        // Generate risk indicators based on client data and insights
        const risk_indicators = {
          budget_overrun: client.budget_utilized > 80,
          timeline_delays: clientInsights.some(i => 
            i.insight_type === 'alert' && 
            typeof i.insight_data === 'object' && 
            i.insight_data && 
            'type' in i.insight_data && 
            i.insight_data.type === 'timeline'
          ),
          low_satisfaction: (client.health_score || 0) < 70,
          communication_gaps: clientInsights.some(i => 
            i.insight_type === 'risk' && 
            typeof i.insight_data === 'object' && 
            i.insight_data && 
            'category' in i.insight_data && 
            i.insight_data.category === 'communication'
          )
        };

        // Generate performance metrics (mock data - replace with real calculations)
        const performance_metrics = {
          fulfillment_rate: Math.max(0, Math.min(100, (client.health_score || 0) + Math.random() * 20 - 10)),
          avg_time_to_fill: 20 + Math.random() * 15,
          cost_efficiency: Math.max(0, Math.min(100, 75 + Math.random() * 25)),
          quality_score: Math.max(0, Math.min(100, (client.health_score || 0) + Math.random() * 10 - 5))
        };

        return {
          id: client.id,
          name: client.name,
          contact: client.contact || '',
          email: client.email || '',
          status: client.status || 'active',
          health_score: client.health_score || 0,
          total_requirements: client.total_requirements || 0,
          budget_utilized: client.budget_utilized || 0,
          insights: clientInsights,
          risk_indicators,
          performance_metrics
        };
      });

      setClientInsights(enhancedClients);
    } catch (error) {
      console.error('Error fetching client insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsight = async (clientId: string, insightType: string, insightData: any) => {
    try {
      const { error } = await supabase
        .from('executive_client_insights')
        .insert({
          client_id: clientId,
          insight_type: insightType,
          insight_data: insightData,
          generated_at: new Date().toISOString(),
          is_active: true,
          priority_score: insightData.priority || 50
        });

      if (error) throw error;
      await fetchClientInsights();
    } catch (error) {
      console.error('Error generating insight:', error);
    }
  };

  useEffect(() => {
    fetchClientInsights();

    // Set up real-time subscriptions
    const channel = supabase
      .channel('client-insights')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'executive_client_insights' },
        () => fetchClientInsights()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    clientInsights,
    loading,
    generateInsight,
    refetch: fetchClientInsights
  };
};
