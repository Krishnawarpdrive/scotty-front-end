
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { ClientRole } from './DAMappingInterface';

interface BulkActionsPanelProps {
  selectedDAs: string[];
  clientRoles: ClientRole[];
  onBulkAssignment: (selectedDAIds: string[], targetRoleId: string) => void;
}

export const BulkActionsPanel: React.FC<BulkActionsPanelProps> = ({
  selectedDAs,
  clientRoles,
  onBulkAssignment
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleBulkAssign = () => {
    if (selectedDAs.length > 0 && selectedRole) {
      onBulkAssignment(selectedDAs, selectedRole);
      setSelectedRole('');
    }
  };

  const unassignedRoles = clientRoles.filter(role => 
    role.assignment_status === 'unassigned' || role.assignment_status === 'partially_assigned'
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Assignment Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {selectedDAs.length} DA{selectedDAs.length !== 1 ? 's' : ''} selected
            </Badge>
          </div>

          {selectedDAs.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Assign to Role:
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role to assign DAs" />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.client_name} - {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleBulkAssign}
                disabled={!selectedRole}
                className="w-full"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Assign Selected DAs
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select DAs from the pool to perform bulk actions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
