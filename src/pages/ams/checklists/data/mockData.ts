
import { Checklist, ChecklistItem } from '../types';

export const mockChecklists: Checklist[] = [
  {
    id: '1',
    name: 'General Onboarding Checklist',
    type: 'general',
    items: [
      { id: '1', text: 'Send welcome email', completed: false },
      { id: '2', text: 'Setup company accounts', completed: false },
      { id: '3', text: 'Conduct initial orientation', completed: false },
      { id: '4', text: 'Complete paperwork', completed: false }
    ],
    createdAt: '2025-05-10T08:00:00.000Z',
    updatedAt: '2025-05-10T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'Tech Interview Process',
    type: 'role',
    roleId: '1',
    items: [
      { id: '1', text: 'Technical screening call', completed: false },
      { id: '2', text: 'Coding assessment', completed: false },
      { id: '3', text: 'System design interview', completed: false },
      { id: '4', text: 'Culture fit interview', completed: false }
    ],
    createdAt: '2025-05-11T10:30:00.000Z',
    updatedAt: '2025-05-11T10:30:00.000Z'
  },
  {
    id: '3',
    name: 'Acme Corp Compliance',
    type: 'client',
    clientId: '1',
    subdomain: 'region-north',
    items: [
      { id: '1', text: 'NDA signing', completed: false },
      { id: '2', text: 'Security clearance', completed: false },
      { id: '3', text: 'Client-specific training', completed: false }
    ],
    createdAt: '2025-05-12T14:15:00.000Z',
    updatedAt: '2025-05-12T14:15:00.000Z'
  },
  {
    id: '4',
    name: 'Sales Team Onboarding',
    type: 'role',
    roleId: '2',
    items: [
      { id: '1', text: 'CRM training', completed: false },
      { id: '2', text: 'Product knowledge session', completed: false },
      { id: '3', text: 'Sales methodology training', completed: false },
      { id: '4', text: 'Territory assignment', completed: false }
    ],
    createdAt: '2025-05-13T09:45:00.000Z',
    updatedAt: '2025-05-13T09:45:00.000Z'
  },
  {
    id: '5',
    name: 'GlobalTech Recruitment Process',
    type: 'client',
    clientId: '2',
    subdomain: 'department-hr',
    items: [
      { id: '1', text: 'Initial client screening', completed: false },
      { id: '2', text: 'Custom assessment', completed: false },
      { id: '3', text: 'Client interview coordination', completed: false },
      { id: '4', text: 'Offer management', completed: false }
    ],
    createdAt: '2025-05-14T11:20:00.000Z',
    updatedAt: '2025-05-14T11:20:00.000Z'
  }
];

// Mock roles for selection in role-based checklists
export const roles = [
  { id: '1', name: 'Software Engineer' },
  { id: '2', name: 'Sales Representative' },
  { id: '3', name: 'UX Designer' },
  { id: '4', name: 'Product Manager' },
  { id: '5', name: 'DevOps Engineer' }
];

// Mock clients for selection in client-based checklists
export const clients = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'GlobalTech Industries' },
  { id: '3', name: 'Innovate Solutions' },
  { id: '4', name: 'Tech Startup Inc.' },
  { id: '5', name: 'Enterprise Systems' }
];

export const useMockData = () => {
  return {
    roles,
    clients
  };
};
