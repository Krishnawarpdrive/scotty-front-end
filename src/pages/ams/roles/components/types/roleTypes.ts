
import { z } from 'zod';

// Define the custom field schema
export const customFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string().optional(),
  type: z.enum(['text', 'number', 'date', 'dropdown']).default('text'),
  options: z.array(z.string()).optional(),
  section: z.enum(['basic', 'description', 'skills', 'certifications', 'tags']).optional(),
});

// Define the role form schema
export const roleFormSchema = z.object({
  roleName: z.string().min(1, { message: "Role name is required" }),
  jobTitle: z.string().optional(),
  department: z.string().min(1, { message: "Role category is required" }),
  workMode: z.string().min(1, { message: "Work mode is required" }),
  experienceLevel: z.string().min(1, { message: "Experience range is required" }),
  employmentType: z.string().min(1, { message: "Employment type is required" }),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  customFields: z.array(customFieldSchema).default([]),
  saveAsTemplate: z.boolean().default(false),
});

// Export the type that represents the form values
export type RoleFormValues = z.infer<typeof roleFormSchema>;

// Export the CustomField type
export type CustomField = z.infer<typeof customFieldSchema>;
