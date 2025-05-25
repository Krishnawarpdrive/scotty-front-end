
import { GoalData } from './types';

export const getGoalData = (goalType: string): GoalData | null => {
  switch (goalType) {
    case 'interviews':
      return {
        title: 'Interview Schedules - This Week',
        target: 25,
        achieved: 18,
        taContributions: [
          { 
            name: 'Sarah Johnson', 
            initials: 'SJ',
            contribution: 5, 
            target: 6, 
            progress: 83,
            status: 'behind',
            insight: '1 interview unscheduled, 1 pending feedback',
            avgDelay: '2.4 days',
            roles: ['Senior Developer', 'UX Designer'],
            candidates: ['John Doe', 'Jane Smith'],
            hasConflicts: false
          },
          { 
            name: 'Mike Peterson', 
            initials: 'MP',
            contribution: 4, 
            target: 5, 
            progress: 80,
            status: 'on-track',
            insight: 'All interviews scheduled on time',
            avgDelay: '0.8 days',
            roles: ['Product Manager'],
            candidates: ['Alice Brown'],
            hasConflicts: false
          },
          { 
            name: 'Emma Wilson', 
            initials: 'EW',
            contribution: 3, 
            target: 4, 
            progress: 75,
            status: 'feedback-pending',
            insight: '2 feedback responses overdue',
            avgDelay: '1.2 days',
            roles: ['Data Scientist', 'ML Engineer'],
            candidates: ['Bob Chen', 'Carol Davis'],
            hasConflicts: true
          },
          { 
            name: 'John Taylor', 
            initials: 'JT',
            contribution: 6, 
            target: 6, 
            progress: 100,
            status: 'done',
            insight: 'All targets met ahead of schedule',
            avgDelay: '0 days',
            roles: ['DevOps Engineer', 'Cloud Architect'],
            candidates: ['David Wilson', 'Eva Martinez'],
            hasConflicts: false
          },
          { 
            name: 'Rachel Garcia', 
            initials: 'RG',
            contribution: 0, 
            target: 4, 
            progress: 0,
            status: 'at-risk',
            insight: 'No interviews scheduled this week',
            avgDelay: '4+ days',
            roles: ['Frontend Developer'],
            candidates: [],
            hasConflicts: false
          }
        ]
      };
    case 'roles':
      return {
        title: 'Roles Filled - This Week',
        target: 10,
        achieved: 7,
        details: [
          { role: 'Senior Developer', client: 'Acme Corp', ta: 'Sarah Johnson', status: 'Filled' },
          { role: 'UX Designer', client: 'Tech Inc', ta: 'Mike Peterson', status: 'Filled' },
          { role: 'Product Manager', client: 'Global Co', ta: 'Emma Wilson', status: 'Pending' }
        ]
      };
    case 'feedback':
      return {
        title: 'Candidate Feedback - This Week',
        target: 20,
        achieved: 15,
        pending: [
          { candidate: 'John Doe', role: 'Developer', ta: 'Sarah Johnson', days: 2 },
          { candidate: 'Jane Smith', role: 'Designer', ta: 'Mike Peterson', days: 1 },
          { candidate: 'Bob Wilson', role: 'Manager', ta: 'Emma Wilson', days: 3 }
        ]
      };
    default:
      return null;
  }
};
