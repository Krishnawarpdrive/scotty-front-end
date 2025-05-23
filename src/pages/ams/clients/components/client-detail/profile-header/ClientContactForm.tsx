
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface ClientContactFormProps {
  editedContact: string;
  editedEmail: string;
  setEditedContact: (value: string) => void;
  setEditedEmail: (value: string) => void;
  handleContactSave: () => void;
  setIsEditingContact: (value: boolean) => void;
}

const ClientContactForm: React.FC<ClientContactFormProps> = ({
  editedContact,
  editedEmail,
  setEditedContact,
  setEditedEmail,
  handleContactSave,
  setIsEditingContact
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <label htmlFor="contact" className="text-xs text-muted-foreground block mb-1">
          Phone Number
        </label>
        <Input
          id="contact"
          value={editedContact}
          onChange={(e) => setEditedContact(e.target.value)}
          className="h-8 text-sm"
          placeholder="Enter contact number"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="text-xs text-muted-foreground block mb-1">
          Email Address
        </label>
        <Input
          id="email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          className="h-8 text-sm"
          placeholder="Enter email address"
          type="email"
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-1">
        <Button
          size="sm" 
          variant="outline"
          className="h-7 text-xs"
          onClick={() => setIsEditingContact(false)}
        >
          <X className="h-3 w-3 mr-1" /> Cancel
        </Button>
        <Button
          size="sm"
          className="h-7 text-xs"
          onClick={handleContactSave}
        >
          <Check className="h-3 w-3 mr-1" /> Save
        </Button>
      </div>
    </div>
  );
};

export default ClientContactForm;
