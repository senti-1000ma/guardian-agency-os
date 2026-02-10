'use client';

import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { RiskReport } from "@/components/RiskReport";
import { DiplomatChat } from "@/components/DiplomatChat";
import { ProjectsModule } from "@/components/dashboard/ProjectsModule";
import { ClientsModule } from "@/components/dashboard/ClientsModule";
import { InvoicesModule } from "@/components/dashboard/InvoicesModule";
import { CalendarModule } from "@/components/dashboard/CalendarModule";
import { DashboardHome } from "@/components/DashboardHome";
import {
    Shield,
    MessageSquare,
    LayoutDashboard,
    Users,
    FileText,
    Calendar,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronRight,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

type Module = 'dashboard' | 'projects' | 'clients' | 'invoices' | 'scanner' | 'diplomat' | 'calendar';

export default function Dashboard() {
    const [activeModule, setActiveModule] = useState<Module>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Project Modal State
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    // Scanner State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        if (confirm('정말 로그아웃하시겠습니까?')) {
            window.location.href = '/login';
        }
    };

    const handleSettings = () => {
        window.location.href = '/settings';
    };

    const handleNotifications = () => {
        alert('🔔 알림\n\n새로운 프로젝트 초대가 있습니다.\n청구서 INV-2024-002 결제 완료\n클라이언트 메시지 3건');
    };

    const handleFileSelect = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        setAnalysisData(null);
        setActiveModule('scanner'); // Auto-switch

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/ai/scan-contract', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error("Analysis failed");

            const data = await res.json();
            setAnalysisData(data);
        } catch (e) {
            setError("Failed to analyze contract. Please try again.");
            console.error(e);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex overflow-hidden relative">
            {/* New Project Modal */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">새 프로젝트 시작</h3>
                            <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">프로젝트명</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="예: E-Commerce 리브랜딩" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">클라이언트</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="고객사 이름" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">마감일</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">예상 견적</label>
                                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="₩" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setIsProjectModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors">취소</button>
                            <button onClick={() => setIsProjectModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">프로젝트 생성</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-md"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar (Light Theme) */}
            <aside className={clsx(
                "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 transform",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="h-full flex flex-col">
                    <div className="h-20 flex items-center px-8 border-b border-slate-100">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                            <Shield className="w-7 h-7 text-indigo-600" />
                            <span>Guardian OS</span>
                        </Link>
                        <button
                            className="ml-auto lg:hidden text-slate-400"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        <button
                            onClick={() => setIsProjectModalOpen(true)}
                            className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                        >
                            <FileText className="w-4 h-4" /> 새 프로젝트
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-1">
                        <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Menu
                        </div>
                        <NavItem
                            icon={<LayoutDashboard />}
                            label="대시보드"
                            isActive={activeModule === 'dashboard'}
                            onClick={() => setActiveModule('dashboard')}
                        />
                        <NavItem
                            icon={<Users />}
                            label="클라이언트"
                            isActive={activeModule === 'clients'}
                            onClick={() => setActiveModule('clients')}
                        />
                        <NavItem
                            icon={<FileText />}
                            label="프로젝트"
                            isActive={activeModule === 'projects'}
                            onClick={() => setActiveModule('projects')}
                        />
                        <NavItem
                            icon={<Calendar />}
                            label="스마트 캘린더"
                            isActive={activeModule === 'calendar'}
                            onClick={() => setActiveModule('calendar')}
                        />
                        <NavItem
                            icon={<CreditCard />}
                            label="청구 및 정산"
                            isActive={activeModule === 'invoices'}
                            onClick={() => setActiveModule('invoices')}
                        />

                        <div className="mt-8 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            AI Tools
                        </div>
                        <NavItem
                            icon={<Shield className="text-indigo-500" />}
                            label="독소조항 탐지기"
                            isActive={activeModule === 'scanner'}
                            onClick={() => setActiveModule('scanner')}
                        />
                        <NavItem
                            icon={<MessageSquare className="text-blue-500" />}
                            label="비즈니스 외교관"
                            isActive={activeModule === 'diplomat'}
                            onClick={() => setActiveModule('diplomat')}
                        />
                    </div>

                    <div className="p-6 border-t border-slate-100">
                        <div onClick={handleSettings} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
                                MK
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Minseok Kim</p>
                                <p className="text-xs text-slate-500 truncate">Pro Plan</p>
                            </div>
                            <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            className="text-slate-500"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-lg text-slate-800">Guardian OS</span>
                    </div>

                    <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2.5 w-96 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
                        <Search className="w-4 h-4 text-slate-400 mr-2" />
                        <input
                            type="text"
                            placeholder="프로젝트, 클라이언트, 계약서 검색..."
                            className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <button onClick={handleNotifications} className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Main Scroll Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        {activeModule === 'dashboard' && <DashboardHome />}

                        {activeModule === 'projects' && <ProjectsModule onCreateProject={() => setIsProjectModalOpen(true)} />}

                        {activeModule === 'clients' && <ClientsModule />}

                        {activeModule === 'invoices' && <InvoicesModule />}

                        {activeModule === 'calendar' && <CalendarModule />}

                        {activeModule === 'scanner' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold mb-2 text-slate-900">독소조항 탐지기</h2>
                                    <p className="text-slate-500">계약서를 업로드하면 AI가 위험한 조항을 찾아냅니다.</p>
                                </div>
                                <UploadZone onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
                                {error && (
                                    <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-center flex items-center justify-center gap-2">
                                        <Shield className="w-5 h-5" /> {error}
                                    </div>
                                )}
                                {analysisData && <RiskReport data={analysisData} />}
                            </div>
                        )}
                        {activeModule === 'diplomat' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold mb-2 text-slate-900">비즈니스 외교관</h2>
                                    <p className="text-slate-500">거친 생각을 정제된 비즈니스 언어로 다듬어 드립니다.</p>
                                </div>
                                <DiplomatChat />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            )}
        >
            <span className={clsx("transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")}>
                {icon}
            </span>
            {label}
            {isActive && <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />}
        </button>
    )
}
