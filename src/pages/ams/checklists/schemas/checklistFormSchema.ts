
import * as z from "zod";

export const checklistFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Checklist name is required"),
  type: z.enum(["general", "role", "client"], {
    required_error: "Please select a checklist type",
  }),
  roleId: z.string().optional(),
  clientId: z.string().optional(),
  subdomain: z.string().optional(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean()
    })
  ).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).refine(data => {
  // If type is role, roleId is required
  if (data.type === "role") {
    return !!data.roleId;
  }
  return true;
}, {
  message: "Role selection is required for role-based checklists",
  path: ["roleId"]
}).refine(data => {
  // If type is client, clientId is required
  if (data.type === "client") {
    return !!data.clientId;
  }
  return true;
}, {
  message: "Client selection is required for client-based checklists",
  path: ["clientId"]
});

export type ChecklistFormValues = z.infer<typeof checklistFormSchema>;
export type ChecklistFormData = ChecklistFormValues; // Export alias for backward compatibility
