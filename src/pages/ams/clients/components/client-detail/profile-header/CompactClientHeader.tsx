
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Mail, Phone, Building, MapPin } from 'lucide-react';
import { Client } from '../../../types/ClientTypes';

interface CompactClientHeaderProps {
  client: Client;
  onEditClient: () => void;
}

const CompactClientHeader: React.FC<CompactClientHeaderProps> = ({ 
  client, 
  onEditClient 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                  <Badge variant="outline">{client.accountType}</Badge>
                  {client.clientTier && (
                    <Badge variant="secondary">{client.clientTier}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{client.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{client.industry || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{client.headquarters || 'Not specified'}</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={onEditClient}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactClientHeader;
