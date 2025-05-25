
import { z } from 'zod';

export const roleFormSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
  externalName: z.string().optional(),
  roleCategory: z.string().min(1, 'Role category is required'),
  workMode: z.string().min(1, 'Work mode is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  minExperience: z.number().min(0).max(50),
  maxExperience: z.number().min(0).max(50),
  jobDescription: z.string().optional(),
  saveAsTemplate: z.boolean().default(false)
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
}
