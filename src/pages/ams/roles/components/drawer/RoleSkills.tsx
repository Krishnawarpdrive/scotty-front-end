
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from '../types/roleTypes';
import { FormLabel } from "@/components/ui/form";
import SkillsSelectionStep from '../steps/SkillsSelectionStep';

interface RoleSkillsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleSkills: React.FC<RoleSkillsProps> = ({ form }) => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  
  return (
    <div className="space-y-2">
      <FormLabel>Skills</FormLabel>
      <SkillsSelectionStep 
        selectedSkills={selectedSkills}
        onSkillsChange={setSelectedSkills}
      />
    </div>
  );
};

export default RoleSkills;
