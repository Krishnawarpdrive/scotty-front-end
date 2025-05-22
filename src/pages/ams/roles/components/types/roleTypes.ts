
import { z } from 'zod';

// Define the schema for role form validation
export const roleFormSchema = z.object({
  roleName: z.string().min(2, {
    message: "Role name must be at least 2 characters.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  department: z.string().optional(),
  experienceLevel: z.string().optional(),
  employmentType: z.string().optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
});

// Infer TypeScript type from the schema
export type RoleFormValues = z.infer<typeof roleFormSchema>;
