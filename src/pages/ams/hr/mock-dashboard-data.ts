
// Mock data for the HR Dashboard

// Candidate Pipeline Data
export const mockCandidatePipelineData = [
  {
    stage: 'Screening',
    count: 24,
    color: '#2563eb', // blue
    avgDaysInStage: 3.2,
    taDistribution: [
      { name: 'Sarah Johnson', count: 10, overloaded: false },
      { name: 'John Taylor', count: 8, overloaded: false },
      { name: 'Emma Wilson', count: 6, overloaded: false }
    ],
    candidates: [
      { name: 'Alice Brown', ta: 'Sarah Johnson', daysInStage: 2 },
      { name: 'Bob Chen', ta: 'John Taylor', daysInStage: 4 },
      { name: 'Carol Davis', ta: 'Emma Wilson', daysInStage: 1 },
      { name: 'Dave Evans', ta: 'Sarah Johnson', daysInStage: 3 },
      { name: 'Eve Franklin', ta: 'John Taylor', daysInStage: 5 }
    ]
  },
  {
    stage: 'Interview',
    count: 18,
    color: '#8b5cf6', // purple
    avgDaysInStage: 5.5,
    taDistribution: [
      { name: 'Mike Peterson', count: 12, overloaded: true },
      { name: 'Rachel Garcia', count: 6, overloaded: false }
    ],
    candidates: [
      { name: 'Frank Gibson', ta: 'Mike Peterson', daysInStage: 6 },
      { name: 'Grace Huang', ta: 'Mike Peterson', daysInStage: 4 },
      { name: 'Henry Irving', ta: 'Rachel Garcia', daysInStage: 7 },
      { name: 'Ivy Johnson', ta: 'Mike Peterson', daysInStage: 5 }
    ]
  },
  {
    stage: 'Offer',
    count: 12,
    color: '#10b981', // green
    avgDaysInStage: 2.8,
    taDistribution: [
      { name: 'Sarah Johnson', count: 5, overloaded: false },
      { name: 'Emma Wilson', count: 7, overloaded: false }
    ],
    candidates: [
      { name: 'Jack Klein', ta: 'Sarah Johnson', daysInStage: 3 },
      { name: 'Kate Lewis', ta: 'Emma Wilson', daysInStage: 2 },
      { name: 'Leo Martinez', ta: 'Emma Wilson', daysInStage: 4 }
    ]
  },
  {
    stage: 'Onboarding',
    count: 8,
    color: '#f59e0b', // amber
    avgDaysInStage: 8.2,
    taDistribution: [
      { name: 'John Taylor', count: 8, overloaded: true }
    ],
    candidates: [
      { name: 'Maria Nelson', ta: 'John Taylor', daysInStage: 9 },
      { name: 'Nick Oliver', ta: 'John Taylor', daysInStage: 7 }
    ]
  },
  {
    stage: 'Hired',
    count: 16,
    color: '#6366f1', // indigo
    avgDaysInStage: 1.5,
    taDistribution: [
      { name: 'Rachel Garcia', count: 8, overloaded: false },
      { name: 'Mike Peterson', count: 5, overloaded: false },
      { name: 'Sarah Johnson', count: 3, overloaded: false }
    ],
    candidates: [
      { name: 'Olivia Porter', ta: 'Rachel Garcia', daysInStage: 1 },
      { name: 'Paul Quinn', ta: 'Mike Peterson', daysInStage: 2 },
      { name: 'Quinn Rodriguez', ta: 'Sarah Johnson', daysInStage: 1 }
    ]
  }
];

// Time to Hire Data
export const mockTimeToHireData = [
  { name: 'Software Engineer', value: 32 },
  { name: 'Product Manager', value: 28 },
  { name: 'UX Designer', value: 24 },
  { name: 'Data Scientist', value: 30 },
  { name: 'DevOps Engineer', value: 27 }
];

// TA Work Progress Data
export const mockTAProgressData = [
  { name: 'Sarah Johnson', value: 85 },
  { name: 'Mike Peterson', value: 61 },
  { name: 'Rachel Garcia', value: 92 },
  { name: 'John Taylor', value: 76 },
  { name: 'Emma Wilson', value: 88 }
];

// Role Success Data
export const mockRoleSuccessData = [
  { name: 'Filled', value: 68.5 },
  { name: 'In Progress', value: 23.5 },
  { name: 'Not Started', value: 8 }
];

