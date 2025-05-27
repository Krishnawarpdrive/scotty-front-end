
export interface AlertReason {
  reason: string;
  priority: 'high' | 'medium' | 'low';
  cta: string;
  description: string;
}

export const alertReasons: AlertReason[] = [
  {
    reason: "TA not assigned",
    priority: 'high',
    cta: "Assign TA",
    description: "This role needs a Talent Acquisition specialist assigned"
  },
  {
    reason: "Pipeline not configured",
    priority: 'medium', 
    cta: "Configure Pipeline",
    description: "Hiring pipeline stages need to be set up for this role"
  },
  {
    reason: "Candidate progress stalled",
    priority: 'medium',
    cta: "Check Pipeline",
    description: "Candidates are not progressing through the pipeline"
  },
  {
    reason: "Low interview-to-offer ratio",
    priority: 'low',
    cta: "Review Process",
    description: "Too many candidates are being rejected at interview stage"
  },
  {
    reason: "JD not attached",
    priority: 'high',
    cta: "Upload JD",
    description: "Job description document is missing"
  },
  {
    reason: "Inactive TA",
    priority: 'medium',
    cta: "Contact TA",
    description: "Assigned TA has been inactive for several days"
  },
  {
    reason: "Vacancies filled",
    priority: 'low',
    cta: "Close Role",
    description: "All positions have been filled but role is still active"
  },
  {
    reason: "No candidates sourced",
    priority: 'high',
    cta: "Start Sourcing",
    description: "No candidates have been sourced for this role yet"
  },
  {
    reason: "Overdue deadline",
    priority: 'high',
    cta: "Extend Deadline",
    description: "Role has passed its original deadline"
  },
  {
    reason: "Duplicate role posting",
    priority: 'medium',
    cta: "Review Duplicates",
    description: "Similar role may already exist in the system"
  }
];

export const getRandomAlertReason = (): AlertReason => {
  return alertReasons[Math.floor(Math.random() * alertReasons.length)];
};

export const getAlertColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return "bg-red-500 hover:bg-red-600 text-white";
    case 'medium':
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case 'low':
      return "bg-blue-500 hover:bg-blue-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white";
  }
};
