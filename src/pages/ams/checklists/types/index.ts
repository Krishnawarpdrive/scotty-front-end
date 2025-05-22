
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  name: string;
  type: 'general' | 'role' | 'client';
  roleId?: string;
  clientId?: string;
  subdomain?: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistTypeOption {
  value: string;
  label: string;
}

export const checklistTypeOptions: ChecklistTypeOption[] = [
  { value: 'general', label: 'General' },
  { value: 'role', label: 'Role-based' },
  { value: 'client', label: 'Client-based' }
];
