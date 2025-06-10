
export interface TAWorkloadData {
  id: string;
  name: string;
  workload: number;
  efficiency: number;
  skills: string[];
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
