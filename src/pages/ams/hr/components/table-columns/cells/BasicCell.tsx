
import React from 'react';

interface BasicCellProps {
  value: string | number;
  minWidth?: string;
  className?: string;
}

export const BasicCell = ({ value, minWidth = "70px", className = "" }: BasicCellProps) => {
  return (
    <div className={`text-gray-600 text-sm ${className}`} style={{ minWidth }}>
      {value}
    </div>
  );
};
