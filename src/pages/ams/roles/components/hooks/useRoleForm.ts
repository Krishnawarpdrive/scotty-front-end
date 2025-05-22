
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { roleFormSchema, RoleFormValues } from '../types/roleTypes';

export const useRoleForm = (clientId?: string, onSuccess?: (values: RoleFormValues) => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: "",
      jobTitle: "",
      department: "",
      experienceLevel: "",
      employmentType: "",
      location: "",
      salaryRange: "",
      responsibilities: "",
      requirements: "",
    },
  });

  const calculateProgress = (values: RoleFormValues): number => {
    const totalFields = Object.keys(values).length;
    const filledFields = Object.values(values).filter(value => !!value).length;
    return (filledFields / totalFields) * 100;
  };

  const onSubmit = async (values: RoleFormValues) => {
    try {
      setIsSubmitting(true);

      if (!clientId) {
        throw new Error("Client ID is required");
      }

      // Map form values to the database schema
      const roleData = {
        name: values.roleName,
        external_name: values.jobTitle, // using jobTitle for external_name field
        client_id: clientId,
        employment_type: values.employmentType || "Full-time", // Default to Full-time
        category: values.department || "General", // Using department as category
        min_experience: values.experienceLevel || "0 years", // Default minimum
        max_experience: values.experienceLevel || "5+ years", // Default maximum
        work_mode: "Hybrid", // Default value
        job_description: `${values.responsibilities || ''}\n\n${values.requirements || ''}`,
      };

      // Insert role into Supabase
      const { data, error } = await supabase
        .from('roles')
        .insert(roleData)
        .select()
        .single();

      if (error) throw error;

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
