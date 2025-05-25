
import React, { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Lightbulb, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleCreationFormValues } from '../schemas/roleCreationSchema';
import { useRoleLibraries, GlobalRole } from '../hooks/useRoleLibraries';

interface EnhancedRoleNameStepProps {
  form: UseFormReturn<RoleCreationFormValues>;
}

const employmentTypes = ['Full-time', 'Contract', 'Internship'];
const workModes = ['Remote', 'Hybrid', 'Onsite'];
const experienceRanges = ['0-1 years', '1-3 years', '2-5 years', '3-7 years', '5-10 years', '10+ years'];
const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'HR'];

const EnhancedRoleNameStep: React.FC<EnhancedRoleNameStepProps> = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGlobalRole, setSelectedGlobalRole] = useState<GlobalRole | null>(null);
  
  const { globalRoles, loading, searchGlobalRoles } = useRoleLibraries();

  const watchedRoleName = form.watch('roleName');
  const isFromLibrary = form.watch('isFromLibrary');

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue && searchValue.length >= 2) {
        searchGlobalRoles(searchValue);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, searchGlobalRoles]);

  const handleRoleSelect = (role: GlobalRole) => {
    setSelectedGlobalRole(role);
    form.setValue('roleName', role.name);
    form.setValue('isFromLibrary', true);
    form.setValue('libraryRoleId', role.id);
    form.setValue('employmentType', role.employment_type);
    form.setValue('workMode', role.work_mode);
    form.setValue('experienceRange', role.experience_range);
    form.setValue('department', role.department);
    
    // Auto-populate recommended skills
    if (role.recommended_skills) {
      form.setValue('skills', role.recommended_skills);
    }
    
    // Auto-populate role description
    if (role.description) {
      form.setValue('roleDescription', role.description);
    }
    
    setOpen(false);
    setSearchValue('');
  };

  const handleCustomRole = () => {
    setSelectedGlobalRole(null);
    form.setValue('isFromLibrary', false);
    form.setValue('libraryRoleId', '');
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    form.setValue('roleName', value);
    if (value !== selectedGlobalRole?.name) {
      handleCustomRole();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lightbulb className="h-4 w-4" />
          <span>Start typing to search our global role library or create a custom role</span>
        </div>

        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name *</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {field.value || "Search roles or type custom name..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                  <Command shouldFilter={false}>
                    <CommandInput 
                      placeholder="Search roles or type custom name..." 
                      value={searchValue}
                      onValueChange={handleSearchChange}
                    />
                    {loading && (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="ml-2 text-sm">Searching...</span>
                      </div>
                    )}
                    <CommandList>
                      <CommandEmpty>
                        <div className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-2">
                            No roles found. Create "{searchValue}" as a custom role?
                          </p>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              if (searchValue) {
                                form.setValue('roleName', searchValue);
                                handleCustomRole();
                                setOpen(false);
                              }
                            }}
                          >
                            Create Custom Role
                          </Button>
                        </div>
                      </CommandEmpty>
                      <CommandGroup>
                        {globalRoles.map((role) => (
                          <CommandItem
                            key={role.id}
                            onSelect={() => handleRoleSelect(role)}
                            className="flex items-center justify-between p-3"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{role.name}</span>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {role.employment_type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {role.work_mode}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {role.experience_range}
                                </Badge>
                              </div>
                              {role.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {role.description}
                                </p>
                              )}
                            </div>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === role.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {isFromLibrary && selectedGlobalRole && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2 text-green-800 text-sm">
              <Check className="h-4 w-4" />
              <span>Role selected from library - fields auto-filled below</span>
            </div>
            {selectedGlobalRole.recommended_skills && selectedGlobalRole.recommended_skills.length > 0 && (
              <div className="mt-2">
                <span className="text-xs text-green-700">Recommended skills auto-added: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedGlobalRole.recommended_skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Mode *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experienceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Range *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experienceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EnhancedRoleNameStep;
