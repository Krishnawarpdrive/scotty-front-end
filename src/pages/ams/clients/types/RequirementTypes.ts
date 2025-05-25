
export interface Requirement {
  id: string;
  role_id: string;
  client_id: string;
  name: string;
  description?: string;
  vacancies: number;
  priority: 'High' | 'Medium' | 'Low';
  due_date?: string;
  assigned_to?: string;
  hiring_manager?: string;
  budget_variance?: string;
  experience_variance?: string;
  custom_jd?: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'On Hold';
  created_at: string;
  updated_at: string;
}

export interface RequirementFormValues {
  name: string;
  description?: string;
  vacancies: number;
  priority: 'High' | 'Medium' | 'Low';
  due_date?: Date;
  assigned_to?: string;
  hiring_manager?: string;
  budget_variance?: string;
  experience_variance?: string;
  custom_jd?: string;
}
