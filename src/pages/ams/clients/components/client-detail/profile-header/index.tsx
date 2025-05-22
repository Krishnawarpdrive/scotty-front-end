
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Client } from '../../../types/ClientTypes';
import { cn } from '@/lib/utils';

import ClientNameEditor from './ClientNameEditor';
import ClientBadges from './ClientBadges';
import ClientContactInfo from './ClientContactInfo';
import ClientAdditionalInfo from './ClientAdditionalInfo';

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
      "shadow-sm transition-all duration-300",
      isCollapsed 
        ? "p-3 rounded-none border-0 border-b" 
        : "p-4 m-4 rounded-lg"
    )}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <Avatar className="h-12 w-12 bg-primary/10 border hidden sm:flex">
              <span className="text-lg font-bold">
                {client.name?.charAt(0) || 'C'}
              </span>
            </Avatar>
          )}
          <div>
            <ClientNameEditor 
              isEditingName={isEditingName}
              editedName={editedName}
              clientName={client.name}
              clientId={client.id}
              setEditedName={setEditedName}
              handleNameSave={handleNameSave}
              setIsEditingName={setIsEditingName}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        {!isCollapsed && (
          <ClientBadges 
            accountType={client.accountType} 
            healthScore={client.healthScore} 
          />
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
            <h3 className="text-[10px] font-medium mb-2">Contact Information</h3>
            
            {isEditingContact ? (
              <ClientContactForm 
                editedContact={editedContact}
                editedEmail={editedEmail}
                setEditedContact={setEditedContact}
                setEditedEmail={setEditedEmail}
                handleContactSave={handleContactSave}
                setIsEditingContact={setIsEditingContact}
              />
            ) : (
              <ClientContactInfo 
                contact={client.contact}
                email={client.email}
                setIsEditingContact={setIsEditingContact}
              />
            )}
          </div>
          
          {/* Additional Information */}
          <ClientAdditionalInfo 
            isExpanded={isExpanded} 
            hasSlackIntegration={false}
            clientOwner={client.assignedHR || ''}
          />
        </>
      )}
    </Card>
  );
};

export default ClientProfileHeader;
