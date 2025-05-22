
import React from 'react';
import { Button } from "@/components/ui/button";

interface ClientDrawerNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  isSubmitting: boolean;
  isLastStep: boolean;
}

const ClientDrawerNavigation: React.FC<ClientDrawerNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onClose,
  isSubmitting,
  isLastStep
}) => {
  return (
    <div className="flex justify-between items-center border-t pt-4 mt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
      >
        Cancel
      </Button>
      
      <div className="flex space-x-2">
        {currentStep > 0 && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious}
          >
            Previous
          </Button>
        )}
        
        {!isLastStep ? (
          <Button 
            type="button" 
            onClick={onNext}
          >
            Next
          </Button>
        ) : (
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></div>
                Creating...
              </>
            ) : (
              'Create Client'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientDrawerNavigation;
