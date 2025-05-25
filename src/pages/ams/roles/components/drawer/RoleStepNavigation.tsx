
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface RoleStepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canProceed: boolean;
}

const RoleStepNavigation: React.FC<RoleStepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onCancel,
  onSubmit,
  isSubmitting,
  canProceed
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center border-t pt-4 mt-6 bg-background">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      
      <div className="flex gap-2">
        {!isFirstStep && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious}
            disabled={isSubmitting}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        
        {isLastStep ? (
          <Button 
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !canProceed}
            className="gap-1"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Creating Role...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Role
              </>
            )}
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={onNext}
            disabled={!canProceed}
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

export default RoleStepNavigation;
