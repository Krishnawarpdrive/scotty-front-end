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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Create Skill</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Skill"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SkillFormDrawer;
