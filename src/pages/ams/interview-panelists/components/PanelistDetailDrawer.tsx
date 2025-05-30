
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usePanelistDetail } from "../hooks/usePanelistDetail";
import { PanelistDetailContent } from "./PanelistDetailContent";

interface PanelistDetailDrawerProps {
  panelistId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: any) => Promise<void>;
}

export const PanelistDetailDrawer: React.FC<PanelistDetailDrawerProps> = ({
  panelistId,
  isOpen,
  onClose,
  onUpdate
}) => {
  const { panelist, isLoading, error } = usePanelistDetail(panelistId);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {panelist ? `${panelist.name} - Interview Panelist` : 'Panelist Details'}
          </SheetTitle>
        </SheetHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading panelist details...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {panelist && (
          <PanelistDetailContent 
            panelist={panelist} 
            onUpdate={onUpdate}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
