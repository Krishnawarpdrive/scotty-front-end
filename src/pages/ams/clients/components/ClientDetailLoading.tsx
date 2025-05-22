
import React from 'react';

export interface ClientDetailLoadingProps {
  // No props needed for this component
}

const ClientDetailLoading: React.FC<ClientDetailLoadingProps> = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading client details...</p>
      </div>
    </div>
  );
};

export default ClientDetailLoading;
