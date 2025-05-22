
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SideDrawer } from '@/components/ui/side-drawer';

const skillFormSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  category: z.string().optional(),
});

interface SkillFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillCreated: (skillData: { name: string; category: string }) => Promise<void>;
  categories: string[];
}

export const SkillFormDrawer: React.FC<SkillFormDrawerProps> = ({
  open,
  onOpenChange,
  onSkillCreated,
  categories
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof skillFormSchema>>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      category: "General",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof skillFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Ensure name and category are not undefined
      const skillData = {
        name: data.name || '',
        category: data.category || 'General'
      };

      const { data: newSkill, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select()
        .single();

      if (error) {
        console.error("Error creating skill:", error);
        toast({
          title: "Error",
          description: "Failed to create skill. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Skill ${newSkill.name} created successfully.`,
      });

      onSkillCreated?.(newSkill);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Skill creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerContent = (
    <Button type="submit" form="skill-form" disabled={isSubmitting}>
      {isSubmitting ? "Creating..." : "Create Skill"}
    </Button>
  );

  return (
    <SideDrawer 
      open={open} 
      onOpenChange={onOpenChange}
      title="Create Skill"
      size="sm"
      footer={footerContent}
    >
      <Form {...form}>
        <form id="skill-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </SideDrawer>
  );
};

export default SkillFormDrawer;
