
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        <Button size="sm" variant="outline" onClick={handleContactSave} className="h-7 text-[10px]">Save</Button>
        <Button size="sm" variant="ghost" onClick={() => setIsEditingContact(false)} className="h-7 text-[10px]">Cancel</Button>
      </div>
    </div>
  );
};

export default ClientContactForm;
