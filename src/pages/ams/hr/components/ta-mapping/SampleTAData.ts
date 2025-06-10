
export const sampleTAProfiles = [
  {
    id: 'ta-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    currentWorkload: 7,
    maxWorkload: 10,
    efficiencyScore: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    availability: 'available' as const,
    assignments: 3,
    department: 'Engineering',
    experience: '5+ years',
    lastActivity: '2 hours ago',
    successRate: 88,
    avgTimeToFill: '12 days'
  },
  {
    id: 'ta-002',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@company.com',
    currentWorkload: 9,
    maxWorkload: 10,
    efficiencyScore: 85,
    skills: ['Java', 'Spring', 'Microservices', 'AWS'],
    availability: 'busy' as const,
    assignments: 4,
    department: 'Engineering',
    experience: '7+ years',
    lastActivity: '1 hour ago',
    successRate: 91,
    avgTimeToFill: '10 days'
  },
  {
    id: 'ta-003',
    name: 'Emily Johnson',
    email: 'emily.johnson@company.com',
    currentWorkload: 4,
    maxWorkload: 8,
    efficiencyScore: 78,
    skills: ['Product Management', 'Agile', 'Analytics', 'SQL'],
    availability: 'available' as const,
    assignments: 2,
    department: 'Product',
    experience: '4+ years',
    lastActivity: '30 minutes ago',
    successRate: 82,
    avgTimeToFill: '15 days'
  },
  {
    id: 'ta-004',
    name: 'David Kim',
    email: 'david.kim@company.com',
    currentWorkload: 2,
    maxWorkload: 10,
    efficiencyScore: 95,
    skills: ['Data Science', 'Machine Learning', 'Python', 'R'],
    availability: 'available' as const,
    assignments: 1,
    department: 'Data',
    experience: '6+ years',
    lastActivity: '15 minutes ago',
    successRate: 94,
    avgTimeToFill: '8 days'
  },
  {
    id: 'ta-005',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    currentWorkload: 8,
    maxWorkload: 9,
    efficiencyScore: 89,
    skills: ['DevOps', 'Kubernetes', 'Docker', 'CI/CD'],
    availability: 'busy' as const,
    assignments: 3,
    department: 'Infrastructure',
    experience: '8+ years',
    lastActivity: '45 minutes ago',
    successRate: 87,
    avgTimeToFill: '11 days'
  },
  {
    id: 'ta-006',
    name: 'James Thompson',
    email: 'james.thompson@company.com',
    currentWorkload: 3,
    maxWorkload: 10,
    efficiencyScore: 72,
    skills: ['Sales', 'Business Development', 'CRM', 'Negotiation'],
    availability: 'available' as const,
    assignments: 2,
    department: 'Sales',
    experience: '3+ years',
    lastActivity: '1 hour ago',
    successRate: 75,
    avgTimeToFill: '18 days'
  }
];

export const sampleRequirements = [
  {
    id: 'req-001',
    name: 'Senior Software Engineer',
    client: 'TechCorp Inc.',
    priority: 'high' as const,
    targetCandidates: 15,
    targetInterviews: 8,
    targetClosures: 3,
    deadline: '2024-07-15',
    assignedTAs: ['ta-001', 'ta-002'],
    progress: {
      candidates: 12,
      interviews: 6,
      closures: 2
    },
    department: 'Engineering',
    experience: '5-8 years',
    urgency: 'Critical',
    budget: '$120k - $150k'
  },
  {
    id: 'req-002',
    name: 'Product Manager',
    client: 'StartupX',
    priority: 'medium' as const,
    targetCandidates: 10,
    targetInterviews: 5,
    targetClosures: 2,
    deadline: '2024-07-30',
    assignedTAs: ['ta-003'],
    progress: {
      candidates: 8,
      interviews: 3,
      closures: 1
    },
    department: 'Product',
    experience: '3-5 years',
    urgency: 'Normal',
    budget: '$90k - $110k'
  },
  {
    id: 'req-003',
    name: 'Data Scientist',
    client: 'DataFlow Ltd.',
    priority: 'low' as const,
    targetCandidates: 8,
    targetInterviews: 4,
    targetClosures: 2,
    deadline: '2024-08-15',
    assignedTAs: ['ta-004'],
    progress: {
      candidates: 6,
      interviews: 2,
      closures: 0
    },
    department: 'Data & Analytics',
    experience: '4-7 years',
    urgency: 'Low',
    budget: '$110k - $130k'
  },
  {
    id: 'req-004',
    name: 'DevOps Engineer',
    client: 'CloudTech Solutions',
    priority: 'high' as const,
    targetCandidates: 12,
    targetInterviews: 6,
    targetClosures: 2,
    deadline: '2024-07-20',
    assignedTAs: ['ta-005'],
    progress: {
      candidates: 9,
      interviews: 4,
      closures: 1
    },
    department: 'Infrastructure',
    experience: '5-10 years',
    urgency: 'High',
    budget: '$100k - $125k'
  },
  {
    id: 'req-005',
    name: 'Sales Executive',
    client: 'GrowthCorp',
    priority: 'medium' as const,
    targetCandidates: 20,
    targetInterviews: 10,
    targetClosures: 4,
    deadline: '2024-08-01',
    assignedTAs: ['ta-006'],
    progress: {
      candidates: 14,
      interviews: 7,
      closures: 2
    },
    department: 'Sales',
    experience: '2-4 years',
    urgency: 'Normal',
    budget: '$60k - $80k'
  }
];

export const sampleAIRecommendations = [
  {
    id: 'rec-001',
    taId: 'ta-004',
    requirementId: 'req-003',
    confidence: 96,
    reason: 'Perfect skill match for Data Science role with exceptional efficiency score',
    impact: '+30% faster time-to-fill expected',
    matchScore: {
      skills: 95,
      workload: 98,
      experience: 92,
      availability: 100
    }
  },
  {
    id: 'rec-002',
    taId: 'ta-003',
    requirementId: 'req-002',
    confidence: 88,
    reason: 'Strong Product Management background with good availability',
    impact: '+20% efficiency improvement',
    matchScore: {
      skills: 90,
      workload: 85,
      experience: 88,
      availability: 90
    }
  },
  {
    id: 'rec-003',
    taId: 'ta-001',
    requirementId: 'req-001',
    confidence: 92,
    reason: 'Excellent technical skills and proven track record',
    impact: '+25% success rate boost',
    matchScore: {
      skills: 93,
      workload: 70,
      experience: 95,
      availability: 85
    }
  }
];
