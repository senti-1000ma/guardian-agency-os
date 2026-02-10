'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Copy, RefreshCw, Wand2 } from 'lucide-react';

interface RefinedMessage {
    tone: string;
    content: string;
    explanation: string;
}

interface DiplomatResponse {
    original_critique: string;
    options: RefinedMessage[];
}

export function DiplomatChat() {
    const [draft, setDraft] = useState('');
    const [context, setContext] = useState('');
    const [intent, setIntent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<DiplomatResponse | null>(null);

    const handleRefine = async () => {
        if (!draft) return;
        setIsLoading(true);
        setResponse(null);

        try {
            const res = await fetch('/api/ai/refine-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ draft, recipient: context, intent })
            });

            if (!res.ok) throw new Error("Refinement failed");

            const data = await res.json();
            setResponse(data);
        } catch (e) {
            console.error(e);
            // Fallback or error state could be handled here
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                        <Wand2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">The Diplomat</h2>
                        <p className="text-slate-500 text-sm">Draft your raw thoughts. AI will polish them for safety & impact.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Who is this for?</label>
                        <input
                            type="text"
                            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            placeholder="e.g. Demanding Client, Late Payer"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">What's your goal?</label>
                        <input
                            type="text"
                            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            placeholder="e.g. Decline extra work, Request payment"
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Raw Draft</label>
                    <textarea
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                        placeholder="Don't worry about being polite here. Just type what you really want to say..."
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleRefine}
                    disabled={isLoading || !draft}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                >
                    {isLoading ? <RefreshCw className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    Refine Message
                </button>
            </div>

            {response && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                        <div>
                            <span className="font-bold block text-amber-700 mb-1">AI Critique</span>
                            {response.original_critique}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {response.options.map((opt, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-600">
                                        {opt.tone}
                                    </span>
                                </div>
                                <p className="text-slate-800 font-medium mb-6 flex-grow whitespace-pre-wrap leading-relaxed">
                                    "{opt.content}"
                                </p>
                                <div className="text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg">
                                    <span className="font-bold text-slate-700 block mb-1">Why this works:</span>
                                    {opt.explanation}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(opt.content)}
                                    className="mt-auto w-full py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <Copy className="w-4 h-4" /> Copy Text
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
