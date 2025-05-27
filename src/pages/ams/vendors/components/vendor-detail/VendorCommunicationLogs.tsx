
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquareIcon, CalendarIcon } from 'lucide-react';
import { Vendor } from '../../types/VendorTypes';

interface VendorCommunicationLogsProps {
  vendor: Vendor;
}

export const VendorCommunicationLogs: React.FC<VendorCommunicationLogsProps> = ({ vendor }) => {
  // Mock communication logs
  const logs = [
    {
      id: '1',
      type: 'Email',
      subject: 'Role Assignment Update',
      date: '2024-01-15',
      status: 'Sent'
    },
    {
      id: '2',
      type: 'Call',
      subject: 'Weekly Check-in',
      date: '2024-01-12',
      status: 'Completed'
    },
    {
      id: '3',
      type: 'Note',
      subject: 'Performance Review',
      date: '2024-01-10',
      status: 'Internal'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareIcon className="h-5 w-5" />
          Communication Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{log.type}</Badge>
              <span className="text-xs text-gray-500">
                {log.date}
              </span>
            </div>
            <div className="text-sm font-medium">{log.subject}</div>
            <div className="text-xs text-gray-600 mt-1">Status: {log.status}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
