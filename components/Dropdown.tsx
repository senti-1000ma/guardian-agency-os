'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface DropdownItem {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
}

interface DropdownProps {
    items: DropdownItem[];
}

export function Dropdown({ items }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${item.variant === 'danger'
                                    ? 'text-rose-600 hover:bg-rose-50'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
