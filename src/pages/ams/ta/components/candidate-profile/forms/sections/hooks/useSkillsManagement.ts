
export const useSkillsManagement = (
  formData: any,
  onFieldChange: (field: string, value: any) => void
) => {
  const addSkill = (type: 'technicalSkills' | 'softSkills' | 'toolsFrameworks', skill: string) => {
    const currentSkills = formData[type] || [];
    onFieldChange(type, [...currentSkills, skill]);
  };

  const removeSkill = (type: 'technicalSkills' | 'softSkills' | 'toolsFrameworks', index: number) => {
    const currentSkills = formData[type] || [];
    const updatedSkills = currentSkills.filter((_, i) => i !== index);
    onFieldChange(type, updatedSkills);
  };

  const addCertification = (certification: string) => {
    const currentCerts = formData.certifications || [];
    onFieldChange('certifications', [...currentCerts, certification]);
  };

  const removeCertification = (index: number) => {
    const currentCerts = formData.certifications || [];
    const updatedCerts = currentCerts.filter((_, i) => i !== index);
    onFieldChange('certifications', updatedCerts);
  };

  return {
    addSkill,
    removeSkill,
    addCertification,
    removeCertification
  };
};
