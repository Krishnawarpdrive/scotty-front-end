
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormProgressIndicator from '../../clients/components/FormProgressIndicator';

// Import schema
import { formSchema, FormValues, CustomField } from './roleFormSchema';

// Import steps
import BasicInfoStep from './steps/BasicInfoStep';
import DetailsStep from './steps/DetailsStep';
import SkillsTagsStep from './steps/SkillsTagsStep';
import CustomFieldsStep from './steps/CustomFieldsStep';

interface RoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { toast } = useToast();
  
  const formSections = ["Basic Info", "Details", "Skills & Tags", "Custom Fields"];

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
      saveAsTemplate: false,
    },
    mode: "onChange"
  });

  // Update progress based on form completion
  useEffect(() => {
    const values = form.getValues();
    const fields = Object.keys(values);
    
    // Calculate how many fields are filled
    const filledFields = fields.filter(field => {
      const value = values[field as keyof FormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Calculate percentage
    const percentage = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(percentage);
  }, [form.watch()]);

  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < formSections.length) {
      setCurrentStep(step);
    }
  };

  const onSubmit = (values: FormValues) => {
    // Add skills and tags to the form data
    const completeData = {
      ...values,
      skills,
      tags,
      customFields
    };
    
    console.log("Form submitted:", completeData);
    
    toast({
      title: "Role created successfully",
      description: `${values.roleName} has been added to the global role library.`,
    });
    
    // Close drawer
    onOpenChange(false);
  };

  // Render appropriate step content based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={form} />;
      case 1:
        return <DetailsStep form={form} />;
      case 2:
        return <SkillsTagsStep 
                 skills={skills} 
                 setSkills={setSkills} 
                 tags={tags} 
                 setTags={setTags} 
               />;
      case 3:
        return <CustomFieldsStep 
                 form={form} 
                 customFields={customFields} 
                 setCustomFields={setCustomFields} 
               />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] max-w-[800px] sm:max-w-[600px] h-full overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl">Create New Role</SheetTitle>
          <SheetDescription>
            Add a role to the global role library that can be used across different clients.
          </SheetDescription>
        </SheetHeader>

        <FormProgressIndicator
          steps={formSections}
          currentStep={currentStep}
          onStepClick={goToStep}
          progress={formProgress}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-1 py-4">
              {renderStepContent()}
            </div>
            
            {/* Sticky footer with navigation buttons */}
            <SheetFooter className="p-4 border-t mt-auto">
              <div className="flex justify-between w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < formSections.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default RoleCreationDrawer;
