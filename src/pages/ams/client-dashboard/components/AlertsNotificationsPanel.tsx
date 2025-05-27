
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, FileX, UserX, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'stalled_role' | 'expiring_offer' | 'pending_approval' | 'overdue_document';
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  actionRequired: boolean;
  daysOverdue?: number;
}

interface AlertsNotificationsPanelProps {
  data: Alert[];
}

export const AlertsNotificationsPanel: React.FC<AlertsNotificationsPanelProps> = ({ data }) => {
  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'expiring_offer',
      title: 'Offer Expiring Soon',
      description: 'John Smith\'s offer expires in 2 days',
      severity: 'critical',
      actionRequired: true,
      daysOverdue: 0
    },
    {
      id: '2',
      type: 'stalled_role',
      title: 'Stalled Hiring Process',
      description: 'Senior Software Engineer role has no activity for 5 days',
      severity: 'warning',
      actionRequired: true,
      daysOverdue: 5
    },
    {
      id: '3',
      type: 'pending_approval',
      title: 'Pending Approval',
      description: 'Product Manager role waiting for client approval',
      severity: 'warning',
      actionRequired: true,
      daysOverdue: 2
    },
    {
      id: '4',
      type: 'overdue_document',
      title: 'Document Overdue',
      description: 'Background check pending for Sarah Wilson',
      severity: 'info',
      actionRequired: true,
      daysOverdue: 3
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'stalled_role': return <Clock className="h-4 w-4" />;
      case 'expiring_offer': return <AlertTriangle className="h-4 w-4" />;
      case 'pending_approval': return <FileX className="h-4 w-4" />;
      case 'overdue_document': return <UserX className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const criticalCount = mockAlerts.filter(alert => alert.severity === 'critical').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alerts & Notifications
            {criticalCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {criticalCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`border rounded-lg p-3 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge className={getSeverityBadgeColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
                
                <p className="text-sm mb-2">{alert.description}</p>
                
                {alert.daysOverdue !== undefined && alert.daysOverdue > 0 && (
                  <p className="text-xs text-gray-600 mb-2">
                    {alert.daysOverdue} days overdue
                  </p>
                )}
                
                {alert.actionRequired && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Dismiss
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      Take Action
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {mockAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No alerts at this time</p>
            <p className="text-sm">Everything is running smoothly!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
