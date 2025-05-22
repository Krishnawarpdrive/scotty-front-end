
export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  accountType: string;
  createdOn: string;
  lastActivity: { days: number; active: boolean };
  roles: { name: string; id: string }[];
  totalRequirements: number;
  assignedHR: string;
  hiringStatus: string;
  clientTier: string;
  healthScore: number;
  budgetUtilized: number;
  notes: string | null;
}
