
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Pencil, Phone, Mail, Check, X, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Client } from '../../types/ClientTypes';

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
    <Card className="p-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar/Logo Section */}
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 bg-primary/10 border">
            <span className="text-2xl font-bold">
              {client.name?.charAt(0) || 'C'}
            </span>
          </Avatar>
        </div>
        
        {/* Client Info */}
        <div className="flex-grow space-y-3">
          {/* Client Name and ID Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedName} 
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-xl font-bold h-10 w-full md:w-auto"
                  />
                  <Button size="icon" variant="ghost" onClick={handleNameSave}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{client.name}</h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-6 w-6"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">Client ID: {client.id.slice(0, 8)}</p>
            </div>
            
            {/* Client Status Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {client.accountType || 'Customer'}
              </Badge>
              <Badge 
                variant="outline" 
                className={`${client.healthScore >= 70 ? 'bg-green-50 text-green-700 border-green-200' : 
                  client.healthScore >= 40 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                  'bg-red-50 text-red-700 border-red-200'}`}
              >
                Health Score: {client.healthScore || 0}%
              </Badge>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="pt-2 border-t">
            <h3 className="text-sm font-medium mb-2">Contact Information</h3>
            
            {isEditingContact ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedContact} 
                    onChange={(e) => setEditedContact(e.target.value)}
                    placeholder="Contact Person"
                    className="h-8"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    value={editedEmail} 
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Email Address"
                    className="h-8"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" onClick={handleContactSave}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingContact(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-2">
                  {client.contact ? (
                    <>
                      <span>{client.contact}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7">
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
                        className="h-7 w-7"
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
                  className="self-start md:self-center"
                >
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
            )}
          </div>
          
          {/* Communication Channels & Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <h3 className="text-sm font-medium mb-2">Communication Channels</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-gray-50">Slack: No</Badge>
                <Badge variant="outline" className="bg-gray-50">Teams: No</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Client Owner</h3>
              <p>{client.assignedHR || 'Not assigned'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClientProfileHeader;
