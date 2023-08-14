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
      guests: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
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
          game_ids: string[]
          guest_id: string
          id: string
          night_id: string
        }
        Insert: {
          created_at?: string
          game_ids: string[]
          guest_id: string
          id?: string
          night_id: string
        }
        Update: {
          created_at?: string
          game_ids?: string[]
          guest_id?: string
          id?: string
          night_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_guest_id_fkey"
            columns: ["guest_id"]
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
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
