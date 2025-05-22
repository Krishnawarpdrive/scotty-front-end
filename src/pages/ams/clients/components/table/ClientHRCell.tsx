
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ClientHRCellProps {
  assignedHR: string;
}

export const ClientHRCell: React.FC<ClientHRCellProps> = ({ assignedHR }) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-5 w-5 mr-2">
        <AvatarFallback className="text-[10px] bg-green-100">
          {assignedHR.split(' ').map((n: string) => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      {assignedHR}
    </div>
  );
};

export default ClientHRCell;
