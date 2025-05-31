
export interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

export interface PipelineData {
  id?: string;
  role_id: string;
  stages: Stage[];
  created_at?: string;
  updated_at?: string;
}

export const defaultAvailableStages = [
  { id: 'phone', name: 'Phone Screening', category: 'internal' as const },
  { id: 'hygiene', name: 'Hygiene Screening', category: 'internal' as const },
  { id: 'background', name: 'Background Verification', category: 'verification' as const },
  { id: 'aptitude', name: 'Aptitude Test', category: 'internal' as const },
  { id: 'group', name: 'Group Discussion', category: 'internal' as const },
  { id: 'internal-interview', name: 'Internal Interview', category: 'internal' as const },
  { id: 'client-interview', name: 'Client Interview', category: 'client' as const },
  { id: 'partner-interview', name: 'Partner Interview', category: 'partner' as const },
  { id: 'external-interview', name: 'External Interview', category: 'external' as const },
];
