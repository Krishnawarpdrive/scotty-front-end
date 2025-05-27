
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
    phone: '+91 98765 43210'
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
    phone: '+91 98765 43211'
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
    phone: '+91 98765 43212'
  }
];
