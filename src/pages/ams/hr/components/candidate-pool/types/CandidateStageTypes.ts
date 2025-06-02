
export interface CandidateStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'on-hold' | 'rejected';
  order: number;
  completedAt?: string;
  assignedTo?: string;
  dueDate?: string;
  requiredActions: string[];
  availableActions: StageAction[];
  tabs: StageTab[];
  permissions: StagePermissions;
}

export interface StageAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  icon: string;
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
  requiredRole?: UserRole[];
  disabled?: boolean;
  disabledReason?: string;
}

export interface StageTab {
  id: string;
  name: string;
  icon: string;
  component: string;
  requiredRole?: UserRole[];
  badge?: string | number;
}

export interface StagePermissions {
  canView: UserRole[];
  canEdit: UserRole[];
  canAdvance: UserRole[];
  canReject: UserRole[];
  canHold: UserRole[];
}

export type UserRole = 'hr' | 'ta' | 'interviewer' | 'hiring_manager' | 'executive' | 'admin';

export interface CandidateStageData {
  candidateId: string;
  currentStage: string;
  stages: CandidateStage[];
  roleApplications: RoleApplication[];
  stageHistory: StageHistoryItem[];
  notes: CandidateNote[];
  documents: CandidateDocument[];
}

export interface StageHistoryItem {
  id: string;
  stageId: string;
  stageName: string;
  action: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
  metadata?: Record<string, any>;
}

export interface CandidateNote {
  id: string;
  stageId?: string;
  content: string;
  type: 'general' | 'feedback' | 'concern' | 'highlight';
  createdBy: string;
  createdAt: string;
  isPrivate?: boolean;
}

export interface CandidateDocument {
  id: string;
  name: string;
  type: 'resume' | 'cover_letter' | 'portfolio' | 'assessment' | 'feedback' | 'other';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  stageId?: string;
}

export interface RoleApplication {
  id: string;
  name: string;
  client: string;
  status: string;
  currentStage: string;
  appliedDate: string;
}
