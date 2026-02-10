'use client';

import { Users, MoreHorizontal, Plus, Search, Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { Dropdown } from "@/components/Dropdown";

interface Client {
    id: number;
    name: string;
    contact: string;
    email: string;
    phone: string;
    projects: number;
    totalValue: string;
}

export function ClientsModule() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/clients')
            .then(res => res.json())
            .then(data => {
                setClients(data);
                setIsLoading(false);
            })
            .catch(err => console.error("Failed to load clients", err));
    }, []);

    if (isLoading) return <div className="p-12 text-center text-slate-400 animate-pulse">Loading clients...</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Clients</h2>
                    <p className="text-slate-500">Managing {clients.length} active relationships.</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
                    <Plus className="w-5 h-5" /> Add Client
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div key={client.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center font-bold text-xl text-indigo-600">
                                {client.name.substring(0, 2)}
                            </div>
                            <Dropdown items={[
                                { label: 'Edit Client', onClick: () => alert(`Edit ${client.name}`) },
                                { label: 'View Projects', onClick: () => alert(`Projects for ${client.name}`) },
                                { label: 'Archive', onClick: () => alert(`Archive ${client.name}`), variant: 'danger' }
                            ]} />
                        </div>

                        <h3 className="font-bold text-lg text-slate-900 mb-1">{client.name}</h3>
                        <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4" /> {client.contact}
                        </p>

                        <div className="space-y-3 mb-6">
                            <a href={`mailto:${client.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50 -ml-2">
                                <Mail className="w-4 h-4 text-slate-400" /> {client.email}
                            </a>
                            <a href={`tel:${client.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50 -ml-2">
                                <Phone className="w-4 h-4 text-slate-400" /> {client.phone}
                            </a>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Value</span>
                                <span className="font-bold text-slate-900">{client.totalValue}</span>
                            </div>
                            <Link href={`/portal/${client.id}`} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100 flex items-center gap-1 transition-colors">
                                Portal <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                ))}
                <button onClick={() => setIsCreateModalOpen(true)} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all min-h-[300px]">
                    <Plus className="w-12 h-12 mb-4 opacity-50" />
                    <span className="font-bold">Add New Client</span>
                </button>
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="새 클라이언트 추가">
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">회사명</label>
                        <input type="text" placeholder="Acme Corp" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">담당자</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">이메일</label>
                        <input type="email" placeholder="john@acme.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">전화번호</label>
                        <input type="tel" placeholder="+82 10-1234-5678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={() => setIsCreateModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors">취소</button>
                    <button onClick={() => { alert('Client added!'); setIsCreateModalOpen(false); }} className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">추가</button>
                </div>
            </Modal>
        </div>
    );
}
