
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface ClientDetailErrorProps {
  error: string;
  onBackClick: () => void;
}

const ClientDetailError: React.FC<ClientDetailErrorProps> = ({ error, onBackClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={onBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <h1 className="text-3xl font-bold">Client Not Found</h1>
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error Loading Client
        </h3>
        <p className="text-red-700 mb-4">
          {error || "Could not find the requested client. It may have been deleted or does not exist."}
        </p>
        <Button 
          onClick={onBackClick} 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Return to Clients
        </Button>
      </div>
    </div>
  );
};

export default ClientDetailError;
