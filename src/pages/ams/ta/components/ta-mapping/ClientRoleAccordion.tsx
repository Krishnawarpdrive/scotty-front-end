
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Briefcase, Calendar, AlertTriangle, Users, X } from 'lucide-react';
import { DroppableRoleCard } from './DroppableRoleCard';
import { ClientRole, AssignmentMapping } from './TAMappingInterface';

interface ClientRoleAccordionProps {
  clientRoles: ClientRole[];
  assignments: AssignmentMapping[];
  expandedClients: string[];
  onClientExpansion: (clientId: string, isExpanded: boolean) => void;
  onDrop: (taId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => void;
  onRemoveAssignment: (assignmentId: string) => void;
}

export const ClientRoleAccordion: React.FC<ClientRoleAccordionProps> = ({
  clientRoles,
  assignments,
  expandedClients,
  onClientExpansion,
  onDrop,
  onRemoveAssignment
}) => {
  // Group roles by client
  const groupedRoles = clientRoles.reduce((acc, role) => {
    if (!acc[role.client_name]) {
      acc[role.client_name] = [];
    }
    acc[role.client_name].push(role);
    return acc;
  }, {} as Record<string, ClientRole[]>);

  const getClientSummary = (roles: ClientRole[]) => {
    const totalRoles = roles.length;
    const fullyAssigned = roles.filter(r => r.assignment_status === 'fully_assigned').length;
    const partiallyAssigned = roles.filter(r => r.assignment_status === 'partially_assigned').length;
    const unassigned = roles.filter(r => r.assignment_status === 'unassigned').length;
    const highPriority = roles.filter(r => r.priority === 'high').length;

    return { totalRoles, fullyAssigned, partiallyAssigned, unassigned, highPriority };
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Client Roles & Requirements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion 
          type="multiple" 
          value={expandedClients}
          onValueChange={(value) => {
            // Handle expansion state changes
            const newExpanded = value;
            const previousExpanded = expandedClients;
            
            newExpanded.forEach(clientId => {
              if (!previousExpanded.includes(clientId)) {
                onClientExpansion(clientId, true);
              }
            });
            
            previousExpanded.forEach(clientId => {
              if (!newExpanded.includes(clientId)) {
                onClientExpansion(clientId, false);
              }
            });
          }}
          className="space-y-4"
        >
          {Object.entries(groupedRoles).map(([clientName, roles]) => {
            const summary = getClientSummary(roles);
            
            return (
              <AccordionItem key={clientName} value={clientName} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <div className="text-left">
                        <h3 className="font-medium">{clientName}</h3>
                        <p className="text-sm text-gray-600">
                          {summary.totalRoles} roles • {summary.highPriority} high priority
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {summary.fullyAssigned > 0 && (
                        <Badge className="bg-green-100 text-green-800" variant="secondary">
                          {summary.fullyAssigned} complete
                        </Badge>
                      )}
                      {summary.partiallyAssigned > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                          {summary.partiallyAssigned} partial
                        </Badge>
                      )}
                      {summary.unassigned > 0 && (
                        <Badge className="bg-red-100 text-red-800" variant="secondary">
                          {summary.unassigned} unassigned
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    {roles.map((role) => (
                      <DroppableRoleCard
                        key={role.id}
                        role={role}
                        assignments={assignments.filter(a => a.client_role_id === role.id)}
                        onDrop={onDrop}
                        onRemoveAssignment={onRemoveAssignment}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        
        {Object.keys(groupedRoles).length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No client roles available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
