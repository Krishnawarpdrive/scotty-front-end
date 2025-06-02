
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePanelistForm } from "./hooks/usePanelistForm";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { ProfessionalInfoSection } from "./form-sections/ProfessionalInfoSection";

interface PanelistCreationDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PanelistCreationDrawer: React.FC<PanelistCreationDrawerProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const { formData, loading, setLoading, resetForm, updateFormData } = usePanelistForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      // Error handling is done in the onSuccess function
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Panelist</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <BasicInfoSection formData={formData} onUpdate={updateFormData} />
          <ProfessionalInfoSection formData={formData} onUpdate={updateFormData} />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Panelist"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
