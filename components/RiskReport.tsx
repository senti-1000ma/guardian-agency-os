'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

interface RiskItem {
    clause: string;
    risk_level: string;
    explanation: string;
    recommendation: string;
}

interface AnalysisResult {
    summary: string;
    risk_score: number;
    red_flags: RiskItem[];
}

export function RiskReport({ data }: { data: AnalysisResult }) {
    if (!data) return null;

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-600";
        if (score >= 50) return "text-amber-500";
        return "text-rose-600";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mt-12 space-y-8"
        >
            {/* Header Score */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl -z-10" />
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Contract Analysis Report</h2>
                    <p className="text-slate-500">{data.summary}</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <div className={clsx("text-5xl font-black tracking-tighter", getScoreColor(data.risk_score))}>
                        {data.risk_score}
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Safety Score</div>
                        <div className="text-sm font-medium text-slate-600">out of 100</div>
                    </div>
                </div>
            </div>

            {/* Red Flags List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold px-2 text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    Detected Risks <span className="text-slate-400 text-sm font-normal">({data.red_flags.length} issues found)</span>
                </h3>
                {data.red_flags.map((flag, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-5">
                            <div className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="space-y-4 w-full">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-lg">
                                        {flag.risk_level} Risk Detected
                                    </h4>
                                    <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {flag.risk_level} Priority
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium font-mono text-sm leading-relaxed">
                                    "{flag.clause}"
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Why it's dangerous</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {flag.explanation}
                                        </p>
                                    </div>
                                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                                            <CheckCircle className="w-4 h-4" /> Recommendation
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed">
                                            {flag.recommendation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {data.red_flags.length === 0 && (
                    <div className="p-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-slate-500">
                        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-emerald-500 bg-emerald-50 rounded-full p-2" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Clean Contract!</h3>
                        <p className="text-lg text-slate-500">No major red flags detected. You are good to go.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
