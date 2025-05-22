
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import schema
import { formSchema, FormValues, CustomField } from './roleFormSchema';

// Import steps
import BasicInfoStep from './steps/BasicInfoStep';
import DetailsStep from './steps/DetailsStep';
import SkillsTagsStep from './steps/SkillsTagsStep';
import CustomFieldsStep from './steps/CustomFieldsStep';
import SkillsSelectionStep from './steps/SkillsSelectionStep';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [roleTemplates, setRoleTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const formSections = ["Basic Info", "Details", "Skills", "Tags", "Custom Fields"];

  // Mock role templates data
  useEffect(() => {
    setRoleTemplates([
      { id: "1", name: "Software Engineer", category: "Technology", workMode: "Remote", minExperience: "2", maxExperience: "5" },
      { id: "2", name: "Product Manager", category: "Management", workMode: "Hybrid", minExperience: "3", maxExperience: "7" },
      { id: "3", name: "UX Designer", category: "Design", workMode: "Onsite", minExperience: "1", maxExperience: "4" }
    ]);
  }, []);

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
      client: clientId || "",
    },
    mode: "onChange"
  });

  // Apply role template when selected
  useEffect(() => {
    if (selectedTemplate) {
      const template = roleTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        form.setValue("roleName", template.name);
        form.setValue("roleCategory", template.category);
        form.setValue("workMode", template.workMode);
        form.setValue("minExperience", template.minExperience);
        form.setValue("maxExperience", template.maxExperience);
        // Set other template values as needed
        toast({
          title: "Template Applied",
          description: `${template.name} template has been applied. You can customize as needed.`
        });
      }
    }
  }, [selectedTemplate, roleTemplates, form, toast]);

  // Calculate form progress based on filled fields
  useEffect(() => {
    const values = form.getValues();
    const requiredFields = [
      'roleName',
      'roleCategory',
      'workMode',
      'employmentType',
      'minExperience',
      'maxExperience'
    ];
    
    // Count filled required fields
    const filledRequired = requiredFields.filter(field => {
      const value = values[field as keyof FormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Add bonus for optional fields
    let bonus = 0;
    if (values.externalName) bonus += 5;
    if (values.jobDescription) bonus += 10;
    if (selectedSkills.length > 0) bonus += 15;
    if (tags.length > 0) bonus += 10;
    if (customFields.length > 0) bonus += 10;
    
    // Calculate percentage (required fields are 60% of total, bonus fields are 40%)
    const requiredPercentage = (filledRequired / requiredFields.length) * 60;
    const totalProgress = Math.min(100, Math.floor(requiredPercentage + bonus));
    
    setFormProgress(totalProgress);
  }, [form.watch(), selectedSkills.length, tags.length, customFields.length]);

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
      skills: selectedSkills,
      tags,
      customFields,
      clientId,
      clientName
    };
    
    console.log("Form submitted:", completeData);
    
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

  // Render appropriate step content based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={form} />;
      case 1:
        return <DetailsStep form={form} />;
      case 2:
        return <SkillsSelectionStep selectedSkills={selectedSkills} onSkillsChange={setSelectedSkills} />;
      case 3:
        return <SkillsTagsStep skills={skills} setSkills={setSkills} tags={tags} setTags={setTags} />;
      case 4:
        return <CustomFieldsStep form={form} customFields={customFields} setCustomFields={setCustomFields} />;
      default:
        return null;
    }
  };

  const headerTitle = clientId 
    ? `Create New Role for ${clientName}` 
    : "Create New Role";

  const headerDescription = clientId 
    ? `Add a role specifically for ${clientName}` 
    : "Add a role to the global role library that can be used across different clients.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[70vw] max-w-[800px] h-full overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl">{headerTitle}</SheetTitle>
          <SheetDescription>
            {headerDescription}
          </SheetDescription>
          
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">
              Select from Role Library Templates (Optional)
            </label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role template" />
              </SelectTrigger>
              <SelectContent>
                {roleTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} - {template.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SheetHeader>

        <div className="my-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Form Completion: {formProgress}%</span>
            {formProgress === 100 && (
              <span className="text-sm text-green-600 font-medium animate-pulse">Ready to submit! ✨</span>
            )}
          </div>
          <Progress value={formProgress} className="h-2" />
          
          <div className="flex justify-between mt-4">
            {formSections.map((section, index) => (
              <Button 
                key={index}
                variant={currentStep === index ? "default" : "ghost"}
                size="sm"
                className={`text-xs px-2 ${currentStep === index ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => goToStep(index)}
              >
                {section}
              </Button>
            ))}
          </div>
        </div>

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
                    <Button 
                      type="submit"
                      disabled={formProgress < 60} // Require at least basic information to be filled
                      className={formProgress === 100 ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {formProgress === 100 ? "Create Role ✨" : "Create Role"}
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
