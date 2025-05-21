
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { skillFormSchema, type SkillFormValues } from '../schemas/skillFormSchema';

interface SkillFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: any;
}

const skillCategories = [
  "Frontend Development",
  "Backend Development",
  "Programming Languages",
  "Cloud Services",
  "DevOps",
  "Database",
  "Mobile Development",
  "Soft Skills",
  "Management",
  "Design",
  "QA"
];

const SkillFormDrawer: React.FC<SkillFormDrawerProps> = ({
  open,
  onOpenChange,
  skill
}) => {
  const [aliases, setAliases] = useState<string[]>([]);
  const [newAlias, setNewAlias] = useState('');
  const isEditMode = !!skill;
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: '',
      category: '',
      description: ''
    }
  });
  
  // Populate form when editing an existing skill
  useEffect(() => {
    if (skill) {
      form.reset({
        name: skill.name,
        category: skill.category,
        description: skill.description || ''
      });
      setAliases(skill.aliases || []);
    } else {
      form.reset({
        name: '',
        category: '',
        description: ''
      });
      setAliases([]);
    }
  }, [skill, form]);
  
  const handleAddAlias = () => {
    if (newAlias && !aliases.includes(newAlias)) {
      setAliases([...aliases, newAlias]);
      setNewAlias('');
    }
  };
  
  const handleRemoveAlias = (alias: string) => {
    setAliases(aliases.filter(a => a !== alias));
  };
  
  const onSubmit = (values: SkillFormValues) => {
    // Combine form values with aliases
    const skillData = {
      ...values,
      aliases
    };
    
    console.log('Skill data to save:', skillData);
    // Here you would save the skill data to your backend
    
    // Close the drawer
    onOpenChange(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] max-w-[600px] sm:max-w-[520px] h-full overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl">{isEditMode ? 'Edit Skill' : 'Add New Skill'}</SheetTitle>
          <SheetDescription>
            {isEditMode 
              ? 'Update the details of this skill in the skill library.' 
              : 'Create a new skill to add to your skills library.'}
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full py-6 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Aliases / Synonyms</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add an alias" 
                  value={newAlias} 
                  onChange={(e) => setNewAlias(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAlias();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddAlias}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {aliases.map((alias, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1">
                    {alias}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveAlias(alias)}
                    />
                  </Badge>
                ))}
                {aliases.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No aliases added yet</p>
                )}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Add a description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <SheetFooter className="pt-4 mt-auto">
              <div className="flex justify-between w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? 'Save Changes' : 'Create Skill'}
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SkillFormDrawer;
