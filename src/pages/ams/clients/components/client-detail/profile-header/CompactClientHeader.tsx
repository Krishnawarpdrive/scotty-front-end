
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronDown, Phone, Mail, Edit, MessageSquare } from 'lucide-react';
import { Client } from '../../../types/ClientTypes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CompactClientHeaderProps {
  client: Client;
  onEditClient: (client: Client) => void;
  isCollapsed?: boolean;
}

const CompactClientHeader: React.FC<CompactClientHeaderProps> = ({ 
  client, 
  onEditClient, 
  isCollapsed = false 
}) => {
  return (
    <Card className="p-4 border-b rounded-none shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <span className="text-sm font-bold">
              {client.name?.charAt(0) || 'C'}
            </span>
          </Avatar>
          
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-semibold">{client.name}</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {client.accountType}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Health: {client.healthScore}%
            </Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEditClient(client)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Client Info
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone className="h-4 w-4 mr-2" />
              Call Client
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              View Notes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
        <span>ID: {client.id.substring(0, 8)}...</span>
        <span>Owner: {client.assignedHR || 'Mike Chen'}</span>
        <span>Tier: {client.clientTier || 'A'}</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Slack Connected</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" variant="ghost" className="h-8 px-2">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 px-2">
          <Mail className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 px-2">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default CompactClientHeader;
