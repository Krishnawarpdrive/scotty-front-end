
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
  routes: string[];
  permissions: string[];
}

// Persona configurations
export const personaConfigs: Record<PersonaType, PersonaConfig> = {
  ams: {
    id: 'ams',
    name: 'AMS',
    routes: ['/ams/dashboard', '/ams/jobs', '/ams/candidates', '/ams/reports'],
    permissions: ['read:all', 'write:all', 'delete:all'],
  },
  hr: {
    id: 'hr',
    name: 'HR',
    routes: ['/hr/dashboard', '/hr/jobs', '/hr/candidates', '/hr/onboarding'],
    permissions: ['read:hr', 'write:hr', 'delete:hr'],
  },
  ta: {
    id: 'ta',
    name: 'Talent Acquisition',
    routes: ['/ta/dashboard', '/ta/jobs', '/ta/candidates', '/ta/pipeline'],
    permissions: ['read:ta', 'write:ta'],
  },
  candidate: {
    id: 'candidate',
    name: 'Candidate',
    routes: ['/candidate/profile', '/candidate/applications', '/candidate/interviews'],
    permissions: ['read:own', 'write:own'],
  },
  vendor: {
    id: 'vendor',
    name: 'Vendor',
    routes: ['/vendor/dashboard', '/vendor/candidates', '/vendor/jobs'],
    permissions: ['read:vendor', 'write:vendor'],
  },
  interviewer: {
    id: 'interviewer',
    name: 'Interviewer',
    routes: ['/interviewer/schedule', '/interviewer/candidates', '/interviewer/feedback'],
    permissions: ['read:interview', 'write:feedback'],
  },
  'client-hr': {
    id: 'client-hr',
    name: 'Client HR',
    routes: ['/client-hr/candidates', '/client-hr/jobs', '/client-hr/feedback'],
    permissions: ['read:client', 'approve:client'],
  },
  bo: {
    id: 'bo',
    name: 'Business Owner',
    routes: ['/bo/dashboard', '/bo/analytics', '/bo/reports', '/bo/settings'],
    permissions: ['read:all', 'write:all', 'delete:all', 'admin'],
  },
};

// Get persona from URL path
export function getPersonaFromPath(path: string): PersonaType | null {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0) {
    const personaId = segments[0] as PersonaType;
    if (personaId in personaConfigs) {
      return personaId;
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
