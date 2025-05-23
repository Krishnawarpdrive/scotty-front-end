
// Mock data for the HR Dashboard

export const mockTimeToHireData = [
  { name: 'Software Engineer', value: 32 },
  { name: 'Product Manager', value: 28 },
  { name: 'UX Designer', value: 24 },
  { name: 'Data Scientist', value: 30 },
  { name: 'DevOps Engineer', value: 26 }
];

export const mockTAProgressData = [
  { name: 'Sarah Johnson', value: 78, progress: 78 },
  { name: 'Mike Peterson', value: 85, progress: 85 },
  { name: 'Emma Wilson', value: 72, progress: 72 },
  { name: 'John Taylor', value: 92, progress: 92 },
  { name: 'Rachel Garcia', value: 68, progress: 68 }
];

export const mockRoleSuccessData = [
  { name: 'Filled', value: 68.5 },
  { name: 'In Progress', value: 23.5 },
  { name: 'Pending', value: 8 }
];

export const mockInterviewerLoadData = [
  { name: 'Mon', assigned: 12, available: 15 },
  { name: 'Tue', assigned: 14, available: 18 },
  { name: 'Wed', assigned: 10, available: 16 },
  { name: 'Thu', assigned: 16, available: 20 },
  { name: 'Fri', assigned: 8, available: 12 }
];

export const mockRoleEfficiencyData = [
  { name: 'Optimal Match', value: 83.5 },
  { name: 'Good Match', value: 12.3 },
  { name: 'Suboptimal', value: 4.2 }
];

export const mockActivityData = [
  {
    user: 'Sarah Johnson',
    action: 'scheduled an interview for',
    target: 'Senior Developer role',
    time: '5 mins ago',
    type: 'role',
    avatarUrl: '',
    alert: 'Urgent',
    alertLevel: 'critical'
  },
  {
    user: 'Mike Peterson',
    action: 'submitted feedback for',
    target: 'Alice Smith',
    time: '12 mins ago',
    type: 'candidate',
    avatarUrl: '',
    alert: 'Review needed',
    alertLevel: 'warning'
  },
  {
    user: 'Emma Wilson',
    action: 'updated requirements for',
    target: 'Acme Corp - UX Designer',
    time: '1 hour ago',
    type: 'client',
    avatarUrl: '',
    alert: '',
    alertLevel: 'good'
  },
  {
    user: 'John Taylor',
    action: 'created a new role for',
    target: 'Tech Innovations Inc',
    time: '2 hours ago',
    type: 'role',
    avatarUrl: '',
    alert: 'New assignment',
    alertLevel: 'good'
  },
  {
    user: 'Rachel Garcia',
    action: 'sent offer letter to',
    target: 'Bob Chen',
    time: '3 hours ago',
    type: 'candidate',
    avatarUrl: '',
    alert: 'Awaiting response',
    alertLevel: 'warning'
  },
  {
    user: 'David Lee',
    action: 'onboarded new client',
    target: 'Future Systems LLC',
    time: '4 hours ago',
    type: 'client',
    avatarUrl: '',
    alert: 'Welcome sent',
    alertLevel: 'good'
  }
];

// Mock data for candidate pipeline
export const mockCandidatePipelineData = [
  { 
    stage: 'Screening', 
    count: 45, 
    color: '#10b981',
    candidates: [
      { name: 'John Doe', role: 'Software Engineer', ta: 'Sarah Johnson', client: 'Acme Corp' },
      { name: 'Jane Smith', role: 'UX Designer', ta: 'Mike Peterson', client: 'Tech Innovations' }
    ]
  },
  { 
    stage: 'Interview', 
    count: 32, 
    color: '#f59e0b',
    candidates: [
      { name: 'Alice Brown', role: 'Product Manager', ta: 'Emma Wilson', client: 'Global Solutions' },
      { name: 'Bob Chen', role: 'Data Scientist', ta: 'John Taylor', client: 'Future Systems' }
    ]
  },
  { 
    stage: 'Offer', 
    count: 18, 
    color: '#3b82f6',
    candidates: [
      { name: 'Carol Davis', role: 'DevOps Engineer', ta: 'Rachel Garcia', client: 'Quantum Labs' }
    ]
  },
  { 
    stage: 'Onboarding', 
    count: 12, 
    color: '#8b5cf6',
    candidates: [
      { name: 'David Wilson', role: 'Software Engineer', ta: 'Sarah Johnson', client: 'Acme Corp' }
    ]
  }
];

// Mock secondary metrics data
export const mockSecondaryMetrics = [
  {
    title: 'Candidate Pipeline by TA',
    data: [
      { name: 'Sarah Johnson', value: 24 },
      { name: 'Mike Peterson', value: 19 },
      { name: 'Emma Wilson', value: 22 },
      { name: 'John Taylor', value: 18 },
      { name: 'Rachel Garcia', value: 16 }
    ]
  },
  {
    title: 'Interview-to-Offer Ratio',
    value: '67%',
    trend: 5,
    trendLabel: '5% better than last month'
  },
  {
    title: 'Partner Collaboration',
    value: '23%',
    data: [
      { name: 'Internal', value: 77 },
      { name: 'Partners', value: 23 }
    ]
  },
  {
    title: 'New Hire Performance',
    rating: 4.2,
    totalRatings: 48
  },
  {
    title: 'Stuck Candidates',
    count: 7,
    urgentCount: 3
  }
];
