
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { roleFormSchema, type RoleFormValues } from '../roleFormSchema';
import BasicInfoStep from '../steps/BasicInfoStep';
import DetailsStep from '../steps/DetailsStep';
import SkillsTagsStep from '../steps/SkillsTagsStep';
import CustomFieldsStep from '../steps/CustomFieldsStep';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SteppedRoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRole?: any;
  clientId?: string;
  clientName?: string;
  globalRoleTemplate?: any;
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
  globalRoleTemplate,
  onRoleCreated
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Default values based on global role template or editing role
  const getDefaultValues = () => {
    if (globalRoleTemplate) {
      return {
        roleName: globalRoleTemplate.name,
        jobTitle: globalRoleTemplate.name,
        department: globalRoleTemplate.department,
        workMode: globalRoleTemplate.work_mode,
        employmentType: globalRoleTemplate.employment_type,
        experienceLevel: globalRoleTemplate.experience_range,
        location: '',
        salaryRange: '',
        responsibilities: globalRoleTemplate.description || '',
        requirements: globalRoleTemplate.description || '',
        externalName: globalRoleTemplate.name,
        jobDescription: globalRoleTemplate.description || '',
        roleCategory: globalRoleTemplate.department,
        minExperience: globalRoleTemplate.experience_range?.split('-')[0] || '',
        maxExperience: globalRoleTemplate.experience_range?.split('-')[1] || '',
        primarySkills: globalRoleTemplate.recommended_skills || [],
        secondarySkills: [],
        certifications: globalRoleTemplate.recommended_certifications || [],
        tags: [],
        customFields: [],
        saveAsTemplate: false
      };
    }
    
    if (editingRole) {
      return {
        roleName: editingRole.name,
        jobTitle: editingRole.external_name || editingRole.name,
        department: editingRole.category,
        workMode: editingRole.work_mode,
        employmentType: editingRole.employment_type,
        experienceLevel: `${editingRole.min_experience}-${editingRole.max_experience}`,
        location: '',
        salaryRange: '',
        responsibilities: editingRole.job_description || '',
        requirements: editingRole.job_description || '',
        externalName: editingRole.external_name || editingRole.name,
        jobDescription: editingRole.job_description || '',
        roleCategory: editingRole.category,
        minExperience: editingRole.min_experience,
        maxExperience: editingRole.max_experience,
        primarySkills: [],
        secondarySkills: [],
        certifications: [],
        tags: [],
        customFields: [],
        saveAsTemplate: false
      };
    }

    return {
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
    };
  };

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: getDefaultValues()
  });

  // Reset form when template changes or drawer opens
  useEffect(() => {
    if (open) {
      const defaultValues = getDefaultValues();
      form.reset(defaultValues);
      if (globalRoleTemplate) {
        setSkills(globalRoleTemplate.recommended_skills || []);
      }
      setCurrentStep(0);
    }
  }, [open, globalRoleTemplate, editingRole]);

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

  const onSubmit = async (data: RoleFormValues) => {
    try {
      setIsSubmitting(true);

      // Map form values to the database schema
      const roleDataToInsert = {
        name: data.roleName,
        external_name: data.jobTitle || data.roleName, 
        client_id: clientId,
        employment_type: data.employmentType,
        category: data.department,
        min_experience: data.experienceLevel?.split('-')[0] || "0",
        max_experience: data.experienceLevel?.split('-')[1] || "1+",
        work_mode: data.workMode,
        job_description: `${data.responsibilities || ''}\n\n${data.requirements || ''}`,
        is_template: data.saveAsTemplate,
        template_id: globalRoleTemplate?.id || null,
        source_type: globalRoleTemplate ? 'global_template' : 'custom',
      };

      // Insert role into Supabase
      const { data: insertedRole, error: roleError } = await supabase
        .from('roles')
        .insert(roleDataToInsert)
        .select()
        .single();

      if (roleError) throw roleError;
      
      const roleId = insertedRole.id;
      
      // Insert skills relationships
      if (skills.length > 0) {
        const skillPromises = skills.map(async (skillName) => {
          // Check if skill exists, if not create it
          let skillId;
          
          const { data: existingSkill } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .maybeSingle();
          
          if (existingSkill) {
            skillId = existingSkill.id;
          } else {
            const { data: newSkill } = await supabase
              .from('skills')
              .insert({ name: skillName, category: 'technical' })
              .select()
              .single();
              
            if (newSkill) skillId = newSkill.id;
          }
          
          if (skillId) {
            // Create relationship
            return supabase
              .from('role_skills')
              .insert({ role_id: roleId, skill_id: skillId });
          }
          
          return Promise.resolve();
        });
        
        await Promise.all(skillPromises);
      }
      
      // Handle tags
      if (tags.length > 0) {
        const tagPromises = tags.map(tagId => {
          return supabase
            .from('role_tags')
            .insert({ role_id: roleId, tag_id: tagId });
        });
        
        await Promise.all(tagPromises);
      }
      
      // Handle custom fields
      if (customFields.length > 0) {
        const customFieldsData = customFields.map(field => ({
          role_id: roleId,
          label: field.label,
          value: field.value || ''
        }));
        
        await supabase
          .from('custom_fields')
          .insert(customFieldsData);
      }

      // Notify parent component about successful role creation
      if (onRoleCreated) {
        onRoleCreated(data);
      }

      toast({
        title: "Success!",
        description: `Role ${data.roleName} has been created successfully.`,
      });

      // Reset form and close drawer
      form.reset();
      setCurrentStep(0);
      setSkills([]);
      setTags([]);
      setCustomFields([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating role:", error);
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Creating...' : (editingRole ? 'Update Role' : 'Create Role')}
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

  const getDescriptionContent = () => {
    const descriptionParts = [
      <p key="main">{steps[currentStep].description}</p>
    ];
    
    if (globalRoleTemplate) {
      descriptionParts.push(
        <div key="template" className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Template: {globalRoleTemplate.name}
          </Badge>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {descriptionParts}
      </div>
    );
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={editingRole ? "Edit Role" : `Create New Role${clientName ? ` for ${clientName}` : ''}`}
      description={getDescriptionContent()}
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
