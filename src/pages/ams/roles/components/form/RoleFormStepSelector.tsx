
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRoleForm } from '../context/RoleFormContext';

interface RoleFormStepSelectorProps {
  formSections: string[];
  formProgress: number;
}

const RoleFormStepSelector: React.FC<RoleFormStepSelectorProps> = ({
  formSections,
  formProgress
}) => {
  const { currentStep, setCurrentStep } = useRoleForm();

  const goToStep = (step: number) => {
    if (step >= 0 && step < formSections.length) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Form Completion: {formProgress}%</span>
        {formProgress === 100 && (
          <span className="text-sm text-green-600 font-medium animate-pulse">Ready to submit! ✨</span>
        )}
      </div>
      <Progress value={formProgress} className="h-2" />
      
      <div className="flex justify-between mt-4">
        {formSections.map((section, index) => (
          <Button 
            key={index}
            variant={currentStep === index ? "default" : "ghost"}
            size="sm"
            className={`text-xs px-2 ${currentStep === index ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => goToStep(index)}
          >
            {section}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RoleFormStepSelector;
