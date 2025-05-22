import React from 'react';
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
}

export const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange,
  clientId,
  clientName
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  const headerTitle = clientId 
    ? `Create New Role for ${clientName}` 
    : "Create New Role";

  const headerDescription = clientId 
    ? `Add a role specifically for ${clientName}` 
    : "Add a role to the global role library that can be used across different clients.";

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    
    toast({
      title: "Role created successfully",
      description: `${values.roleName} has been added to ${clientName || "the global role library"}.`,
    });
    
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
              
              <RoleFormStepContent form={form} />
              
              <RoleFormNavigationWithProgress 
                form={form}
                formSections={formSections}
                onClose={() => onOpenChange(false)}
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
}> = ({ form, formSections, onClose }) => {
  const { formProgress } = useFormProgress(form);
  return (
    <RoleFormNavigation 
      formSections={formSections} 
      onClose={onClose} 
      formProgress={formProgress}
    />
  );
};

export default RoleCreationDrawer;
