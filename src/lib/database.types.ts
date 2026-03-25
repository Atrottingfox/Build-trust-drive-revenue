export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authority_assessments: {
        Row: {
          id: string
          contact_id: string | null
          name: string
          email: string
          archetype: string
          platform_preference: string | null
          monetization_goal: string | null
          content_struggle: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          contact_id?: string | null
          name: string
          email: string
          archetype: string
          platform_preference?: string | null
          monetization_goal?: string | null
          content_struggle?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          contact_id?: string | null
          name?: string
          email?: string
          archetype?: string
          platform_preference?: string | null
          monetization_goal?: string | null
          content_struggle?: string | null
          created_at?: string | null
        }
      }
      assessment_responses: {
        Row: {
          id: string
          assessment_id: string
          question_id: string
          answer: string
          score: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          assessment_id: string
          question_id: string
          answer: string
          score?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          assessment_id?: string
          question_id?: string
          answer?: string
          score?: Json | null
          created_at?: string | null
        }
      }
      assessment_flags: {
        Row: {
          id: string
          assessment_id: string
          flag_type: string
          flag_value: string
          created_at: string | null
        }
        Insert: {
          id?: string
          assessment_id: string
          flag_type: string
          flag_value: string
          created_at?: string | null
        }
        Update: {
          id?: string
          assessment_id?: string
          flag_type?: string
          flag_value?: string
          created_at?: string | null
        }
      }
      try_assessments: {
        Row: {
          id: string
          archetype: string
          archetype_scores: Record<string, number>
          archetype_method: string
          quiz_responses: Record<string, boolean>
          industry: string | null
          problem_area: string | null
          platforms: string[]
          posting_frequency: string | null
          phone: string | null
          team_size: string | null
          content_role: string | null
          generated_cadence: Record<string, unknown> | null
          calendly_booked: boolean
          sms_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          archetype: string
          archetype_scores: Record<string, number>
          archetype_method: string
          quiz_responses?: Record<string, boolean>
          industry?: string | null
          problem_area?: string | null
          platforms?: string[]
          posting_frequency?: string | null
          phone?: string | null
          team_size?: string | null
          content_role?: string | null
          generated_cadence?: Record<string, unknown> | null
          calendly_booked?: boolean
          sms_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          archetype?: string
          archetype_scores?: Record<string, number>
          archetype_method?: string
          quiz_responses?: Record<string, boolean>
          industry?: string | null
          problem_area?: string | null
          platforms?: string[]
          posting_frequency?: string | null
          phone?: string | null
          team_size?: string | null
          content_role?: string | null
          generated_cadence?: Record<string, unknown> | null
          calendly_booked?: boolean
          sms_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_feedback: {
        Row: {
          id: string
          assessment_id: string | null
          is_accurate: boolean
          comments: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          assessment_id?: string | null
          is_accurate: boolean
          comments?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          assessment_id?: string | null
          is_accurate?: boolean
          comments?: string | null
          created_at?: string | null
        }
      }
    }
  }
}