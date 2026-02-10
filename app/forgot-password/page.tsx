'use client';

import { useState } from 'react';
import { Shield, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { resetPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || '비밀번호 재설정에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">이메일을 확인하세요</h2>
                        <p className="text-slate-600 mb-6 text-sm sm:text-base">
                            <strong>{email}</strong>로 비밀번호 재설정 링크를 보냈습니다.
                        </p>
                        <Link href="/login">
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                로그인으로 돌아가기
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex items-center justify-center p-4 sm:p-6">
            {/* Back to Login */}
            <Link href="/login" className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">로그인으로</span>
            </Link>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6 sm:mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900">
                        <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
                        <span>Guardian OS</span>
                    </Link>
                    <p className="text-slate-600 mt-2 text-sm sm:text-base">비밀번호를 잊으셨나요?</p>
                </div>

                {/* Reset Password Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">비밀번호 재설정</h1>
                    <p className="text-slate-600 mb-6 text-sm sm:text-base">
                        가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleResetPassword} className="space-y-4">
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 text-sm sm:text-base"
                        >
                            {isLoading ? '전송 중...' : '재설정 링크 보내기'}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-center mt-6 text-sm text-slate-600">
                        비밀번호가 기억나셨나요?{' '}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
