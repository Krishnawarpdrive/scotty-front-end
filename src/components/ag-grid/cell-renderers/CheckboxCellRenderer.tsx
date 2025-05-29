
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxCellRendererParams extends ICellRendererParams {
  onSelectionChanged: (id: string, selected: boolean) => void;
  isSelected: boolean;
}

export const CheckboxCellRenderer: React.FC<CheckboxCellRendererParams> = (params) => {
  const handleChange = (checked: boolean) => {
    params.onSelectionChanged(params.data.id, checked);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Checkbox
        checked={params.isSelected || false}
        onCheckedChange={handleChange}
        className="border-2 data-[state=checked]:bg-[#009933] data-[state=checked]:border-[#009933]"
      />
    </div>
  );
};
