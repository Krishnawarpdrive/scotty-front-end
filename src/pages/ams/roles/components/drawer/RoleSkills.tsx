
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RoleFormValues, CustomField } from '../types/roleTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import SkillSelector from '@/components/shared/SkillSelector';
import TagsInput from '@/components/shared/TagsInput';
import CustomFieldInput from './CustomFieldInput';

interface RoleSkillsProps {
  form: UseFormReturn<RoleFormValues>;
}

const RoleSkills: React.FC<RoleSkillsProps> = ({ form }) => {
  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const customFields = form.watch('customFields') || [];

  // Sync form values with local state
  useEffect(() => {
    form.setValue('primarySkills', primarySkills, { shouldValidate: true });
  }, [primarySkills, form]);
  
  useEffect(() => {
    form.setValue('secondarySkills', secondarySkills, { shouldValidate: true });
  }, [secondarySkills, form]);
  
  useEffect(() => {
    form.setValue('tags', tags, { shouldValidate: true });
  }, [tags, form]);

  const handleCustomFieldsChange = (updatedFields: CustomField[]) => {
    form.setValue('customFields', updatedFields, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Skills & Tags</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel>Primary Skills</FormLabel>
          <SkillSelector 
            selectedSkills={primarySkills}
            onSkillsChange={setPrimarySkills}
          />
        </div>
        
        <div className="space-y-2">
          <FormLabel>Secondary Skills</FormLabel>
          <SkillSelector 
            selectedSkills={secondarySkills}
            onSkillsChange={setSecondarySkills}
          />
        </div>
        
        <CustomFieldInput 
          section="skills"
          customFields={customFields}
          onFieldsChange={handleCustomFieldsChange}
        />
        
        <div className="space-y-2 pt-4 border-t">
          <FormLabel>Tags</FormLabel>
          <TagsInput 
            tags={tags}
            onTagsChange={setTags}
            placeholder="Add role-related tags"
            helpText="Press Enter to add new tags"
          />
          
          <CustomFieldInput 
            section="tags"
            customFields={customFields}
            onFieldsChange={handleCustomFieldsChange}
          />
        </div>

        <FormField
          control={form.control}
          name="saveAsTemplate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6 pt-4 border-t">
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
