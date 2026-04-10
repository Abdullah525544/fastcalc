"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calculator,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    Info
} from "lucide-react";

const tools = [
    {
        name: "Take-Home Pay Calculator",
        description: "Detailed breakdown of your net salary for 2025/26 including Income Tax, NI, and student loans.",
        href: "/tools/take-home-pay",
        icon: Calculator,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        name: "IR35 Status Checker",
        description: "Self-assessment tool to determine if your contract falls inside or outside IR35 legislation.",
        href: "/tools/ir35-checker",
        icon: ShieldCheck,
        color: "text-accent",
        bgColor: "bg-green-50",
    },
    {
        name: "Dividend vs Salary",
        description: "Compare the total tax paid and net take-home between basic salary and dividend payment models.",
        href: "/tools/dividend-vs-salary",
        icon: TrendingUp,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
    },
];

export default function ToolsHub() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                        <div className="h-px w-8 bg-accent"></div>
                        Our Toolkit
                    </div>
                    <h1 className="text-4xl font-bold text-navy mb-4">Financial Tools for Contractors</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Every tool is free to use, privacy-first, and updated for the 2025/26 tax year.
                        No signup or personal data required.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 shadow-sm hover:shadow-xl transition-all flex flex-col h-full group"
                        >
                            <div className={`${tool.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                                <tool.icon className={`w-8 h-8 ${tool.color}`} />
                            </div>
                            <h2 className="text-2xl font-bold text-navy mb-4">{tool.name}</h2>
                            <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                                {tool.description}
                            </p>
                            <Link
                                href={tool.href}
                                className="w-full bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-lg"
                            >
                                Go to Calculator
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Card */}
                <div className="bg-navy rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                    <div className="bg-white/10 p-4 rounded-full">
                        <Info className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Wait, which one do I need?</h3>
                        <p className="text-gray-400 max-w-3xl leading-relaxed">
                            If you’re new to contracting, start with the <Link href="/tools/ir35-checker" className="text-accent hover:underline">IR35 Checker</Link> to
                            determine your employment status. Once you know your status, the <Link href="/tools/take-home-pay" className="text-accent hover:underline">Take-Home Pay</Link> calculator
                            will show you exactly what to expect in your bank account each month.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
