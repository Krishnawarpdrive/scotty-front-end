
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ClientBadgesProps {
  accountType: string;
  healthScore: number;
}

const ClientBadges: React.FC<ClientBadgesProps> = ({
  accountType,
  healthScore
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
        {accountType || 'Customer'}
      </Badge>
      <Badge 
        variant="outline" 
        className={cn(
          "text-[10px]",
          healthScore >= 70 ? 'bg-green-50 text-green-700 border-green-200' : 
          healthScore >= 40 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
          'bg-red-50 text-red-700 border-red-200'
        )}
      >
        Health Score: {healthScore || 0}%
      </Badge>
    </div>
  );
};

export default ClientBadges;
