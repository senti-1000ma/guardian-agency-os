'use client';

import {
    ChevronLeft,
    Calendar,
    Clock,
    MoreHorizontal,
    Plus,
    CheckCircle2,
    AlertCircle,
    FileText,
    MessageSquare,
    Paperclip
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'kanban' | 'files'>('kanban');

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                E-Commerce Rebranding
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold">Active</span>
                            </h1>
                            <p className="text-xs text-slate-500">Client: Acme Corp • Due: Oct 24, 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
                            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">MK</div>
                        </div>
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
                    <div className="flex gap-6 border-b border-transparent">
                        <TabButton label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <TabButton label="Kanban Board" isActive={activeTab === 'kanban'} onClick={() => setActiveTab('kanban')} />
                        <TabButton label="Files & Assets" isActive={activeTab === 'files'} onClick={() => setActiveTab('files')} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'kanban' && <KanbanBoard />}
                {activeTab === 'overview' && <ProjectOverview />}
                {activeTab === 'files' && <FilesView />}
            </main>
        </div>
    );
}

function TabButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-3 text-sm font-medium transition-all relative",
                isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
            )}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
            )}
        </button>
    );
}

function KanbanBoard() {
    return (
        <div className="flex gap-6 overflow-x-auto pb-8 items-start h-[calc(100vh-180px)]">
            <KanbanColumn title="To Do" count={3} color="bg-slate-100">
                <KanbanCard
                    title="Competitor Analysis"
                    tag="Research"
                    tagColor="bg-blue-100 text-blue-700"
                    dueDate="Tomorrow"
                />
                <KanbanCard
                    title="Draft Initial Concepts"
                    tag="Design"
                    tagColor="bg-purple-100 text-purple-700"
                    dueDate="Oct 12"
                />
                <KanbanCard
                    title="Setup Project Hosting"
                    tag="Dev"
                    tagColor="bg-emerald-100 text-emerald-700"
                />
            </KanbanColumn>

            <KanbanColumn title="In Progress" count={2} color="bg-indigo-50">
                <KanbanCard
                    title="Homepage Wireframe"
                    tag="Design"
                    tagColor="bg-purple-100 text-purple-700"
                    dueDate="Today"
                    assignee="MK"
                />
                <KanbanCard
                    title="Copywriting for Hero"
                    tag="Content"
                    tagColor="bg-amber-100 text-amber-700"
                    assignee="JD"
                />
            </KanbanColumn>

            <KanbanColumn title="Review" count={1} color="bg-orange-50">
                <KanbanCard
                    title="Brand Guidelines PDF"
                    tag="Asset"
                    tagColor="bg-rose-100 text-rose-700"
                    dueDate="Overdue"
                    isOverdue
                />
            </KanbanColumn>

            <KanbanColumn title="Done" count={4} color="bg-emerald-50">
                <KanbanCard
                    title="Client Kickoff Meeting"
                    tag="Meeting"
                    tagColor="bg-slate-200 text-slate-700"
                    completed
                />
            </KanbanColumn>
        </div>
    )
}

function KanbanColumn({ title, count, color, children }: { title: string, count: number, color: string, children: React.ReactNode }) {
    return (
        <div className={clsx("min-w-[300px] w-[300px] rounded-2xl p-4 flex flex-col gap-3", color)}>
            <div className="flex justify-between items-center mb-1 px-1">
                <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
                <span className="text-xs font-bold text-slate-400 bg-white/50 px-2 py-1 rounded-full">{count}</span>
            </div>
            {children}
            <button className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 text-sm hover:bg-white/50 hover:text-slate-600 transition-colors flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Add Task
            </button>
        </div>
    )
}

function KanbanCard({ title, tag, tagColor, dueDate, assignee, isOverdue, completed }: any) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
                <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide", tagColor)}>
                    {tag}
                </span>
                {completed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>
            <h4 className={clsx("font-bold text-slate-800 text-sm mb-4 leading-relaxed", completed && "line-through text-slate-400")}>
                {title}
            </h4>
            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs">
                    {dueDate && (
                        <span className={clsx("flex items-center gap-1 font-medium", isOverdue ? "text-rose-500" : "text-slate-400")}>
                            <Clock className="w-3 h-3" /> {dueDate}
                        </span>
                    )}
                </div>
                {assignee && (
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {assignee}
                    </div>
                )}
            </div>
        </div>
    )
}

function ProjectOverview() {
    return (
        <div className="text-center py-20">
            <p className="text-slate-400">Project Overview/Stats UI goes here...</p>
        </div>
    )
}

function FilesView() {
    return (
        <div className="text-center py-20">
            <p className="text-slate-400">File Manager UI goes here...</p>
        </div>
    )
}
