'use client';

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardHome } from "@/components/DashboardHome";
import { MousePointer2, FolderKanban, Users, FileSearch } from "lucide-react";

// Mock 뷰 컴포넌트들
function ProjectsView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900">프로젝트</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold">+ 새 프로젝트</button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <FolderKanban className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h3 className="font-bold text-slate-900">Project Alpha {i}</h3>
                                <p className="text-sm text-slate-500">진행 중</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">진행률</span>
                                <span className="font-bold text-indigo-600">{65 + i * 5}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${65 + i * 5}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ClientsView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900">클라이언트</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold">+ 클라이언트 추가</button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left p-4 font-bold text-slate-700">클라이언트</th>
                            <th className="text-left p-4 font-bold text-slate-700">프로젝트</th>
                            <th className="text-left p-4 font-bold text-slate-700">상태</th>
                            <th className="text-left p-4 font-bold text-slate-700">매출</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['J&Company', 'TechCorp', 'StartupXYZ'].map((name, i) => (
                            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-8 h-8 text-indigo-600" />
                                        <span className="font-bold text-slate-900">{name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600">{i + 2}개</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold">활성</span>
                                </td>
                                <td className="p-4 font-bold text-slate-900">₩{(i + 2) * 1250000}만</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ContractScanView() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">계약서 독소조항 탐지</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer">
                    <FileSearch className="w-16 h-16 text-slate-400 mb-4" />
                    <p className="text-slate-600 font-medium">PDF 파일을 드래그하거나 클릭하세요</p>
                    <p className="text-sm text-slate-400 mt-2">최대 10MB</p>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-orange-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                        <h3 className="font-bold text-slate-900">최근 검사 결과</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4">
                            <p className="font-bold text-rose-600 mb-1">치명적 위험 2건 발견</p>
                            <p className="text-sm text-slate-600">J&Company 개발용역 계약서.pdf</p>
                        </div>
                        <button className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors">
                            상세 리포트 확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LiveDemo() {
    const containerControls = useAnimation();
    const cursorControls = useAnimation();
    const [currentView, setCurrentView] = useState<'home' | 'projects' | 'clients' | 'contract'>('home');

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // 1. 홈 화면 - 전체 보기
                setCurrentView('home');
                await Promise.all([
                    containerControls.start({
                        scale: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 1, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 350,
                        y: 250,
                        opacity: 1,
                        transition: { duration: 1 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 1500));

                // 2. 통계 영역 줌인
                await Promise.all([
                    containerControls.start({
                        scale: 1.4,
                        x: 100,
                        y: 80,
                        transition: { duration: 1.2, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 280,
                        y: 180,
                        transition: { duration: 1.2 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 500));
                await cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1000));

                // 3. Projects 버튼으로 이동 & 클릭
                await Promise.all([
                    containerControls.start({
                        scale: 1.5,
                        x: -100,
                        y: 50,
                        transition: { duration: 1, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 500,
                        y: 150,
                        transition: { duration: 1 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 400));
                await cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 300));

                // 4. Projects 화면으로 전환
                await containerControls.start({
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3 }
                });
                setCurrentView('projects');
                await containerControls.start({
                    scale: 1,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 }
                });
                await cursorControls.start({ x: 400, y: 300 });
                await new Promise(r => setTimeout(r, 1500));

                // 5. Clients 화면으로 전환
                await containerControls.start({
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3 }
                });
                setCurrentView('clients');
                await containerControls.start({
                    scale: 1,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 }
                });
                await new Promise(r => setTimeout(r, 1500));

                // 6. 계약서 스캔 화면으로 전환
                await containerControls.start({
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3 }
                });
                setCurrentView('contract');
                await containerControls.start({
                    scale: 1,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 }
                });
                await cursorControls.start({ x: 250, y: 350 });
                await new Promise(r => setTimeout(r, 1500));

                // 7. 홈으로 돌아가기 (페이드)
                await Promise.all([
                    containerControls.start({
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.4 }
                    }),
                    cursorControls.start({
                        opacity: 0,
                        transition: { duration: 0.3 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 800));
            }
        };

        sequence();
    }, [containerControls, cursorControls]);

    return (
        <div className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Browser Chrome */}
            <div className="relative h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="ml-4 flex-1 max-w-md h-6 bg-slate-700/50 rounded-md flex items-center px-3 text-xs text-slate-400 font-mono">
                    <span className="text-emerald-400 mr-1">🔒</span>
                    guardian-agency-os.vercel.app/dashboard
                    {currentView !== 'home' && <span className="text-indigo-400">/{currentView}</span>}
                </div>
            </div>

            {/* Demo Container */}
            <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden">
                {/* Animated Content */}
                <motion.div
                    animate={containerControls}
                    className="absolute inset-0 origin-center"
                >
                    <div className="w-full h-full p-6 overflow-hidden">
                        <div className="max-w-6xl mx-auto h-full">
                            <AnimatePresence mode="wait">
                                {currentView === 'home' && (
                                    <motion.div
                                        key="home"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DashboardHome />
                                    </motion.div>
                                )}
                                {currentView === 'projects' && (
                                    <motion.div
                                        key="projects"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProjectsView />
                                    </motion.div>
                                )}
                                {currentView === 'clients' && (
                                    <motion.div
                                        key="clients"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ClientsView />
                                    </motion.div>
                                )}
                                {currentView === 'contract' && (
                                    <motion.div
                                        key="contract"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ContractScanView />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Animated Cursor */}
                <motion.div
                    animate={cursorControls}
                    initial={{ x: 350, y: 250, opacity: 0 }}
                    className="absolute top-0 left-0 z-50 pointer-events-none"
                    style={{
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                    }}
                >
                    <div className="relative">
                        <MousePointer2 className="w-7 h-7 text-slate-900 fill-white stroke-[1.5]" />
                    </div>
                </motion.div>

                {/* Overlay to prevent interaction */}
                <div className="absolute inset-0 z-40" />
            </div>
        </div>
    );
}
