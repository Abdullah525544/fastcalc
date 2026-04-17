"use client";

import { useState, useEffect } from "react";
import {
    Calculator,
    Info,
    ArrowLeft,
    Plus,
    Trash2,
    GraduationCap,
    HelpCircle,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GradeRow {
    id: string;
    name: string;
    grade: number;
    weight: number;
}

export default function GradeCalculator() {
    const [rows, setRows] = useState<GradeRow[]>([
        { id: "1", name: "Assignment 1", grade: 85, weight: 20 },
        { id: "2", name: "Midterm Exam", grade: 78, weight: 30 },
    ]);
    const [finalGrade, setFinalGrade] = useState<number | null>(null);
    const [totalWeight, setTotalWeight] = useState<number>(0);

    const addRow = () => {
        const newRow: GradeRow = {
            id: Math.random().toString(36).substr(2, 9),
            name: `Item ${rows.length + 1}`,
            grade: 0,
            weight: 0,
        };
        setRows([...rows, newRow]);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const updateRow = (id: string, field: keyof GradeRow, value: string | number) => {
        setRows(
            rows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    useEffect(() => {
        let weightedSum = 0;
        let weightSum = 0;

        rows.forEach((row) => {
            if (row.grade !== null && row.weight !== null) {
                weightedSum += (row.grade * row.weight) / 100;
                weightSum += row.weight;
            }
        });

        setTotalWeight(weightSum);
        if (weightSum > 0) {
            setFinalGrade(Number(((weightedSum / weightSum) * 100).toFixed(2)));
        } else {
            setFinalGrade(null);
        }
    }, [rows]);

    const getLetterGrade = (score: number) => {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "@id": "https://fastcalc.site/tools/grade-calculator/#app",
                                "name": "Grade Calculator - Free Weighted Grade Tool",
                                "url": "https://fastcalc.site/tools/grade-calculator",
                                "applicationCategory": "EducationApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Free weighted grade calculator for students and teachers. Calculate your current class grade, final exam scores needed, and track semester progress.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "featureList": [
                                    "Weighted Grade Calculation",
                                    "Unlimited Assessment Rows",
                                    "Automatic Letter Grade Assignment",
                                    "Real-time Updates"
                                ],
                                "audience": {
                                    "@type": "Audience",
                                    "audienceType": "Students, Teachers, Academic Professionals"
                                },
                                "publisher": {
                                    "@id": "https://fastcalc.site/#organization"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://fastcalc.site/tools/grade-calculator/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How is a weighted grade calculated?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "To calculate a weighted grade, multiply the score of each assessment by its percentage weight (in decimal form), then sum these products and divide by the total weight."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What grade do I need to get an A?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Typically, you need a 90% or higher for an A. Our calculator shows your current percentage and corresponding letter grade based on standard scales."
                                        }
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-accent mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-navy mb-4">Grade Calculator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Calculate your weighted average grade for any class or semester.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-navy">Assessments & Weights</h3>
                                <button
                                    onClick={addRow}
                                    className="flex items-center gap-2 bg-accent/10 text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-xl font-bold transition-all text-sm"
                                >
                                    <Plus className="w-4 h-4" /> Add Item
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="col-span-6">Assessment Name</div>
                                    <div className="col-span-3">Grade (%)</div>
                                    <div className="col-span-2">Weight (%)</div>
                                    <div className="col-span-1"></div>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {rows.map((row, index) => (
                                        <motion.div
                                            key={row.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group"
                                        >
                                            <div className="col-span-6">
                                                <input
                                                    type="text"
                                                    value={row.name}
                                                    placeholder="e.g., Final Exam"
                                                    onChange={(e) => updateRow(row.id, "name", e.target.value)}
                                                    className="w-full bg-white px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-accent text-navy font-medium"
                                                />
                                            </div>
                                            <div className="col-span-3 pb-2 md:pb-0">
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={row.grade}
                                                        onChange={(e) => updateRow(row.id, "grade", Number(e.target.value))}
                                                        className="w-full bg-white px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-accent text-navy font-bold pr-8"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs font-bold">%</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={row.weight}
                                                        onChange={(e) => updateRow(row.id, "weight", Number(e.target.value))}
                                                        className="w-full bg-white px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-accent text-navy font-bold pr-8"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs font-bold">%</span>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex items-center justify-end">
                                                <button
                                                    onClick={() => removeRow(row.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {totalWeight !== 100 && (
                                <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3 text-amber-700 text-sm">
                                    <Info className="w-5 h-5 flex-shrink-0" />
                                    <p>Your total weight is <strong>{totalWeight}%</strong>. Most classes use a total weight of 100%.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-navy rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6 text-accent" />
                                    Your Result
                                </h3>

                                <div className="text-center mb-8">
                                    {finalGrade !== null ? (
                                        <>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Calculated Grade</p>
                                            <div className="relative inline-block">
                                                <span className="text-6xl font-black text-white">{finalGrade}%</span>
                                            </div>
                                            <div className="mt-4 inline-block px-6 py-2 rounded-2xl bg-accent text-navy font-black text-2xl">
                                                Grade: {getLetterGrade(finalGrade)}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-400 italic">Enter assessments to see results</p>
                                    )}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/10 text-sm">
                                    <div className="flex justify-between items-center text-gray-300">
                                        <span>Total Weight Applied</span>
                                        <span className="font-bold text-white">{totalWeight}%</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            This calculation assumes a standard A-F scale. Letter grades may vary by institution.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-accent" />
                                    Pro-Tip
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    To find out what you need on your final exam, add a new item, set the weight to your final's weight, and try different grades!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto">
                    <header className="not-prose mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 leading-tight">
                            Grade Calculator: The Ultimate Student Guide to Weighted Grades
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Stop the guesswork. Learn exactly how to calculate your weighted grades and what scores you need to hit your target GPA.
                        </p>
                    </header>

                    <section className="mb-12">
                        <p className="text-gray-600 leading-relaxed mb-4">
                            It&apos;s that time of the semester. You&apos;ve got three assignments done, a midterm exam behind you, and the final exam looming on the horizon. The big question is: <strong>What is my current grade?</strong> And more importantly, <strong>What do I need on the final to get an A?</strong> Understanding weighted grades can be confusing, but our free online grade calculator makes it effortless. Whether you're a high school student tracking your GPA or a college student managing complex course syllabi, this guide will explain everything you need to know about grade calculation.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">What is a Weighted Grade?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Most modern courses don't treat every assignment equally. A 5-question pop quiz shouldn't carry the same weight as a 50-page term paper. This is where <strong>weighted grading</strong> comes in. In a weighted system, certain categories (like Exams, Homework, or Participation) contribute a specific percentage to your final overall score.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            For example, your syllabus might say:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                            <li>Homework: 20%</li>
                            <li>Midterm Exam: 30%</li>
                            <li>Final Exam: 50%</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">How to Calculate Weighted Grades Manually</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            If you want to do the math yourself, the formula for a weighted average is:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 font-mono text-navy mb-6 text-center">
                            Weighted Grade = (Score 1 × Weight 1) + (Score 2 × Weight 2) + ... / Total Weight
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            <strong>Step-by-Step Example:</strong><br />
                            Imagine you have an 80% in Homework (worth 25%) and a 90% on your Midterm (worth 25%).<br />
                            1. Convert weights to decimals: 25% = 0.25<br />
                            2. Multiply: (80 × 0.25) = 20; (90 × 0.25) = 22.5<br />
                            3. Add them: 20 + 22.5 = 42.5<br />
                            4. Divide by total weight so far: 42.5 / 50 = 85%<br />
                            Your current grade would be an 85% (B).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Understanding Grade Scales (A-F)</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            While your percentage tells you how much of the material you've mastered, letter grades categorize that performance. While every school differs slightly, the standard US high school and college grading scale is as follows:
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-navy text-white font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Letter Grade</th>
                                        <th className="px-6 py-4">Percentage</th>
                                        <th className="px-6 py-4">GPA Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 font-bold text-navy">A</td><td className="px-6 py-4">90% - 100%</td><td className="px-6 py-4">4.0</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 font-bold text-navy">B</td><td className="px-6 py-4">80% - 89%</td><td className="px-6 py-4">3.0</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 font-bold text-navy">C</td><td className="px-6 py-4">70% - 79%</td><td className="px-6 py-4">2.0</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 font-bold text-navy">D</td><td className="px-6 py-4">60% - 69%</td><td className="px-6 py-4">1.0</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 font-bold text-red-500">F</td><td className="px-6 py-4">Below 60%</td><td className="px-6 py-4">0.0</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-2">Can this calculator handle 'Points' systems?</h3>
                                <p className="text-gray-600 text-sm">Yes. If your teacher uses total points (e.g., 450/500), simply calculate the percentage (450/500 = 90%) and enter it into a row with 100% weight.</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-2">What happens if my weights don't add up to 100%?</h3>
                                <p className="text-gray-600 text-sm">The calculator will normalize the result. It calculates the weighted average based on the weights you've provided so far. This is perfect for checking your "running total" mid-semester.</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-2">How do I calculate what I need on a final exam?</h3>
                                <p className="text-gray-600 text-sm">Enter all your current grades and weights. Then, add a final row for your "Final Exam" with its weight. Experiment by typing different numbers into the "Grade" box for that row until the total result hits your target (e.g., 90%).</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-navy/5 border border-navy/10 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-navy mb-3">Academic Success Tip</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Don't wait until finals week to check your grades. Successful students track their progress weekly. Using a grade calculator allows you to prioritize your study time for the subjects where you have the most room to improve your final letter grade.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
