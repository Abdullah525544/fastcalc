"use client";

import { useState, useEffect } from "react";
import {
    Percent,
    ArrowLeft,
    Info,
    HelpCircle,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PercentageCalculator() {
    // Mode 1: What is X% of Y?
    const [m1X, setM1X] = useState<number>(20);
    const [m1Y, setM1Y] = useState<number>(100);
    const [m1Result, setM1Result] = useState<number>(20);

    // Mode 2: X is what % of Y?
    const [m2X, setM2X] = useState<number>(20);
    const [m2Y, setM2Y] = useState<number>(100);
    const [m2Result, setM2Result] = useState<number>(20);

    // Mode 3: % Increase/Decrease from X to Y
    const [m3X, setM3X] = useState<number>(80);
    const [m3Y, setM3Y] = useState<number>(100);
    const [m3Result, setM3Result] = useState<number>(25);

    useEffect(() => {
        setM1Result((m1X / 100) * m1Y);
    }, [m1X, m1Y]);

    useEffect(() => {
        if (m2Y !== 0) setM2Result((m2X / m2Y) * 100);
    }, [m2X, m2Y]);

    useEffect(() => {
        if (m3X !== 0) {
            const diff = m3Y - m3X;
            setM3Result((diff / Math.abs(m3X)) * 100);
        }
    }, [m3X, m3Y]);

    const formatNum = (n: number) => Number(n.toFixed(2));

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
                                "@id": "https://fastcalc.site/percentage-calculator/#app",
                                "name": "Percentage Calculator - Universal % Tool",
                                "url": "https://fastcalc.site/percentage-calculator",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Free universal percentage calculator. Calculate percentage of a value, percentage change, and percentage increase/decrease instantly.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "publisher": {
                                    "@id": "https://fastcalc.site/#organization"
                                }
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
                    <h1 className="text-4xl font-bold text-navy mb-4 text-center">Ultimate Percentage Calculator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg mx-auto text-center">
                        The all-in-one tool for percentages, increases, decreases, and differences.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tool 1 */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                        <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-6">Percentage Of</h3>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">What is (%):</label>
                                <input
                                    type="number"
                                    value={m1X}
                                    onChange={(e) => setM1X(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 text-navy font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Of:</label>
                                <input
                                    type="number"
                                    value={m1Y}
                                    onChange={(e) => setM1Y(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 text-navy font-bold"
                                />
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Result</p>
                            <p className="text-4xl font-black text-blue-500">{formatNum(m1Result)}</p>
                        </div>
                    </div>

                    {/* Tool 2 */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full ring-2 ring-accent/20">
                        <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-accent">
                            <Percent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-6">Is What Percent</h3>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Value:</label>
                                <input
                                    type="number"
                                    value={m2X}
                                    onChange={(e) => setM2X(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-accent text-navy font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Is what % of:</label>
                                <input
                                    type="number"
                                    value={m2Y}
                                    onChange={(e) => setM2Y(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-accent text-navy font-bold"
                                />
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Result</p>
                            <p className="text-4xl font-black text-accent">{formatNum(m2Result)}%</p>
                        </div>
                    </div>

                    {/* Tool 3 */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
                        <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-purple-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-6">Percentage Change</h3>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">From Value:</label>
                                <input
                                    type="number"
                                    value={m3X}
                                    onChange={(e) => setM3X(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 text-navy font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">To Value:</label>
                                <input
                                    type="number"
                                    value={m3Y}
                                    onChange={(e) => setM3Y(Number(e.target.value))}
                                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-purple-500 text-navy font-bold"
                                />
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-2">Result</p>
                            <p className={`text-4xl font-black ${m3Result >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {m3Result >= 0 ? '+' : ''}{formatNum(m3Result)}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate max-w-none">
                    <header className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 leading-tight">
                            The Complete Guide to Percentage Calculations
                        </h2>
                        <p className="text-gray-500 text-xl leading-relaxed">
                            Master the math of everyday life. From shopping discounts to clinical statistics, learn why percentages matter and how to calculate them like a pro.
                        </p>
                    </header>

                    <section className="mb-20">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-navy mb-6">What Exactly is a Percentage?</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    The word "percent" literally means "per hundred" (per centum in Latin). In mathematics, a percentage is a way of expressing a number as a fraction of 100. It is a dimensionless number that allows us to compare quantities relative to a standard base, regardless of the actual scale.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Whether you're looking at a 15% discount at a retail store, a 4.5% interest rate on a mortgage, or the 70% of the Earth's surface covered by water, percentages provide a universal language for scale and proportion.
                                </p>
                            </div>
                            <div className="w-full md:w-72 bg-navy rounded-3xl p-8 text-white shadow-2xl">
                                <h4 className="font-bold text-accent mb-4 uppercase tracking-widest text-xs">The Formula</h4>
                                <div className="font-mono text-xl mb-4">(Part / Whole) × 100</div>
                                <p className="text-gray-400 text-sm italic">Example: 20 is what % of 80?<br />(20 / 80) × 100 = 25%</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-8">Three Ways to Use Our Calculator</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-4">1. Calculating a Value (% of X)</h3>
                                <p className="text-gray-600 mb-4">Use this when you know the total and the percentage, but need the numerical value.</p>
                                <ul className="text-sm text-gray-500 space-y-2">
                                    <li>• "What is 20% of a $150 bill?"</li>
                                    <li>• "What is my 5% bonus on a $60,000 salary?"</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-4">2. Finding the Percentage (X is what % of Y)</h3>
                                <p className="text-gray-600 mb-4">Use this when you have two numbers and want to know how they compare proportionally.</p>
                                <ul className="text-sm text-gray-500 space-y-2">
                                    <li>• "I got 18 out of 20 - what's my score?"</li>
                                    <li>• "15 out of 100 people responded - what % is that?"</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-8">Understanding Percentage Change</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            One of the most useful applications of percentages is tracking growth or decline. This is known as <strong>Percentage Change</strong>. It's used everywhere: from stock market gains to weight loss tracking and population growth.
                        </p>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center">
                            <h4 className="font-bold text-navy mb-6">Percentage Increase/Decrease Formula:</h4>
                            <div className="font-mono text-2xl text-accent mb-6 text-center">
                                ((New Value - Old Value) / |Old Value|) × 100
                            </div>
                            <p className="text-center text-gray-500 max-w-lg">
                                If the result is positive, it's an <strong>increase</strong>. If negative, it's a <strong>decrease</strong>.
                            </p>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">How do I calculate a percentage without a calculator?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The easiest trick is the 10% rule. Moving the decimal point one place to the left gives you 10%. To find 20%, double that number. To find 5%, halve it.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">What are percentage points?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Percentage points represent the arithmetic difference between two percentages. If an interest rate moves from 5% to 6%, it increased by 1 percentage point, but it increased by 20% in relative value.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Can percentages be higher than 100%?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Absolutely. A percentage higher than 100% means the value is greater than the original. For example, a 200% price increase means the price has tripled.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Is % calculated differently in other countries?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    No, percentages are a universal mathematical standard. However, some regions might use different symbols or notation (like 'per mil' ‰ which is per thousand).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-accent rounded-3xl p-12 text-navy mb-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                        <h2 className="text-3xl font-black mb-6">Need more specialized tools?</h2>
                        <p className="text-navy-light text-lg mb-8 max-w-2xl mx-auto">
                            While percentages are universal, sometimes you need specific answers for finance or school.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/tools/loan-calculator" className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-light transition-all">Loan Calculator</Link>
                            <Link href="/tools/grade-calculator" className="bg-white text-navy px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">Grade Calculator</Link>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}
