import { supabase } from './supabase';

export interface SignUpData {
    email: string;
    password: string;
    fullName: string;
    companyName?: string;
}

export interface SignInData {
    email: string;
    password: string;
}

/**
 * 회원가입
 */
export async function signUp({ email, password, fullName, companyName }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                company_name: companyName,
            },
        },
    });

    if (error) throw error;
    return data;
}

/**
 * 로그인
 */
export async function signIn({ email, password }: SignInData) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

/**
 * 로그아웃
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/**
 * 현재 세션 가져오기
 */
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
}

/**
 * 현재 사용자 정보 가져오기
 */
export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
}

/**
 * Google OAuth 로그인
 */
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (error) throw error;
    return data;
}

/**
 * GitHub OAuth 로그인
 */
export async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (error) throw error;
    return data;
}

/**
 * 비밀번호 재설정 요청
 */
export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) throw error;
}

/**
 * 비밀번호 업데이트
 */
export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) throw error;
}
