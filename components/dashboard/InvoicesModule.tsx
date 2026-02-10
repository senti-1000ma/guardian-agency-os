'use client';

import { CreditCard, MoreHorizontal, Plus, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { Modal } from "@/components/Modal";
import { Dropdown } from "@/components/Dropdown";
import { useState } from "react";

export function InvoicesModule() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const invoices = [
        { id: "INV-2024-001", client: "Acme Corp", date: "2024-10-01", amount: "₩ 5,000,000", status: "Paid" },
        { id: "INV-2024-002", client: "Stark Ind", date: "2024-10-12", amount: "₩ 3,500,000", status: "Pending" },
        { id: "INV-2024-003", client: "Wayne Ent", date: "2024-09-25", amount: "₩ 12,000,000", status: "Overdue" },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Invoices</h2>
                    <p className="text-slate-500">Track your billing and payments.</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
                    <Plus className="w-5 h-5" /> Create Invoice
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Outstanding</div>
                    <div className="text-3xl font-black text-slate-900">₩ 15,500,000</div>
                    <div className="text-xs font-bold text-rose-500 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> 1 Overdue Invoice
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Paid this Month</div>
                    <div className="text-3xl font-black text-indigo-600">₩ 5,000,000</div>
                    <div className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> On Track
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Drafts</div>
                    <div className="text-3xl font-black text-slate-400">2</div>
                    <div className="text-xs font-bold text-slate-400 mt-2">
                        Not sent yet
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Invoice ID</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Date Issued</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono font-medium text-slate-600">{inv.id}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">{inv.client}</td>
                                <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{inv.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1",
                                        inv.status === 'Paid' ? "bg-emerald-100 text-emerald-700" :
                                            inv.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                                                "bg-rose-100 text-rose-700"
                                    )}>
                                        {inv.status === 'Paid' && <CheckCircle className="w-3 h-3" />}
                                        {inv.status === 'Pending' && <Clock className="w-3 h-3" />}
                                        {inv.status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button onClick={() => alert(`Downloading PDF for ${inv.id}`)} className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors" title="Download PDF">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <Dropdown items={[
                                        { label: 'Send Reminder', onClick: () => alert(`Reminder sent for ${inv.id}`) },
                                        { label: 'Edit Invoice', onClick: () => alert(`Edit ${inv.id}`) },
                                        { label: 'Delete', onClick: () => confirm(`Delete ${inv.id}?`), variant: 'danger' }
                                    ]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="새 청구서 생성">
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">클라이언트</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Acme Corp</option>
                            <option>Stark Industries</option>
                            <option>Wayne Enterprises</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">금액 (₩)</label>
                        <input type="number" placeholder="5,000,000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">마감일</label>
                        <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={() => setIsCreateModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors">취소</button>
                    <button onClick={() => { alert('Invoice created!'); setIsCreateModalOpen(false); }} className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">생성</button>
                </div>
            </Modal>
        </div>
    );
}
