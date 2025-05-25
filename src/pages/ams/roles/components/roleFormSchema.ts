
import { z } from 'zod';

export const roleFormSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
  jobTitle: z.string().optional(),
  department: z.string().min(1, 'Role category is required'),
  workMode: z.string().min(1, 'Work mode is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  primarySkills: z.array(z.string()).default([]),
  secondarySkills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string().optional(),
    type: z.enum(['text', 'number', 'date', 'dropdown']).default('text'),
    options: z.array(z.string()).optional(),
    section: z.enum(['basic', 'description', 'skills', 'certifications', 'tags']).optional(),
  })).default([]),
  saveAsTemplate: z.boolean().default(false)
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;
export type FormValues = RoleFormValues; // For backward compatibility

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
}
