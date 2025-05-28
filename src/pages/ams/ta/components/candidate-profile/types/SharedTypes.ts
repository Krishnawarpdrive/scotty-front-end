
export interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  order: number;
}

export interface Role {
  id: string;
  name: string;
  stages: Stage[];
}
