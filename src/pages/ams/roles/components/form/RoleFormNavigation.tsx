
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface RoleFormNavigationProps {
  formSections: string[];
  formProgress: {
    currentStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    goToNextStep: () => void;
    goToPrevStep: () => void;
  };
  onClose: () => void;
  isSubmitting?: boolean;
}

const RoleFormNavigation: React.FC<RoleFormNavigationProps> = ({ 
  formSections, 
  formProgress,
  onClose,
  isSubmitting = false
}) => {
  const { 
    currentStep, 
    isFirstStep, 
    isLastStep,
    goToNextStep,
    goToPrevStep
  } = formProgress;

  return (
    <div className="mt-6 border-t pt-4 flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="px-3"
      >
        Cancel
      </Button>

      <div className="flex gap-2">
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevStep}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button 
            type="submit"
            className="gap-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></div>
                Saving
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Role
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={goToNextStep}
            className="gap-1"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoleFormNavigation;
