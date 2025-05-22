
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { roleFormSchema, RoleFormValues, CustomField } from '../types/roleTypes';

export const useRoleForm = (clientId?: string, onSuccess?: (values: RoleFormValues) => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: "",
      jobTitle: "",
      department: "",
      workMode: "",
      experienceLevel: "",
      employmentType: "",
      location: "",
      salaryRange: "",
      responsibilities: "",
      requirements: "",
      primarySkills: [],
      secondarySkills: [],
      certifications: [],
      tags: [],
      customFields: [],
      saveAsTemplate: false,
    },
  });

  const calculateProgress = (values: RoleFormValues): number => {
    // Count required fields
    const requiredFields = ['roleName', 'department', 'experienceLevel', 'employmentType', 'workMode'];
    const totalRequiredFields = requiredFields.length;
    
    // Count filled required fields
    const filledRequiredFields = requiredFields.filter(field => 
      values[field as keyof RoleFormValues]
    ).length;
    
    // Calculate progress percentage
    return (filledRequiredFields / totalRequiredFields) * 100;
  };

  const onSubmit = async (values: RoleFormValues) => {
    try {
      setIsSubmitting(true);

      // Map form values to the database schema
      const roleDataToInsert = {
        name: values.roleName,
        external_name: values.jobTitle, 
        client_id: clientId,
        employment_type: values.employmentType,
        category: values.department,
        min_experience: values.experienceLevel?.split('-')[0] || "0",
        max_experience: values.experienceLevel?.split('-')[1] || "1+",
        work_mode: values.workMode,
        job_description: `${values.responsibilities || ''}\n\n${values.requirements || ''}`,
        is_template: values.saveAsTemplate,
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
      if (values.primarySkills.length > 0 || values.secondarySkills.length > 0) {
        // Handle primary skills
        const primarySkillPromises = values.primarySkills.map(async (skillName) => {
          // Check if skill exists, if not create it
          let skillId;
          
          const { data: existingSkill } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .single();
          
          if (existingSkill) {
            skillId = existingSkill.id;
          } else {
            const { data: newSkill } = await supabase
              .from('skills')
              .insert({ name: skillName, category: 'primary' })
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
        
        await Promise.all(primarySkillPromises);
        
        // Handle secondary skills - similar to primary skills
        const secondarySkillPromises = values.secondarySkills.map(async (skillName) => {
          // Similar logic as above for secondarySkills
          let skillId;
          
          const { data: existingSkill } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .single();
          
          if (existingSkill) {
            skillId = existingSkill.id;
          } else {
            const { data: newSkill } = await supabase
              .from('skills')
              .insert({ name: skillName, category: 'secondary' })
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
        
        await Promise.all(secondarySkillPromises);
      }
      
      // Handle tags
      if (values.tags.length > 0) {
        const tagPromises = values.tags.map(tagId => {
          return supabase
            .from('role_tags')
            .insert({ role_id: roleId, tag_id: tagId });
        });
        
        await Promise.all(tagPromises);
      }
      
      // Handle custom fields
      if (values.customFields.length > 0) {
        const customFieldsData = values.customFields.map(field => ({
          role_id: roleId,
          label: field.label,
          value: field.value || ''
        }));
        
        await supabase
          .from('custom_fields')
          .insert(customFieldsData);
      }

      // Notify parent component about successful role creation
      if (onSuccess) {
        onSuccess(values);
      }

      toast({
        title: "Success!",
        description: `Role ${values.roleName} has been created successfully.`,
      });

      // Reset form
      form.reset();
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

  return {
    form,
    isSubmitting,
    calculateProgress,
    onSubmit
  };
};
