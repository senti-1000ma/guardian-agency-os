import { createClient } from '@supabase/supabase-js';

// Supabase 환경 변수 (나중에 설정 가능하도록 기본값 제공)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Browser client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';
};

// Type definitions
export type Profile = {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    company_name: string | null;
    created_at: string;
    updated_at: string;
};

export type Plan = {
    id: string;
    name: string;
    stripe_price_id: string | null;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    limits: Record<string, number>;
    created_at: string;
};

export type Subscription = {
    id: string;
    user_id: string;
    plan_id: string;
    status: 'active' | 'canceled' | 'past_due';
    stripe_subscription_id: string | null;
    stripe_customer_id: string | null;
    current_period_start: string | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    created_at: string;
    updated_at: string;
};
