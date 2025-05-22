
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Define the skill form schema
const skillFormSchema = z.object({
  name: z.string().min(1, { message: "Skill name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

export interface SkillFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  onSkillCreated?: (skillData: { name: string; category: string }) => Promise<void>;
}

const SkillFormDrawer: React.FC<SkillFormDrawerProps> = ({
  open,
  onOpenChange,
  categories,
  onSkillCreated
}) => {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const { reset, formState } = form;
  const { isSubmitting } = formState;

  // Reset form when drawer is opened
  React.useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleSubmit = async (data: SkillFormValues) => {
    if (onSkillCreated) {
      await onSkillCreated(data);
      form.reset();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add New Skill</DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter skill name" {...field} />
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
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
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
                
                <DrawerFooter className="px-0 pb-0 pt-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Skill'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SkillFormDrawer;
