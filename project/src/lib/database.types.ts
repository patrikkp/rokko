export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          currency: string;
          language: string;
          notification_days: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
          language?: string;
          notification_days?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          currency?: string;
          language?: string;
          notification_days?: number[] | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          name_hr: string;
          icon: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_hr: string;
          icon?: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          name_hr?: string;
          icon?: string;
          color?: string;
        };
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          name: string;
          brand: string | null;
          model: string | null;
          serial_number: string | null;
          purchase_date: string;
          purchase_price: number | null;
          currency: string;
          retailer_name: string | null;
          retailer_phone: string | null;
          retailer_email: string | null;
          retailer_website: string | null;
          warranty_months: number;
          eu_statutory_months: number;
          notes: string | null;
          receipt_url: string | null;
          manual_url: string | null;
          image_url: string | null;
          is_transferred: boolean;
          transfer_date: string | null;
          transfer_buyer_name: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          name: string;
          brand?: string | null;
          model?: string | null;
          serial_number?: string | null;
          purchase_date: string;
          purchase_price?: number | null;
          currency?: string;
          retailer_name?: string | null;
          retailer_phone?: string | null;
          retailer_email?: string | null;
          retailer_website?: string | null;
          warranty_months?: number;
          eu_statutory_months?: number;
          notes?: string | null;
          receipt_url?: string | null;
          manual_url?: string | null;
          image_url?: string | null;
          is_transferred?: boolean;
          transfer_date?: string | null;
          transfer_buyer_name?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          name?: string;
          brand?: string | null;
          model?: string | null;
          serial_number?: string | null;
          purchase_date?: string;
          purchase_price?: number | null;
          currency?: string;
          retailer_name?: string | null;
          retailer_phone?: string | null;
          retailer_email?: string | null;
          retailer_website?: string | null;
          warranty_months?: number;
          eu_statutory_months?: number;
          notes?: string | null;
          receipt_url?: string | null;
          manual_url?: string | null;
          image_url?: string | null;
          is_transferred?: boolean;
          transfer_date?: string | null;
          transfer_buyer_name?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      claim_logs: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: 'pending' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'resolved';
          resolution: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          status?: 'pending' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'resolved';
          resolution?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          status?: 'pending' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'resolved';
          resolution?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type ClaimLog = Database['public']['Tables']['claim_logs']['Row'];
