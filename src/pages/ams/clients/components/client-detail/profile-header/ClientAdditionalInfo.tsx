
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ClientAdditionalInfoProps {
  isExpanded: boolean;
}

const ClientAdditionalInfo: React.FC<ClientAdditionalInfoProps> = ({
  isExpanded
}) => {
  if (!isExpanded) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t mt-2">
      <div>
        <h3 className="text-[10px] font-medium mb-2">Communication Channels</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-gray-50 text-[10px]">Slack: No</Badge>
          <Badge variant="outline" className="bg-gray-50 text-[10px]">Teams: No</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-[10px] font-medium mb-2">Client Owner</h3>
        <p className="text-xs">{/* Owner name would go here */}</p>
      </div>
    </div>
  );
};

export default ClientAdditionalInfo;
