
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SideDrawer } from '@/components/ui/side-drawer';

const skillFormSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  description: z.string().optional(),
});

interface SkillFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillCreated: (skillData: any) => void;
  categories: string[];
  skill?: any;
}

export const SkillFormDrawer: React.FC<SkillFormDrawerProps> = ({
  open,
  onOpenChange,
  onSkillCreated,
  categories,
  skill
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aliases, setAliases] = useState<string[]>(skill?.aliases || []);
  const [currentAlias, setCurrentAlias] = useState('');

  const form = useForm<z.infer<typeof skillFormSchema>>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: skill?.name || "",
      category: skill?.category || "",
      description: skill?.description || "",
    },
  });

  const handleAddAlias = () => {
    if (currentAlias.trim() && !aliases.includes(currentAlias.trim())) {
      setAliases(prev => [...prev, currentAlias.trim()]);
      setCurrentAlias('');
    }
  };

  const handleRemoveAlias = (aliasToRemove: string) => {
    setAliases(prev => prev.filter(alias => alias !== aliasToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAlias();
    }
  };
  
  const onSubmit = async (data: z.infer<typeof skillFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      const skillData = {
        ...data,
        aliases,
        usageCount: skill?.usageCount || 0,
        dateAdded: skill?.dateAdded || new Date().toISOString(),
      };

      toast({
        title: "Success",
        description: `Skill ${data.name} ${skill ? 'updated' : 'created'} successfully.`,
      });

      onSkillCreated(skillData);
      onOpenChange(false);
      form.reset();
      setAliases([]);
      setCurrentAlias('');
    } catch (error) {
      console.error("Skill form error:", error);
      toast({
        title: "Error",
        description: `Failed to ${skill ? 'update' : 'create'} skill. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerContent = (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={() => onOpenChange(false)}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" form="skill-form" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
      </Button>
    </div>
  );

  return (
    <SideDrawer 
      open={open} 
      onOpenChange={onOpenChange}
      title={skill ? "Edit Skill" : "Create Skill"}
      size="lg"
      footer={footerContent}
    >
      <div className="p-6">
        <Form {...form}>
          <form id="skill-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Python, Project Management" {...field} />
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
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Aliases</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add alias (e.g., ReactJS, React.js)"
                  value={currentAlias}
                  onChange={(e) => setCurrentAlias(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddAlias}
                  disabled={!currentAlias.trim()}
                >
                  Add
                </Button>
              </div>
              {aliases.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {aliases.map((alias, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {alias}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveAlias(alias)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this skill and its applications..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </SideDrawer>
  );
};

export default SkillFormDrawer;
