
import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';
import { useRoleForm } from '../context/RoleFormContext';

export const useFormProgress = (form: UseFormReturn<FormValues>) => {
  const { setFormProgress, selectedSkills, tags, customFields } = useRoleForm();
  const formValues = useWatch({ control: form.control });
  
  // Calculate form progress based on filled fields
  useEffect(() => {
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
      const value = formValues[field as keyof FormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Add bonus for optional fields
    let bonus = 0;
    if (formValues.externalName) bonus += 5;
    if (formValues.jobDescription) bonus += 10;
    if (selectedSkills.length > 0) bonus += 15;
    if (tags.length > 0) bonus += 10;
    if (customFields.length > 0) bonus += 10;
    
    // Calculate percentage (required fields are 60% of total, bonus fields are 40%)
    const requiredPercentage = (filledRequired / requiredFields.length) * 60;
    const totalProgress = Math.min(100, Math.floor(requiredPercentage + bonus));
    
    setFormProgress(totalProgress);
  }, [formValues, selectedSkills.length, tags.length, customFields.length, setFormProgress]);

  return { formProgress: useRoleForm().formProgress };
};
