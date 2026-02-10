'use client';

import { useState } from 'react';
import { Shield, Mail, Lock, Github, Chrome, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { signIn, signInWithGoogle, signInWithGitHub } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signIn({ email, password });
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Google 로그인에 실패했습니다.');
        }
    };

    const handleGitHubLogin = async () => {
        try {
            await signInWithGitHub();
        } catch (err: any) {
            setError(err.message || 'GitHub 로그인에 실패했습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6">
            {/* Back to Home */}
            <Link href="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">홈으로</span>
            </Link>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6 sm:mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900">
                        <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
                        <span>Guardian OS</span>
                    </Link>
                    <p className="text-slate-600 mt-2 text-sm sm:text-base">비즈니스를 지키는 가장 스마트한 방법</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">로그인</h1>

                    {error && (
                        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <Chrome className="w-5 h-5" />
                            <span className="text-sm sm:text-base">Google로 계속하기</span>
                        </button>
                        <button
                            onClick={handleGitHubLogin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm sm:text-base">GitHub로 계속하기</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500">또는 이메일로</span>
                        </div>
                    </div>

                    {/* Email Login Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                이메일
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                비밀번호
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-slate-600">로그인 유지</span>
                            </label>
                            <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                비밀번호 찾기
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 text-sm sm:text-base"
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-sm text-slate-600">
                        계정이 없으신가요?{' '}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            회원가입
                        </Link>
                    </p>
                </div>

                {/* Trust Badge */}
                <p className="text-center mt-6 text-xs text-slate-500">
                    🔒 안전한 end-to-end 암호화로 보호됩니다
                </p>
            </div>
        </div>
    );
}
