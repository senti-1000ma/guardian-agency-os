'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardHome } from "@/components/DashboardHome";
import { MousePointer2 } from "lucide-react";

export function LiveDemo() {
    const containerControls = useAnimation();
    const cursorControls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // 1. 시작: 전체 화면 보기
                await Promise.all([
                    containerControls.start({
                        scale: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 1.2, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 400,
                        y: 300,
                        opacity: 1,
                        transition: { duration: 1.2 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 1500));

                // 2. 통계 카드로 줌인 (좌측 상단)
                await Promise.all([
                    containerControls.start({
                        scale: 1.8,
                        x: 150,
                        y: 100,
                        transition: { duration: 1.5, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 250,
                        y: 200,
                        transition: { duration: 1.5, ease: "easeInOut" }
                    })
                ]);
                await new Promise(r => setTimeout(r, 800));

                // 클릭 효과
                await cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1200));

                // 3. 빠른 작업 섹션으로 이동 (중앙)
                await Promise.all([
                    containerControls.start({
                        scale: 1.6,
                        x: 0,
                        y: -50,
                        transition: { duration: 1.3, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 300,
                        y: 400,
                        transition: { duration: 1.3, ease: "easeInOut" }
                    })
                ]);
                await new Promise(r => setTimeout(r, 800));

                // 클릭 효과
                await cursorControls.start({ scale: 0.85, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1200));

                // 4. 최근 활동으로 이동 (아래쪽)
                await Promise.all([
                    containerControls.start({
                        scale: 1.5,
                        x: -50,
                        y: -200,
                        transition: { duration: 1.3, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 450,
                        y: 500,
                        transition: { duration: 1.3, ease: "easeInOut" }
                    })
                ]);
                await new Promise(r => setTimeout(r, 1500));

                // 5. 줌아웃 및 커서 페이드
                await Promise.all([
                    containerControls.start({
                        scale: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 1.5, ease: "easeInOut" }
                    }),
                    cursorControls.start({
                        x: 600,
                        y: 400,
                        opacity: 0,
                        transition: { duration: 1.2 }
                    })
                ]);
                await new Promise(r => setTimeout(r, 2000));
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
                </div>
            </div>

            {/* Demo Container */}
            <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden">
                {/* Animated Content */}
                <motion.div
                    animate={containerControls}
                    className="absolute inset-0 origin-center"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className="w-full h-full p-8 overflow-hidden">
                        <div className="max-w-6xl mx-auto h-full">
                            <DashboardHome />
                        </div>
                    </div>
                </motion.div>

                {/* Animated Cursor */}
                <motion.div
                    animate={cursorControls}
                    initial={{ x: 400, y: 300, opacity: 0 }}
                    className="absolute top-0 left-0 z-50 pointer-events-none"
                    style={{
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                    }}
                >
                    <div className="relative">
                        <MousePointer2 className="w-7 h-7 text-slate-900 fill-white stroke-[1.5]" />
                        {/* Click ripple effect */}
                        <motion.div
                            className="absolute -inset-2 bg-indigo-400/30 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.5], opacity: [0.6, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        />
                    </div>
                </motion.div>

                {/* Overlay to prevent interaction */}
                <div className="absolute inset-0 z-40" />
            </div>
        </div>
    );
}
