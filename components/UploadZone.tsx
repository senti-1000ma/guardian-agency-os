'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export function UploadZone({ onFileSelect, isAnalyzing }: UploadZoneProps) {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type !== 'application/pdf') {
            alert("Only PDF files are supported for contract analysis.");
            return;
        }
        setFileName(file.name);
        onFileSelect(file);
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={clsx(
                    "relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 ease-in-out cursor-pointer overflow-hidden bg-white",
                    dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50",
                    isAnalyzing ? "pointer-events-none opacity-80" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleChange}
                />

                <AnimatePresence mode="wait">
                    {!fileName ? (
                        <motion.div
                            key="upload-prompt"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="p-4 bg-indigo-50 rounded-full text-indigo-500">
                                <Upload className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-800">
                                    Drop your Contract PDF here
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    or click to browse
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-presense"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="p-4 bg-indigo-100 rounded-full">
                                {isAnalyzing ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Upload className="w-8 h-8 text-indigo-600" />
                                    </motion.div>
                                ) : (
                                    <FileText className="w-8 h-8 text-indigo-600" />
                                )}
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-900">
                                    {fileName}
                                </p>
                                <p className="text-sm text-indigo-600 font-medium mt-1">
                                    {isAnalyzing ? "AI is analyzing clauses..." : "Ready for scan"}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Your contract is processed securely and deleted from servers after analysis.</span>
            </p>
        </div >
    );
}
