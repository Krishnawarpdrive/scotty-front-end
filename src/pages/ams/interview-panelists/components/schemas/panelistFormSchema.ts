
import { z } from "zod";

export const panelistFormSchema = z.object({
  panelist_id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().optional(),
  bio: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on_leave']),
  availability_status: z.enum(['available', 'busy', 'unavailable']),
  seniority_level: z.enum(['junior', 'mid', 'senior', 'principal', 'executive']),
  skills: z.array(z.string()),
  certifications: z.array(z.string()),
  languages: z.array(z.string()),
  interview_types: z.array(z.string()),
  preferred_time_slots: z.record(z.array(z.string())),
  max_interviews_per_week: z.number().min(1),
  interviews_allocated_per_day: z.number().min(1),
  projects_worked_on: z.array(z.string()),
  tools_used: z.array(z.string()),
  interview_authorization_level: z.enum(['basic', 'intermediate', 'advanced', 'expert']),
  timezone: z.string(),
  years_experience: z.number().min(0)
});

export type PanelistFormData = z.infer<typeof panelistFormSchema>;
