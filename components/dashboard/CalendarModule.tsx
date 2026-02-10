'use client';

import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { clsx } from "clsx";
import { Modal } from "@/components/Modal";
import { useState } from "react";

export function CalendarModule() {
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('October 2024');

    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    const events = [
        { day: 5, title: "Client Kickoff", type: "meeting", time: "10:00 AM" },
        { day: 12, title: "Project Deadline", type: "deadline", time: "5:00 PM" },
        { day: 15, title: "Design Review", type: "meeting", time: "2:00 PM" },
        { day: 24, title: "Invoice Due", type: "finance", time: "End of Day" },
    ];

    const handlePrevMonth = () => setCurrentMonth('September 2024');
    const handleNextMonth = () => setCurrentMonth('November 2024');
    const handleToday = () => setCurrentMonth('October 2024');
    const handleEventClick = (event: any) => {
        alert(`📅 ${event.title}\n⏰ ${event.time}\n🏷️ ${event.type}`);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-slate-800">{currentMonth}</h2>
                    <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-md text-slate-500"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleToday} className="bg-white border border-slate-200 text-slate-600 font-bold py-2.5 px-5 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                        Today
                    </button>
                    <button onClick={() => setIsEventModalOpen(true)} className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200">
                        <Plus className="w-5 h-5" /> New Event
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-3 text-center text-sm font-bold text-slate-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)] divide-x divide-slate-100 bg-slate-50 gap-[1px] border-b border-slate-200">
                    {days.map((day) => {
                        const dayEvents = events.filter(e => e.day === day);
                        const isToday = day === 8; // Mock 'Today'

                        return (
                            <div key={day} className={clsx("bg-white p-3 relative hover:bg-slate-50/50 transition-colors", day > 31 && "bg-slate-50 text-slate-300")}>
                                <span className={clsx(
                                    "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-2",
                                    isToday ? "bg-indigo-600 text-white font-bold" : "text-slate-700"
                                )}>
                                    {day <= 31 ? day : day - 31}
                                </span>

                                {day <= 31 && (
                                    <div className="space-y-1">
                                        {dayEvents.map((evt, idx) => (
                                            <div onClick={() => handleEventClick(evt)} key={idx} className={clsx(
                                                "text-xs p-1.5 rounded-lg font-medium border truncate cursor-pointer hover:opacity-80 transition-opacity",
                                                evt.type === 'meeting' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                    evt.type === 'deadline' ? "bg-rose-50 text-rose-700 border-rose-100" :
                                                        "bg-emerald-50 text-emerald-700 border-emerald-100"
                                            )}>
                                                {evt.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-6 justify-end text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div> Meeting
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div> Deadline
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Finance
                </div>
            </div>

            <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="새 이벤트 생성">
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">이벤트 제목</label>
                        <input type="text" placeholder="Client Meeting" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">타입</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="meeting">Meeting</option>
                            <option value="deadline">Deadline</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">날짜</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">시간</label>
                            <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={() => setIsEventModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors">취소</button>
                    <button onClick={() => { alert('Event created!'); setIsEventModalOpen(false); }} className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">생성</button>
                </div>
            </Modal>
        </div>
    );
}
