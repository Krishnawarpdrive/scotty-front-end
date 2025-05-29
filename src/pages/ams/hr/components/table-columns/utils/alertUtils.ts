
// Utility functions for alert reasons and CTA logic

export const alertReasonToCta: Record<string, { action: string; priority: 'high' | 'medium' | 'low' }> = {
  "No roles created": { action: "Add Role", priority: 'high' },
  "Multiple roles pending TA": { action: "Assign TA to Roles", priority: 'medium' },
  "Client uncontacted for 14+ days": { action: "Follow Up with Client", priority: 'medium' },
  "Unapproved items pending": { action: "Approve Pending Items", priority: 'medium' },
  "Agreement not uploaded": { action: "Upload Agreement", priority: 'high' },
  "Overdue roles for priority client": { action: "Escalate to Exec Team", priority: 'high' },
  "Stalled progress on roles": { action: "Review Pipeline Bottlenecks", priority: 'low' },
  "TA overload/mismatch": { action: "Reassign TA", priority: 'low' },
  "Missing JD": { action: "Request JD from Client", priority: 'high' },
  "Frequent rejections": { action: "Notify Client of Rework", priority: 'medium' }
};

export const alertReasons = [
  "No roles created"
];
// "Multiple roles pending TA",
//   "Client uncontacted for 14+ days",
//   "Unapproved items pending",
//   "Agreement not uploaded",
//   "Overdue roles for priority client",
//   "Stalled progress on roles",
//   "TA overload/mismatch",
//   "Missing JD",
//   "Frequent rejections"

export const getCTAColor = (priority: 'high' | 'medium' | 'low') => {
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

// Create a consistent mapping for each client to prevent continuous changes
const clientAlertMapping = new Map<string, string>();

export const getClientAlertReason = (clientName: string) => {
  if (!clientAlertMapping.has(clientName)) {
    const randomIndex = Math.abs(clientName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % alertReasons.length;
    clientAlertMapping.set(clientName, alertReasons[randomIndex]);
  }
  return clientAlertMapping.get(clientName)!;
};

// Deprecated - use getClientAlertReason instead
export const getRandomAlertReason = () => {
  return alertReasons[0]; // Return consistent first item to prevent changes
};
