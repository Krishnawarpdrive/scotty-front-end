
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X, Plus, ChevronDown, Tag } from 'lucide-react';
import { GlobalRoleCreationFormValues } from '../schemas/globalRoleCreationSchema';
import { useRoleLibraries } from '../../../clients/components/drawer/hooks/useRoleLibraries';

interface GlobalRoleSkillsStepProps {
  form: UseFormReturn<GlobalRoleCreationFormValues>;
}

const GlobalRoleSkillsStep: React.FC<GlobalRoleSkillsStepProps> = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const { skillsLibrary, loading } = useRoleLibraries();
  const selectedSkills = form.watch('skills') || [];
  const roleName = form.watch('roleName');

  // Filter skills based on role relevance and search
  const filteredSkills = skillsLibrary.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchValue.toLowerCase());
    const isRelevant = !skill.role_relevance || skill.role_relevance.includes(roleName);
    const notSelected = !selectedSkills.includes(skill.name);
    
    return matchesSearch && isRelevant && notSelected;
  });

  const addSkill = (skillName: string) => {
    if (skillName && !selectedSkills.includes(skillName)) {
      form.setValue('skills', [...selectedSkills, skillName]);
    }
    setSearchValue('');
    setOpen(false);
  };

  const removeSkill = (skillName: string) => {
    form.setValue('skills', selectedSkills.filter(skill => skill !== skillName));
  };

  const addCustomSkill = () => {
    if (searchValue && !selectedSkills.includes(searchValue)) {
      addSkill(searchValue);
    }
  };

  // Get suggested skills based on role
  const suggestedSkills = skillsLibrary.filter(skill => 
    skill.role_relevance?.includes(roleName) && !selectedSkills.includes(skill.name)
  ).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Required Skills</h3>
          <p className="text-sm text-muted-foreground">
            Add skills required for this role. We've suggested some based on the role type.
          </p>
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills *</FormLabel>
              <div className="space-y-3">
                {/* Skill Input */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between text-left font-normal"
                      >
                        {searchValue || "Search skills or add custom..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command shouldFilter={false}>
                      <CommandInput 
                        placeholder="Search skills..." 
                        value={searchValue}
                        onValueChange={setSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {loading ? (
                            <div className="p-4 text-center">Loading skills...</div>
                          ) : skillsLibrary.length === 0 ? (
                            <div className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-2">
                                No skills found in library.
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Add skills to the skills library first.
                              </p>
                            </div>
                          ) : searchValue ? (
                            <div className="p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-2">
                                Skill "{searchValue}" not found in library.
                              </p>
                              <Button 
                                size="sm" 
                                onClick={addCustomSkill}
                                className="flex items-center gap-1"
                              >
                                <Plus className="h-3 w-3" />
                                Add "{searchValue}"
                              </Button>
                            </div>
                          ) : null}
                        </CommandEmpty>
                        <CommandGroup>
                          {filteredSkills.map((skill) => (
                            <CommandItem
                              key={skill.id}
                              onSelect={() => addSkill(skill.name)}
                              className="flex items-center justify-between p-3"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {skill.category}
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {skill.category}
                              </Badge>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected Skills with greyscale styling */}
                {selectedSkills.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selected Skills ({selectedSkills.length})</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} className="flex items-center gap-1 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200">
                          <Tag className="h-3 w-3" />
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-destructive ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Skills */}
                {suggestedSkills.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Suggested for {roleName}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <Button
                          key={skill.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill.name)}
                          className="h-8 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skill.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GlobalRoleSkillsStep;
