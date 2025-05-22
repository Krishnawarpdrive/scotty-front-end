
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '../../types/ClientTypes';

interface ClientRolesTabProps {
  client: Client;
  onCreateRole: (clientId: string) => void;
}

const ClientRolesTab: React.FC<ClientRolesTabProps> = ({ client, onCreateRole }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Client Roles</h3>
        <Button 
          onClick={() => onCreateRole(client.id)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </Button>
      </div>
      
      {client.roles && client.roles.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Openings</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {client.roles.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{role.name}</td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    </td>
                    <td className="p-4">5</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center p-8 bg-muted/20 rounded-lg border">
          <h3 className="font-medium mb-2">No roles found</h3>
          <p className="text-muted-foreground mb-4">This client doesn't have any roles yet.</p>
          <Button 
            onClick={() => onCreateRole(client.id)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create First Role
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientRolesTab;
