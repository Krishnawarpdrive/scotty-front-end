
// Define available personas
export type PersonaType = 
  | 'ams'
  | 'hr'
  | 'ta'
  | 'candidate'
  | 'vendor'
  | 'interviewer'
  | 'client-hr'
  | 'bo';

// Interface for persona data
export interface PersonaConfig {
  id: PersonaType;
  name: string;
  description: string;
  routes: string[];
  permissions: string[];
  color: string;
}

// Persona configurations
export const personaConfigs: Record<PersonaType, PersonaConfig> = {
  ams: {
    id: 'ams',
    name: 'AMS Admin',
    description: 'Full system administration and oversight',
    routes: ['/ams/dashboard', '/ams/jobs', '/ams/candidates', '/ams/reports', '/ams/admin/users'],
    permissions: ['read:all', 'write:all', 'delete:all', 'admin:users'],
    color: 'bg-purple-100 text-purple-800'
  },
  hr: {
    id: 'hr',
    name: 'HR Manager',
    description: 'Human resources management and hiring oversight',
    routes: ['/ams/hr/dashboard', '/ams/hr/candidates', '/ams/hr/roles'],
    permissions: ['read:hr', 'write:hr', 'delete:hr'],
    color: 'bg-blue-100 text-blue-800'
  },
  ta: {
    id: 'ta',
    name: 'Talent Acquisition',
    description: 'Candidate sourcing and recruitment management',
    routes: ['/ams/ta/dashboard', '/ams/ta/candidates', '/ams/ta/pipeline'],
    permissions: ['read:ta', 'write:ta'],
    color: 'bg-green-100 text-green-800'
  },
  candidate: {
    id: 'candidate',
    name: 'Candidate',
    description: 'Job seeker with application tracking',
    routes: ['/ams/candidate/dashboard', '/candidate/applications', '/candidate/interviews'],
    permissions: ['read:own', 'write:own'],
    color: 'bg-yellow-100 text-yellow-800'
  },
  vendor: {
    id: 'vendor',
    name: 'Vendor',
    description: 'External recruitment partner',
    routes: ['/ams/vendors/dashboard', '/vendor/candidates', '/vendor/jobs'],
    permissions: ['read:vendor', 'write:vendor'],
    color: 'bg-orange-100 text-orange-800'
  },
  interviewer: {
    id: 'interviewer',
    name: 'Interviewer',
    description: 'Interview panel member and feedback provider',
    routes: ['/interviewer/schedule', '/interviewer/candidates', '/interviewer/feedback'],
    permissions: ['read:interview', 'write:feedback'],
    color: 'bg-indigo-100 text-indigo-800'
  },
  'client-hr': {
    id: 'client-hr',
    name: 'Client HR',
    description: 'Client-side human resources representative',
    routes: ['/client-hr/candidates', '/client-hr/jobs', '/client-hr/feedback'],
    permissions: ['read:client', 'approve:client'],
    color: 'bg-pink-100 text-pink-800'
  },
  bo: {
    id: 'bo',
    name: 'Business Owner',
    description: 'Executive oversight and strategic management',
    routes: ['/ams/executive/dashboard', '/bo/analytics', '/bo/reports'],
    permissions: ['read:all', 'write:all', 'delete:all', 'admin'],
    color: 'bg-red-100 text-red-800'
  },
};

// Get persona from user roles
export function getPersonaFromRoles(roles: string[]): PersonaType | null {
  // Priority order for persona assignment
  const personaPriority: PersonaType[] = ['bo', 'ams', 'hr', 'ta', 'client-hr', 'interviewer', 'vendor', 'candidate'];
  
  for (const persona of personaPriority) {
    if (roles.includes(persona)) {
      return persona;
    }
  }
  
  return null;
}

// Check if user has permission for a specific action
export function hasPermission(persona: PersonaType, permission: string): boolean {
  if (!personaConfigs[persona]) return false;
  return personaConfigs[persona].permissions.includes(permission);
}

// Get available routes for a persona
export function getPersonaRoutes(persona: PersonaType): string[] {
  if (!personaConfigs[persona]) return [];
  return personaConfigs[persona].routes;
}
