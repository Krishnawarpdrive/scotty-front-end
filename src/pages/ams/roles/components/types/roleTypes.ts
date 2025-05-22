
import { z } from "zod";

// Define form schema for role creation
export const roleFormSchema = z.object({
  roleName: z.string().min(1, { message: "Role name is required" }),
  jobTitle: z.string().optional(),
  department: z.string().min(1, { message: "Role category is required" }),
  experienceLevel: z.string().min(1, { message: "Experience range is required" }),
  employmentType: z.string().min(1, { message: "Employment type is required" }),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;
