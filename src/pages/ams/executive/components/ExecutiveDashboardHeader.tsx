
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Filter, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExecutiveDashboardHeaderProps {
  onNotificationsToggle: () => void;
  notificationsOpen: boolean;
}

export const ExecutiveDashboardHeader: React.FC<ExecutiveDashboardHeaderProps> = ({
  onNotificationsToggle,
  notificationsOpen
}) => {
  const unreadCount = 5; // This would come from a hook in real implementation

  return (
    <motion.div 
      className="bg-white border-b px-6 py-4 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights into company hiring performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          
          <div className="relative">
            <Button 
              variant={notificationsOpen ? "default" : "outline"}
              size="sm" 
              onClick={onNotificationsToggle}
              className="relative flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Alerts
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
