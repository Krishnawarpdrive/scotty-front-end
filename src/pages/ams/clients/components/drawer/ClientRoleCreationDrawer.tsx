
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { roleCreationSchema, type RoleCreationFormValues } from './schemas/roleCreationSchema';
import EnhancedRoleNameStep from './steps/EnhancedRoleNameStep';
import EnhancedSkillsStep from './steps/EnhancedSkillsStep';
import EnhancedCertificationsStep from './steps/EnhancedCertificationsStep';
import EnhancedChecklistsStep from './steps/EnhancedChecklistsStep';
import FinalDetailsStep from './steps/FinalDetailsStep';

interface ClientRoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
  onRoleCreated?: (role: any) => void;
}

const steps = [
  { id: 'roleName', title: 'Role Name', description: 'Select or suggest a role name from our global library' },
  { id: 'skills', title: 'Skills', description: 'Add required skills with auto-suggestions' },
  { id: 'certifications', title: 'Certifications', description: 'Select relevant certifications from library' },
  { id: 'checklists', title: 'Checklists', description: 'Configure evaluation criteria and process' },
  { id: 'finalDetails', title: 'Final Details', description: 'Complete role configuration and review' }
];

export const ClientRoleCreationDrawer: React.FC<ClientRoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  clientId,
  clientName,
  onRoleCreated
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RoleCreationFormValues>({
    resolver: zodResolver(roleCreationSchema),
    defaultValues: {
      roleName: '',
      isFromLibrary: false,
      libraryRoleId: '',
      employmentType: '',
      workMode: '',
      experienceRange: '',
      department: '',
      skills: [],
      certifications: [],
      generalChecklists: [],
      roleChecklists: [],
      clientChecklists: [],
      vacancies: 1,
      targetDeadline: undefined,
      budget: '',
      roleDescription: '',
      notes: '',
      saveAsTemplate: false
    }
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 0: // Role Name
        return values.roleName && values.employmentType && values.workMode && values.experienceRange;
      case 1: // Skills
        return values.skills.length > 0;
      case 2: // Certifications
        return true; // Optional step
      case 3: // Checklists
        return true; // Optional step
      case 4: // Final Details
        return values.vacancies > 0 && values.roleDescription;
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

  const onSubmit = async (data: RoleCreationFormValues) => {
    try {
      setIsSubmitting(true);

      // Create the role
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .insert({
          name: data.roleName,
          external_name: data.roleName,
          client_id: clientId,
          employment_type: data.employmentType,
          category: data.department || 'General',
          work_mode: data.workMode,
          min_experience: data.experienceRange.split('-')[0]?.trim() || '0',
          max_experience: data.experienceRange.split('-')[1]?.trim() || '10',
          job_description: data.roleDescription,
          is_template: data.saveAsTemplate,
          created_by: 'current_user' // Replace with actual user ID
        })
        .select()
        .single();

      if (roleError) throw roleError;

      // Handle skills
      if (data.skills.length > 0) {
        for (const skillName of data.skills) {
          // Check if skill exists
          let { data: skill } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .single();

          if (!skill) {
            // Create new skill
            const { data: newSkill } = await supabase
              .from('skills')
              .insert({ name: skillName, category: 'technical' })
              .select()
              .single();
            skill = newSkill;
          }

          if (skill) {
            // Link skill to role
            await supabase
              .from('role_skills')
              .insert({ role_id: roleData.id, skill_id: skill.id });
          }
        }
      }

      toast({
        title: "Success!",
        description: `Role "${data.roleName}" has been created successfully for ${clientName}.`,
      });

      if (onRoleCreated) {
        onRoleCreated(roleData);
      }

      onOpenChange(false);
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error creating role:', error);
      toast({
        title: 'Error',
        description: 'Failed to create role. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <EnhancedRoleNameStep form={form} />;
      case 1:
        return <EnhancedSkillsStep form={form} />;
      case 2:
        return <EnhancedCertificationsStep form={form} />;
      case 3:
        return <EnhancedChecklistsStep form={form} />;
      case 4:
        return <FinalDetailsStep form={form} clientName={clientName} />;
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
          <div className="flex gap-2">
            {form.watch('saveAsTemplate') && (
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  form.setValue('saveAsTemplate', true);
                  form.handleSubmit(onSubmit)();
                }}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-1"
              >
                <File className="h-4 w-4" />
                Save as Template
              </Button>
            )}
            <Button 
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Role
                </>
              )}
            </Button>
          </div>
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
      title={`Create New Role for ${clientName}`}
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

export default ClientRoleCreationDrawer;
