
// Unified Data Types for Cross-Module Consistency

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Vendor Management Types
export interface UnifiedVendor extends BaseEntity {
  name: string;
  vendor_id: string;
  contact_info: {
    email: string;
    phone: string;
    primary_contact: string;
    address?: string;
  };
  status: 'Active' | 'Inactive' | 'Paused';
  tier: 'Premium' | 'Standard' | 'Basic';
  rating: number;
  sla_status: 'Good' | 'Warning' | 'Breach';
  contract_status: 'Active' | 'Expired' | 'Pending';
  roles_assigned: number;
  active_requirements: number;
  last_active_date: string;
  performance_metrics: VendorPerformanceMetrics;
  billing_info: VendorBillingInfo;
}

export interface VendorPerformanceMetrics {
  quality_score: number;
  timeliness_score: number;
  compliance_score: number;
  submission_rate: number;
  interview_rate: number;
  offer_rate: number;
}

export interface VendorBillingInfo {
  total_invoiced: number;
  pending_dues: number;
  last_payment_date: string;
}

// Role and Requirement Types
export interface UnifiedRole extends BaseEntity {
  name: string;
  external_name?: string;
  category: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  work_mode: 'Remote' | 'On-site' | 'Hybrid';
  min_experience: string;
  max_experience: string;
  job_description?: string;
  is_template: boolean;
  source_type: 'template' | 'custom';
  client_id?: string;
  skills: string[];
  certifications: string[];
  custom_fields: Record<string, any>;
}

export interface UnifiedRequirement extends BaseEntity {
  name: string;
  description?: string;
  role_id: string;
  client_id: string;
  vacancies: number;
  status: 'Open' | 'In Progress' | 'Closed' | 'On Hold';
  priority: 'High' | 'Medium' | 'Low';
  due_date?: string;
  assigned_to?: string;
  hiring_manager?: string;
  custom_jd?: string;
  budget_variance?: string;
  experience_variance?: string;
}

// Client Types
export interface UnifiedClient extends BaseEntity {
  name: string;
  email?: string;
  contact: string;
  account_type?: string;
  client_tier?: string;
  status: 'Active' | 'Inactive' | 'Paused';
  hiring_status: 'Active' | 'Inactive';
  assigned_hr?: string;
  total_requirements: number;
  budget_utilized: number;
  health_score?: number;
  last_activity_date: string;
  notes?: string;
}

// Candidate Types
export interface UnifiedCandidate extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  current_stage: string;
  source: string;
  experience_years: number;
  skills: string[];
  current_role?: string;
  current_company?: string;
  resume_url?: string;
  status: 'Active' | 'Inactive' | 'Hired' | 'Rejected';
  vendor_id?: string;
}

// Common Status Types
export type StatusType = 'Active' | 'Inactive' | 'Paused' | 'Pending' | 'Completed';
export type PriorityType = 'High' | 'Medium' | 'Low';
export type TierType = 'Premium' | 'Standard' | 'Basic';

// Filter and Search Types
export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'range';
  options?: Array<{ value: string; label: string }>;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
