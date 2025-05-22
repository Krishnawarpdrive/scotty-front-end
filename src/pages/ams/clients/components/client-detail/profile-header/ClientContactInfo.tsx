
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, AlertCircle, Pencil } from 'lucide-react';

interface ClientContactInfoProps {
  contact: string;
  email: string;
  setIsEditingContact: (value: boolean) => void;
}

const ClientContactInfo: React.FC<ClientContactInfoProps> = ({
  contact,
  email,
  setIsEditingContact
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-2">
        {contact ? (
          <>
            <span className="text-xs">{contact}</span>
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
        {email ? (
          <>
            <span className="text-xs">{email}</span>
            <Button
              size="icon" 
              variant="outline" 
              className="h-7 w-7"
              onClick={() => window.location.href = `mailto:${email}`}
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
        className="self-start md:self-center opacity-0 group-hover:opacity-100 transition-opacity h-7 text-[10px]"
      >
        <Pencil className="h-3 w-3 mr-1" /> Edit
      </Button>
    </div>
  );
};

export default ClientContactInfo;
