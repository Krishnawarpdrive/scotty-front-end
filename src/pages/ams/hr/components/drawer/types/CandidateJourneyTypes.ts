
export interface ContentItem {
  id: string;
  type: 'video' | 'document' | 'link' | 'question' | 'profile';
  title: string;
  content_url?: string;
  metadata?: Record<string, any>;
  stage_relevance: string[];
  created_at: string;
  updated_at: string;
}

export interface JourneyStageItem {
  id: string;
  content_item_id: string;
  mandatory: boolean;
  order: number;
  content_item?: ContentItem;
}

export interface CandidateJourneyConfig {
  id: string;
  role_id: string;
  stage_id: string;
  stage_order: number;
  stage_type: string;
  items: JourneyStageItem[];
  proceed_conditions: Record<string, any>;
  auto_proceed: boolean;
  created_at: string;
  updated_at: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config?: CandidateJourneyConfig;
  status: 'configured' | 'partially-configured' | 'not-configured';
}

export type ContentRepositoryTab = 'documents' | 'videos' | 'links' | 'questions' | 'profiles';
