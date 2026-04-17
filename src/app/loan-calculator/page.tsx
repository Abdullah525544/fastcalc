"use client";

import { useState, useEffect } from "react";
import {
    CircleDollarSign,
    ArrowLeft,
    Info,
    HelpCircle,
    Calendar,
    Wallet,
    TrendingDown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoanCalculator() {
    const [amount, setAmount] = useState<number>(10000);
    const [rate, setRate] = useState<number>(5.5);
    const [years, setYears] = useState<number>(3);
    const [results, setResults] = useState({
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
    });

    useEffect(() => {
        const principal = amount;
        const calculatedInterest = rate / 100 / 12;
        const calculatedPayments = years * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            setResults({
                monthlyPayment: monthly,
                totalPayment: monthly * calculatedPayments,
                totalInterest: monthly * calculatedPayments - principal,
            });
        }
    }, [amount, rate, years]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val);
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
                                "@id": "https://fastcalc.site/loan-calculator/#app",
                                "name": "Loan Calculator - Personal & Mortgage Interest Tool",
                                "url": "https://fastcalc.site/loan-calculator",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Calculate loan repayments, monthly interest, and total cost of credit. Professional financial tool for mortgages and personal loans.",
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
                    <h1 className="text-4xl font-bold text-navy mb-4">Loan Repayment Calculator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Estimate your monthly payments and see how much interest you'll pay over the life of your loan.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-zinc-900">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <h3 className="text-lg font-bold text-navy mb-8">Loan Details</h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="flex justify-between text-sm font-bold text-navy mb-4">
                                        Loan Amount
                                        <span className="text-accent">{formatCurrency(amount)}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="500000"
                                        step="1000"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                                        <span>$1k</span>
                                        <span>$500k</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex justify-between text-sm font-bold text-navy mb-4">
                                        Interest Rate (APR)
                                        <span className="text-accent">{rate}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="30"
                                        step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                                        <span>0.1%</span>
                                        <span>30%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex justify-between text-sm font-bold text-navy mb-4">
                                        Loan Term (Years)
                                        <span className="text-accent">{years} Years</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
                                        <span>1 Year</span>
                                        <span>30 Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-navy rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-accent" />
                                Did you know?
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Shortening your loan term from 5 years to 3 years can save you thousands in interest, even if the monthly payment is higher.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden relative">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                <div>
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Monthly Payment</p>
                                    <p className="text-6xl font-black text-navy">{formatCurrency(results.monthlyPayment)}</p>
                                </div>
                                <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100">
                                    <p className="text-green-600 text-xs font-bold uppercase mb-1">Total to Repay</p>
                                    <p className="text-2xl font-bold text-navy">{formatCurrency(results.totalPayment)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                                        <Wallet className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Principal</p>
                                        <p className="text-xl font-bold text-navy">{formatCurrency(amount)}</p>
                                    </div>
                                </div>
                                <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-400">
                                        <TrendingDown className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Total Interest</p>
                                        <p className="text-xl font-bold text-navy">{formatCurrency(results.totalInterest)}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-12 p-8 rounded-3xl border-2 border-dashed border-gray-100 text-center">
                                <h4 className="text-navy font-bold mb-4">Loan Payoff Summary</h4>
                                <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                                    Over the course of <strong>{years} years</strong>, you will make <strong>{years * 12} monthly payments</strong>.
                                    For every $1 burrowed, you are paying back <strong>{formatCurrency(results.totalPayment / amount)}</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate prose-lg max-w-none">
                    <header className="not-prose mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 leading-tight">
                            Personal Loan & Mortgage Calculator: Mastering Interest Rates
                        </h2>
                        <p className="text-gray-500 text-xl leading-relaxed">
                            Understanding the true cost of credit is the first step toward financial freedom. Learn how loan amortization works and how to save thousands on your next loan.
                        </p>
                    </header>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-6">How Loans Actually Work</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            When you take out a loan, whether it&apos;s for a new car, a home mortgage, or a personal expense, you&apos;re entering into a contract to borrow a specific amount called the <strong>principal</strong>. In exchange for this immediate cash, you agree to pay it back over time with <strong>interest</strong>—the fee charged by the lender for the risk and the use of their capital.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Most consumer loans use <strong>amortization</strong>. This means your fixed monthly payment stays the same, but the proportion of that payment going toward interest versus principal changes over time. In the beginning, you pay mostly interest; toward the end, you pay mostly principal.
                        </p>
                    </section>

                    <section className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
                                <h3 className="text-2xl font-bold text-navy mb-6">What is APR?</h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    APR stands for Annual Percentage Rate. It is more than just the interest rate; it represents the <em>total</em> yearly cost of the loan, including mandatory fees and closing costs. Always compare loans by their APR, not just their base interest rate, to get the full picture.
                                </p>
                            </div>
                            <div className="bg-navy p-10 rounded-3xl text-white relative overflow-hidden">
                                <h3 className="text-2xl font-bold mb-6">The Power of Extra Payments</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6">
                                    Adding even a small amount to your monthly principal payment can significantly shorten your loan term and slash your total interest costs. Because of how compound interest works, payments made early in the loan term have the largest impact.
                                </p>
                                <div className="bg-white/10 px-4 py-2 rounded-lg inline-block text-accent font-bold text-sm">
                                    Financial Pro-Tip
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Should I choose a fixed or variable rate?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Fixed rates provide stability—your payment will never change. Variable rates often start lower but can increase if market interest rates rise, making them riskier for long-term loans like mortgages.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">What are origination fees?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    These are upfront fees charged by lenders to process a loan. They are usually a percentage of the total loan amount and are factored into the loan&apos;s APR.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Can I pay off my loan early?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Most modern loans allow early payoff without penalty, but some older or predatory loans have "prepayment penalties." Always check your loan agreement before making bulk payments.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">How does credit score affect my rate?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Lenders use your credit score to assess risk. A higher score (740+) typically unlocks the lowest possible interest rates, while lower scores (under 600) may result in much higher APRs or loan denial.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-100 border border-zinc-200 rounded-3xl p-10 mb-20">
                        <h2 className="text-xl font-bold text-navy mb-4">Financial Responsibility Notice</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The calculations provided by this tool are for informational purposes and estimates only. They do not constitute a commitment to lend. Actual loan terms will depend on your credit history, income, and the lender's specific policies. We recommend speaking with a certified financial advisor before making major debt commitments.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
