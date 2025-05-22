
import React from 'react';
import { Button } from "@/components/ui/button";

interface RoleFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const RoleFormActions: React.FC<RoleFormActionsProps> = ({ 
  isSubmitting,
  onCancel
}) => {
  return (
    <div className="flex gap-2 justify-end w-full">
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
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Saving...
          </>
        ) : 'Save Role'}
      </Button>
    </div>
  );
};

export default RoleFormActions;
