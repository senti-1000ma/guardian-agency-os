'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Auth callback error:', error);
                router.push('/login?error=auth_failed');
                return;
            }

            if (data.session) {
                // Successfully authenticated
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                <p className="mt-4 text-slate-600 font-medium">로그인 중...</p>
            </div>
        </div>
    );
}
