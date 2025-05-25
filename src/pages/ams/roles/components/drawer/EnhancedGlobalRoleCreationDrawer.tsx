
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { globalRoleCreationSchema, type GlobalRoleCreationFormValues } from '../schemas/globalRoleCreationSchema';
import GlobalRoleBasicInfoStep from '../steps/GlobalRoleBasicInfoStep';
import GlobalRoleSkillsStep from '../steps/GlobalRoleSkillsStep';
import GlobalRoleCertificationsStep from '../steps/GlobalRoleCertificationsStep';
import GlobalRoleChecklistsStep from '../steps/GlobalRoleChecklistsStep';
import GlobalRoleFinalDetailsStep from '../steps/GlobalRoleFinalDetailsStep';

interface EnhancedGlobalRoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleCreated?: (role: any) => void;
}

const steps = [
  { id: 'basic', title: 'Basic Info', description: 'Role name, employment type, and basic details' },
  { id: 'skills', title: 'Skills', description: 'Required skills from skills library' },
  { id: 'certifications', title: 'Certifications', description: 'Relevant certifications from library' },
  { id: 'checklists', title: 'Checklists', description: 'Evaluation criteria and process' },
  { id: 'finalDetails', title: 'Final Details', description: 'Description, notes, and custom fields' }
];

export const EnhancedGlobalRoleCreationDrawer: React.FC<EnhancedGlobalRoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  onRoleCreated
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<GlobalRoleCreationFormValues>({
    resolver: zodResolver(globalRoleCreationSchema),
    defaultValues: {
      roleName: '',
      employmentType: '',
      workMode: '',
      experienceRange: '',
      department: '',
      skills: [],
      certifications: [],
      generalChecklists: [],
      roleChecklists: [],
      clientChecklists: [],
      roleDescription: '',
      notes: '',
      saveAsTemplate: false,
      customFields: []
    }
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 0: // Basic Info
        return values.roleName && values.employmentType && values.workMode && values.experienceRange && values.department;
      case 1: // Skills
        return values.skills.length > 0;
      case 2: // Certifications
        return true; // Optional step
      case 3: // Checklists
        return true; // Optional step
      case 4: // Final Details
        return values.roleDescription;
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

  const onSubmit = async (data: GlobalRoleCreationFormValues) => {
    try {
      setIsSubmitting(true);

      // First, ensure all skills exist in skills_library
      for (const skillName of data.skills) {
        const { data: existingSkill } = await supabase
          .from('skills_library')
          .select('id')
          .eq('name', skillName)
          .single();

        if (!existingSkill) {
          await supabase
            .from('skills_library')
            .insert({
              name: skillName,
              category: 'technical',
              role_relevance: [data.roleName]
            });
        }
      }

      // Ensure all certifications exist in certification_library
      for (const certName of data.certifications) {
        const { data: existingCert } = await supabase
          .from('certification_library')
          .select('id')
          .eq('title', certName)
          .single();

        if (!existingCert) {
          await supabase
            .from('certification_library')
            .insert({
              title: certName,
              domain: data.department,
              description: `Certification for ${data.roleName}`
            });
        }
      }

      // Ensure all checklists exist in checklist_library
      const allChecklists = [
        ...data.generalChecklists.map(item => ({ title: item, type: 'general' as const })),
        ...data.roleChecklists.map(item => ({ title: item, type: 'role_based' as const })),
        ...data.clientChecklists.map(item => ({ title: item, type: 'client_specific' as const }))
      ];

      for (const checklist of allChecklists) {
        const { data: existingChecklist } = await supabase
          .from('checklist_library')
          .select('id')
          .eq('title', checklist.title)
          .single();

        if (!existingChecklist) {
          await supabase
            .from('checklist_library')
            .insert({
              title: checklist.title,
              type: checklist.type,
              role_relevance: checklist.type === 'role_based' ? [data.roleName] : null,
              description: `Checklist item for ${data.roleName}`
            });
        }
      }

      // Create the global role entry
      const { data: globalRoleData, error: globalRoleError } = await supabase
        .from('global_roles')
        .insert({
          name: data.roleName,
          employment_type: data.employmentType,
          work_mode: data.workMode,
          experience_range: data.experienceRange,
          department: data.department,
          description: data.roleDescription,
          recommended_skills: data.skills,
          recommended_certifications: data.certifications
        })
        .select()
        .single();

      if (globalRoleError) throw globalRoleError;

      // Also create in roles table as template
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .insert({
          name: data.roleName,
          external_name: data.roleName,
          client_id: null, // Global role has no client
          employment_type: data.employmentType,
          category: data.department,
          work_mode: data.workMode,
          min_experience: data.experienceRange.split('-')[0]?.trim() || '0',
          max_experience: data.experienceRange.split('-')[1]?.trim() || '10',
          job_description: data.roleDescription,
          is_template: true, // Global roles are templates
          created_by: 'system'
        })
        .select()
        .single();

      if (roleError) throw roleError;

      // Handle skills for the role
      if (data.skills.length > 0) {
        for (const skillName of data.skills) {
          let { data: skill } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .single();

          if (!skill) {
            const { data: newSkill } = await supabase
              .from('skills')
              .insert({ name: skillName, category: 'technical' })
              .select()
              .single();
            skill = newSkill;
          }

          if (skill) {
            await supabase
              .from('role_skills')
              .insert({ role_id: roleData.id, skill_id: skill.id });
          }
        }
      }

      // Handle custom fields
      if (data.customFields.length > 0) {
        const customFieldsData = data.customFields.map(field => ({
          role_id: roleData.id,
          label: field.label,
          value: field.value || ''
        }));
        
        await supabase
          .from('custom_fields')
          .insert(customFieldsData);
      }

      toast({
        title: "Success!",
        description: `Global role "${data.roleName}" has been created and added to all libraries successfully.`,
      });

      if (onRoleCreated) {
        onRoleCreated(globalRoleData);
      }

      onOpenChange(false);
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error creating global role:', error);
      toast({
        title: 'Error',
        description: 'Failed to create global role. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <GlobalRoleBasicInfoStep form={form} />;
      case 1:
        return <GlobalRoleSkillsStep form={form} />;
      case 2:
        return <GlobalRoleCertificationsStep form={form} />;
      case 3:
        return <GlobalRoleChecklistsStep form={form} />;
      case 4:
        return <GlobalRoleFinalDetailsStep form={form} />;
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
        className="flex items-center gap-1 hover:bg-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onOpenChange(false)}
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button 
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-1 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Global Role
              </>
            )}
          </Button>
        ) : (
          <Button 
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-1 bg-primary hover:bg-primary/90"
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
      title="Create Global Role"
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

export default EnhancedGlobalRoleCreationDrawer;
