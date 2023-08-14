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
      nights: {
        Row: {
          bgg_account: string
          created_at: string
          expansions: boolean
          games_limit: number
          id: string
          scheduled_at: string
          voting_token: string
        }
        Insert: {
          bgg_account: string
          created_at?: string
          expansions: boolean
          games_limit: number
          id?: string
          scheduled_at: string
          voting_token?: string
        }
        Update: {
          bgg_account?: string
          created_at?: string
          expansions?: boolean
          games_limit?: number
          id?: string
          scheduled_at?: string
          voting_token?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          night_id: string
          selected_games: Json
          voter_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          night_id: string
          selected_games: Json
          voter_name: string
        }
        Update: {
          created_at?: string
          id?: string
          night_id?: string
          selected_games?: Json
          voter_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_night_id_fkey"
            columns: ["night_id"]
            referencedRelation: "nights"
            referencedColumns: ["id"]
          }
        ]
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
