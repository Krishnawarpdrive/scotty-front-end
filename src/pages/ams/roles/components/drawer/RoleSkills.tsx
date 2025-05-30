
import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import TagsInput from "@/components/shared/TagsInput";

export const RoleSkills: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const skills = watch("skills") || [];

  const handleSkillsChange = (newSkills: string[]) => {
    setValue("skills", newSkills, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="skills">Required Skills</Label>
        <TagsInput
          tags={skills}
          onTagsChange={handleSkillsChange}
          placeholder="Add required skills..."
        />
        <p className="text-sm text-muted-foreground">
          Enter the key skills required for this role. Press Enter or comma to add each skill.
        </p>
      </div>
    </div>
  );
};
