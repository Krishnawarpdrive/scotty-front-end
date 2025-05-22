
import { Checklist } from '../types';

export const mockChecklists: Checklist[] = [
  {
    id: '1',
    name: 'General Onboarding',
    type: 'general',
    items: [
      { id: '1-1', text: 'Complete personal information form', completed: false },
      { id: '1-2', text: 'Sign confidentiality agreement', completed: false },
      { id: '1-3', text: 'Set up company email account', completed: false },
      { id: '1-4', text: 'Schedule orientation session', completed: false }
    ],
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Frontend Developer Checklist',
    type: 'role',
    roleId: 'role-1',
    items: [
      { id: '2-1', text: 'Set up development environment', completed: false },
      { id: '2-2', text: 'Review project architecture documents', completed: false },
      { id: '2-3', text: 'Complete Git workflow training', completed: false },
      { id: '2-4', text: 'Assign first task in JIRA', completed: false }
    ],
    createdAt: '2023-05-20T14:45:00Z',
    updatedAt: '2023-05-20T14:45:00Z'
  },
  {
    id: '3',
    name: 'Acme Corporation Onboarding',
    type: 'client',
    clientId: 'client-1',
    subdomain: 'region-north',
    items: [
      { id: '3-1', text: 'Review client documentation', completed: false },
      { id: '3-2', text: 'Set up client-specific access', completed: false },
      { id: '3-3', text: 'Schedule introduction call with client', completed: false },
      { id: '3-4', text: 'Complete client security training', completed: false }
    ],
    createdAt: '2023-06-05T09:15:00Z',
    updatedAt: '2023-06-05T09:15:00Z'
  }
];
