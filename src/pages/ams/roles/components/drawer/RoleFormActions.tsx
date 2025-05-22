
import React from 'react';
import { Button } from '@/components/ui/button';

interface RoleFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const RoleFormActions: React.FC<RoleFormActionsProps> = ({
  isSubmitting,
  onCancel
}) => {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
            Creating
          </>
        ) : (
          "Create Role"
        )}
      </Button>
    </div>
  );
};

export default RoleFormActions;
