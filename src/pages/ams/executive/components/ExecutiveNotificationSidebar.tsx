
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface ExecutiveNotificationSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const ExecutiveNotificationSidebar: React.FC<ExecutiveNotificationSidebarProps> = ({
  open,
  onClose
}) => {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Hiring Goal Behind',
      message: 'Engineering department is 15% behind hiring goal for Q2',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Cost Per Hire',
      message: 'Marketing department cost per hire exceeded budget by $500',
      timestamp: '4 hours ago',
      isRead: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Goal Achieved',
      message: 'Sales team achieved 105% of monthly hiring goal',
      timestamp: '1 day ago',
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'New Report Available',
      message: 'Q2 executive summary report is ready for review',
      timestamp: '2 days ago',
      isRead: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'warning': return Clock;
      case 'success': return CheckCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Executive Alerts</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        notification.isRead ? 'bg-gray-50' : 'bg-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{notification.title}</p>
                            {!notification.isRead && (
                              <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <Button variant="outline" className="w-full" size="sm">
                View All Notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
