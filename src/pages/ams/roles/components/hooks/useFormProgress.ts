
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

export const useFormProgress = (form: UseFormReturn<any>) => {
  const formSteps = ['basicInfo', 'details', 'skills', 'preview', 'customFields'];
  const [currentStep, setCurrentStep] = React.useState(0);

  const formProgress = {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === formSteps.length - 1,
    goToNextStep: () => setCurrentStep(prev => Math.min(prev + 1, formSteps.length - 1)),
    goToPrevStep: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
  };

  return { formProgress };
};
