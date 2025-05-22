
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ClientBackHeaderProps {
  name?: string;
}

const ClientBackHeader: React.FC<ClientBackHeaderProps> = ({ name }) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/ams/clients');
  };
  
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        className="mr-4" 
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Clients
      </Button>
      <h1 className="text-3xl font-bold">{name ? name : 'Client Detail'}</h1>
    </div>
  );
};

export default ClientBackHeader;
