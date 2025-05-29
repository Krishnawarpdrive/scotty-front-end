
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxCellRendererParams extends ICellRendererParams {
  onSelectionChanged: (id: string, selected: boolean) => void;
  isSelected: (id: string) => boolean;
}

export const CheckboxCellRenderer: React.FC<CheckboxCellRendererParams> = (params) => {
  const rowId = params.data?.id?.toString() || '';
  const isChecked = params.isSelected ? params.isSelected(rowId) : false;

  const handleChange = (checked: boolean) => {
    if (params.onSelectionChanged) {
      params.onSelectionChanged(rowId, checked);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleChange}
        className="border-2 data-[state=checked]:bg-[#009933] data-[state=checked]:border-[#009933]"
      />
    </div>
  );
};
