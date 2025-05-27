
export interface Vendor {
  id: string;
  name: string;
  vendorId: string;
  contactInfo: {
    email: string;
    phone: string;
    primaryContact: string;
    address?: string;
  };
  status: 'Active' | 'Inactive' | 'Paused';
  tier: 'Premium' | 'Standard' | 'Basic';
  rating: number;
  slaStatus: 'Good' | 'Warning' | 'Breach';
  contractStatus: 'Active' | 'Expired' | 'Pending';
  rolesAssigned: number;
  activeRequirements: number;
  lastActiveDate: string;
  performanceMetrics: {
    qualityScore: number;
    timelinessScore: number;
    complianceScore: number;
    submissionRate: number;
    interviewRate: number;
    offerRate: number;
  };
  billing: {
    totalInvoiced: number;
    pendingDues: number;
    lastPaymentDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface VendorRole {
  id: string;
  vendorId: string;
  roleId: string;
  roleName: string;
  clientName: string;
  vacancies: number;
  filledPositions: number;
  deadline: string;
  status: 'Active' | 'Completed' | 'On Hold';
  priority: 'High' | 'Medium' | 'Low';
}

export interface VendorSubmission {
  id: string;
  candidateName: string;
  roleName: string;
  submissionDate: string;
  status: 'Submitted' | 'Shortlisted' | 'Rejected' | 'Interview' | 'Offered';
  stage: string;
  feedback?: string;
}

export interface VendorPerformance {
  vendorId: string;
  period: string;
  candidatesSubmitted: number;
  candidatesShortlisted: number;
  candidatesRejected: number;
  interviewsScheduled: number;
  offersExtended: number;
  qualityRating: number;
  timelinessRating: number;
  complianceRating: number;
}
