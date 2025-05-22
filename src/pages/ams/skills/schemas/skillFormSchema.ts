
import { z } from 'zod';

export const skillFormSchema = z.object({
  name: z.string().min(1, { message: "Skill name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().optional()
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;
