'use client';

import { useState } from "react";
import {
    CheckCircle,
    Download,
    FileText,
    CreditCard,
    Clock,
    MessageSquare,
    ChevronRight,
    Shield,
    X,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

// Mock Data
const PROJECT = {
    id: "PROJ-2026-001",
    name: "E-Commerce Rebranding",
    clientName: "Acme Corp",
    status: "In Progress",
    progress: 65,
    dueDate: "2026-03-15",
    manager: {
        name: "Minseok Kim",
        role: "Creative Director",
        avatar: "MK"
    }
};

const TIMELINE = [
    { id: 1, title: "Kickoff Meeting", date: "2026-02-01", status: "completed" },
    { id: 2, title: "Brand Strategy", date: "2026-02-05", status: "completed" },
    { id: 3, title: "Visual Identity Draft", date: "2026-02-12", status: "current" },
    { id: 4, title: "Final Review", date: "2026-02-20", status: "upcoming" },
    { id: 5, title: "Launch", date: "2026-03-01", status: "upcoming" },
];

const ASSETS = [
    { id: 1, name: "Contract_Signed.pdf", size: "2.4 MB", date: "Feb 1, 2026" },
    { id: 2, name: "Brand_Guidelines_v1.pdf", size: "14 MB", date: "Feb 5, 2026" },
    { id: 3, name: "Logo_Pack.zip", size: "45 MB", date: "Feb 10, 2026" },
];

export default function ClientPortal() {
    const params = useParams();
    const clientId = params.clientId as string;
    // In a real app, use params.clientId to fetch data

    // Interactive States
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [paidInvoices, setPaidInvoices] = useState<string[]>(["INV-001"]);
    const [approvedAssets, setApprovedAssets] = useState<number[]>([]);

    const handlePayment = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setPaidInvoices(prev => [...prev, "INV-002"]);
            setIsPayModalOpen(false);
            alert("Payment Successful! Thank you.");
        }, 2000);
    };

    const toggleAssetApproval = (id: number) => {
        setApprovedAssets(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    }

    const INVOICES = [
        { id: "INV-001", amount: "₩ 1,500,000", status: paidInvoices.includes("INV-001") ? "paid" : "pending", date: "Feb 1, 2026" },
        { id: "INV-002", amount: "₩ 1,500,000", status: paidInvoices.includes("INV-002") ? "paid" : "pending", date: "Due Feb 15, 2026" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 relative">
            {/* Payment Modal */}
            <AnimatePresence>
                {isPayModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsPayModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-indigo-600" /> Secure Payment
                                </h3>
                                <button onClick={() => setIsPayModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                            </div>
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <p className="text-sm text-slate-500 mb-1">Total Amount Due</p>
                                    <p className="text-4xl font-bold text-slate-900">₩ 1,500,000</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl flex items-center gap-3 cursor-pointer ring-2 ring-indigo-500 transition-all">
                                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                        </div>
                                        <span className="font-medium text-slate-700">Credit Card</span>
                                        <div className="ml-auto flex gap-2">
                                            <div className="w-8 h-5 bg-slate-200 rounded" />
                                            <div className="w-8 h-5 bg-slate-200 rounded" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isPaying}
                                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isPaying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay Now"}
                                    </button>
                                    <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1 mt-4">
                                        <Shield className="w-3 h-3" /> Secured by Guardian Pay
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Top Bar (White Label Area) */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* This would be the User's Logo */}
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-slate-200">
                            MK
                        </div>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <span className="font-semibold text-slate-600 hidden sm:inline">Client Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">{PROJECT.clientName}</p>
                            <p className="text-xs text-slate-500">Authorized Access</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                            AC
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Welcome & Status */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{PROJECT.name}</h1>
                            <p className="text-slate-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Due {PROJECT.dueDate}
                                <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                                {PROJECT.id}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                                <MessageSquare className="w-4 h-4" /> Contact Manager
                            </button>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                Approve Milestone
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-end mb-2 relative z-10">
                            <span className="text-sm font-bold text-slate-700">Project Progress</span>
                            <span className="text-2xl font-bold text-indigo-600">{PROJECT.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative z-10">
                            <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${PROJECT.progress}%` }}>
                                <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite] -translate-x-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column (Timeline & Assets) */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Timeline */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-400" /> Timeline
                            </h2>
                            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-slate-200">
                                {TIMELINE.map((item, idx) => (
                                    <div key={item.id} className="relative pl-10 flex items-start group">
                                        <div className={clsx(
                                            "absolute left-0 top-1 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center z-10 transition-colors",
                                            item.status === 'completed' ? "bg-emerald-500" :
                                                item.status === 'current' ? "bg-indigo-600 ring-4 ring-indigo-100" : "bg-slate-300"
                                        )}>
                                            {item.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className={clsx("font-bold transition-colors", item.status === 'upcoming' ? "text-slate-400" : "text-slate-900 group-hover:text-indigo-600")}>
                                                    {item.title}
                                                </h3>
                                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                    {item.date}
                                                </span>
                                            </div>
                                            {item.status === 'current' && (
                                                <p className="text-sm text-indigo-600 mt-1 font-medium animate-pulse">
                                                    Currently working on this...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Deliverables */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-slate-400" /> Deliverables & Assets
                            </h2>
                            <div className="space-y-3">
                                {ASSETS.map((asset) => (
                                    <div key={asset.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 group-hover:text-indigo-700">{asset.name}</p>
                                                <p className="text-xs text-slate-500">{asset.size} • {asset.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleAssetApproval(asset.id)}
                                                className={clsx(
                                                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                                    approvedAssets.includes(asset.id)
                                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                        : "bg-white text-slate-400 border-slate-200 hover:border-indigo-200"
                                                )}
                                            >
                                                {approvedAssets.includes(asset.id) ? "Approved" : "Approve"}
                                            </button>
                                            <button className="text-slate-400 hover:text-indigo-600 p-2">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Invoices & Info) */}
                    <div className="space-y-8">
                        {/* Invoices */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-slate-400" /> Invoices
                            </h2>
                            <div className="space-y-4">
                                {INVOICES.map((inv) => (
                                    <div key={inv.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-mono text-xs text-slate-500">{inv.id}</span>
                                            {inv.status === 'paid' ? (
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> PAID
                                                </span>
                                            ) : (
                                                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">UNPAID</span>
                                            )}
                                        </div>
                                        <div className="text-lg font-bold text-slate-900 mb-1">{inv.amount}</div>
                                        <div className="text-xs text-slate-500">{inv.date}</div>

                                        {inv.status === 'pending' && (
                                            <button
                                                onClick={() => setIsPayModalOpen(true)}
                                                className="w-full mt-3 bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Manager Info */}
                        <section className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Your Manager</h2>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-lg ring-2 ring-slate-800 group-hover:ring-cyan-500/50 transition-all">
                                    {PROJECT.manager.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{PROJECT.manager.name}</p>
                                    <p className="text-sm text-slate-400">{PROJECT.manager.role}</p>
                                </div>
                            </div>
                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg py-3 text-sm font-medium transition-colors">
                                Send Message
                            </button>
                            <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <Shield className="w-3 h-3" />
                                    Powered by Guardian OS
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
