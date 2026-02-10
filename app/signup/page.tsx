'use client';

import { useState } from 'react';
import { Shield, Mail, Lock, User, Building, ArrowLeft, Chrome, Github } from 'lucide-react';
import Link from 'next/link';
import { signUp, signInWithGoogle, signInWithGitHub } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        companyName: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('비밀번호는 최소 8자 이상이어야 합니다.');
            setIsLoading(false);
            return;
        }

        if (!agreedToTerms) {
            setError('이용약관 및 개인정보 처리방침에 동의해주세요.');
            setIsLoading(false);
            return;
        }

        try {
            await signUp({
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                companyName: formData.companyName || undefined,
            });

            // Success - redirect to email verification page or dashboard
            alert('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
            router.push('/login');
        } catch (err: any) {
            setError(err.message || '회원가입에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
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
                    <p className="text-slate-600 mt-2 text-sm sm:text-base">14일 무료 체험, 카드 등록 불필요</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">무료로 시작하기</h1>

                    {error && (
                        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={signInWithGoogle}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <Chrome className="w-5 h-5" />
                            <span className="text-sm sm:text-base">Google로 시작하기</span>
                        </button>
                        <button
                            onClick={signInWithGitHub}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm sm:text-base">GitHub로 시작하기</span>
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

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                이름 *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="홍길동"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                이메일 *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                회사명 (선택)
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="회사명 또는 스튜디오명"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                비밀번호 *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="최소 8자"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                비밀번호 확인 *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="비밀번호 재입력"
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="text-sm text-slate-600">
                                <Link href="/terms" className="text-indigo-600 hover:underline">이용약관</Link> 및{' '}
                                <Link href="/privacy" className="text-indigo-600 hover:underline">개인정보 처리방침</Link>에 동의합니다. *
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 text-sm sm:text-base"
                        >
                            {isLoading ? '가입 중...' : '무료로 시작하기'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-sm text-slate-600">
                        이미 계정이 있으신가요?{' '}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            로그인
                        </Link>
                    </p>
                </div>

                {/* Trust Badge */}
                <p className="text-center mt-6 text-xs text-slate-500">
                    🔒 카드 등록 없이 14일 무료 체험 가능
                </p>
            </div>
        </div>
    );
}
