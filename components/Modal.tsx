'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
