
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from '../types/roleTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import SkillSelector from '@/components/shared/SkillSelector';
import TagsInput from '@/components/shared/TagsInput';

interface RoleSkillsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleSkills: React.FC<RoleSkillsProps> = ({ form }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Skills & Tags</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Primary & Secondary Skills</FormLabel>
          <SkillSelector 
            selectedSkills={selectedSkills}
            onChange={setSelectedSkills}
          />
        </div>
        
        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <TagsInput 
            tags={selectedTags}
            onTagsChange={setSelectedTags}
            placeholder="Add role-related tags"
            helpText="Press Enter to add new tags"
          />
        </div>

        <FormField
          control={form.control}
          name="saveAsTemplate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Save as Template</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RoleSkills;
