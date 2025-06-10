
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { Client } from '../../types/ClientTypes';

interface ClientRequirementsTabProps {
  client: Client;
  onCreateRequirement: () => void;
}

const ClientRequirementsTab: React.FC<ClientRequirementsTabProps> = ({ 
  client, 
  onCreateRequirement 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Client Requirements</h3>
        <Button 
          onClick={onCreateRequirement}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Requirement
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Requirements Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h3 className="font-medium mb-2">No requirements found</h3>
            <p className="text-muted-foreground mb-4">
              This client doesn't have any requirements yet.
            </p>
            <Button 
              onClick={onCreateRequirement}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create First Requirement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientRequirementsTab;
