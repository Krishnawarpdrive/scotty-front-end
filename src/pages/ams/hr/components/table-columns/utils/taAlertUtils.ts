
// Utility functions for TA alert reasons and CTA logic

export const taAlertReasonToCta: Record<string, { action: string; priority: 'high' | 'medium' | 'low' }> = {
  "TA overloaded": { action: "Reassign Load", priority: 'high' },
  "TA underloaded": { action: "Assign New Roles", priority: 'low' },
  "Inactive TA": { action: "Follow Up", priority: 'high' },
  "Low conversion rate": { action: "Schedule Performance Review", priority: 'medium' },
  "High rejection": { action: "Review Screening Strategy", priority: 'medium' },
  "No sourcing logged": { action: "Activate TA Sourcing", priority: 'medium' },
  "No outreach logged": { action: "Nudge TA", priority: 'low' },
  "Poor feedback submission": { action: "Remind Feedback", priority: 'low' },
  "Escalation record": { action: "Open Investigation", priority: 'high' },
  "TA switched mid-req": { action: "Assign Transition Support", priority: 'medium' }
};

export const taAlertReasons = [
  "TA overloaded",
  "TA underloaded", 
  "Inactive TA",
  "Low conversion rate",
  "High rejection",
  "No sourcing logged",
  "No outreach logged",
  "Poor feedback submission",
  "Escalation record",
  "TA switched mid-req"
];

export const getRandomTAAlertReason = () => {
  return taAlertReasons[Math.floor(Math.random() * taAlertReasons.length)];
};

export const getTACTAColor = (priority: 'high' | 'medium' | 'low') => {
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
