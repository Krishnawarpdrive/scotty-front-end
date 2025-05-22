
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../roleFormSchema';

import { useFormProgress } from '../hooks/useFormProgress';

// Step Components
import BasicInfoStep from '../steps/BasicInfoStep';
import DetailsStep from '../steps/DetailsStep';
import SkillsTagsStep from '../steps/SkillsTagsStep';
import CustomFieldsStep from '../steps/CustomFieldsStep';

interface RoleFormStepContentProps {
  form: UseFormReturn<FormValues>;
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  customFields: { id: string; label: string; value: string }[];
  setCustomFields: React.Dispatch<React.SetStateAction<{ id: string; label: string; value: string }[]>>;
}

const RoleFormStepContent: React.FC<RoleFormStepContentProps> = ({
  form,
  selectedSkills,
  setSelectedSkills,
  selectedTags,
  setSelectedTags,
  customFields,
  setCustomFields
}) => {
  const { formProgress } = useFormProgress(form);
  const { currentStep } = formProgress;

  return (
    <div className="py-4 flex-1">
      {currentStep === 0 && (
        <BasicInfoStep form={form} />
      )}

      {currentStep === 1 && (
        <DetailsStep form={form} />
      )}

      {currentStep === 2 && (
        <SkillsTagsStep
          skills={selectedSkills}
          setSkills={setSelectedSkills}
          tags={selectedTags}
          setTags={setSelectedTags}
        />
      )}

      {currentStep === 4 && (
        <CustomFieldsStep
          form={form}
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
      )}
    </div>
  );
};

export default RoleFormStepContent;
