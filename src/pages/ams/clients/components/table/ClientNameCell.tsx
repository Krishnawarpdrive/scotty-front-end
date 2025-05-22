
import React from 'react';
import { cn } from "@/lib/utils";

interface ClientNameCellProps {
  name: string;
}

const ClientNameCell: React.FC<ClientNameCellProps> = ({ name }) => {
  return (
    <div className={cn(
      "font-medium hover:text-green-600 transition-colors",
      "cursor-pointer"
    )}>
      {name}
    </div>
  );
};

export default ClientNameCell;
