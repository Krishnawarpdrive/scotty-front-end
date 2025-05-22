
import { z } from "zod";

// Define form schema for role creation
export const roleFormSchema = z.object({
  roleName: z.string().min(1, { message: "Role name is required" }),
  jobTitle: z.string().optional(),
  department: z.string().min(1, { message: "Role category is required" }),
  experienceLevel: z.string().min(1, { message: "Experience range is required" }),
  employmentType: z.string().min(1, { message: "Employment type is required" }),
  workMode: z.string().min(1, { message: "Work mode is required" }),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  saveAsTemplate: z.boolean().default(false),
  customFields: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string().optional(),
      type: z.enum(['text', 'number', 'dropdown', 'date']).default('text'),
      options: z.array(z.string()).optional(),
      section: z.enum(['basic', 'description', 'skills', 'certifications', 'tags']).default('basic')
    })
  ).default([]),
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;

export interface CustomField {
  id: string;
  label: string;
  value?: string;
  type?: 'text' | 'number' | 'dropdown' | 'date';
  options?: string[];
  section?: 'basic' | 'description' | 'skills' | 'certifications' | 'tags';
}

export interface FormSection {
  title: string;
  key: 'basic' | 'description' | 'skills' | 'certifications' | 'tags';
}
