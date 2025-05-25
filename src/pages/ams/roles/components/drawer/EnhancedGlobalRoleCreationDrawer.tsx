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
    console.log('Starting global role creation with data:', data);
    
    try {
      setIsSubmitting(true);

      // Step 1: Create skills in skills_library if they don't exist
      console.log('Creating skills in library...');
      for (const skillName of data.skills) {
        const { data: existingSkill, error: skillCheckError } = await supabase
          .from('skills_library')
          .select('id')
          .eq('name', skillName)
          .maybeSingle();

        if (skillCheckError) {
          console.error('Error checking skill:', skillCheckError);
          continue;
        }

        if (!existingSkill) {
          console.log(`Creating new skill: ${skillName}`);
          const { error: skillCreateError } = await supabase
            .from('skills_library')
            .insert({
              name: skillName,
              category: 'technical',
              role_relevance: [data.roleName]
            });

          if (skillCreateError) {
            console.error('Error creating skill:', skillCreateError);
          }
        } else {
          // Update role_relevance if skill exists
          const { data: skillData } = await supabase
            .from('skills_library')
            .select('role_relevance')
            .eq('id', existingSkill.id)
            .single();

          if (skillData) {
            const currentRelevance = skillData.role_relevance || [];
            if (!currentRelevance.includes(data.roleName)) {
              await supabase
                .from('skills_library')
                .update({
                  role_relevance: [...currentRelevance, data.roleName]
                })
                .eq('id', existingSkill.id);
            }
          }
        }
      }

      // Step 2: Create certifications in certification_library if they don't exist
      console.log('Creating certifications in library...');
      for (const certName of data.certifications) {
        const { data: existingCert, error: certCheckError } = await supabase
          .from('certification_library')
          .select('id')
          .eq('title', certName)
          .maybeSingle();

        if (certCheckError) {
          console.error('Error checking certification:', certCheckError);
          continue;
        }

        if (!existingCert) {
          console.log(`Creating new certification: ${certName}`);
          const { error: certCreateError } = await supabase
            .from('certification_library')
            .insert({
              title: certName,
              domain: data.department,
              description: `Certification for ${data.roleName}`,
              validity_period: '3 years'
            });

          if (certCreateError) {
            console.error('Error creating certification:', certCreateError);
          }
        }
      }

      // Step 3: Create checklists in checklist_library if they don't exist
      console.log('Creating checklists in library...');
      const allChecklists = [
        ...data.generalChecklists.map(item => ({ title: item, type: 'general' as const })),
        ...data.roleChecklists.map(item => ({ title: item, type: 'role_based' as const })),
        ...data.clientChecklists.map(item => ({ title: item, type: 'client_specific' as const }))
      ];

      for (const checklist of allChecklists) {
        const { data: existingChecklist, error: checklistCheckError } = await supabase
          .from('checklist_library')
          .select('id')
          .eq('title', checklist.title)
          .maybeSingle();

        if (checklistCheckError) {
          console.error('Error checking checklist:', checklistCheckError);
          continue;
        }

        if (!existingChecklist) {
          console.log(`Creating new checklist: ${checklist.title}`);
          const { error: checklistCreateError } = await supabase
            .from('checklist_library')
            .insert({
              title: checklist.title,
              type: checklist.type,
              role_relevance: checklist.type === 'role_based' ? [data.roleName] : null,
              description: `Checklist item for ${data.roleName}`
            });

          if (checklistCreateError) {
            console.error('Error creating checklist:', checklistCreateError);
          }
        }
      }

      // Step 4: Create the global role entry
      console.log('Creating global role...');
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

      if (globalRoleError) {
        console.error('Error creating global role:', globalRoleError);
        throw new Error(`Failed to create global role: ${globalRoleError.message}`);
      }

      console.log('Global role created successfully:', globalRoleData);

      // Step 5: Also create in roles table as template
      console.log('Creating role template...');
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

      if (roleError) {
        console.error('Error creating role template:', roleError);
        throw new Error(`Failed to create role template: ${roleError.message}`);
      }

      console.log('Role template created successfully:', roleData);

      // Step 6: Handle skills for the role template
      if (data.skills.length > 0) {
        console.log('Linking skills to role...');
        for (const skillName of data.skills) {
          let { data: skill, error: skillFindError } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .maybeSingle();

          if (skillFindError) {
            console.error('Error finding skill:', skillFindError);
            continue;
          }

          if (!skill) {
            console.log(`Creating skill in skills table: ${skillName}`);
            const { data: newSkill, error: skillCreateError } = await supabase
              .from('skills')
              .insert({ 
                name: skillName, 
                category: 'technical',
                popularity: 1
              })
              .select()
              .single();

            if (skillCreateError) {
              console.error('Error creating skill in skills table:', skillCreateError);
              continue;
            }
            skill = newSkill;
          }

          if (skill) {
            const { error: linkError } = await supabase
              .from('role_skills')
              .insert({ 
                role_id: roleData.id, 
                skill_id: skill.id 
              });

            if (linkError) {
              console.error('Error linking skill to role:', linkError);
            }
          }
        }
      }

      // Step 7: Handle custom fields
      if (data.customFields.length > 0) {
        console.log('Creating custom fields...');
        const customFieldsData = data.customFields.map(field => ({
          role_id: roleData.id,
          label: field.label,
          value: field.value || ''
        }));
        
        const { error: customFieldsError } = await supabase
          .from('custom_fields')
          .insert(customFieldsData);

        if (customFieldsError) {
          console.error('Error creating custom fields:', customFieldsError);
        }
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
      console.error('Detailed error in global role creation:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create global role. Please try again.',
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
