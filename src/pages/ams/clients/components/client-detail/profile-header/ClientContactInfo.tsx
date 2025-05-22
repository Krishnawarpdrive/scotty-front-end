
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, AlertCircle, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center">
        {contact ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="h-7 w-7 hover:bg-muted/20">
                  <Phone className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{contact}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button size="icon" variant="outline" className="h-7 w-7 text-muted-foreground opacity-50 cursor-not-allowed">
            <Phone className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center">
        {email ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon" 
                  variant="outline" 
                  className="h-7 w-7 hover:bg-muted/20"
                  onClick={() => window.location.href = `mailto:${email}`}
                >
                  <Mail className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button size="icon" variant="outline" className="h-7 w-7 text-muted-foreground opacity-50 cursor-not-allowed">
            <Mail className="h-3 w-3" />
          </Button>
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
