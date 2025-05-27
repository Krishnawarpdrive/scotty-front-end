
import { Candidate } from "../types/CandidateTypes";

export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Aditi Sharma',
    role: 'Network Administrator',
    hiring: 'Innovation Labs',
    interviewing: 'Network Administrator',
    stage: 4,
    responsible: { name: 'Uma Kunniah' },
    status: { text: 'Schedule Interview', type: 'scheduled', time: '2d' },
    timeSpent: '2d 5h',
    targetDate: '18 Apr 2025'
  },
  {
    id: 2,
    name: 'Neha Gupta',
    role: 'Product Manager',
    hiring: 'Tech Corp Inc.',
    interviewing: 'Product Manager',
    stage: 5,
    responsible: { name: 'Neha Gupta' },
    status: { text: 'Feedback Awaited', type: 'awaited', time: '4h' },
    timeSpent: '4d 2h',
    targetDate: '20 Apr 2025'
  },
  {
    id: 3,
    name: 'Summit Chandhar',
    role: 'DevOps Engineer',
    hiring: 'Tech Corp Inc.',
    interviewing: 'DevOps Engineer',
    stage: 4,
    responsible: { name: 'Summit Chandhar' },
    status: { text: 'Feedback Delay', type: 'delay', time: '1d' },
    timeSpent: '3d 4h',
    targetDate: '17 Apr 2025'
  },
  {
    id: 4,
    name: 'Sneha Patil',
    role: 'Marketing Executive',
    hiring: 'Tech Corp Inc.',
    interviewing: 'Marketing Executive',
    stage: 6,
    responsible: { name: 'Sneha Patil' },
    status: { text: 'Need to Send Offer', type: 'needs', time: '4h' },
    timeSpent: '1d 12h',
    targetDate: '22 Apr 2025'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Network Administrator',
    hiring: 'Innovation Labs',
    interviewing: 'Network Administrator',
    stage: 5,
    responsible: { name: 'Vikram Singh' },
    status: { text: 'Scheduled', type: 'scheduled', date: '14 Apr' },
    timeSpent: '3d 1h',
    targetDate: '23 Apr 2025'
  }
];
