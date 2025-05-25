
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { useToast } from '@/hooks/use-toast';
import { RoleFormValues } from '../types/roleTypes';
import { roleFormSchema } from '../roleFormSchema';
import RoleFormProgress from './RoleFormProgress';
import RoleStepNavigation from './RoleStepNavigation';
import BasicInfoStep from '../steps/BasicInfoStep';
import DetailsStep from '../steps/DetailsStep';
import SkillsTagsStep from '../steps/SkillsTagsStep';
import CustomFieldsStep from '../steps/CustomFieldsStep';

interface SteppedRoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleCreated?: (values: RoleFormValues) => void;
  clientId?: string;
  clientName?: string;
}

const SteppedRoleCreationDrawer: React.FC<SteppedRoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  onRoleCreated,
  clientId,
  clientName
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<any[]>([]);

  const formSections = ['Basic Info', 'Details', 'Skills & Tags', 'Custom Fields'];
  const totalSteps = formSections.length;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: '',
      externalName: '',
      roleCategory: '',
      workMode: '',
      employmentType: '',
      minExperience: 0,
      maxExperience: 10,
      jobDescription: '',
      saveAsTemplate: false
    },
    mode: 'onChange'
  });

  const watchedFields = form.watch();

  // Calculate form progress
  const calculateProgress = () => {
    const requiredFields = ['roleName', 'roleCategory', 'workMode', 'employmentType'];
    const completedFields = requiredFields.filter(field => watchedFields[field as keyof RoleFormValues]);
    
    let stepProgress = 0;
    switch (currentStep) {
      case 0: // Basic Info
        stepProgress = requiredFields.slice(0, 2).filter(field => watchedFields[field as keyof RoleFormValues]).length / 2;
        break;
      case 1: // Details
        stepProgress = requiredFields.slice(2).filter(field => watchedFields[field as keyof RoleFormValues]).length / 2;
        break;
      case 2: // Skills & Tags
        stepProgress = selectedSkills.length > 0 ? 1 : 0;
        break;
      case 3: // Custom Fields
        stepProgress = 1; // Always complete
        break;
    }
    
    const baseProgress = (currentStep / totalSteps) * 100;
    const currentStepProgress = (stepProgress / totalSteps) * 100;
    return Math.min(baseProgress + currentStepProgress, 100);
  };

  const progress = calculateProgress();

  // Check if current step is valid
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return watchedFields.roleName && watchedFields.roleCategory;
      case 1:
        return watchedFields.workMode && watchedFields.employmentType;
      case 2:
        return true; // Skills are optional
      case 3:
        return true; // Custom fields are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const formData = form.getValues();
      const roleData = {
        ...formData,
        skills: selectedSkills,
        tags: selectedTags,
        customFields,
        clientId
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Role Created Successfully",
        description: `The role "${roleData.roleName}" has been created.`
      });

      if (onRoleCreated) {
        onRoleCreated(roleData);
      }

      onOpenChange(false);
      handleReset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedSkills([]);
    setSelectedTags([]);
    setCustomFields([]);
    form.reset();
  };

  useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={form} />;
      case 1:
        return <DetailsStep form={form} />;
      case 2:
        return (
          <SkillsTagsStep
            skills={selectedSkills}
            setSkills={setSelectedSkills}
            tags={selectedTags}
            setTags={setSelectedTags}
          />
        );
      case 3:
        return (
          <CustomFieldsStep
            form={form}
            customFields={customFields}
            setCustomFields={setCustomFields}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Role"
      description={clientName ? `Creating a new role for ${clientName}` : 'Fill in the details to create a new role'}
      size="lg"
    >
      <div className="p-6">
        <RoleFormProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          formSections={formSections}
          progress={progress}
        />

        <Form {...form}>
          <div className="min-h-[400px]">
            {renderCurrentStep()}
          </div>
        </Form>

        <RoleStepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          canProceed={canProceed()}
        />
      </div>
    </SideDrawer>
  );
};

export default SteppedRoleCreationDrawer;
