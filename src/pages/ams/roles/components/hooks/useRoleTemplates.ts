
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';
import { useToast } from '@/hooks/use-toast';

interface RoleTemplate {
  id: string;
  name: string;
  category: string;
  workMode: string;
  minExperience: string;
  maxExperience: string;
}

export const useRoleTemplates = (form: UseFormReturn<FormValues>) => {
  const [roleTemplates, setRoleTemplates] = useState<RoleTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();

  // Mock role templates data
  useEffect(() => {
    setRoleTemplates([
      { id: "1", name: "Software Engineer", category: "Technology", workMode: "Remote", minExperience: "2", maxExperience: "5" },
      { id: "2", name: "Product Manager", category: "Management", workMode: "Hybrid", minExperience: "3", maxExperience: "7" },
      { id: "3", name: "UX Designer", category: "Design", workMode: "Onsite", minExperience: "1", maxExperience: "4" }
    ]);
  }, []);

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

  return { roleTemplates, selectedTemplate, setSelectedTemplate };
};
