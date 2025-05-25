
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { roleFormSchema, type RoleFormValues } from '../roleFormSchema';
import BasicInfoStep from '../steps/BasicInfoStep';
import DetailsStep from '../steps/DetailsStep';
import SkillsTagsStep from '../steps/SkillsTagsStep';
import CustomFieldsStep from '../steps/CustomFieldsStep';
import { useToast } from '@/hooks/use-toast';

interface SteppedRoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRole?: any;
  clientId?: string;
  clientName?: string;
  onRoleCreated?: (values: RoleFormValues) => void;
}

const steps = [
  { id: 'basic', title: 'Basic Information', description: 'Role name, department, and basic details' },
  { id: 'details', title: 'Details', description: 'Job description, requirements, and specifications' },
  { id: 'skills', title: 'Skills & Tags', description: 'Required skills and relevant tags' },
  { id: 'final', title: 'Final Options', description: 'Review and template options' }
];

export const SteppedRoleCreationDrawer: React.FC<SteppedRoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  editingRole,
  clientId,
  clientName,
  onRoleCreated
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: '',
      jobTitle: '',
      department: '',
      workMode: '',
      employmentType: '',
      experienceLevel: '',
      location: '',
      salaryRange: '',
      responsibilities: '',
      requirements: '',
      externalName: '',
      jobDescription: '',
      roleCategory: '',
      minExperience: '',
      maxExperience: '',
      primarySkills: [],
      secondarySkills: [],
      certifications: [],
      tags: [],
      customFields: [],
      saveAsTemplate: false
    }
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 0: // Basic Info
        return values.roleName && values.department && values.workMode && values.employmentType && values.experienceLevel;
      case 1: // Details
        return true; // Details are optional
      case 2: // Skills
        return true; // Skills are optional
      case 3: // Final
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RoleFormValues) => {
    console.log('Role creation data:', {
      ...data,
      primarySkills: skills,
      tags: tags,
      customFields: customFields,
      clientId,
      clientName
    });
    
    toast({
      title: "Success!",
      description: "Role has been created successfully.",
    });
    
    if (onRoleCreated) {
      onRoleCreated(data);
    }
    
    onOpenChange(false);
    form.reset();
    setCurrentStep(0);
    setSkills([]);
    setTags([]);
    setCustomFields([]);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={form} />;
      case 1:
        return <DetailsStep form={form} />;
      case 2:
        return (
          <SkillsTagsStep 
            skills={skills}
            setSkills={setSkills}
            tags={tags}
            setTags={setTags}
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

  const footerContent = (
    <div className="flex justify-between items-center w-full">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button 
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!canProceed()}
          >
            Create Role
          </Button>
        ) : (
          <Button 
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={editingRole ? "Edit Role" : `Create New Role${clientName ? ` for ${clientName}` : ''}`}
      description={steps[currentStep].description}
      size="xl"
      footer={footerContent}
    >
      <div className="p-6 space-y-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center text-center max-w-[120px] ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 mb-2 ${
                  index < currentStep 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : index === currentStep
                      ? 'border-primary text-primary bg-background'
                      : 'border-muted-foreground/30 text-muted-foreground'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-6">
          <Form {...form}>
            <form className="space-y-6">
              {renderStepContent()}
            </form>
          </Form>
        </div>
      </div>
    </SideDrawer>
  );
};

export default SteppedRoleCreationDrawer;
