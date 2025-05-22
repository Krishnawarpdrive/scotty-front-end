
export interface Skill {
  id: string;
  name: string;
  category?: string;
  popularity?: number;
  created_at?: string;
  aliases: string[];
  usageCount: number;
  dateAdded: string;
}
