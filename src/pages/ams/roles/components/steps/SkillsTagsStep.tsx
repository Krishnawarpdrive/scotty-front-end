
import React from 'react';
import TagsInput from '@/components/shared/TagsInput';

interface SkillsTagsStepProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const SkillsTagsStep: React.FC<SkillsTagsStepProps> = ({ 
  skills, 
  setSkills, 
  tags, 
  setTags 
}) => {
  return (
    <div className="space-y-6">
      <TagsInput
        tags={skills}
        onTagsChange={setSkills}
        label="Skills"
        placeholder="Add a skill"
        variant="secondary"
        emptyMessage="No skills added yet"
      />
      
      <TagsInput
        tags={tags}
        onTagsChange={setTags}
        label="Tags"
        placeholder="Add a tag"
        variant="outline"
        emptyMessage="No tags added yet"
        helpText="Tags help categorize and filter roles"
      />
    </div>
  );
};

export default SkillsTagsStep;
