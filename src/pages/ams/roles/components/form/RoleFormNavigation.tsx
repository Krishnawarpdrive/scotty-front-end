
import React from 'react';
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { useRoleForm } from '../context/RoleFormContext';

interface RoleFormNavigationProps {
  formSections: string[];
  onClose: () => void;
  formProgress: number;
}

const RoleFormNavigation: React.FC<RoleFormNavigationProps> = ({
  formSections,
  onClose,
  formProgress
}) => {
  const { currentStep, setCurrentStep } = useRoleForm();

  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SheetFooter className="p-4 border-t mt-auto">
      <div className="flex justify-between w-full">
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
              onClick={prevStep}
            >
              Previous
            </Button>
          )}
          
          {currentStep < formSections.length - 1 ? (
            <Button 
              type="button" 
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={formProgress < 60} // Require at least basic information to be filled
              className={formProgress === 100 ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {formProgress === 100 ? "Create Role ✨" : "Create Role"}
            </Button>
          )}
        </div>
      </div>
    </SheetFooter>
  );
};

export default RoleFormNavigation;
