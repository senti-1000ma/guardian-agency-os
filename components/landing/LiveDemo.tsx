'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardHome } from "@/components/DashboardHome";
import { MousePointer2 } from "lucide-react";

export function LiveDemo() {
    const containerControls = useAnimation();
    const cursorControls = useAnimation();
    const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // 0. 초기 상태 (전체 화면)
                setActiveHighlight(null);
                await Promise.all([
                    containerControls.start({ scale: 1, x: 0, y: 0, transition: { duration: 1, ease: "easeInOut" } }),
                    cursorControls.start({ x: "50%", y: "50%", opacity: 1, transition: { duration: 1 } })
                ]);
                await new Promise(r => setTimeout(r, 1000));

                // 1. 통계 카드로 줌인 & 커서 이동
                await Promise.all([
                    containerControls.start({ scale: 1.5, x: "10%", y: "15%", transition: { duration: 1.2, ease: "easeInOut" } }),
                    cursorControls.start({ x: "20%", y: "25%", transition: { duration: 1.2, ease: "easeInOut" } })
                ]);
                setActiveHighlight('stats'); // 실제로는 시각적 효과만 줄 예정
                await new Promise(r => setTimeout(r, 500));

                // 클릭 효과
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1000));

                // 2. 빠른 작업("계약서 스캔")으로 이동
                await Promise.all([
                    containerControls.start({ scale: 1.5, x: "-10%", y: "-5%", transition: { duration: 1.2, ease: "easeInOut" } }),
                    cursorControls.start({ x: "25%", y: "55%", transition: { duration: 1.2, ease: "easeInOut" } })
                ]);

                // 클릭 효과
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1000));

                // 3. 최근 활동으로 이동
                await Promise.all([
                    containerControls.start({ scale: 1.4, x: "-20%", y: "-20%", transition: { duration: 1.2, ease: "easeInOut" } }),
                    cursorControls.start({ x: "60%", y: "70%", transition: { duration: 1.2, ease: "easeInOut" } })
                ]);
                await new Promise(r => setTimeout(r, 1500));

                // 4. 다시 줌아웃 (전체 화면)
                await Promise.all([
                    containerControls.start({ scale: 1, x: 0, y: 0, transition: { duration: 1.2, ease: "easeInOut" } }),
                    cursorControls.start({ x: "90%", y: "90%", opacity: 0, transition: { duration: 1 } })
                ]);
                await new Promise(r => setTimeout(r, 2000));
            }
        };

        sequence();
    }, [containerControls, cursorControls]);

    return (
        <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Window Controls */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 gap-2 z-20 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="ml-4 w-64 h-5 bg-slate-700 rounded-full flex items-center px-2 text-[10px] text-slate-400">
                    guardian-os.app/dashboard
                </div>
            </div>

            {/* Main Content Area (Animated) */}
            <motion.div
                animate={containerControls}
                className="absolute top-8 left-0 right-0 bottom-0 bg-slate-50 origin-top-left p-6 overflow-hidden"
            >
                <div className="max-w-6xl mx-auto transform scale-[0.8] origin-top">
                    <DashboardHome />
                </div>
            </motion.div>

            {/* Fake Cursor */}
            <motion.div
                animate={cursorControls}
                initial={{ x: "100%", y: "100%" }}
                className="absolute z-30 pointer-events-none drop-shadow-2xl"
            >
                <MousePointer2 className="w-8 h-8 text-black fill-white" />
                <div className="absolute top-6 left-4 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap opacity-0 animate-fade-in">
                    Minseok
                </div>
            </motion.div>

            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 z-10" />
        </div>
    );
}
