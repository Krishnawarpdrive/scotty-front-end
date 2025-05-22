
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface ClientBackHeaderProps {
  onBackClick: () => void;
}

const ClientBackHeader: React.FC<ClientBackHeaderProps> = ({ onBackClick }) => {
  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        className="mr-4" 
        onClick={onBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clients
      </Button>
      <h1 className="text-3xl font-bold">Client Detail</h1>
    </div>
  );
};

export default ClientBackHeader;
