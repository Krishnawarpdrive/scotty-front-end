
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Pencil, Phone, Mail, Check, X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Client } from '../../types/ClientTypes';
import { cn } from '@/lib/utils';

interface ClientProfileHeaderProps {
  client: Client;
  onEditClient: (client: Client) => void;
  isCollapsed?: boolean;
}

const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({ 
  client, 
  onEditClient, 
  isCollapsed = false 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(client.name);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedContact, setEditedContact] = useState(client.contact || '');
  const [editedEmail, setEditedEmail] = useState(client.email || '');
  const [isExpanded, setIsExpanded] = useState(true);

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
    <Card className={cn(
      "shadow-md transition-all duration-300",
      isCollapsed 
        ? "p-3 rounded-none border-0 border-b" 
        : "p-6 m-4 rounded-lg"
    )}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <Avatar className="h-14 w-14 bg-primary/10 border hidden sm:flex">
              <span className="text-lg font-bold">
                {client.name?.charAt(0) || 'C'}
              </span>
            </Avatar>
          )}
          <div>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input 
                  value={editedName} 
                  onChange={(e) => setEditedName(e.target.value)}
                  className="h-8 text-base border-primary focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Button size="icon" variant="ghost" onClick={handleNameSave} className="h-7 w-7">
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)} className="h-7 w-7">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className={cn(
                  "font-bold",
                  isCollapsed ? "text-lg" : "text-2xl"
                )}>
                  {client.name}
                </h1>
                {!isCollapsed && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            {!isCollapsed && (
              <p className="text-xs text-muted-foreground">Client ID: {client.id.slice(0, 8)}</p>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              {client.accountType || 'Customer'}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                client.healthScore >= 70 ? 'bg-green-50 text-green-700 border-green-200' : 
                client.healthScore >= 40 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                'bg-red-50 text-red-700 border-red-200'
              )}
            >
              Health Score: {client.healthScore || 0}%
            </Badge>
          </div>
        )}
        
        {!isCollapsed && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      
      {(!isCollapsed && isExpanded) && (
        <>
          {/* Contact Information */}
          <div className="pt-2 border-t mt-2 group">
            <h3 className="text-xs font-medium mb-2">Contact Information</h3>
            
            {isEditingContact ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedContact} 
                    onChange={(e) => setEditedContact(e.target.value)}
                    placeholder="Contact Person"
                    className="h-8 text-xs border-transparent hover:border-input focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedEmail} 
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-8 text-xs border-transparent hover:border-input focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={handleContactSave} className="h-7 text-xs">Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingContact(false)} className="h-7 text-xs">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-2">
                  {client.contact ? (
                    <>
                      <span className="text-xs">{client.contact}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <AlertCircle className="h-3 w-3" /> No contact added
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {client.email ? (
                    <>
                      <span className="text-xs">{client.email}</span>
                      <Button
                        size="icon" 
                        variant="outline" 
                        className="h-7 w-7"
                        onClick={() => window.location.href = `mailto:${client.email}`}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <AlertCircle className="h-3 w-3" /> No email added
                    </span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditingContact(true)}
                  className="self-start md:self-center opacity-0 group-hover:opacity-100 transition-opacity h-7 text-xs"
                >
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
            )}
          </div>
          
          {/* Communication Channels & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t mt-2">
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
        </>
      )}
    </Card>
  );
};

export default ClientProfileHeader;
