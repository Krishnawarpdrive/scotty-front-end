
import React from 'react';
import SkillSelector from '@/components/shared/SkillSelector';

interface SkillsSelectionStepProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsSelectionStep: React.FC<SkillsSelectionStepProps> = ({
  selectedSkills,
  onSkillsChange
}) => {
  return (
    <SkillSelector 
      selectedSkills={selectedSkills} 
      onSkillsChange={onSkillsChange}
    />
  );
};

export default SkillsSelectionStep;
