"use client";

import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Info,
    ArrowRight,
    TrendingUp,
    ShieldAlert,
    Percent,
    Calculator,
    ArrowDown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DividendVsSalary() {
    const [profit, setProfit] = useState<number>(100000);
    const [results, setResults] = useState<any>(null);

    const calculateResults = (totalProfit: number) => {
        // 2025/26 Constants
        const personalAllowance = 12570;
        const dividendAllowance = 500;

        // Tax Bands (Apply to non-dividend income first)
        const basicLimit = 50270;
        const higherLimit = 125140;

        const getCorporationTax = (p: number) => {
            if (p <= 50000) return p * 0.19;
            // Marginal relief exists between 50k and 250k, but simplified for this tool:
            return p * 0.25;
        };

        const getIncomeTax = (salary: number) => {
            let tax = 0;
            if (salary > personalAllowance) {
                const taxable = salary - personalAllowance;
                const basic = Math.min(taxable, 50270 - personalAllowance);
                tax += basic * 0.20;
                if (taxable > (50270 - personalAllowance)) {
                    const higher = taxable - (50270 - personalAllowance);
                    tax += higher * 0.40;
                }
            }
            return tax;
        };

        const getNI = (salary: number) => {
            const threshold = 12570;
            if (salary > threshold) {
                const taxable = Math.min(salary, 50270) - threshold;
                return (taxable * 0.08) + (salary > 50270 ? (salary - 50270) * 0.02 : 0);
            }
            return 0;
        };

        const getDividendTax = (dividend: number, otherIncome: number) => {
            let tax = 0;
            let remainingDividend = dividend;
            let currentIncome = otherIncome;

            // Personal allowance unused by salary?
            let unusedPA = Math.max(0, personalAllowance - otherIncome);
            if (unusedPA > 0) {
                const applied = Math.min(remainingDividend, unusedPA);
                remainingDividend -= applied;
                currentIncome += applied;
            }

            // Dividend allowance
            const appliedAllowance = Math.min(remainingDividend, dividendAllowance);
            remainingDividend -= appliedAllowance;
            // currentIncome does not increase for the sake of bands but it utilizes the band

            // Basic Rate (8.75%)
            if (currentIncome < basicLimit && remainingDividend > 0) {
                const availableBasic = basicLimit - currentIncome;
                const appliedBasic = Math.min(remainingDividend, availableBasic);
                tax += appliedBasic * 0.0875;
                remainingDividend -= appliedBasic;
                currentIncome += appliedBasic;
            }

            // Higher Rate (33.75%)
            if (currentIncome < higherLimit && remainingDividend > 0) {
                const availableHigher = higherLimit - currentIncome;
                const appliedHigher = Math.min(remainingDividend, availableHigher);
                tax += appliedHigher * 0.3375;
                remainingDividend -= appliedHigher;
                currentIncome += appliedHigher;
            }

            // Additional Rate (39.35%)
            if (remainingDividend > 0) {
                tax += remainingDividend * 0.3935;
            }

            return tax;
        };

        // Option A: All Salary
        const salaryA = totalProfit;
        const taxA = getIncomeTax(salaryA);
        const niA = getNI(salaryA);
        const takeHomeA = salaryA - taxA - niA;

        // Option B: All Dividends (after CT)
        const ctB = getCorporationTax(totalProfit);
        const dividendB = totalProfit - ctB;
        const divTaxB = getDividendTax(dividendB, 0);
        const takeHomeB = dividendB - divTaxB;

        // Option C: Optimal Split
        const salaryC = Math.min(totalProfit, personalAllowance);
        const remainingProfitC = totalProfit - salaryC;
        const ctC = getCorporationTax(remainingProfitC);
        const dividendC = remainingProfitC - ctC;
        const divTaxC = getDividendTax(dividendC, salaryC);
        const takeHomeC = salaryC + dividendC - divTaxC;

        setResults({
            a: { takeHome: takeHomeA, totalTax: taxA + niA, label: "Salary Only" },
            b: { takeHome: takeHomeB, totalTax: ctB + divTaxB, label: "Dividend Only" },
            c: { takeHome: takeHomeC, totalTax: ctC + divTaxC, label: "Optimal Split" },
        });
    };

    useEffect(() => {
        calculateResults(profit);
    }, [profit]);

    const format = (v: number) => "£" + Math.round(v).toLocaleString();

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
                                "@id": "https://fastcalc.site/tools/dividend-vs-salary/#app",
                                "name": "Dividend vs Salary Calculator UK 2025/26",
                                "url": "https://fastcalc.site/tools/dividend-vs-salary",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-GB",
                                "description": "Compare salary vs dividends vs optimal split for UK limited company directors. See exactly how much tax you pay under each approach using 2025/26 corporation tax and dividend tax rates.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "GBP"
                                },
                                "featureList": [
                                    "Salary vs Dividend Comparison",
                                    "Optimal Split Calculation",
                                    "Corporation Tax Calculation",
                                    "Dividend Tax Calculation",
                                    "Side-by-Side Tax Breakdown"
                                ],
                                "audience": {
                                    "@type": "Audience",
                                    "audienceType": "UK limited company directors and contractors"
                                },
                                "publisher": {
                                    "@id": "https://fastcalc.site/#organization"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://fastcalc.site/tools/dividend-vs-salary/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is it better to take salary or dividends from my limited company?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "For most UK limited company directors, a combination of salary up to the personal allowance (£12,570) and remaining income as dividends is the most tax-efficient approach in 2025/26, as dividends are not subject to National Insurance."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is the dividend allowance in 2025/26?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "The dividend allowance in 2025/26 is £500. This means the first £500 of dividend income above your personal allowance is tax-free. This was reduced from £1,000 in 2023/24."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Do I pay National Insurance on dividends?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "No. Dividends are not subject to National Insurance contributions. This is one of the main tax advantages of taking income as dividends rather than salary from your limited company."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is the dividend tax rate for basic rate taxpayers in 2025/26?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Basic rate taxpayers pay 8.75% dividend tax in 2025/26 on dividends above the £500 dividend allowance. Higher rate taxpayers pay 33.75% and additional rate taxpayers pay 39.35%."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does my company pay corporation tax before I can take dividends?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. Dividends are paid from post-tax profits. Your company must pay corporation tax on its profits first — either 19% for profits under £50,000 or up to 25% for larger profits — before the remaining profit can be distributed as dividends."
                                        }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "@id": "https://fastcalc.site/tools/dividend-vs-salary/#breadcrumb",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://fastcalc.site"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Tools",
                                        "item": "https://fastcalc.site/tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Dividend vs Salary Calculator",
                                        "item": "https://fastcalc.site/tools/dividend-vs-salary"
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
                    <h1 className="text-4xl font-bold text-navy mb-4">Dividend vs Salary Calculator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Compare extraction strategies for your limited company profit (2025/26).
                    </p>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-12">
                    <div className="max-w-md">
                        <label className="block text-sm font-bold text-navy mb-4">Total Company Profit Available (£)</label>
                        <div className="relative mb-6">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">£</span>
                            <input
                                type="number"
                                value={profit}
                                onChange={(e) => setProfit(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none text-2xl font-black"
                            />
                        </div>
                        <input
                            type="range"
                            min="10000"
                            max="250000"
                            step="1000"
                            value={profit}
                            onChange={(e) => setProfit(Number(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent mb-2"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <span>£10k</span>
                            <span>£100k</span>
                            <span>£250k</span>
                        </div>
                    </div>
                </div>

                {results && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[results.a, results.b, results.c].map((opt, i) => (
                            <motion.div
                                key={opt.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-3xl p-8 border-2 transition-all relative overflow-hidden ${i === 2 ? "border-accent shadow-2xl ring-4 ring-accent/10" : "border-gray-100 shadow-lg"
                                    }`}
                            >
                                {i === 2 && (
                                    <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-widest animate-pulse">
                                        Recommended
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-navy mb-8 flex items-center gap-2">
                                    {i === 0 && <Calculator className="w-5 h-5 text-gray-400" />}
                                    {i === 1 && <Percent className="w-5 h-5 text-gray-400" />}
                                    {i === 2 && <TrendingUp className="w-5 h-5 text-accent" />}
                                    {opt.label}
                                </h3>

                                <div className="mb-8">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Annual Take-Home</p>
                                    <p className={`text-4xl font-black ${i === 2 ? "text-accent" : "text-navy"}`}>
                                        {format(opt.takeHome)}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-gray-50">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Total Tax Paid</span>
                                        <span className="font-bold text-red-400">{format(opt.totalTax)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Effective Tax Rate</span>
                                        <span className="font-bold text-navy">{Math.round((opt.totalTax / profit) * 100)}%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-4">
                                        <span className="text-gray-500">Monthly Average</span>
                                        <span className="font-black text-navy">{format(opt.takeHome / 12)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-16 bg-navy rounded-3xl p-8 md:p-12 text-white">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-6">Expert Advice: Why use dividends?</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Most contractors operate on the "Optimal Split" because dividends do not attract
                                National Insurance contributions. However, dividends are paid out of company profits
                                <strong> after</strong> Corporation Tax has been deducted.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl flex gap-3">
                                    <div className="bg-accent h-2 w-2 rounded-full mt-2"></div>
                                    <p className="text-sm font-medium">Use unused personal allowance first with a small salary.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl flex gap-3">
                                    <div className="bg-accent h-2 w-2 rounded-full mt-2"></div>
                                    <p className="text-sm font-medium">Dividends keep you more flexible than fixed salary.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-80 bg-accent/10 border border-accent/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4 text-accent">
                                <ShieldAlert className="w-6 h-6" />
                                <span className="font-bold">Important</span>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Corporation tax for 2025/26 is 19% for profits up to £50,000 and 25% for
                                profits over £250,000, with a tapered 'marginal rate' in between. This
                                calculation uses 25% for simplicity over £50k.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-navy text-center mb-16">Quick Comparison FAQ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed">
                        <div>
                            <h4 className="font-bold text-navy mb-4">What is the Dividend Allowance?</h4>
                            <p className="text-gray-500">
                                It's the amount you can receive in dividends tax-free each year. For 2025/26,
                                this is £500. Anything above this is taxed at the basic, higher, or additional rate.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-navy mb-4">Should I use the Optimal Split?</h4>
                            <p className="text-gray-500">
                                Generally yes, as it minimizes National Insurance. However, if your contract
                                falls Inside IR35, you must usually be paid 100% via salary/payroll.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto">
                    <header className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 leading-tight">
                            Dividend vs Salary Calculator UK 2025/26 — Complete Guide
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            How to pay yourself from a limited company in the most tax-efficient way — with real numbers for 2025/26.
                        </p>
                    </header>

                    {/* Intro */}
                    <section className="mb-12">
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You run your own limited company. At the end of the month, you need to pay yourself. Do you take a salary? Dividends? A mix of both? Get it wrong and you&apos;re handing thousands of pounds to HMRC unnecessarily. This free dividend vs salary calculator shows you exactly what your take-home would look like under three different approaches, updated for the 2025/26 tax year. Below, we&apos;ll walk through how each option works, what the tax rates are, and how most limited company directors structure their income to keep as much as possible.
                        </p>
                    </section>

                    {/* Section 1 — Salary vs Dividends Difference */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Salary vs Dividends — What&apos;s the Actual Difference?</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            A salary is a regular payment from your company to you, processed through PAYE. It&apos;s subject to Income Tax and National Insurance — both the employee portion (8% up to £50,270) and the employer portion (13.8% above £9,100), which the company pays on top. Salary reduces company profit, which gives a corporation tax saving.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Dividends are payments made to shareholders from profits the company has already paid corporation tax on. They&apos;re taxed at lower rates than salary income — and crucially, they attract <strong>no National Insurance at all</strong>. That&apos;s the core reason the salary + dividend split is so effective for limited company directors.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                                <h3 className="font-bold text-navy mb-4">📋 Salary</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>→ Subject to Income Tax</li>
                                    <li>→ Employee NI: 8% (up to £50,270)</li>
                                    <li>→ Employer NI: 13.8% (above £9,100)</li>
                                    <li>→ Tax-deductible company expense</li>
                                    <li>→ Processed through PAYE</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                                <h3 className="font-bold text-green-700 mb-4">💰 Dividends</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>→ Paid from post-corporation-tax profits</li>
                                    <li>→ Subject to dividend tax (lower rates)</li>
                                    <li>→ <strong>No NI whatsoever</strong></li>
                                    <li>→ Requires sufficient retained profit</li>
                                    <li>→ Declared by the board, not via PAYE</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 — Tax Rates */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">2025/26 Tax Rates You Need to Know</h2>

                        <h3 className="text-xl font-bold text-navy mb-3">Corporation Tax (Your Company Pays This First)</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Before dividends can be paid, your company pays Corporation Tax on its profits. Dividends come from what&apos;s left — so corporation tax always comes first. This is why it&apos;s shown separately in the calculator.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-8">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Company Profit</th>
                                        <th className="text-left px-6 py-4 font-bold">Corporation Tax Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Up to £50,000</td><td className="px-6 py-4 font-bold text-accent">19% (Small Profits Rate)</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">£50,001 – £250,000</td><td className="px-6 py-4 font-bold text-amber-600">Marginal Relief applies</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Over £250,000</td><td className="px-6 py-4 font-bold text-red-500">25% (Main Rate)</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-navy mb-3">Dividend Tax Rates 2025/26</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The dividend allowance — the amount you can receive tax-free — dropped from £2,000 to £500 in April 2023 and has stayed there. Many directors are now paying more dividend tax than they were two years ago. Here&apos;s how dividends are taxed above that allowance:
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-8">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Dividend Income</th>
                                        <th className="text-left px-6 py-4 font-bold">Tax Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Within Personal Allowance (£12,570)</td><td className="px-6 py-4 font-bold text-accent">0%</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Dividend Allowance (£500)</td><td className="px-6 py-4 font-bold text-accent">0%</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Basic Rate Band</td><td className="px-6 py-4 font-bold text-navy">8.75%</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Higher Rate Band</td><td className="px-6 py-4 font-bold text-amber-600">33.75%</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Additional Rate Band</td><td className="px-6 py-4 font-bold text-red-500">39.35%</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-navy mb-3">Income Tax Bands 2025/26 (for Your Salary Portion)</h3>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-4">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Taxable Income</th>
                                        <th className="text-left px-6 py-4 font-bold">Tax Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Up to £12,570</td><td className="px-6 py-4 font-bold text-accent">0% (Personal Allowance)</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">£12,571 – £50,270</td><td className="px-6 py-4 font-bold text-navy">20%</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">£50,271 – £125,140</td><td className="px-6 py-4 font-bold text-amber-600">40%</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Over £125,140</td><td className="px-6 py-4 font-bold text-red-500">45%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 3 — Optimal Strategy */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">The Most Tax-Efficient Strategy for 2025/26</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Most contractor accountants recommend the same three-step approach. It works for the vast majority of limited company directors who don&apos;t have other significant income sources.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">Step 1: Pay Yourself a Salary of £12,570</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    The personal allowance is £12,570 — meaning the first £12,570 you earn is completely income tax free. Employer NI kicks in on salary above £9,100, but if you&apos;re a sole director with no other employees, most accountants recommend taking a salary of £12,570 regardless — because the employer NI cost (roughly £468) is outweighed by the corporation tax saving that salary creates. This only works if you don&apos;t qualify for the Employment Allowance (most sole directors don&apos;t). Your salary is a deductible business expense that reduces company profit and therefore corporation tax.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">Step 2: Take the Rest as Dividends</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    After corporation tax, distribute remaining profits as dividends. Your first £500 of dividends are tax-free (the dividend allowance). Dividends that fall within the basic rate band are taxed at only 8.75% — compared to 20% income tax plus 8% NI on salary. That&apos;s a significant saving on every pound you take as a dividend versus salary. Dividends don&apos;t go through PAYE — they&apos;re declared by the board and paid to shareholders. You report them on your Self Assessment tax return.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">Step 3: Retain Profits if You&apos;d Hit Higher Rate Tax</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Once your total income (salary + dividends) pushes above £50,270, dividend tax jumps from 8.75% to 33.75%. At that point, leaving profits inside the company often makes more sense. Retained profits sit in the company at corporation tax rates (19–25%) rather than being pulled out and taxed again at higher rates. You can draw them in a future year when your income is lower — or use them for pension contributions, which are even more tax-efficient.
                                </p>
                            </div>
                        </div>

                        {/* Worked Example */}
                        <div className="bg-navy rounded-2xl p-8 text-white mb-4">
                            <h3 className="text-xl font-bold mb-2">Worked Example: Director with £80,000 Company Profit (2025/26)</h3>
                            <p className="text-gray-400 text-sm mb-6">Assumes sole director, no other income, standard tax code</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-400 border-b border-white/10">
                                            <th className="text-left py-3 pr-6 font-bold">Approach</th>
                                            <th className="text-left py-3 pr-6 font-bold">Corp Tax</th>
                                            <th className="text-left py-3 pr-6 font-bold">Income/Div Tax</th>
                                            <th className="text-left py-3 pr-6 font-bold">Total Tax</th>
                                            <th className="text-left py-3 font-bold text-accent">Take-Home</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr><td className="py-4 pr-6 text-gray-300">Salary Only</td><td className="py-4 pr-6">£0</td><td className="py-4 pr-6 text-red-400">~£22,000</td><td className="py-4 pr-6 text-red-400">~£22,000</td><td className="py-4 font-black text-gray-300">~£58,000</td></tr>
                                        <tr><td className="py-4 pr-6 text-gray-300">Dividends Only</td><td className="py-4 pr-6">£15,200</td><td className="py-4 pr-6 text-red-400">~£4,500</td><td className="py-4 pr-6 text-red-400">~£19,700</td><td className="py-4 font-black text-gray-300">~£60,300</td></tr>
                                        <tr className="border border-accent/30 rounded-xl"><td className="py-4 pr-6 font-bold text-accent">Optimal Split ✓</td><td className="py-4 pr-6">~£12,900</td><td className="py-4 pr-6 text-green-400">~£2,800</td><td className="py-4 pr-6 text-green-400">~£15,700</td><td className="py-4 font-black text-accent text-xl">~£64,300</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            The optimal split saves this director over <strong>£6,000 compared to salary only — every single year.</strong> That&apos;s the power of getting this right. The difference compounds over a career into a genuinely life-changing sum.
                        </p>
                    </section>

                    {/* Section 4 — Employer NI */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">What About Employer National Insurance?</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            This is the bit many guides skip — and it catches directors out. Employer NI is charged at 13.8% on salary above £9,100. It&apos;s paid by the company, not you personally — but it reduces the profit available to distribute as dividends, so it absolutely affects your bottom line.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            The Employment Allowance lets eligible companies offset up to £5,000 of employer NI per year. However, <strong>sole directors with no other employees cannot claim the Employment Allowance</strong>. This is a common, expensive mistake. If you&apos;re the only director and the only employee, you&apos;re not eligible.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-4">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Salary Level</th>
                                        <th className="text-left px-6 py-4 font-bold">Employer NI Due</th>
                                        <th className="text-left px-6 py-4 font-bold">Employment Allowance Available?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Up to £9,100</td><td className="px-6 py-4 font-bold text-accent">£0</td><td className="px-6 py-4 text-gray-500">N/A</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">£9,101 – £12,570</td><td className="px-6 py-4 font-bold text-amber-600">Yes (13.8%)</td><td className="px-6 py-4 text-gray-500">Only if other employees exist</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">£12,570+</td><td className="px-6 py-4 font-bold text-red-500">Yes (13.8%)</td><td className="px-6 py-4 text-gray-500">Only if other employees exist</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 5 — Higher Rate Threshold */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">When Dividends Stop Being Tax Efficient</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Once your total income — salary plus dividends — exceeds £50,270, you&apos;ve crossed into the higher rate band. At that point, dividend tax jumps from 8.75% to 33.75%. That&apos;s a meaningful shift, and it changes the calculation significantly.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            For profits above that threshold, leaving money inside the company is often more tax-efficient. Corporation tax at 19–25% is lower than the combined effect of corporation tax plus 33.75% dividend tax. You can draw those retained profits in a future tax year when your income is lower, or take them at retirement when you might qualify for Entrepreneurs&apos; Relief.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Another powerful option: director pension contributions. A salary sacrifice into your pension is deductible for corporation tax purposes, avoids dividend tax entirely, and receives the bonus of pension tax relief on top. If you&apos;re pushing into higher rate territory, speak to a contractor accountant about pension strategy — it&apos;s consistently one of the most valuable planning tools available.
                        </p>
                    </section>

                    {/* Section 6 — FAQ */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Can I take dividends whenever I want from my limited company?",
                                    a: "Yes — as long as your company has sufficient retained profits after corporation tax. Dividends aren't subject to PAYE timing rules. You can declare and pay them monthly, quarterly, or annually, depending on your cash flow. Most directors declare dividends regularly throughout the year in line with their company's profits. However, you cannot pay a dividend that exceeds available retained profits — doing so creates an illegal dividend, which HMRC can reclassify as a salary (making it subject to NI and income tax)."
                                },
                                {
                                    q: "What happens if I take more dividends than my company has profit?",
                                    a: "It becomes an illegal dividend — also called an unlawful distribution. HMRC can treat it as a director's loan or reclassify it as salary, both of which carry significant tax consequences. Director's loans must be repaid within 9 months of the company's year-end or trigger a 32.5% Section 455 tax charge. Always ensure your company has sufficient distributable reserves (post-tax profits) before paying any dividend. Your accountant should check this before you declare."
                                },
                                {
                                    q: "Do I need to do a Self Assessment tax return if I take dividends?",
                                    a: "Yes. If you receive dividends from your limited company, you must file a Self Assessment tax return each year. Dividends don't go through PAYE, so HMRC doesn't collect dividend tax automatically. You declare your dividends on your return, and HMRC calculates what you owe above the dividend allowance. The deadline for online filing is 31 January following the end of the tax year. Missing this deadline triggers an automatic £100 penalty that escalates over time."
                                },
                                {
                                    q: "Is it better to leave money in my company or pay it out as dividends?",
                                    a: "It depends on how much you're drawing and what you plan to do with the money. If taking dividends would push you into higher rate tax (33.75%), leaving profits in the company at 19–25% corporation tax is often better. Retained profits can be invested within the company, used for future business expenses, or drawn in a later year at lower rates. However, if you need the cash now and you're comfortably within the basic rate band, taking dividends at 8.75% is generally the most efficient option."
                                },
                                {
                                    q: "What is the dividend allowance and how has it changed?",
                                    a: "The dividend allowance is the amount of dividend income you can receive each year without paying tax on it. It was £5,000 when introduced in 2016, fell to £2,000 in April 2018, and dropped again to £1,000 in April 2023 and then to £500 in April 2024 — where it remains for 2025/26. The sharp reduction means many directors are now paying several hundred pounds more in dividend tax per year than just two years ago. Factor this into your planning if you're comparing with older calculations."
                                },
                                {
                                    q: "Can I pay my spouse dividends to reduce my tax bill?",
                                    a: "Potentially — but it requires careful setup and HMRC scrutiny. If your spouse is a genuine shareholder in your company (with shares properly issued and a legitimate reason for their shareholding), they can receive dividends and use their own personal allowance and dividend allowance separately. This can legally reduce your combined tax bill. However, HMRC can challenge this under the 'settlements legislation' if the arrangement looks artificial. Get proper advice from a contractor accountant before issuing shares to a spouse — done correctly it's legitimate, done badly it attracts HMRC attention."
                                }
                            ].map(({ q, a }) => (
                                <div key={q} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-navy mb-3">{q}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Accuracy Notice */}
                    <section className="bg-navy/5 border border-navy/10 rounded-2xl p-8 mb-12">
                        <h2 className="text-xl font-bold text-navy mb-3">A Note on Accuracy and Tax Advice</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            All figures on this page and in the calculator are based on 2025/26 HMRC rates. The calculations are estimates for illustration purposes and assume standard tax codes, no other income sources, and no pension contributions. Every director&apos;s situation is different — your pension contributions, spouse&apos;s income, other employment income, and company profit history all affect the optimal split in your specific case. This is a guidance tool, not personal tax advice. Always consult a qualified contractor accountant for a personalised tax plan.
                        </p>
                    </section>

                    {/* Closing */}
                    <section>
                        <p className="text-gray-600 leading-relaxed">
                            The salary and dividend split is the single biggest tax decision a limited company director makes each year. Run your numbers now using the calculator at the top of this page — compare what salary only, dividends only, and the optimal split each deliver for your profit level. At £80,000 of company profit, the optimal approach saves over £6,000 per year. That&apos;s worth ten minutes of your time to get right.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
