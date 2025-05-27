
// Utility functions for requirement alert reasons and CTA logic

export const requirementAlertReasonToCta: Record<string, { action: string; priority: 'high' | 'medium' | 'low' }> = {
  "TA not assigned": { action: "Assign TA", priority: 'high' },
  "Requirement not approved": { action: "Send for Approval", priority: 'medium' },
  "No candidates sourced": { action: "Start Sourcing", priority: 'high' },
  "High rejection rate": { action: "Revise Criteria", priority: 'medium' },
  "Due soon": { action: "Notify TA", priority: 'high' },
  "TA slow response": { action: "Follow Up TA", priority: 'medium' },
  "No interview feedback": { action: "Request Feedback", priority: 'medium' },
  "Multiple edits": { action: "Audit Changes", priority: 'low' },
  "Pipeline mismatch": { action: "Fix Hiring Flow", priority: 'low' },
  "Pending for 7+ days": { action: "Confirm Requirement", priority: 'medium' }
};

export const requirementAlertReasons = [
  "TA not assigned",
  "Requirement not approved", 
  "No candidates sourced",
  "High rejection rate",
  "Due soon",
  "TA slow response",
  "No interview feedback",
  "Multiple edits",
  "Pipeline mismatch",
  "Pending for 7+ days"
];

export const getRequirementCTAColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return "bg-red-500 hover:bg-red-600 text-white";
    case 'medium':
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case 'low':
      return "bg-blue-500 hover:bg-blue-600 text-white";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
  }
};

// Create a consistent mapping for each requirement to prevent continuous changes
const requirementAlertMapping = new Map<string, string>();

export const getRequirementAlertReason = (requirementId: string) => {
  if (!requirementAlertMapping.has(requirementId)) {
    const randomIndex = Math.abs(requirementId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % requirementAlertReasons.length;
    requirementAlertMapping.set(requirementId, requirementAlertReasons[randomIndex]);
  }
  return requirementAlertMapping.get(requirementId)!;
};