// Interviewer Load Data
export const mockInterviewerLoadData = [
  { name: 'Available', value: 38 },
  { name: 'Assigned', value: 62 }
];

// Role Efficiency Data
export const mockRoleEfficiencyData = [
  { name: 'Optimal Match', value: 83.5 },
  { name: 'Suboptimal Match', value: 16.5 }
];

// Mock Activity Feed Data
export const mockActivityData = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'scheduled an interview for',
    target: 'Alice Brown',
    type: 'candidate',
    time: '10 minutes ago',
    avatarUrl: '',
    alert: 'Urgent',
    alertLevel: 'critical',
    details: {
      candidateId: 'c001',
      role: 'Software Engineer',
      client: 'Acme Corp',
      interviewDate: '2025-05-25T14:00:00Z'
    }
  },
  {
    id: 2,
    user: 'Mike Peterson',
    action: 'sent an offer to',
    target: 'Bob Chen',
    type: 'candidate',
    time: '1 hour ago',
    avatarUrl: '',
    alert: 'Expiring Soon',
    alertLevel: 'warning',
    details: {
      candidateId: 'c002',
      role: 'Product Manager',
      client: 'Tech Innovations',
      offerDeadline: '2025-05-28T23:59:59Z',
      salary: '$120,000'
    }
  },
  {
    id: 3,
    user: 'John Taylor',
    action: 'added a new role for',
    target: 'Global Solutions',
    type: 'role',
    time: '3 hours ago',
    avatarUrl: '',
    details: {
      roleId: 'r001',
      title: 'Senior UX Designer',
      seniority: 'Senior',
      expectedSalary: '$140,000 - $160,000'
    }
  },
  {
    id: 4,
    user: 'Emma Wilson',
    action: 'requested feedback for',
    target: 'Carol Davis',
    type: 'candidate',
    time: '5 hours ago',
    avatarUrl: '',
    details: {
      candidateId: 'c003',
      role: 'Data Scientist',
      client: 'Future Systems',
      interviewer: 'David Thompson'
    }
  },
  {
    id: 5,
    user: 'Rachel Garcia',
    action: 'closed the requirement for',
    target: 'DevOps Engineer',
    type: 'role',
    time: '1 day ago',
    avatarUrl: '',
    alert: 'Successful',
    alertLevel: 'good',
    details: {
      roleId: 'r002',
      client: 'Quantum Labs',
      hiredCandidate: 'Eve Franklin',
      timeToHire: '26 days'
    }
  },
  {
    id: 6,
    user: 'Sarah Johnson',
    action: 'added a new client',
    target: 'Innovate Health',
    type: 'client',
    time: '1 day ago',
    avatarUrl: '',
    details: {
      clientId: 'cl001',
      industry: 'Healthcare',
      location: 'Boston, MA',
      contactPerson: 'Gregory Hall'
    }
  },
  {
    id: 7,
    user: 'Mike Peterson',
    action: 'updated the pipeline status for',
    target: 'Frank Gibson',
    type: 'candidate',
    time: '2 days ago',
    avatarUrl: '',
    details: {
      candidateId: 'c004',
      oldStage: 'Screening',
      newStage: 'Interview',
      role: 'Frontend Developer',
      client: 'Tech Innovations'
    }
  }
];

// Secondary Metrics
export const mockSecondaryMetricsData = {
  candidatePipelineByTA: [
    { name: 'Sarah Johnson', count: 18 },
    { name: 'Mike Peterson', count: 17 },
    { name: 'Rachel Garcia', count: 14 },
    { name: 'John Taylor', count: 16 },
    { name: 'Emma Wilson', count: 13 }
  ],
  interviewToOfferRatio: [
    { month: 'Jan', ratio: 0.52 },
    { month: 'Feb', ratio: 0.48 },
    { month: 'Mar', ratio: 0.61 },
    { month: 'Apr', ratio: 0.57 },
    { month: 'May', ratio: 0.65 }
  ],
  partnerCollaboration: [
    { name: 'Direct', value: 68 },
    { name: 'Agency', value: 24 },
    { name: 'Referral', value: 8 }
  ],
  stuckCandidates: [
    { name: 'Henry Irving', days: 12, stage: 'Interview', ta: 'Rachel Garcia' },
    { name: 'Maria Nelson', days: 9, stage: 'Onboarding', ta: 'John Taylor' },
    { name: 'Leo Martinez', days: 8, stage: 'Offer', ta: 'Emma Wilson' }
  ]
};
