
export interface Skill {
  id: string;
  name: string;
  category?: string;
  popularity?: number;
  created_at?: string;
  // Add these to match the expected type
  aliases?: string[];
  usageCount?: number;
  dateAdded?: string;
}
