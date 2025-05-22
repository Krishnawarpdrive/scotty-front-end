
import React from 'react';

interface ClientNameCellProps {
  name: string;
}

export const ClientNameCell: React.FC<ClientNameCellProps> = ({ name }) => {
  return (
    <span className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer">
      {name}
    </span>
  );
};

export default ClientNameCell;
