
import { useCallback } from 'react';

interface SkillsFormData {
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  toolsFrameworks: string[];
}

export const useSkillsManagement = (
  formData: SkillsFormData,
  onFieldChange: (field: string, value: any) => void
) => {
  const addSkill = useCallback((field: keyof SkillsFormData, skill: string) => {
    const currentSkills = formData[field] || [];
    if (!currentSkills.includes(skill)) {
      onFieldChange(field, [...currentSkills, skill]);
    }
  }, [formData, onFieldChange]);

  const removeSkill = useCallback((field: keyof SkillsFormData, index: number) => {
    const currentSkills = formData[field] || [];
    const updatedSkills = currentSkills.filter((_, i) => i !== index);
    onFieldChange(field, updatedSkills);
  }, [formData, onFieldChange]);

  const addCertification = useCallback((certification: string) => {
    addSkill('certifications', certification);
  }, [addSkill]);

  const removeCertification = useCallback((index: number) => {
    removeSkill('certifications', index);
  }, [removeSkill]);

  return {
    addSkill,
    removeSkill,
    addCertification,
    removeCertification
  };
};
