
import React from 'react';
import { useRoleForm } from '../context/RoleFormContext';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

// Import steps
import BasicInfoStep from '../steps/BasicInfoStep';
import DetailsStep from '../steps/DetailsStep';
import SkillsSelectionStep from '../steps/SkillsSelectionStep';
import SkillsTagsStep from '../steps/SkillsTagsStep';
import CustomFieldsStep from '../steps/CustomFieldsStep';

interface RoleFormStepContentProps {
  form: UseFormReturn<FormValues>;
}

const RoleFormStepContent: React.FC<RoleFormStepContentProps> = ({ form }) => {
  const { 
    currentStep, 
    selectedSkills, 
    setSelectedSkills, 
    skills, 
    setSkills, 
    tags, 
    setTags, 
    customFields, 
    setCustomFields 
  } = useRoleForm();

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

  return (
    <div className="flex-1 overflow-y-auto px-1 py-4">
      {renderStepContent()}
    </div>
  );
};

export default RoleFormStepContent;
