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
          employment_type: string
          external_name: string | null
          id: string
          is_template: boolean | null
          job_description: string | null
          max_experience: string
          min_experience: string
          name: string
          updated_at: string | null
          usage_count: number | null
          work_mode: string
        }
        Insert: {
          category: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          employment_type: string
          external_name?: string | null
          id?: string
          is_template?: boolean | null
          job_description?: string | null
          max_experience: string
          min_experience: string
          name: string
          updated_at?: string | null
          usage_count?: number | null
          work_mode: string
        }
        Update: {
          category?: string
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          employment_type?: string
          external_name?: string | null
          id?: string
          is_template?: boolean | null
          job_description?: string | null
          max_experience?: string
          min_experience?: string
          name?: string
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
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
          popularity: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          popularity?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          popularity?: number | null
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
      [_ in never]: never
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
