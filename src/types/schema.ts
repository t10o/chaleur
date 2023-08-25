export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      general_users: {
        Row: {
          created_at: string | null
          id: number
          like: string
          nickname: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          like: string
          nickname: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          like?: string
          nickname?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "general_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      horserace_payments: {
        Row: {
          created_at: string | null
          id: number
          race: number
          racecourse: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          race: number
          racecourse: number
        }
        Update: {
          created_at?: string | null
          id?: number
          race?: number
          racecourse?: number
        }
        Relationships: [
          {
            foreignKeyName: "horserace_payments_race_fkey"
            columns: ["race"]
            referencedRelation: "race"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "horserace_payments_racecourse_fkey"
            columns: ["racecourse"]
            referencedRelation: "racecourse"
            referencedColumns: ["id"]
          }
        ]
      }
      machine: {
        Row: {
          created_at: string | null
          id: number
          kind: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          kind: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          kind?: string
          name?: string
        }
        Relationships: []
      }
      pachislo_payments: {
        Row: {
          created_at: string | null
          id: number
          kind: string
          machine: number
          rate: number
          shop: number
          update_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          kind: string
          machine: number
          rate: number
          shop: number
          update_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          kind?: string
          machine?: number
          rate?: number
          shop?: number
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pachislo_payments_machine_fkey"
            columns: ["machine"]
            referencedRelation: "machine"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pachislo_payments_rate_fkey"
            columns: ["rate"]
            referencedRelation: "rate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pachislo_payments_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shop"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          created_at: string | null
          date: string
          horserace_payment_id: number | null
          id: number
          memo: string | null
          pachislo_payment_id: number | null
          pay: number
          payback: number
          update_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          date: string
          horserace_payment_id?: number | null
          id?: number
          memo?: string | null
          pachislo_payment_id?: number | null
          pay: number
          payback: number
          update_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          date?: string
          horserace_payment_id?: number | null
          id?: number
          memo?: string | null
          pachislo_payment_id?: number | null
          pay?: number
          payback?: number
          update_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_horserace_payment_id_fkey"
            columns: ["horserace_payment_id"]
            referencedRelation: "horserace_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_pachislo_payment_id_fkey"
            columns: ["pachislo_payment_id"]
            referencedRelation: "pachislo_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "general_users"
            referencedColumns: ["id"]
          }
        ]
      }
      race: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      race_detail: {
        Row: {
          age: number
          arrival_order: number
          class: string
          corner: string
          course_id: number
          course_kind: string
          course_state: string
          created_at: string
          date: string
          handicap: number
          horse_name: string
          horse_number: number
          id: number
          jockey: string
          odds: number
          passage_order: string
          population: number
          race_id: number
          race_name: string
          racecourse: string
          racecourse_name: string
          sex: string
          time: string
          up: number
          weather: string
          weight: number
          weight_change: number
        }
        Insert: {
          age: number
          arrival_order: number
          class: string
          corner: string
          course_id: number
          course_kind: string
          course_state: string
          created_at?: string
          date: string
          handicap: number
          horse_name: string
          horse_number: number
          id?: number
          jockey: string
          odds: number
          passage_order: string
          population: number
          race_id: number
          race_name: string
          racecourse: string
          racecourse_name: string
          sex: string
          time: string
          up: number
          weather: string
          weight: number
          weight_change: number
        }
        Update: {
          age?: number
          arrival_order?: number
          class?: string
          corner?: string
          course_id?: number
          course_kind?: string
          course_state?: string
          created_at?: string
          date?: string
          handicap?: number
          horse_name?: string
          horse_number?: number
          id?: number
          jockey?: string
          odds?: number
          passage_order?: string
          population?: number
          race_id?: number
          race_name?: string
          racecourse?: string
          racecourse_name?: string
          sex?: string
          time?: string
          up?: number
          weather?: string
          weight?: number
          weight_change?: number
        }
        Relationships: []
      }
      racecourse: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      rate: {
        Row: {
          created_at: string | null
          id: number
          kind: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          kind: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          kind?: string
          name?: string
        }
        Relationships: []
      }
      shop: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
