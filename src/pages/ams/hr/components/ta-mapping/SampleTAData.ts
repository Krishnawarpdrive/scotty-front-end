
export interface TAProfile {
  id: string;
  name: string;
  email: string;
  currentWorkload: number;
  maxWorkload: number;
  efficiencyScore: number;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  assignments: number;
  department: string;
  experience: number;
  lastActivity: string;
  successRate: number;
  avgTimeToFill: number;
}

export interface Requirement {
  id: string;
  name: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  targetCandidates: number;
  targetInterviews: number;
  targetClosures: number;
  deadline: string;
  assignedTAs: string[];
  progress: {
    candidates: number;
    interviews: number;
    closures: number;
  };
}

export interface AIRecommendation {
  id: string;
  taId: string;
  requirementId: string;
  confidence: number;
  reason: string;
  impact: string;
}

export const sampleTAProfiles: TAProfile[] = [
  {
    id: 'ta-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    currentWorkload: 7,
    maxWorkload: 10,
    efficiencyScore: 92,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    availability: 'available',
    assignments: 12,
    department: 'Engineering',
    experience: 5,
    lastActivity: '2024-01-15',
    successRate: 85,
    avgTimeToFill: 14
  },
  {
    id: 'ta-2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    currentWorkload: 9,
    maxWorkload: 10,
    efficiencyScore: 88,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    availability: 'busy',
    assignments: 15,
    department: 'Backend',
    experience: 7,
    lastActivity: '2024-01-14',
    successRate: 78,
    avgTimeToFill: 18
  },
  {
    id: 'ta-3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    currentWorkload: 5,
    maxWorkload: 10,
    efficiencyScore: 95,
    skills: ['UI/UX', 'Figma', 'React', 'CSS'],
    availability: 'available',
    assignments: 8,
    department: 'Design',
    experience: 4,
    lastActivity: '2024-01-16',
    successRate: 92,
    avgTimeToFill: 12
  }
];

export const sampleRequirements: Requirement[] = [
  {
    id: 'req-1',
    name: 'Senior Frontend Developer',
    client: 'TechCorp Inc.',
    priority: 'high',
    targetCandidates: 50,
    targetInterviews: 10,
    targetClosures: 2,
    deadline: '2024-02-15',
    assignedTAs: ['ta-1'],
    progress: {
      candidates: 32,
      interviews: 6,
      closures: 1
    }
  },
  {
    id: 'req-2',
    name: 'DevOps Engineer',
    client: 'StartupXYZ',
    priority: 'medium',
    targetCandidates: 30,
    targetInterviews: 8,
    targetClosures: 1,
    deadline: '2024-02-28',
    assignedTAs: ['ta-2'],
    progress: {
      candidates: 18,
      interviews: 4,
      closures: 0
    }
  },
  {
    id: 'req-3',
    name: 'UX Designer',
    client: 'DesignStudio',
    priority: 'low',
    targetCandidates: 25,
    targetInterviews: 5,
    targetClosures: 1,
    deadline: '2024-03-10',
    assignedTAs: [],
    progress: {
      candidates: 8,
      interviews: 2,
      closures: 0
    }
  }
];

export const sampleAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    taId: 'ta-3',
    requirementId: 'req-3',
    confidence: 94,
    reason: 'Perfect skill match and high efficiency score',
    impact: 'Expected 20% faster completion'
  },
  {
    id: 'rec-2',
    taId: 'ta-1',
    requirementId: 'req-2',
    confidence: 78,
    reason: 'Available capacity and relevant experience',
    impact: 'Balanced workload distribution'
  }
];
