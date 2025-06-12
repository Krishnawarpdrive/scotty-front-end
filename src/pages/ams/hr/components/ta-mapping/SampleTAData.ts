
export interface TAWorkloadData {
  id: string;
  name: string;
  workload: number;
  efficiency: number;
  skills: string[];
}

export interface TAProfile {
  id: string;
  name: string;
  email: string;
  availability: string;
}

export interface Requirement {
  id: string;
  name: string;
  client: string;
  priority: string;
  assignedTAs: string[];
}

export const sampleTAData: TAWorkloadData[] = [
  {
    id: '1',
    name: 'John Doe',
    workload: 75,
    efficiency: 85,
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: '2',
    name: 'Jane Smith',
    workload: 90,
    efficiency: 92,
    skills: ['Angular', 'Python', 'Java']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    workload: 60,
    efficiency: 78,
    skills: ['Vue.js', 'PHP', 'MySQL']
  }
];

export const sampleTAProfiles: TAProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    availability: 'Busy'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    availability: 'Available'
  }
];

export const sampleRequirements: Requirement[] = [
  {
    id: '1',
    name: 'Frontend Developer',
    client: 'Tech Corp',
    priority: 'High',
    assignedTAs: ['1']
  },
  {
    id: '2',
    name: 'Backend Developer',
    client: 'StartupXYZ',
    priority: 'Medium',
    assignedTAs: ['2']
  },
  {
    id: '3',
    name: 'Full Stack Developer',
    client: 'Enterprise Inc',
    priority: 'Low',
    assignedTAs: []
  }
];
