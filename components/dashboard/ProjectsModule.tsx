'use client';

import { FileText, MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Dropdown } from "@/components/Dropdown";

interface Project {
    id: number;
    name: string;
    client: string;
    status: string;
    progress: number;
    dueDate: string;
    budget: string;
}

export function ProjectsModule({ onCreateProject }: { onCreateProject: () => void }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setAllProjects(data);
                setIsLoading(false);
            })
            .catch(err => console.error("Failed to load projects", err));
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setProjects(allProjects);
            return;
        }
        const filtered = allProjects.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.client.toLowerCase().includes(query.toLowerCase())
        );
        setProjects(filtered);
    };

    const handleFilter = () => {
        alert('Filter functionality: Choose from Active, Planning, In Review, On Hold');
    };

    if (isLoading) return <div className="p-12 text-center text-slate-400 animate-pulse">Loading projects...</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
                    <p className="text-slate-500">Manage your ongoing work and deliverables.</p>
                </div>
                <button
                    onClick={onCreateProject}
                    className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                    <Plus className="w-5 h-5" /> New Project
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
                        />
                    </div>
                    <button onClick={handleFilter} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-bold flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Progress</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Budget</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <Link href={`/projects/${project.id}`} className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
                                        {project.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700">{project.client}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={project.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }} />
                                    </div>
                                    <span className="text-xs text-slate-400 mt-1 block">{project.progress}%</span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{project.dueDate}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{project.budget}</td>
                                <td className="px-6 py-4 text-right">
                                    <Dropdown items={[
                                        { label: 'Edit Project', onClick: () => alert(`Edit ${project.name}`) },
                                        { label: 'View Details', onClick: () => window.location.href = `/projects/${project.id}` },
                                        { label: 'Archive', onClick: () => confirm(`Archive ${project.name}?`), variant: 'danger' }
                                    ]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        'Active': 'bg-emerald-100 text-emerald-700',
        'In Review': 'bg-purple-100 text-purple-700',
        'Planning': 'bg-blue-100 text-blue-700',
        'On Hold': 'bg-slate-100 text-slate-600',
    };
    return (
        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-bold", (styles as any)[status] || styles['On Hold'])}>
            {status}
        </span>
    );
}
