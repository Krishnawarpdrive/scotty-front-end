
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Pencil, Phone, Mail, Check, X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Client } from '../../types/ClientTypes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface ClientProfileHeaderProps {
  client: Client;
  onEditClient: (client: Client) => void;
}

const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({ client, onEditClient }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(client.name);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedContact, setEditedContact] = useState(client.contact || '');
  const [editedEmail, setEditedEmail] = useState(client.email || '');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNameSave = () => {
    if (editedName.trim()) {
      onEditClient({ ...client, name: editedName.trim() });
      setIsEditingName(false);
    }
  };

  const handleContactSave = () => {
    if (editedContact.trim() || editedEmail.trim()) {
      onEditClient({ 
        ...client, 
        contact: editedContact.trim(),
        email: editedEmail.trim()
      });
      setIsEditingContact(false);
    }
  };

  return (
    <Collapsible 
      open={!isCollapsed}
      onOpenChange={setIsCollapsed}
      className="transition-all duration-200 ease-in-out"
    >
      <Card className="p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 bg-primary/10 border hidden sm:flex">
              <span className="text-lg font-bold">
                {client.name?.charAt(0) || 'C'}
              </span>
            </Avatar>
            
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <Input 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-sm font-bold h-7 w-full md:w-auto"
                />
                <Button size="icon" variant="ghost" onClick={handleNameSave} className="h-6 w-6">
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)} className="h-6 w-6">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-bold">{client.name}</h1>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditingName(true)}
                  className="h-5 w-5"
                >
                  <Pencil className="h-2.5 w-2.5" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 flex items-center gap-1 text-xs"
              >
                {isCollapsed ? "Expand" : "Collapse"}
                {isCollapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-2">Client ID: {client.id.slice(0, 8)}</p>
        
        <CollapsibleContent 
          className={cn(
            "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          )}
        >
          {/* Client Status Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              {client.accountType || 'Customer'}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-xs ${client.healthScore >= 70 ? 'bg-green-50 text-green-700 border-green-200' : 
                client.healthScore >= 40 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                'bg-red-50 text-red-700 border-red-200'}`}
            >
              Health Score: {client.healthScore || 0}%
            </Badge>
          </div>
          
          {/* Contact Information */}
          <div className="pt-2 border-t border-border/30">
            <h3 className="text-xs font-medium mb-2">Contact Information</h3>
            
            {isEditingContact ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedContact} 
                    onChange={(e) => setEditedContact(e.target.value)}
                    placeholder="Contact Person"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedEmail} 
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={handleContactSave} className="h-7 text-xs">Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingContact(false)} className="h-7 text-xs">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 text-xs">
                <div className="flex items-center gap-2">
                  {client.contact ? (
                    <>
                      <span>{client.contact}</span>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> No contact added
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {client.email ? (
                    <>
                      <span>{client.email}</span>
                      <Button
                        size="icon" 
                        variant="outline" 
                        className="h-6 w-6"
                        onClick={() => window.location.href = `mailto:${client.email}`}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> No email added
                    </span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditingContact(true)}
                  className="self-start sm:self-center h-6 text-xs"
                >
                  <Pencil className="h-2.5 w-2.5 mr-1" /> Edit
                </Button>
              </div>
            )}
          </div>
          
          {/* Communication Channels & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 mt-2 border-t border-border/30 text-xs">
            <div>
              <h3 className="text-xs font-medium mb-2">Communication Channels</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-gray-50 text-xs">Slack: No</Badge>
                <Badge variant="outline" className="bg-gray-50 text-xs">Teams: No</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-medium mb-2">Client Owner</h3>
              <p className="text-xs">{client.assignedHR || 'Not assigned'}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default ClientProfileHeader;
