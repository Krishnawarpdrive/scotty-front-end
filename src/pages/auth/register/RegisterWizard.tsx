
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRegistrationWizard } from './hooks/useRegistrationWizard';
import { RegistrationStep } from '@/types/RegistrationTypes';

// Step components
import PersonalInfoStep from './steps/PersonalInfoStep';
import ExperienceSourceStep from './steps/ExperienceSourceStep';
import LinkedInIntegrationStep from './steps/LinkedInIntegrationStep';
import ManualExperienceStep from './steps/ManualExperienceStep';
import RoleQuestionsStep from './steps/RoleQuestionsStep';
import ProfileSummaryStep from './steps/ProfileSummaryStep';
import CompletionStep from './steps/CompletionStep';

const RegisterWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    progress,
    steps,
    nextStep,
    previousStep,
    updateFormData,
    saveProgress,
    isStepValid,
    completeRegistration
  } = useRegistrationWizard();

  const [isLoading, setIsLoading] = useState(false);

  const registrationSteps: RegistrationStep[] = [
    {
      id: 1,
      name: 'personal-info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: PersonalInfoStep,
      isCompleted: steps.includes(1)
    },
    {
      id: 2,
      name: 'experience-source',
      title: 'Experience Source',
      description: 'How would you like to add your experience?',
      component: ExperienceSourceStep,
      isCompleted: steps.includes(2)
    },
    {
      id: 3,
      name: 'linkedin-integration',
      title: 'LinkedIn Integration',
      description: 'Connect your LinkedIn profile',
      component: LinkedInIntegrationStep,
      isCompleted: steps.includes(3),
      isOptional: formData.experienceSource !== 'linkedin'
    },
    {
      id: 4,
      name: 'manual-experience',
      title: 'Work Experience',
      description: 'Add your work experience manually',
      component: ManualExperienceStep,
      isCompleted: steps.includes(4),
      isOptional: formData.experienceSource === 'linkedin'
    },
    {
      id: 5,
      name: 'role-questions',
      title: 'Role Preferences',
      description: 'Help us understand your role preferences',
      component: RoleQuestionsStep,
      isCompleted: steps.includes(5)
    },
    {
      id: 6,
      name: 'profile-summary',
      title: 'Profile Summary',
      description: 'Review and confirm your information',
      component: ProfileSummaryStep,
      isCompleted: steps.includes(6)
    },
    {
      id: 7,
      name: 'completion',
      title: 'Complete Registration',
      description: 'Finalize your account setup',
      component: CompletionStep,
      isCompleted: steps.includes(7)
    }
  ];

  const currentStepData = registrationSteps.find(step => step.id === currentStep);
  const StepComponent = currentStepData?.component;

  const handleNext = async () => {
    if (!isStepValid(currentStep)) return;
    
    setIsLoading(true);
    try {
      await saveProgress();
      if (currentStep === registrationSteps.length) {
        await completeRegistration();
        navigate('/dashboard');
      } else {
        nextStep();
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      previousStep();
    }
  };

  // Skip optional steps if not applicable
  const getNextStep = () => {
    const nextStepIndex = registrationSteps.findIndex(step => step.id === currentStep + 1);
    const nextStepData = registrationSteps[nextStepIndex];
    
    if (nextStepData?.isOptional) {
      return currentStep + 2;
    }
    return currentStep + 1;
  };

  const isLastStep = currentStep === registrationSteps.length;
  const canProceed = isStepValid(currentStep);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Account Registration</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {registrationSteps.length}
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="mt-2 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              {currentStepData?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentStepData?.description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {StepComponent && (
              <StepComponent
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              'Processing...'
            ) : isLastStep ? (
              'Complete Registration'
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWizard;
