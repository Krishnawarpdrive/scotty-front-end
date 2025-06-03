
import { Candidate } from '../types/CandidateTypes';

export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Aditi Sharma',
    email: 'aditi.sharma@email.com',
    role: 'Network Administrator',
    status: {
      text: 'Schedule Interview',
      type: 'pending'
    },
    stage: 'phone-screening',
    priority: 'High',
    appliedDate: '2 days ago',
    experience: '5+ years',
    location: 'Mumbai, India',
    skills: ['Network Admin', 'Cisco', 'Linux', 'TCP/IP'],
    phone: '+91 98765 43210',
    score: 85,
    currentStage: 2,
    totalStages: 6,
    timeInStage: '2 days',
    hiring: 'Network Admin',
    interviewing: 'Technical',
    responsible: {
      name: 'John Doe',
      avatar: ''
    },
    timeSpent: '4 days',
    targetDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    role: 'Software Engineer',
    status: {
      text: 'Technical Review',
      type: 'interview'
    },
    stage: 'technical',
    priority: 'Medium',
    appliedDate: '5 days ago',
    experience: '3+ years',
    location: 'Bangalore, India',
    skills: ['React', 'Node.js', 'JavaScript', 'Python'],
    phone: '+91 98765 43211',
    score: 78,
    currentStage: 3,
    totalStages: 6,
    timeInStage: '1 day',
    hiring: 'Software Engineer',
    interviewing: 'Client Interview',
    responsible: {
      name: 'Jane Smith',
      avatar: ''
    },
    timeSpent: '7 days',
    targetDate: '2024-01-20'
  },
  {
    id: 3,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    role: 'UI/UX Designer',
    status: {
      text: 'Client Interview',
      type: 'interview'
    },
    stage: 'client-interview',
    priority: 'High',
    appliedDate: '1 week ago',
    experience: '4+ years',
    location: 'Pune, India',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    phone: '+91 98765 43212',
    score: 92,
    currentStage: 4,
    totalStages: 6,
    timeInStage: '3 days',
    hiring: 'UI/UX Designer',
    interviewing: 'Background Check',
    responsible: {
      name: 'Mike Johnson',
      avatar: ''
    },
    timeSpent: '10 days',
    targetDate: '2024-01-18'
  },
  {
    id: 4,
    name: 'Vikash Singh',
    email: 'vikash.singh@email.com',
    role: 'Data Analyst',
    status: {
      text: 'Aptitude Test',
      type: 'test'
    },
    stage: 'aptitude-test',
    priority: 'Medium',
    appliedDate: '3 days ago',
    experience: '2+ years',
    location: 'Delhi, India',
    skills: ['SQL', 'Python', 'Tableau', 'Excel'],
    phone: '+91 98765 43213',
    score: 70,
    currentStage: 3,
    totalStages: 6,
    timeInStage: '1 day',
    hiring: 'Data Analyst',
    interviewing: 'Aptitude Assessment',
    responsible: {
      name: 'Sarah Wilson',
      avatar: ''
    },
    timeSpent: '3 days',
    targetDate: '2024-01-22'
  },
  {
    id: 5,
    name: 'Ankita Mehta',
    email: 'ankita.mehta@email.com',
    role: 'DevOps Engineer',
    status: {
      text: 'Test In Progress',
      type: 'test'
    },
    stage: 'aptitude-test',
    priority: 'High',
    appliedDate: '4 days ago',
    experience: '3+ years',
    location: 'Hyderabad, India',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    phone: '+91 98765 43214',
    score: 88,
    currentStage: 3,
    totalStages: 6,
    timeInStage: '2 days',
    hiring: 'DevOps Engineer',
    interviewing: 'Technical Assessment',
    responsible: {
      name: 'David Chen',
      avatar: ''
    },
    timeSpent: '4 days',
    targetDate: '2024-01-21'
  }
];
