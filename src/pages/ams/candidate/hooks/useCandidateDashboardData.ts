
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CandidateDashboardData {
  total_applications: number;
  active_applications: number;
  interviews_scheduled: number;
  interviews_completed: number;
  pending_assessments: number;
  documents_uploaded: number;
  documents_verified: number;
  profile_completion_percentage: number;
  last_activity_date: string;
}

interface CandidateNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

interface CandidateMessage {
  id: string;
  sender_name: string;
  sender_role: string;
  subject: string;
  message_body: string;
  is_read: boolean;
  message_type: string;
  created_at: string;
}

export const useCandidateDashboardData = (candidateId: string) => {
  const [dashboardData, setDashboardData] = useState<CandidateDashboardData | null>(null);
  const [notifications, setNotifications] = useState<CandidateNotification[]>([]);
  const [messages, setMessages] = useState<CandidateMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dashboard data
        const { data: dashData, error: dashError } = await supabase
          .from('candidate_dashboard_data')
          .select('*')
          .eq('candidate_id', candidateId)
          .maybeSingle();

        if (dashError && dashError.code !== 'PGRST116') {
          console.error('Error fetching dashboard data:', dashError);
        }

        // Fetch notifications
        const { data: notificationData, error: notificationError } = await supabase
          .from('candidate_notifications')
          .select('*')
          .eq('candidate_id', candidateId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (notificationError) {
          console.error('Error fetching notifications:', notificationError);
        }

        // Fetch messages
        const { data: messageData, error: messageError } = await supabase
          .from('candidate_messages')
          .select('*')
          .eq('candidate_id', candidateId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (messageError) {
          console.error('Error fetching messages:', messageError);
        }

        setDashboardData(dashData || {
          total_applications: 0,
          active_applications: 0,
          interviews_scheduled: 0,
          interviews_completed: 0,
          pending_assessments: 0,
          documents_uploaded: 0,
          documents_verified: 0,
          profile_completion_percentage: 0,
          last_activity_date: new Date().toISOString()
        });
        setNotifications(notificationData || []);
        setMessages(messageData || []);
      } catch (error) {
        console.error('Error in fetchDashboardData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (candidateId) {
      fetchDashboardData();
    }
  }, [candidateId]);

  return {
    dashboardData,
    notifications,
    messages,
    isLoading,
    refreshData: () => {
      // Trigger refetch logic here if needed
    }
  };
};
