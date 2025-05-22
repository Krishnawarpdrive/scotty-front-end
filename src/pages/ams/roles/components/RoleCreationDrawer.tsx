
import React, { useState } from 'react';
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Form } from "@/components/ui/form";

// Import schema
import { formSchema, FormValues } from './roleFormSchema';

// Import refactored components
import { RoleFormProvider } from './context/RoleFormContext';
import { useRoleTemplates } from './hooks/useRoleTemplates';
import { useFormProgress } from './hooks/useFormProgress';
import RoleFormNavigation from './form/RoleFormNavigation';
import RoleFormStepSelector from './form/RoleFormStepSelector';
import RoleTemplateSelector from './form/RoleTemplateSelector';
import RoleFormStepContent from './form/RoleFormStepContent';

interface RoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
  clientName?: string;
  onRoleCreated?: (role: any) => void;
}

export const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  clientId,
  clientName,
  onRoleCreated
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSections = ["Basic Info", "Details", "Skills", "Tags", "Custom Fields"];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
      externalName: "",
      roleCategory: "",
      workMode: "",
      employmentType: "",
      minExperience: "",
      maxExperience: "",
      jobDescription: "",
      saveAsTemplate: false
    },
    mode: "onChange"
  });

  const { roleTemplates, selectedTemplate, setSelectedTemplate } = useRoleTemplates(form);

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<{ id: string; label: string; value: string; }[]>([]);

  const headerTitle = clientId 
    ? `Create New Role for ${clientName}` 
    : "Create New Role";

  const headerDescription = clientId 
    ? `Add a role specifically for ${clientName}` 
    : "Add a role to the global role library that can be used across different clients.";

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // First, insert the role
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .insert([
          {
            name: values.roleName,
            external_name: values.externalName || null,
            category: values.roleCategory,
            work_mode: values.workMode,
            employment_type: values.employmentType,
            min_experience: values.minExperience,
            max_experience: values.maxExperience,
            job_description: values.jobDescription || null,
            is_template: values.saveAsTemplate,
            client_id: clientId || null,
            created_by: 'Current User', // Replace with actual user name when auth is implemented
          }
        ])
        .select();

      if (roleError) throw roleError;
      
      const roleId = roleData[0].id;
      
      // Add skills relationships if there are any selected skills
      if (selectedSkills.length > 0) {
        const skillRelations = selectedSkills.map(skillId => ({
          role_id: roleId,
          skill_id: skillId
        }));
        
        const { error: skillsError } = await supabase
          .from('role_skills')
          .insert(skillRelations);
          
        if (skillsError) throw skillsError;
      }
      
      // Add tags relationships if there are any selected tags
      if (selectedTags.length > 0) {
        const tagRelations = selectedTags.map(tagId => ({
          role_id: roleId,
          tag_id: tagId
        }));
        
        const { error: tagsError } = await supabase
          .from('role_tags')
          .insert(tagRelations);
          
        if (tagsError) throw tagsError;
      }
      
      // Add custom fields if any
      if (customFields.length > 0) {
        const customFieldsData = customFields.map(field => ({
          role_id: roleId,
          label: field.label,
          value: field.value
        }));
        
        const { error: customFieldsError } = await supabase
          .from('custom_fields')
          .insert(customFieldsData);
          
        if (customFieldsError) throw customFieldsError;
      }
      
      toast({
        title: "Role created successfully",
        description: `${values.roleName} has been added to ${clientName || "the global role library"}.`,
      });
      
      // Trigger the callback if provided
      if (onRoleCreated) {
        onRoleCreated(roleData[0]);
      }
      
      // Close drawer and navigate if appropriate
      onOpenChange(false);
      
      if (clientId) {
        navigate(`/ams/clients/${clientId}`, { 
          state: { 
            fromRoleCreation: true,
            clientName
          } 
        });
      } else {
        navigate("/ams/roles");
      }
    } catch (error) {
      console.error('Error creating role:', error);
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RoleFormProvider clientId={clientId} clientName={clientName}>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[70vw] max-w-[800px] h-full overflow-y-auto">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl">{headerTitle}</SheetTitle>
            <SheetDescription>
              {headerDescription}
            </SheetDescription>
            
            <RoleTemplateSelector 
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              roleTemplates={roleTemplates}
            />
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <RoleFormStepSelectorWithProgress 
                form={form} 
                formSections={formSections} 
              />
              
              <RoleFormStepContent 
                form={form} 
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                customFields={customFields}
                setCustomFields={setCustomFields}
              />
              
              <RoleFormNavigationWithProgress 
                form={form}
                formSections={formSections}
                onClose={() => onOpenChange(false)}
                isSubmitting={isSubmitting}
              />
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </RoleFormProvider>
  );
};

// Helper component to inject form progress to StepSelector
const RoleFormStepSelectorWithProgress: React.FC<{
  form: UseFormReturn<FormValues>;
  formSections: string[];
}> = ({ form, formSections }) => {
  const { formProgress } = useFormProgress(form);
  return <RoleFormStepSelector formSections={formSections} formProgress={formProgress} />;
};

// Helper component to inject form progress to Navigation
const RoleFormNavigationWithProgress: React.FC<{
  form: UseFormReturn<FormValues>;
  formSections: string[];
  onClose: () => void;
  isSubmitting: boolean;
}> = ({ form, formSections, onClose, isSubmitting }) => {
  const { formProgress } = useFormProgress(form);
  return (
    <RoleFormNavigation 
      formSections={formSections} 
      onClose={onClose} 
      formProgress={formProgress}
      isSubmitting={isSubmitting}
    />
  );
};

export default RoleCreationDrawer;
