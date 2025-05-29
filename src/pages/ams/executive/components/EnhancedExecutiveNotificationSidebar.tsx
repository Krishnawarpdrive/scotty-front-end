
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Bell, 
  X, 
  Check, 
  Archive, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  AlertCircle,
  Clock,
  User,
  DollarSign,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useExecutiveNotifications } from '../hooks/useExecutiveNotifications';

interface EnhancedExecutiveNotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const EnhancedExecutiveNotificationSidebar: React.FC<EnhancedExecutiveNotificationSidebarProps> = ({
  open,
  onClose
}) => {
  const {
    notifications,
    approvalWorkflows,
    loading,
    unreadCount,
    markAsRead,
    archiveNotification,
    approveWorkflow,
    rejectWorkflow
  } = useExecutiveNotifications();

  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      case 'info': return Info;
      case 'approval_request': return Clock;
      default: return Bell;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getWorkflowIcon = (type: string) => {
    switch (type) {
      case 'budget_increase': return DollarSign;
      case 'timeline_extension': return Calendar;
      case 'resource_allocation': return User;
      default: return Sparkles;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprovalAction = async () => {
    if (!selectedApproval || !approvalAction) return;

    if (approvalAction === 'approve') {
      await approveWorkflow(selectedApproval.id, approvalNotes);
    } else {
      await rejectWorkflow(selectedApproval.id, approvalNotes);
    }

    setSelectedApproval(null);
    setApprovalNotes('');
    setApprovalAction(null);
  };

  const pendingApprovals = approvalWorkflows.filter(w => w.status === 'pending');

  if (!open) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-50"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Executive Center</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="notifications" className="flex-1">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex-1">
              Approvals
              {pendingApprovals.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {pendingApprovals.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="flex-1 px-6 pb-6">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <AnimatePresence>
                  {notifications.map((notification, index) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`cursor-pointer transition-all hover:shadow-md ${
                          !notification.is_read ? 'border-l-4 border-l-blue-500' : ''
                        } ${getNotificationColor(notification.priority)}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-sm truncate">
                                    {notification.title}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {notification.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {new Date(notification.created_at).toLocaleDateString()}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {!notification.is_read && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => markAsRead(notification.id)}
                                        className="h-6 px-2 text-xs"
                                      >
                                        <Check className="h-3 w-3" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => archiveNotification(notification.id)}
                                      className="h-6 px-2 text-xs"
                                    >
                                      <Archive className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {notifications.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="approvals" className="flex-1 px-6 pb-6">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                <AnimatePresence>
                  {pendingApprovals.map((workflow, index) => {
                    const Icon = getWorkflowIcon(workflow.workflow_type);
                    return (
                      <motion.div
                        key={workflow.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-600" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-sm truncate">
                                    {workflow.title}
                                  </h4>
                                  <Badge className={`text-xs ${getUrgencyColor(workflow.urgency)}`}>
                                    {workflow.urgency}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Requested by: {workflow.requester_name}
                                </p>
                                {workflow.description && (
                                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                    {workflow.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      setSelectedApproval(workflow);
                                      setApprovalAction('approve');
                                    }}
                                    className="flex-1 h-8 text-xs"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                      setSelectedApproval(workflow);
                                      setApprovalAction('reject');
                                    }}
                                    className="flex-1 h-8 text-xs"
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {pendingApprovals.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending approvals</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </motion.div>

      <Dialog open={selectedApproval !== null} onOpenChange={() => setSelectedApproval(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' ? 'Approve' : 'Reject'} Request
            </DialogTitle>
          </DialogHeader>
          
          {selectedApproval && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedApproval.title}</h4>
                <p className="text-sm text-gray-600">
                  Requested by: {selectedApproval.requester_name}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {approvalAction === 'approve' ? 'Approval' : 'Rejection'} Notes
                </label>
                <Textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder={`Add ${approvalAction === 'approve' ? 'approval' : 'rejection'} notes...`}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApproval(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleApprovalAction}
              variant={approvalAction === 'approve' ? 'default' : 'destructive'}
            >
              {approvalAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
