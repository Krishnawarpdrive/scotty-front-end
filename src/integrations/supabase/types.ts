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
      activity_logs: {
        Row: {
          action_description: string
          action_type: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          metadata: Json | null
          performed_by: string
        }
        Insert: {
          action_description: string
          action_type: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          metadata?: Json | null
          performed_by: string
        }
        Update: {
          action_description?: string
          action_type?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          metadata?: Json | null
          performed_by?: string
        }
        Relationships: []
      }
      approval_workflows: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approver_name: string | null
          created_at: string
          description: string | null
          id: string
          rejected_at: string | null
          request_data: Json
          requester_name: string
          status: string
          title: string
          updated_at: string
          urgency: string
          workflow_type: string
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approver_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          rejected_at?: string | null
          request_data?: Json
          requester_name: string
          status?: string
          title: string
          updated_at?: string
          urgency?: string
          workflow_type: string
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approver_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          rejected_at?: string | null
          request_data?: Json
          requester_name?: string
          status?: string
          title?: string
          updated_at?: string
          urgency?: string
          workflow_type?: string
        }
        Relationships: []
      }
      aptitude_test_sections: {
        Row: {
          aptitude_test_id: string
          created_at: string
          description: string | null
          id: string
          questions_count: number
          section_name: string
          section_type: string
          time_limit_minutes: number | null
          weightage: number | null
        }
        Insert: {
          aptitude_test_id: string
          created_at?: string
          description?: string | null
          id?: string
          questions_count?: number
          section_name: string
          section_type: string
          time_limit_minutes?: number | null
          weightage?: number | null
        }
        Update: {
          aptitude_test_id?: string
          created_at?: string
          description?: string | null
          id?: string
          questions_count?: number
          section_name?: string
          section_type?: string
          time_limit_minutes?: number | null
          weightage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aptitude_test_sections_aptitude_test_id_fkey"
            columns: ["aptitude_test_id"]
            isOneToOne: false
            referencedRelation: "aptitude_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      aptitude_tests: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          difficulty_level: string
          duration_minutes: number
          id: string
          instructions: string | null
          is_active: boolean | null
          passing_score: number
          skills_assessed: Json | null
          test_name: string
          total_questions: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          created_by: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          passing_score?: number
          skills_assessed?: Json | null
          test_name: string
          total_questions?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          passing_score?: number
          skills_assessed?: Json | null
          test_name?: string
          total_questions?: number
          updated_at?: string
        }
        Relationships: []
      }
      background_verification_sessions: {
        Row: {
          assigned_to: string | null
          candidate_id: string
          completed_at: string | null
          created_at: string
          created_by: string
          id: string
          notes: string | null
          overall_score: number | null
          partner_reference: string | null
          session_status: Database["public"]["Enums"]["verification_status"]
          sla_date: string | null
          started_at: string | null
          updated_at: string
          verification_partner: string | null
          verification_summary: Json | null
        }
        Insert: {
          assigned_to?: string | null
          candidate_id: string
          completed_at?: string | null
          created_at?: string
          created_by: string
          id?: string
          notes?: string | null
          overall_score?: number | null
          partner_reference?: string | null
          session_status?: Database["public"]["Enums"]["verification_status"]
          sla_date?: string | null
          started_at?: string | null
          updated_at?: string
          verification_partner?: string | null
          verification_summary?: Json | null
        }
        Update: {
          assigned_to?: string | null
          candidate_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string
          id?: string
          notes?: string | null
          overall_score?: number | null
          partner_reference?: string | null
          session_status?: Database["public"]["Enums"]["verification_status"]
          sla_date?: string | null
          started_at?: string | null
          updated_at?: string
          verification_partner?: string | null
          verification_summary?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "background_verification_sessions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_applications: {
        Row: {
          application_date: string | null
          candidate_id: string
          created_at: string | null
          id: string
          notes: string | null
          requirement_id: string
          source_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          application_date?: string | null
          candidate_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          requirement_id: string
          source_type?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          application_date?: string | null
          candidate_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          requirement_id?: string
          source_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_applications_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_aptitude_results: {
        Row: {
          administered_by: string | null
          aptitude_test_id: string
          candidate_id: string
          correct_answers: number
          created_at: string
          detailed_results: Json | null
          id: string
          notes: string | null
          score: number
          status: string
          test_completed_at: string | null
          test_started_at: string | null
          time_taken_minutes: number | null
          total_questions_attempted: number
          updated_at: string
        }
        Insert: {
          administered_by?: string | null
          aptitude_test_id: string
          candidate_id: string
          correct_answers?: number
          created_at?: string
          detailed_results?: Json | null
          id?: string
          notes?: string | null
          score: number
          status?: string
          test_completed_at?: string | null
          test_started_at?: string | null
          time_taken_minutes?: number | null
          total_questions_attempted?: number
          updated_at?: string
        }
        Update: {
          administered_by?: string | null
          aptitude_test_id?: string
          candidate_id?: string
          correct_answers?: number
          created_at?: string
          detailed_results?: Json | null
          id?: string
          notes?: string | null
          score?: number
          status?: string
          test_completed_at?: string | null
          test_started_at?: string | null
          time_taken_minutes?: number | null
          total_questions_attempted?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_aptitude_results_aptitude_test_id_fkey"
            columns: ["aptitude_test_id"]
            isOneToOne: false
            referencedRelation: "aptitude_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_aptitude_results_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_documents: {
        Row: {
          candidate_id: string
          created_at: string
          document_name: string
          document_type: Database["public"]["Enums"]["document_type"]
          expiry_date: string | null
          file_size: number | null
          file_url: string | null
          id: string
          metadata: Json | null
          mime_type: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          uploaded_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          document_name: string
          document_type: Database["public"]["Enums"]["document_type"]
          expiry_date?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          document_name?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          expiry_date?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_documents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
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
      candidate_progress: {
        Row: {
          candidate_id: string
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          progress_percentage: number | null
          stage_name: string
          status: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          stage_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          stage_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_progress_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_scheduling_preferences: {
        Row: {
          blackout_dates: Json | null
          candidate_id: string
          communication_preferences: Json | null
          created_at: string
          id: string
          preferred_days: Json | null
          preferred_time_slots: Json | null
          preferred_timezone: string
          updated_at: string
        }
        Insert: {
          blackout_dates?: Json | null
          candidate_id: string
          communication_preferences?: Json | null
          created_at?: string
          id?: string
          preferred_days?: Json | null
          preferred_time_slots?: Json | null
          preferred_timezone?: string
          updated_at?: string
        }
        Update: {
          blackout_dates?: Json | null
          candidate_id?: string
          communication_preferences?: Json | null
          created_at?: string
          id?: string
          preferred_days?: Json | null
          preferred_time_slots?: Json | null
          preferred_timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      candidate_section_scores: {
        Row: {
          correct_answers: number
          created_at: string
          id: string
          questions_attempted: number
          result_id: string
          score: number
          section_id: string
          time_taken_minutes: number | null
        }
        Insert: {
          correct_answers?: number
          created_at?: string
          id?: string
          questions_attempted?: number
          result_id: string
          score: number
          section_id: string
          time_taken_minutes?: number | null
        }
        Update: {
          correct_answers?: number
          created_at?: string
          id?: string
          questions_attempted?: number
          result_id?: string
          score?: number
          section_id?: string
          time_taken_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_section_scores_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "candidate_aptitude_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_section_scores_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "aptitude_test_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          applied_date: string | null
          created_at: string
          current_employer: string | null
          current_position: string | null
          current_stage: string
          email: string
          embedding: string | null
          experience_years: number | null
          id: string
          last_updated: string | null
          metadata: Json | null
          name: string
          phone: string | null
          requirement_id: string | null
          resume_url: string | null
          skills: Json | null
          source: string
          status: string
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          applied_date?: string | null
          created_at?: string
          current_employer?: string | null
          current_position?: string | null
          current_stage?: string
          email: string
          embedding?: string | null
          experience_years?: number | null
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          name: string
          phone?: string | null
          requirement_id?: string | null
          resume_url?: string | null
          skills?: Json | null
          source?: string
          status?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          applied_date?: string | null
          created_at?: string
          current_employer?: string | null
          current_position?: string | null
          current_stage?: string
          email?: string
          embedding?: string | null
          experience_years?: number | null
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          requirement_id?: string | null
          resume_url?: string | null
          skills?: Json | null
          source?: string
          status?: string
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_candidates_requirement_id"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_candidates_vendor_id"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
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
      client_roles: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          role_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          role_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_roles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "fk_custom_fields_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_requests: {
        Row: {
          candidate_id: string
          created_at: string
          document_type: Database["public"]["Enums"]["document_type"]
          due_date: string | null
          fulfilled_at: string | null
          id: string
          request_message: string | null
          requested_by: string
          status: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          document_type: Database["public"]["Enums"]["document_type"]
          due_date?: string | null
          fulfilled_at?: string | null
          id?: string
          request_message?: string | null
          requested_by: string
          status?: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          due_date?: string | null
          fulfilled_at?: string | null
          id?: string
          request_message?: string | null
          requested_by?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_requests_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      document_verification_results: {
        Row: {
          completed_at: string | null
          created_at: string
          document_id: string
          error_message: string | null
          id: string
          started_at: string | null
          updated_at: string
          verification_details: Json | null
          verification_provider: string | null
          verification_reference: string | null
          verification_score: number | null
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          document_id: string
          error_message?: string | null
          id?: string
          started_at?: string | null
          updated_at?: string
          verification_details?: Json | null
          verification_provider?: string | null
          verification_reference?: string | null
          verification_score?: number | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          document_id?: string
          error_message?: string | null
          id?: string
          started_at?: string | null
          updated_at?: string
          verification_details?: Json | null
          verification_provider?: string | null
          verification_reference?: string | null
          verification_score?: number | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "document_verification_results_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "candidate_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_comments: {
        Row: {
          comment_text: string
          comment_type: string | null
          created_at: string
          created_by: string
          entity_id: string
          entity_type: string
          id: string
          updated_at: string
        }
        Insert: {
          comment_text: string
          comment_type?: string | null
          created_at?: string
          created_by: string
          entity_id: string
          entity_type: string
          id?: string
          updated_at?: string
        }
        Update: {
          comment_text?: string
          comment_type?: string | null
          created_at?: string
          created_by?: string
          entity_id?: string
          entity_type?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      executive_client_insights: {
        Row: {
          client_id: string | null
          created_at: string
          generated_at: string
          id: string
          insight_data: Json
          insight_type: string
          is_active: boolean | null
          priority_score: number | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          generated_at?: string
          id?: string
          insight_data?: Json
          insight_type: string
          is_active?: boolean | null
          priority_score?: number | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          generated_at?: string
          id?: string
          insight_data?: Json
          insight_type?: string
          is_active?: boolean | null
          priority_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "executive_client_insights_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_metrics: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          measurement_date: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          period_type: string
          requirement_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          measurement_date?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
          period_type?: string
          requirement_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          measurement_date?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          period_type?: string
          requirement_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "executive_metrics_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "executive_metrics_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      executive_notifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_archived: boolean | null
          is_read: boolean | null
          message: string
          metadata: Json | null
          priority: string
          source_id: string | null
          source_type: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          priority?: string
          source_id?: string | null
          source_type: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          priority?: string
          source_id?: string | null
          source_type?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      executive_preferences: {
        Row: {
          created_at: string
          dashboard_layout: Json | null
          id: string
          kpi_preferences: Json | null
          notification_settings: Json | null
          theme_settings: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dashboard_layout?: Json | null
          id?: string
          kpi_preferences?: Json | null
          notification_settings?: Json | null
          theme_settings?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dashboard_layout?: Json | null
          id?: string
          kpi_preferences?: Json | null
          notification_settings?: Json | null
          theme_settings?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      handoff_documentation: {
        Row: {
          created_at: string | null
          created_by: string
          documentation: Json
          from_stage_id: string | null
          handoff_type: string
          id: string
          requirement_id: string | null
          reviewed_by: string | null
          status: string
          to_stage_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          documentation?: Json
          from_stage_id?: string | null
          handoff_type: string
          id?: string
          requirement_id?: string | null
          reviewed_by?: string | null
          status?: string
          to_stage_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          documentation?: Json
          from_stage_id?: string | null
          handoff_type?: string
          id?: string
          requirement_id?: string | null
          reviewed_by?: string | null
          status?: string
          to_stage_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "handoff_documentation_from_stage_id_fkey"
            columns: ["from_stage_id"]
            isOneToOne: false
            referencedRelation: "workflow_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "handoff_documentation_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "handoff_documentation_to_stage_id_fkey"
            columns: ["to_stage_id"]
            isOneToOne: false
            referencedRelation: "workflow_stages"
            referencedColumns: ["id"]
          },
        ]
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
      interview_conflicts: {
        Row: {
          conflict_description: string
          conflict_type: string
          created_at: string
          id: string
          interview_schedule_id: string
          resolved: boolean | null
          resolved_at: string | null
          suggested_alternatives: Json | null
        }
        Insert: {
          conflict_description: string
          conflict_type: string
          created_at?: string
          id?: string
          interview_schedule_id: string
          resolved?: boolean | null
          resolved_at?: string | null
          suggested_alternatives?: Json | null
        }
        Update: {
          conflict_description?: string
          conflict_type?: string
          created_at?: string
          id?: string
          interview_schedule_id?: string
          resolved?: boolean | null
          resolved_at?: string | null
          suggested_alternatives?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_conflicts_interview_schedule_id_fkey"
            columns: ["interview_schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_feedback: {
        Row: {
          answers_received: Json | null
          areas_for_improvement: string | null
          candidate_rating: number | null
          communication_score: number | null
          created_at: string
          cultural_fit_score: number | null
          detailed_feedback: string | null
          id: string
          interview_schedule_id: string
          overall_recommendation: string | null
          panelist_id: string
          questions_asked: Json | null
          strengths: string | null
          submitted_at: string | null
          technical_score: number | null
          updated_at: string
        }
        Insert: {
          answers_received?: Json | null
          areas_for_improvement?: string | null
          candidate_rating?: number | null
          communication_score?: number | null
          created_at?: string
          cultural_fit_score?: number | null
          detailed_feedback?: string | null
          id?: string
          interview_schedule_id: string
          overall_recommendation?: string | null
          panelist_id: string
          questions_asked?: Json | null
          strengths?: string | null
          submitted_at?: string | null
          technical_score?: number | null
          updated_at?: string
        }
        Update: {
          answers_received?: Json | null
          areas_for_improvement?: string | null
          candidate_rating?: number | null
          communication_score?: number | null
          created_at?: string
          cultural_fit_score?: number | null
          detailed_feedback?: string | null
          id?: string
          interview_schedule_id?: string
          overall_recommendation?: string | null
          panelist_id?: string
          questions_asked?: Json | null
          strengths?: string | null
          submitted_at?: string | null
          technical_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_feedback_interview_schedule_id_fkey"
            columns: ["interview_schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_feedback_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_panelists: {
        Row: {
          availability_status: string
          avatar_url: string | null
          bio: string | null
          certifications: Json | null
          created_at: string
          current_level: number | null
          department: string
          email: string
          feedback_score: number | null
          id: string
          interview_authorization_level: string | null
          interview_types: Json | null
          interviews_allocated_per_day: number | null
          interviews_converted_to_offers: number | null
          languages: Json | null
          location: string | null
          max_interviews_per_week: number | null
          monthly_interview_goal: number | null
          name: string
          panelist_id: string
          phone: string | null
          preferred_time_slots: Json | null
          projects_worked_on: Json | null
          rating: number | null
          seniority_level: string
          skills: Json | null
          status: string
          timezone: string | null
          title: string
          tools_used: Json | null
          total_interviews: number | null
          total_points: number | null
          updated_at: string
          weekly_feedback_goal: number | null
          xp_to_next_level: number | null
          years_experience: number | null
        }
        Insert: {
          availability_status?: string
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json | null
          created_at?: string
          current_level?: number | null
          department: string
          email: string
          feedback_score?: number | null
          id?: string
          interview_authorization_level?: string | null
          interview_types?: Json | null
          interviews_allocated_per_day?: number | null
          interviews_converted_to_offers?: number | null
          languages?: Json | null
          location?: string | null
          max_interviews_per_week?: number | null
          monthly_interview_goal?: number | null
          name: string
          panelist_id: string
          phone?: string | null
          preferred_time_slots?: Json | null
          projects_worked_on?: Json | null
          rating?: number | null
          seniority_level?: string
          skills?: Json | null
          status?: string
          timezone?: string | null
          title: string
          tools_used?: Json | null
          total_interviews?: number | null
          total_points?: number | null
          updated_at?: string
          weekly_feedback_goal?: number | null
          xp_to_next_level?: number | null
          years_experience?: number | null
        }
        Update: {
          availability_status?: string
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json | null
          created_at?: string
          current_level?: number | null
          department?: string
          email?: string
          feedback_score?: number | null
          id?: string
          interview_authorization_level?: string | null
          interview_types?: Json | null
          interviews_allocated_per_day?: number | null
          interviews_converted_to_offers?: number | null
          languages?: Json | null
          location?: string | null
          max_interviews_per_week?: number | null
          monthly_interview_goal?: number | null
          name?: string
          panelist_id?: string
          phone?: string | null
          preferred_time_slots?: Json | null
          projects_worked_on?: Json | null
          rating?: number | null
          seniority_level?: string
          skills?: Json | null
          status?: string
          timezone?: string | null
          title?: string
          tools_used?: Json | null
          total_interviews?: number | null
          total_points?: number | null
          updated_at?: string
          weekly_feedback_goal?: number | null
          xp_to_next_level?: number | null
          years_experience?: number | null
        }
        Relationships: []
      }
      interview_schedules: {
        Row: {
          candidate_id: string
          created_at: string
          created_by: string
          duration_minutes: number
          id: string
          interview_type: string
          location: string | null
          meeting_link: string | null
          metadata: Json | null
          notes: string | null
          panelist_id: string | null
          requirement_id: string | null
          scheduled_date: string
          status: string
          timezone: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          created_by: string
          duration_minutes?: number
          id?: string
          interview_type?: string
          location?: string | null
          meeting_link?: string | null
          metadata?: Json | null
          notes?: string | null
          panelist_id?: string | null
          requirement_id?: string | null
          scheduled_date: string
          status?: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          created_by?: string
          duration_minutes?: number
          id?: string
          interview_type?: string
          location?: string | null
          meeting_link?: string | null
          metadata?: Json | null
          notes?: string | null
          panelist_id?: string | null
          requirement_id?: string | null
          scheduled_date?: string
          status?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedules_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_schedules_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sessions: {
        Row: {
          candidate_name: string
          candidate_rating: number | null
          client_name: string
          created_at: string
          duration_minutes: number
          feedback: string | null
          id: string
          interview_date: string
          interview_type: string
          notes: string | null
          panelist_id: string
          panelist_rating: number | null
          role_name: string
          status: string
          updated_at: string
        }
        Insert: {
          candidate_name: string
          candidate_rating?: number | null
          client_name: string
          created_at?: string
          duration_minutes?: number
          feedback?: string | null
          id?: string
          interview_date: string
          interview_type: string
          notes?: string | null
          panelist_id: string
          panelist_rating?: number | null
          role_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          candidate_name?: string
          candidate_rating?: number | null
          client_name?: string
          created_at?: string
          duration_minutes?: number
          feedback?: string | null
          id?: string
          interview_date?: string
          interview_type?: string
          notes?: string | null
          panelist_id?: string
          panelist_rating?: number | null
          role_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_sessions_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_templates: {
        Row: {
          checklist_items: Json | null
          created_at: string
          created_by: string
          duration_minutes: number
          id: string
          interview_type: string
          is_active: boolean | null
          name: string
          questions: Json | null
          required_skills: Json | null
          updated_at: string
        }
        Insert: {
          checklist_items?: Json | null
          created_at?: string
          created_by: string
          duration_minutes?: number
          id?: string
          interview_type: string
          is_active?: boolean | null
          name: string
          questions?: Json | null
          required_skills?: Json | null
          updated_at?: string
        }
        Update: {
          checklist_items?: Json | null
          created_at?: string
          created_by?: string
          duration_minutes?: number
          id?: string
          interview_type?: string
          is_active?: boolean | null
          name?: string
          questions?: Json | null
          required_skills?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      interviewer_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          metadata: Json | null
          panelist_id: string | null
          points_awarded: number | null
          tier: string
          unlocked_at: string | null
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          panelist_id?: string | null
          points_awarded?: number | null
          tier?: string
          unlocked_at?: string | null
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          panelist_id?: string | null
          points_awarded?: number | null
          tier?: string
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviewer_achievements_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      interviewer_leaderboard: {
        Row: {
          category: string
          created_at: string | null
          id: string
          metadata: Json | null
          panelist_id: string | null
          period_end: string
          period_start: string
          period_type: string
          rank_position: number
          total_points: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          panelist_id?: string | null
          period_end: string
          period_start: string
          period_type: string
          rank_position: number
          total_points?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          panelist_id?: string | null
          period_end?: string
          period_start?: string
          period_type?: string
          rank_position?: number
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interviewer_leaderboard_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      interviewer_metrics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          panelist_id: string | null
          period_end: string
          period_start: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number
          panelist_id?: string | null
          period_end: string
          period_start: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          panelist_id?: string | null
          period_end?: string
          period_start?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviewer_metrics_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      interviewer_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          panelist_id: string | null
          streak_data: Json | null
          streak_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          panelist_id?: string | null
          streak_data?: Json | null
          streak_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          panelist_id?: string | null
          streak_data?: Json | null
          streak_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviewer_streaks_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      panelist_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          panelist_id: string
          start_time: string
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          panelist_id: string
          start_time: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          panelist_id?: string
          start_time?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "panelist_availability_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      panelist_skills: {
        Row: {
          created_at: string
          id: string
          panelist_id: string
          proficiency_level: string
          skill_name: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          panelist_id: string
          proficiency_level?: string
          skill_name: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          panelist_id?: string
          proficiency_level?: string
          skill_name?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "panelist_skills_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "interview_panelists"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          resource?: string
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
      quality_gate_validations: {
        Row: {
          created_at: string | null
          id: string
          quality_gate_id: string | null
          requirement_id: string | null
          validated_at: string | null
          validated_by: string | null
          validation_data: Json | null
          validation_notes: string | null
          validation_status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          quality_gate_id?: string | null
          requirement_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_data?: Json | null
          validation_notes?: string | null
          validation_status?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          quality_gate_id?: string | null
          requirement_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_data?: Json | null
          validation_notes?: string | null
          validation_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quality_gate_validations_quality_gate_id_fkey"
            columns: ["quality_gate_id"]
            isOneToOne: false
            referencedRelation: "quality_gates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_gate_validations_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_gates: {
        Row: {
          automatable: boolean | null
          created_at: string | null
          criteria: Json
          description: string | null
          gate_type: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          workflow_stage_id: string | null
        }
        Insert: {
          automatable?: boolean | null
          created_at?: string | null
          criteria?: Json
          description?: string | null
          gate_type: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          workflow_stage_id?: string | null
        }
        Update: {
          automatable?: boolean | null
          created_at?: string | null
          criteria?: Json
          description?: string | null
          gate_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          workflow_stage_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_gates_workflow_stage_id_fkey"
            columns: ["workflow_stage_id"]
            isOneToOne: false
            referencedRelation: "workflow_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      requirement_progress_logs: {
        Row: {
          id: string
          logged_at: string
          logged_by: string
          milestone_data: Json | null
          notes: string | null
          progress_percentage: number
          requirement_id: string | null
          stage_name: string
        }
        Insert: {
          id?: string
          logged_at?: string
          logged_by: string
          milestone_data?: Json | null
          notes?: string | null
          progress_percentage: number
          requirement_id?: string | null
          stage_name: string
        }
        Update: {
          id?: string
          logged_at?: string
          logged_by?: string
          milestone_data?: Json | null
          notes?: string | null
          progress_percentage?: number
          requirement_id?: string | null
          stage_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirement_progress_logs_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "fk_requirements_client_id"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_requirements_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
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
      role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_id: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
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
            foreignKeyName: "fk_role_skills_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_role_skills_skill_id"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
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
            foreignKeyName: "fk_role_tags_role_id"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_role_tags_tag_id"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
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
      ta_assignments: {
        Row: {
          assigned_at: string | null
          client_id: string
          created_at: string | null
          deadline: string | null
          id: string
          notes: string | null
          priority: string
          requirement_id: string
          status: string
          ta_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          client_id: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          notes?: string | null
          priority?: string
          requirement_id: string
          status?: string
          ta_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          client_id?: string
          created_at?: string | null
          deadline?: string | null
          id?: string
          notes?: string | null
          priority?: string
          requirement_id?: string
          status?: string
          ta_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ta_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ta_assignments_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ta_assignments_ta_id_fkey"
            columns: ["ta_id"]
            isOneToOne: false
            referencedRelation: "ta_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ta_profiles: {
        Row: {
          certifications: Json | null
          created_at: string | null
          current_workload: number | null
          efficiency_score: number | null
          email: string
          experience_years: number | null
          id: string
          max_workload: number | null
          name: string
          skills: Json | null
          status: string
          success_rate: number | null
          updated_at: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string | null
          current_workload?: number | null
          efficiency_score?: number | null
          email: string
          experience_years?: number | null
          id?: string
          max_workload?: number | null
          name: string
          skills?: Json | null
          status?: string
          success_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string | null
          current_workload?: number | null
          efficiency_score?: number | null
          email?: string
          experience_years?: number | null
          id?: string
          max_workload?: number | null
          name?: string
          skills?: Json | null
          status?: string
          success_rate?: number | null
          updated_at?: string | null
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
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          preferences: Json | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          active_requirements: number | null
          address: string | null
          billing_info: Json | null
          contact_email: string
          contact_phone: string | null
          contract_status: string | null
          created_at: string
          embedding: string | null
          id: string
          last_active_date: string | null
          name: string
          performance_metrics: Json | null
          primary_contact: string
          rating: number | null
          roles_assigned: number | null
          sla_status: string | null
          status: string
          tier: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          active_requirements?: number | null
          address?: string | null
          billing_info?: Json | null
          contact_email: string
          contact_phone?: string | null
          contract_status?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          last_active_date?: string | null
          name: string
          performance_metrics?: Json | null
          primary_contact: string
          rating?: number | null
          roles_assigned?: number | null
          sla_status?: string | null
          status?: string
          tier?: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          active_requirements?: number | null
          address?: string | null
          billing_info?: Json | null
          contact_email?: string
          contact_phone?: string | null
          contract_status?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          last_active_date?: string | null
          name?: string
          performance_metrics?: Json | null
          primary_contact?: string
          rating?: number | null
          roles_assigned?: number | null
          sla_status?: string | null
          status?: string
          tier?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: []
      }
      workflow_stages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          stage_order: number
          stage_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          stage_order: number
          stage_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          stage_order?: number
          stage_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      workflow_transitions: {
        Row: {
          created_at: string | null
          from_stage_id: string | null
          id: string
          requirement_id: string | null
          to_stage_id: string | null
          transition_data: Json | null
          transition_notes: string | null
          transition_type: string
          transitioned_by: string
        }
        Insert: {
          created_at?: string | null
          from_stage_id?: string | null
          id?: string
          requirement_id?: string | null
          to_stage_id?: string | null
          transition_data?: Json | null
          transition_notes?: string | null
          transition_type: string
          transitioned_by: string
        }
        Update: {
          created_at?: string | null
          from_stage_id?: string | null
          id?: string
          requirement_id?: string | null
          to_stage_id?: string | null
          transition_data?: Json | null
          transition_notes?: string | null
          transition_type?: string
          transitioned_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_transitions_from_stage_id_fkey"
            columns: ["from_stage_id"]
            isOneToOne: false
            referencedRelation: "workflow_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_to_stage_id_fkey"
            columns: ["to_stage_id"]
            isOneToOne: false
            referencedRelation: "workflow_stages"
            referencedColumns: ["id"]
          },
        ]
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
      get_user_roles: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["app_role"][]
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
      has_any_role: {
        Args: {
          user_uuid: string
          check_roles: Database["public"]["Enums"]["app_role"][]
        }
        Returns: boolean
      }
      has_permission: {
        Args: { user_uuid: string; resource_name: string; action_name: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          user_uuid: string
          check_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
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
      app_role:
        | "ams"
        | "hr"
        | "ta"
        | "candidate"
        | "vendor"
        | "interviewer"
        | "client-hr"
        | "bo"
      document_status:
        | "pending_upload"
        | "uploaded"
        | "under_review"
        | "verified"
        | "rejected"
        | "expired"
      document_type:
        | "resume"
        | "id_proof"
        | "address_proof"
        | "education_certificate"
        | "experience_letter"
        | "offer_letter"
        | "salary_slip"
        | "other"
      verification_status:
        | "not_started"
        | "in_progress"
        | "completed"
        | "failed"
        | "on_hold"
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
    Enums: {
      app_role: [
        "ams",
        "hr",
        "ta",
        "candidate",
        "vendor",
        "interviewer",
        "client-hr",
        "bo",
      ],
      document_status: [
        "pending_upload",
        "uploaded",
        "under_review",
        "verified",
        "rejected",
        "expired",
      ],
      document_type: [
        "resume",
        "id_proof",
        "address_proof",
        "education_certificate",
        "experience_letter",
        "offer_letter",
        "salary_slip",
        "other",
      ],
      verification_status: [
        "not_started",
        "in_progress",
        "completed",
        "failed",
        "on_hold",
      ],
    },
  },
} as const
