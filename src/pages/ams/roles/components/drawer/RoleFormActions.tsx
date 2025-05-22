
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface RoleFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const RoleFormActions: React.FC<RoleFormActionsProps> = ({ 
  isSubmitting,
  onCancel
}) => {
  return (
    <div className="flex gap-2 justify-end w-full sticky bottom-0 bg-background py-3 border-t">
      <Button 
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Role
          </>
        )}
      </Button>
    </div>
  );
};

export default RoleFormActions;
