
import React from 'react';

interface ClientSelectionCellProps {
  clientId: string;
  isSelected: boolean;
  onSelectClient: (id: string) => void;
}

export const ClientSelectionCell: React.FC<ClientSelectionCellProps> = ({
  clientId,
  isSelected,
  onSelectClient
}) => {
  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => onSelectClient(clientId)}
      className="rounded border-gray-300"
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default ClientSelectionCell;
