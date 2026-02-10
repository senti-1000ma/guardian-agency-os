'use client';

import { FileText, Users, CreditCard, TrendingUp, Plus, Shield, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function DashboardHome() {
    const stats = [
        { label: '진행 중인 프로젝트', value: '5', change: '+2', icon: FileText, color: 'indigo' },
        { label: '활성 클라이언트', value: '12', change: '+3', icon: Users, color: 'cyan' },
        { label: '이번 달 매출', value: '₩8.5M', change: '+12%', icon: CreditCard, color: 'emerald' },
        { label: '독소조항 탐지', value: '3건', change: 'saved', icon: Shield, color: 'rose' },
    ];

    const quickActions = [
        { label: '계약서 스캔', icon: Shield, href: '/dashboard?module=scanner', color: 'indigo' },
        { label: '메시지 다듬기', icon: MessageSquare, href: '/dashboard?module=diplomat', color: 'cyan' },
        { label: '새 프로젝트', icon: Plus, href: '/dashboard?module=projects', color: 'emerald' },
        { label: '청구서 발행', icon: CreditCard, href: '/dashboard?module=invoices', color: 'purple' },
    ];

    const recentActivity = [
        { type: 'contract', title: 'E-Comm계약서 검토 완료', time: '2시간 전', status: 'completed' },
        { type: 'invoice', title: 'INV-2024-002 결제 완료', time: '5시간 전', status: 'completed' },
        { type: 'project', title: '브랜드 리뉴얼 프로젝트 시작', time: '1일 전', status: 'in_progress' },
        { type: 'client', title: '새 클라이언트: Wayne Ent', time: '2일 전', status: 'completed' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 sm:space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">안녕하세요, Minseok님 👋</h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">오늘도 안전한 비즈니스를 시작해보세요.</p>
            </div>

            {/* Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                            </div>
                            <span className={`text-xs sm:text-sm font-bold px-2 py-1 rounded-full bg-${stat.color}-50 text-${stat.color}-700`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-xl sm:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions - Mobile Optimized */}
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">빠른 작업</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {quickActions.map((action, idx) => (
                        <Link key={idx} href={action.href}>
                            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md hover:border-indigo-300 transition-all group cursor-pointer">
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-${action.color}-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                                    <action.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${action.color}-600`} />
                                </div>
                                <div className="text-sm sm:text-base font-bold text-slate-900">{action.label}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Activity Timeline & Tips - Mobile Stack */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">최근 활동</h2>
                    <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-3 sm:gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.status === 'completed' ? 'bg-emerald-50' : 'bg-indigo-50'
                                    }`}>
                                    {activity.status === 'completed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                        <Clock className="w-5 h-5 text-indigo-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{activity.title}</p>
                                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tips */}
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">오늘의 팁 💡</h2>
                    <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">계약서 독소조항, AI가 찾아드립니다</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                            '무제한 수정', '저작권 양도' 등 위험한 조항을 AI가 3초 만에 찾아냅니다. 지금 바로 계약서를 스캔해보세요!
                        </p>
                        <Link href="/dashboard?module=scanner">
                            <button className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors text-sm">
                                계약서 스캔하기
                            </button>
                        </Link>
                    </div>

                    {/* Upgrade CTA - Mobile Optimized */}
                    <div className="mt-4 sm:mt-6 bg-gradient-to-br from-slate-900 to-indigo-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Starter Plan</div>
                        <h3 className="font-bold mb-2 text-sm sm:text-base">Pro로 업그레이드하세요</h3>
                        <p className="text-xs sm:text-sm text-slate-300 mb-4">무제한 AI 기능과 클라이언트 포털을 이용하세요.</p>
                        <Link href="/pricing">
                            <button className="w-full bg-cyan-500 text-slate-900 py-2.5 px-4 rounded-xl font-bold hover:bg-cyan-400 transition-colors text-sm">
                                업그레이드 →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
