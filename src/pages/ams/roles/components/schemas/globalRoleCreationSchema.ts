
import { z } from 'zod';

export const globalRoleCreationSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  workMode: z.string().min(1, 'Work mode is required'),
  experienceRange: z.string().min(1, 'Experience range is required'),
  department: z.string().min(1, 'Department is required'),
  skills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  generalChecklists: z.array(z.string()).default([]),
  roleChecklists: z.array(z.string()).default([]),
  clientChecklists: z.array(z.string()).default([]),
  roleDescription: z.string().min(1, 'Role description is required'),
  notes: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string()
  })).default([])
});

export type GlobalRoleCreationFormValues = z.infer<typeof globalRoleCreationSchema>;
