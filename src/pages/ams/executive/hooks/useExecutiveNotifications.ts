
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ExecutiveNotification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning' | 'approval_request';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  source_type: 'system' | 'kpi' | 'requirement' | 'client' | 'goal';
  source_id: string | null;
  metadata: any;
  is_read: boolean;
  is_archived: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface ApprovalWorkflow {
  id: string;
  workflow_type: 'budget_increase' | 'timeline_extension' | 'resource_allocation' | 'priority_change';
  title: string;
  description: string | null;
  requester_name: string;
  approver_name: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  urgency: 'low' | 'normal' | 'high' | 'critical';
  request_data: any;
  approval_notes: string | null;
  created_at: string;
}

export const useExecutiveNotifications = () => {
  const [notifications, setNotifications] = useState<ExecutiveNotification[]>([]);
  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('executive_notifications')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const typedNotifications: ExecutiveNotification[] = (data || []).map(notification => ({
        id: notification.id,
        type: (notification.type as ExecutiveNotification['type']) || 'info',
        title: notification.title,
        message: notification.message,
        priority: (notification.priority as ExecutiveNotification['priority']) || 'medium',
        source_type: (notification.source_type as ExecutiveNotification['source_type']) || 'system',
        source_id: notification.source_id,
        metadata: notification.metadata,
        is_read: notification.is_read || false,
        is_archived: notification.is_archived || false,
        expires_at: notification.expires_at,
        created_at: notification.created_at
      }));

      setNotifications(typedNotifications);
      setUnreadCount(typedNotifications.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchApprovalWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('approval_workflows')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      const typedWorkflows: ApprovalWorkflow[] = (data || []).map(workflow => ({
        id: workflow.id,
        workflow_type: (workflow.workflow_type as ApprovalWorkflow['workflow_type']) || 'budget_increase',
        title: workflow.title,
        description: workflow.description,
        requester_name: workflow.requester_name,
        approver_name: workflow.approver_name,
        status: (workflow.status as ApprovalWorkflow['status']) || 'pending',
        urgency: (workflow.urgency as ApprovalWorkflow['urgency']) || 'normal',
        request_data: workflow.request_data,
        approval_notes: workflow.approval_notes,
        created_at: workflow.created_at
      }));

      setApprovalWorkflows(typedWorkflows);
    } catch (error) {
      console.error('Error fetching approval workflows:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('executive_notifications')
        .update({ is_read: true, updated_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const archiveNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('executive_notifications')
        .update({ is_archived: true, updated_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error archiving notification:', error);
    }
  };

  const approveWorkflow = async (workflowId: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('approval_workflows')
        .update({ 
          status: 'approved', 
          approval_notes: notes,
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;
      
      await fetchApprovalWorkflows();
    } catch (error) {
      console.error('Error approving workflow:', error);
    }
  };

  const rejectWorkflow = async (workflowId: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('approval_workflows')
        .update({ 
          status: 'rejected', 
          approval_notes: notes,
          rejected_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', workflowId);

      if (error) throw error;
      
      await fetchApprovalWorkflows();
    } catch (error) {
      console.error('Error rejecting workflow:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchNotifications(), fetchApprovalWorkflows()]);
      setLoading(false);
    };

    loadData();

    // Set up real-time subscriptions
    const notificationsChannel = supabase
      .channel('executive-notifications')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'executive_notifications' },
        () => fetchNotifications()
      )
      .subscribe();

    const workflowsChannel = supabase
      .channel('approval-workflows')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'approval_workflows' },
        () => fetchApprovalWorkflows()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notificationsChannel);
      supabase.removeChannel(workflowsChannel);
    };
  }, []);

  return {
    notifications,
    approvalWorkflows,
    loading,
    unreadCount,
    markAsRead,
    archiveNotification,
    approveWorkflow,
    rejectWorkflow,
    refetch: () => Promise.all([fetchNotifications(), fetchApprovalWorkflows()])
  };
};
