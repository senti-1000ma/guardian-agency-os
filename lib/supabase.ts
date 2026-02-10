import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
