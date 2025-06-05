
import { TACandidate } from '../types/CandidateTypes';

export const mockCandidatesData: TACandidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    appliedRoles: [
      {
        id: 'r1',
        roleName: 'Senior Frontend Developer',
        clientName: 'TechCorp Inc',
        applicationDate: '2024-01-15',
        currentStage: 'Technical Interview',
        progress: 65,
        status: 'Active'
      },
      {
        id: 'r2',
        roleName: 'React Developer',
        clientName: 'StartupXYZ',
        applicationDate: '2024-01-10',
        currentStage: 'Final Round',
        progress: 85,
        status: 'Active'
      }
    ],
    source: 'Direct',
    experience: '5+ years',
    lastStage: 'Technical Interview',
    score: 4.2,
    status: 'Active',
    assignedTA: 'John Doe',
    nextAction: 'Schedule Final Interview',
    lastUpdated: '2024-01-20',
    avatar: '/avatars/sarah.jpg',
    currentPosition: 'Frontend Developer',
    currentCompany: 'Digital Solutions',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    documents: [
      {
        id: 'd1',
        name: 'Resume_Sarah_Johnson.pdf',
        type: 'Resume',
        url: '/documents/resume1.pdf',
        uploadedDate: '2024-01-15',
        status: 'Verified'
      },
      {
        id: 'd2',
        name: 'Portfolio_Link.txt',
        type: 'Portfolio',
        url: '/documents/portfolio1.txt',
        uploadedDate: '2024-01-15',
        status: 'Verified'
      }
    ],
    interviewHistory: [
      {
        id: 'i1',
        roleName: 'Senior Frontend Developer',
        interviewType: 'Phone Screening',
        date: '2024-01-18',
        interviewer: 'Mike Chen',
        status: 'Completed',
        feedback: 'Strong technical background, good communication skills',
        rating: 4
      }
    ],
    notes: [
      {
        id: 'n1',
        note: 'Candidate shows strong interest in React ecosystem. Available to start immediately.',
        author: 'John Doe',
        date: '2024-01-19',
        type: 'General'
      }
    ],
    timeline: [
      {
        id: 't1',
        title: 'Application Submitted',
        description: 'Applied for Senior Frontend Developer at TechCorp Inc',
        date: '2024-01-15',
        type: 'Application',
        icon: 'FileText'
      },
      {
        id: 't2',
        title: 'Phone Screening Completed',
        description: 'Interview with Mike Chen - Positive feedback',
        date: '2024-01-18',
        type: 'Interview',
        icon: 'Phone'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@email.com',
    phone: '+1 (555) 987-6543',
    appliedRoles: [
      {
        id: 'r3',
        roleName: 'Full Stack Engineer',
        clientName: 'DataFlow Systems',
        applicationDate: '2024-01-12',
        currentStage: 'Background Check',
        progress: 90,
        status: 'Active'
      }
    ],
    source: 'Vendor',
    experience: '7+ years',
    lastStage: 'Background Check',
    score: 4.5,
    status: 'Active',
    assignedTA: 'Jane Smith',
    nextAction: 'Review Background Check',
    lastUpdated: '2024-01-21',
    avatar: '/avatars/michael.jpg',
    currentPosition: 'Senior Developer',
    currentCompany: 'Tech Innovations',
    location: 'Austin, TX',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    documents: [
      {
        id: 'd3',
        name: 'Resume_Michael_Rodriguez.pdf',
        type: 'Resume',
        url: '/documents/resume2.pdf',
        uploadedDate: '2024-01-12',
        status: 'Verified'
      }
    ],
    interviewHistory: [
      {
        id: 'i2',
        roleName: 'Full Stack Engineer',
        interviewType: 'Technical Interview',
        date: '2024-01-16',
        interviewer: 'Sarah Wilson',
        status: 'Completed',
        feedback: 'Excellent problem-solving skills and system design knowledge',
        rating: 5
      }
    ],
    notes: [
      {
        id: 'n2',
        note: 'Exceptional candidate with strong full-stack experience. Background check in progress.',
        author: 'Jane Smith',
        date: '2024-01-20',
        type: 'General'
      }
    ],
    timeline: [
      {
        id: 't3',
        title: 'Application Submitted',
        description: 'Applied for Full Stack Engineer at DataFlow Systems',
        date: '2024-01-12',
        type: 'Application',
        icon: 'FileText'
      },
      {
        id: 't4',
        title: 'Technical Interview Completed',
        description: 'Interview with Sarah Wilson - Excellent performance',
        date: '2024-01-16',
        type: 'Interview',
        icon: 'Code'
      }
    ]
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    appliedRoles: [
      {
        id: 'r4',
        roleName: 'UX Designer',
        clientName: 'Creative Agency',
        applicationDate: '2024-01-14',
        currentStage: 'Portfolio Review',
        progress: 40,
        status: 'On Hold'
      }
    ],
    source: 'Job Board',
    experience: '3+ years',
    lastStage: 'Portfolio Review',
    score: 3.8,
    status: 'On Hold',
    assignedTA: 'David Lee',
    nextAction: 'Follow up on Portfolio',
    lastUpdated: '2024-01-19',
    currentPosition: 'UX Designer',
    currentCompany: 'Design Studio',
    location: 'New York, NY',
    skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Adobe Creative Suite'],
    documents: [
      {
        id: 'd4',
        name: 'Resume_Emily_Chen.pdf',
        type: 'Resume',
        url: '/documents/resume3.pdf',
        uploadedDate: '2024-01-14',
        status: 'Verified'
      },
      {
        id: 'd5',
        name: 'Portfolio_Emily_Chen.pdf',
        type: 'Portfolio',
        url: '/documents/portfolio2.pdf',
        uploadedDate: '2024-01-14',
        status: 'Pending'
      }
    ],
    interviewHistory: [],
    notes: [
      {
        id: 'n3',
        note: 'Portfolio review pending. Client feedback needed.',
        author: 'David Lee',
        date: '2024-01-18',
        type: 'Internal'
      }
    ],
    timeline: [
      {
        id: 't5',
        title: 'Application Submitted',
        description: 'Applied for UX Designer at Creative Agency',
        date: '2024-01-14',
        type: 'Application',
        icon: 'FileText'
      }
    ]
  }
];
