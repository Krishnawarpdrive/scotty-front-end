
import React from 'react';
import { cn } from "@/lib/utils";

interface ClientNameCellProps {
  name: string;
}

const ClientNameCell: React.FC<ClientNameCellProps> = ({ name }) => {
  return (
    <div className={cn(
      "font-medium text-[#262626] hover:text-green-500 transition-colors",
      "cursor-pointer"
    )}>
      {name}
    </div>
  );
};

export default ClientNameCell;
