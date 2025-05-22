
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Client } from '../../types/ClientTypes';

interface ClientRolesTabProps {
  client: Client;
  onCreateRole: (clientId: string) => void;
}

interface RoleSectionProps {
  role: any;
  isOpen: boolean;
  onToggle: () => void;
}

const RoleSection: React.FC<RoleSectionProps> = ({ role, isOpen, onToggle }) => {
  return (
    <div className="mb-2 border rounded-md overflow-hidden animate-fade-in">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {isOpen ? 
            <ChevronDown className="h-3 w-3 text-muted-foreground" /> : 
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          }
          <span className="font-medium text-xs">{role.name}</span>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">Active</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">5 Openings</span>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
        </div>
      </div>
      
      <Collapsible open={isOpen}>
        <CollapsibleContent className="p-3 pt-0 border-t">
          <div className="text-xs space-y-2">
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Created: {new Date().toLocaleDateString()}</span>
              <span className="text-muted-foreground">Hiring Manager: John Doe</span>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-medium mb-2">Requirements (3)</h4>
              <ul className="space-y-1">
                <li className="flex justify-between items-center py-1 px-2 rounded bg-muted/50">
                  <span>Senior Developer</span>
                  <Badge variant="outline" className="text-xs">Open</Badge>
                </li>
                <li className="flex justify-between items-center py-1 px-2 rounded bg-muted/50">
                  <span>Full Stack Developer</span>
                  <Badge variant="outline" className="text-xs">In Progress</Badge>
                </li>
                <li className="flex justify-between items-center py-1 px-2 rounded bg-muted/50">
                  <span>UX Designer</span>
                  <Badge variant="outline" className="text-xs">Closed</Badge>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                className="h-7 text-xs"
                size="sm"
                variant="outline"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Requirement
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const ClientRolesTab: React.FC<ClientRolesTabProps> = ({ client, onCreateRole }) => {
  const [openRoleIds, setOpenRoleIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleRole = (roleId: string) => {
    setOpenRoleIds(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId) 
        : [...prev, roleId]
    );
  };

  const mockRoles = client.roles?.length ? client.roles : [
    { id: '1', name: 'Software Engineer' },
    { id: '2', name: 'Product Manager' },
    { id: '3', name: 'UX Designer' }
  ];

  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input 
            placeholder="Search roles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
        <Button 
          onClick={() => onCreateRole(client.id)}
          className="h-8 text-xs flex items-center gap-1"
          size="sm"
        >
          <Plus className="h-3 w-3" />
          Add Role
        </Button>
      </div>
      
      {filteredRoles.length > 0 ? (
        <div className="space-y-1">
          {filteredRoles.map((role) => (
            <RoleSection 
              key={role.id} 
              role={role} 
              isOpen={openRoleIds.includes(role.id)}
              onToggle={() => toggleRole(role.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg border animate-fade-in">
          <h3 className="font-medium mb-2 text-sm">No roles found</h3>
          <p className="text-muted-foreground mb-4 text-xs">This client doesn't have any roles yet.</p>
          <Button 
            onClick={() => onCreateRole(client.id)}
            className="h-8 text-xs flex items-center gap-1"
            size="sm"
          >
            <Plus className="h-3 w-3" />
            Create First Role
          </Button>
        </div>
      )}
      
      {/* Sticky action button */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 animate-fade-in">
        <Button 
          onClick={() => onCreateRole(client.id)}
          className="rounded-full h-12 w-12 shadow-lg"
          size="icon"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ClientRolesTab;
