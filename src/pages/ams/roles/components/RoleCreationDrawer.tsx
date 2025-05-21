import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import FormProgressIndicator from '../../clients/components/FormProgressIndicator';
import DynamicFieldGroup from '@/components/DynamicFieldGroup';

// Define form schema
const formSchema = z.object({
  roleName: z.string().min(1, { message: "Role name is required" }),
  externalName: z.string().optional(),
  roleCategory: z.string().min(1, { message: "Role category is required" }),
  workMode: z.string().min(1, { message: "Work mode is required" }),
  employmentType: z.string().min(1, { message: "Employment type is required" }),
  minExperience: z.string().min(1, { message: "Minimum experience is required" }),
  maxExperience: z.string().min(1, { message: "Maximum experience is required" }),
  jobDescription: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface RoleCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleCreationDrawer: React.FC<RoleCreationDrawerProps> = ({
  open,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { toast } = useToast();
  
  const formSections = ["Basic Info", "Details", "Skills & Tags", "Custom Fields"];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: "",
      externalName: "",
      roleCategory: "",
      workMode: "",
      employmentType: "",
      minExperience: "",
      maxExperience: "",
      jobDescription: "",
      saveAsTemplate: false,
    },
    mode: "onChange"
  });

  // Update progress based on form completion
  useEffect(() => {
    const values = form.getValues();
    const fields = Object.keys(values);
    
    // Calculate how many fields are filled
    const filledFields = fields.filter(field => {
      const value = values[field as keyof FormValues];
      return typeof value === 'boolean' ? true : !!value;
    }).length;
    
    // Calculate percentage
    const percentage = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(percentage);
  }, [form.watch()]);

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < formSections.length) {
      setCurrentStep(step);
    }
  };

  const onSubmit = (values: FormValues) => {
    // Add skills and tags to the form data
    const completeData = {
      ...values,
      skills,
      tags,
      customFields
    };
    
    console.log("Form submitted:", completeData);
    
    toast({
      title: "Role created successfully",
      description: `${values.roleName} has been added to the global role library.`,
    });
    
    // Close drawer
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[70vw] p-0 overflow-hidden flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Create New Role</SheetTitle>
          <SheetDescription>
            Add a role to the global role library that can be used across different clients.
          </SheetDescription>
        </SheetHeader>

        <FormProgressIndicator
          steps={formSections}
          currentStep={currentStep}
          onStepClick={goToStep}
          progress={formProgress}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 px-6 overflow-y-auto">
              {/* Step 1: Basic Information */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="roleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="externalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External Name (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Name shown to candidates" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="roleCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role Category *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tech">Technology</SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="management">Management</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
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
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select work mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="onsite">Onsite</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Experience Range *</FormLabel>
                    <div className="flex gap-4 items-center">
                      <FormField
                        control={form.control}
                        name="minExperience"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Min" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span>to</span>
                      <FormField
                        control={form.control}
                        name="maxExperience"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Max" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span>years</span>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter detailed job description..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Skills & Tags */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel>Skills</FormLabel>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a skill" 
                        value={newSkill} 
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddSkill}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1">
                          {skill}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a tag" 
                        value={newTag} 
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1 py-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Custom Fields */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <DynamicFieldGroup
                    title="Custom Fields"
                    fields={customFields}
                    onFieldsChange={setCustomFields}
                  />

                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="saveAsTemplate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Save as template</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Sticky footer with navigation buttons */}
            <SheetFooter className="p-4 border-t mt-auto">
              <div className="flex justify-between w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < formSections.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default RoleCreationDrawer;
