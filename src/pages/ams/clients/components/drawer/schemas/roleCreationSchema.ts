
import { z } from 'zod';

export const roleCreationSchema = z.object({
  // Step 1: Role Name
  roleName: z.string().min(1, 'Role name is required'),
  isFromLibrary: z.boolean().default(false),
  libraryRoleId: z.string().optional(),
  employmentType: z.string().min(1, 'Employment type is required'),
  workMode: z.string().min(1, 'Work mode is required'),
  experienceRange: z.string().min(1, 'Experience range is required'),
  department: z.string().optional(),
  
  // Step 2: Skills
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  
  // Step 3: Certifications
  certifications: z.array(z.string()).default([]),
  
  // Step 4: Checklists
  generalChecklists: z.array(z.string()).default([]),
  roleChecklists: z.array(z.string()).default([]),
  clientChecklists: z.array(z.string()).default([]),
  
  // Step 5: Final Details
  vacancies: z.number().min(1, 'At least one vacancy is required'),
  targetDeadline: z.date().optional(),
  budget: z.string().optional(),
  roleDescription: z.string().min(1, 'Role description is required'),
  notes: z.string().optional(),
  saveAsTemplate: z.boolean().default(false)
});

export type RoleCreationFormValues = z.infer<typeof roleCreationSchema>;
