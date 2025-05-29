export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidate_journey_configs: {
        Row: {
          auto_proceed: boolean | null
          created_at: string | null
          id: string
          items: Json | null
          proceed_conditions: Json | null
          role_id: string | null
          stage_id: string
          stage_order: number
          stage_type: string
          updated_at: string | null
        }
        Insert: {
          auto_proceed?: boolean | null
          created_at?: string | null
          id?: string
          items?: Json | null
          proceed_conditions?: Json | null
          role_id?: string | null
          stage_id: string
          stage_order: number
          stage_type: string
          updated_at?: string | null
        }
        Update: {
          auto_proceed?: boolean | null
          created_at?: string | null
          id?: string
          items?: Json | null
          proceed_conditions?: Json | null
          role_id?: string | null
          stage_id?: string
          stage_order?: number
          stage_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_journey_configs_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_library: {
        Row: {
          created_at: string
          description: string | null
          domain: string
          id: string
          title: string
          validity_period: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          domain: string
          id?: string
          title: string
          validity_period?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          domain?: string
          id?: string
          title?: string
          validity_period?: string | null
        }
        Relationships: []
      }
      checklist_library: {
        Row: {
          created_at: string
          description: string | null
          id: string
          role_relevance: string[] | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          role_relevance?: string[] | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          role_relevance?: string[] | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          account_type: string | null
          assigned_hr: string | null
          budget_utilized: number | null
          client_tier: string | null
          contact: string | null
          created_at: string | null
          created_on: string | null
          email: string | null
          embedding: string | null
          health_score: number | null
          hiring_status: string | null
          id: string
          last_activity_date: string | null
          name: string
          notes: string | null
          status: string | null
          total_requirements: number | null
          updated_at: string | null
        }
        Insert: {
          account_type?: string | null
          assigned_hr?: string | null
          budget_utilized?: number | null
          client_tier?: string | null
          contact?: string | null
          created_at?: string | null
          created_on?: string | null
          email?: string | null
          embedding?: string | null
          health_score?: number | null
          hiring_status?: string | null
          id?: string
          last_activity_date?: string | null
          name: string
          notes?: string | null
          status?: string | null
          total_requirements?: number | null
          updated_at?: string | null
        }
        Update: {
          account_type?: string | null
          assigned_hr?: string | null
          budget_utilized?: number | null
          client_tier?: string | null
          contact?: string | null
          created_at?: string | null
          created_on?: string | null
          email?: string | null
          embedding?: string | null
          health_score?: number | null
          hiring_status?: string | null
          id?: string
          last_activity_date?: string | null
          name?: string
          notes?: string | null
          status?: string | null
          total_requirements?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content_repository: {
        Row: {
          content_url: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          stage_relevance: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          content_url?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          stage_relevance?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          content_url?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          stage_relevance?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      custom_fields: {
        Row: {
          created_at: string | null
          id: string
          label: string
          role_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          role_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          role_id?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_fields_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_roles: {
        Row: {
          created_at: string
          department: string
          description: string | null
          embedding: string | null
          employment_type: string
          experience_range: string
          id: string
          name: string
          recommended_certifications: string[] | null
          recommended_skills: string[] | null
          updated_at: string
          work_mode: string
        }
        Insert: {
          created_at?: string
          department: string
          description?: string | null
          embedding?: string | null
          employment_type: string
          experience_range: string
          id?: string
          name: string
          recommended_certifications?: string[] | null
          recommended_skills?: string[] | null
          updated_at?: string
          work_mode: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string | null
          embedding?: string | null
          employment_type?: string
          experience_range?: string
          id?: string
          name?: string
          recommended_certifications?: string[] | null
          recommended_skills?: string[] | null
          updated_at?: string
          work_mode?: string
        }
        Relationships: []
      }
      hiring_pipelines: {
        Row: {
          created_at: string
          id: string
          role_id: string
          stages: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id: string
          stages?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          stages?: Json
          updated_at?: string
        }
        Relationships: []
      }
      pipeline_templates: {
        Row: {
          created_at: string
          created_from_role: string | null
          id: string
          name: string
          stages: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_from_role?: string | null
          id?: string
          name: string
          stages?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_from_role?: string | null
          id?: string
          name?: string
          stages?: Json
          updated_at?: string
        }
        Relationships: []
      }
      requirements: {
        Row: {
          assigned_to: string | null
          budget_variance: string | null
          client_id: string
          created_at: string
          custom_jd: string | null
          description: string | null
          due_date: string | null
          embedding: string | null
          experience_variance: string | null
          hiring_manager: string | null
          id: string
          name: string
          priority: string
          role_id: string
          status: string
          updated_at: string
          vacancies: number
        }
        Insert: {
          assigned_to?: string | null
          budget_variance?: string | null
          client_id: string
          created_at?: string
          custom_jd?: string | null
          description?: string | null
          due_date?: string | null
          embedding?: string | null
          experience_variance?: string | null
          hiring_manager?: string | null
          id?: string
          name: string
          priority?: string
          role_id: string
          status?: string
          updated_at?: string
          vacancies?: number
        }
        Update: {
          assigned_to?: string | null
          budget_variance?: string | null
          client_id?: string
          created_at?: string
          custom_jd?: string | null
          description?: string | null
          due_date?: string | null
          embedding?: string | null
          experience_variance?: string | null
          hiring_manager?: string | null
          id?: string
          name?: string
          priority?: string
          role_id?: string
          status?: string
          updated_at?: string
          vacancies?: number
        }
        Relationships: [
          {
            foreignKeyName: "requirements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_skills: {
        Row: {
          id: string
          role_id: string | null
          skill_id: string | null
        }
        Insert: {
          id?: string
          role_id?: string | null
          skill_id?: string | null
        }
        Update: {
          id?: string
          role_id?: string | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_skills_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      role_tags: {
        Row: {
          id: string
          role_id: string | null
          tag_id: string | null
        }
        Insert: {
          id?: string
          role_id?: string | null
          tag_id?: string | null
        }
        Update: {
          id?: string
          role_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_tags_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          category: string
          client_id: string | null
          created_at: string | null
          created_by: string | null
          embedding: string | null
          employment_type: string
          external_name: string | null
          id: string
          is_template: boolean | null
          job_description: string | null
          max_experience: string
          min_experience: string
          name: string
          source_type: string | null
          template_id: string | null
          updated_at: string | null
          usage_count: number | null
          work_mode: string
        }
        Insert: {
          category: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          embedding?: string | null
          employment_type: string
          external_name?: string | null
          id?: string
          is_template?: boolean | null
          job_description?: string | null
          max_experience: string
          min_experience: string
          name: string
          source_type?: string | null
          template_id?: string | null
          updated_at?: string | null
          usage_count?: number | null
          work_mode: string
        }
        Update: {
          category?: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          embedding?: string | null
          employment_type?: string
          external_name?: string | null
          id?: string
          is_template?: boolean | null
          job_description?: string | null
          max_experience?: string
          min_experience?: string
          name?: string
          source_type?: string | null
          template_id?: string | null
          updated_at?: string | null
          usage_count?: number | null
          work_mode?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "global_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_analytics: {
        Row: {
          clicked_result_id: string | null
          created_at: string
          id: string
          results_count: number
          search_query: string
          search_time_ms: number | null
          search_type: string
          user_id: string | null
        }
        Insert: {
          clicked_result_id?: string | null
          created_at?: string
          id?: string
          results_count?: number
          search_query: string
          search_time_ms?: number | null
          search_type: string
          user_id?: string | null
        }
        Update: {
          clicked_result_id?: string | null
          created_at?: string
          id?: string
          results_count?: number
          search_query?: string
          search_time_ms?: number | null
          search_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      search_suggestions: {
        Row: {
          created_at: string
          frequency: number
          id: string
          query: string
          suggestion: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          frequency?: number
          id?: string
          query: string
          suggestion: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          frequency?: number
          id?: string
          query?: string
          suggestion?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          embedding: string | null
          id: string
          name: string
          popularity: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          name: string
          popularity?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          name?: string
          popularity?: number | null
        }
        Relationships: []
      }
      skills_library: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          role_relevance: string[] | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          role_relevance?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          role_relevance?: string[] | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
