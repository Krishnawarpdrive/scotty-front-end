
import { z } from "zod";

// Define form schema
export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;

export interface CustomField {
  id: string;
  label: string;
  value: string;
}
