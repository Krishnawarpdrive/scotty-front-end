
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, Mail, Calendar, MessageSquare, PenLine, FileText, 
  CheckCircle, AlertCircle, User, DollarSign 
} from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientActivityTabProps {
  client: Client;
}

interface ActivityLog {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'document' | 'role' | 'requirement' | 'status' | 'payment';
  title: string;
  description: string;
  timestamp: string; // ISO timestamp
  user: string;
  metadata?: Record<string, any>;
}

const ClientActivityTab: React.FC<ClientActivityTabProps> = ({ client }) => {
  // Demo activity logs
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'call',
      title: 'Call with Client',
      description: 'Discussed upcoming project requirements',
      timestamp: '2025-05-20T14:30:00Z',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'email',
      title: 'Email Sent',
      description: 'Sent project proposal and pricing details',
      timestamp: '2025-05-19T10:15:00Z',
      user: 'Alice Smith'
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Kick-off Meeting',
      description: 'Initial project kick-off meeting with client stakeholders',
      timestamp: '2025-05-18T09:00:00Z',
      user: 'Bob Johnson',
      metadata: {
        attendees: ['Client CEO', 'CTO', 'Project Manager'],
        location: 'Virtual Meeting'
      }
    },
    {
      id: '4',
      type: 'note',
      title: 'Client Feedback',
      description: 'Client provided feedback on initial designs',
      timestamp: '2025-05-17T16:45:00Z',
      user: 'Emily Davis'
    },
    {
      id: '5',
      type: 'role',
      title: 'New Role Created',
      description: 'Added new Software Engineer role',
      timestamp: '2025-05-16T11:20:00Z',
      user: 'Sarah Wilson'
    },
    {
      id: '6',
      type: 'requirement',
      title: 'Requirement Updated',
      description: 'Updated Frontend Developer skill requirements',
      timestamp: '2025-05-15T13:10:00Z',
      user: 'Michael Brown'
    },
    {
      id: '7',
      type: 'document',
      title: 'Agreement Uploaded',
      description: 'Uploaded signed MSA document',
      timestamp: '2025-05-14T09:30:00Z',
      user: 'Jennifer Lee'
    },
    {
      id: '8',
      type: 'status',
      title: 'Client Status Changed',
      description: 'Updated client status to Active',
      timestamp: '2025-05-13T10:00:00Z',
      user: 'David Garcia'
    },
    {
      id: '9',
      type: 'payment',
      title: 'Invoice Paid',
      description: 'Client paid invoice #INV-2025-001',
      timestamp: '2025-05-12T15:20:00Z',
      user: 'Robert Taylor'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'note':
        return <PenLine className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'role':
        return <User className="h-4 w-4" />;
      case 'requirement':
        return <CheckCircle className="h-4 w-4" />;
      case 'status':
        return <AlertCircle className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityBadgeClass = (type: string) => {
    switch (type) {
      case 'call':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'email':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'meeting':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'note':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'document':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'role':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'requirement':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'status':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'payment':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Activity Logs</h2>
      </div>
      
      <Card className="p-6">
        <div className="space-y-6">
          {activityLogs.length > 0 ? (
            <div className="relative pl-8 border-l-2 border-muted space-y-8">
              {activityLogs.map((log) => (
                <div key={log.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.5rem] flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-muted">
                    {getActivityIcon(log.type)}
                  </div>
                  
                  {/* Activity content */}
                  <div className="bg-muted/10 rounded-md p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {log.title}
                          <Badge variant="outline" className={getActivityBadgeClass(log.type)}>
                            {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground">By {log.user}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>{formatDate(log.timestamp)}</span>
                          <span>at</span>
                          <span>{formatTime(log.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-2">{log.description}</p>
                    
                    {log.metadata && (
                      <div className="mt-3 pt-3 border-t border-dashed border-muted text-sm">
                        {Object.entries(log.metadata).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <span className="font-medium">{key}:</span>
                            <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No activity logs found for this client.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ClientActivityTab;
