
import { useState } from 'react';

export interface UseClientDetailsProps {
  clients: any[];
}

export const useClientDetails = ({ clients }: UseClientDetailsProps) => {
  const [clientDetailId, setClientDetailId] = useState<number | null>(null);
  
  const handleViewClient = (client: any) => {
    setClientDetailId(client.id);
  };

  const handleCloseDetail = () => {
    setClientDetailId(null);
  };

  const selectedClient = clientDetailId !== null 
    ? clients.find(c => c.id === clientDetailId)
    : null;

  return {
    clientDetailId,
    selectedClient,
    handleViewClient,
    handleCloseDetail,
    isDetailOpen: clientDetailId !== null
  };
};

export default useClientDetails;
