
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { ClientRole } from './TAMappingInterface';

interface BulkActionsPanelProps {
  selectedTAs: string[];
  clientRoles: ClientRole[];
  onBulkAssignment: (selectedTAIds: string[], targetRoleId: string) => void;
}

export const BulkActionsPanel: React.FC<BulkActionsPanelProps> = ({
  selectedTAs,
  clientRoles,
  onBulkAssignment
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleBulkAssign = () => {
    if (selectedTAs.length > 0 && selectedRole) {
      onBulkAssignment(selectedTAs, selectedRole);
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
              {selectedTAs.length} TA{selectedTAs.length !== 1 ? 's' : ''} selected
            </Badge>
          </div>

          {selectedTAs.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Assign to Role:
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role to assign TAs" />
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
                Assign Selected TAs
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select TAs from the pool to perform bulk actions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
