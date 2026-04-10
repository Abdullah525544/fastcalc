"use client";

import { useState, useEffect } from "react";
import {
    Calculator,
    Info,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    HelpCircle
} from "lucide-react";
import Link from "next/link";

export default function TakeHomePay() {
    // Inputs
    const [grossSalary, setGrossSalary] = useState<number>(50000);
    const [payPeriod, setPayPeriod] = useState<string>("annual");
    const [studentLoan, setStudentLoan] = useState<string>("none");
    const [pensionType, setPensionType] = useState<string>("percentage");
    const [pensionValue, setPensionValue] = useState<number>(5);

    // Results
    const [results, setResults] = useState({
        gross: 0,
        tax: 0,
        ni: 0,
        studentLoan: 0,
        pension: 0,
        takeHome: 0,
    });

    // 2025/26 Logic
    const calculateTax = (salary: number) => {
        let tax = 0;
        const personalAllowance = 12570;

        // Adjusted Personal Allowance for income over 100k
        let adjustedAllowance = personalAllowance;
        if (salary > 100000) {
            const reduction = Math.floor((salary - 100000) / 2);
            adjustedAllowance = Math.max(0, personalAllowance - reduction);
        }

        const taxableIncome = Math.max(0, salary - adjustedAllowance);

        if (taxableIncome > 0) {
            // Basic rate
            const basicBand = Math.min(taxableIncome, 50270 - personalAllowance);
            tax += basicBand * 0.20;

            // Higher rate
            if (taxableIncome > (50270 - personalAllowance)) {
                const higherBand = Math.min(taxableIncome - (50270 - personalAllowance), 125140 - (50270 - personalAllowance));
                tax += higherBand * 0.40;
            }

            // Additional rate
            if (taxableIncome > (125140 - personalAllowance)) {
                const additionalBand = taxableIncome - (125140 - personalAllowance);
                tax += additionalBand * 0.45;
            }
        }
        return tax;
    };

    const calculateNI = (salary: number) => {
        // NI Class 1 Employee 2025/26
        const primaryThreshold = 12570;
        const upperEarningsLimit = 50270;

        let ni = 0;
        if (salary > primaryThreshold) {
            const basicNI = Math.min(salary, upperEarningsLimit) - primaryThreshold;
            ni += basicNI * 0.08; // 8%

            if (salary > upperEarningsLimit) {
                const upperNI = salary - upperEarningsLimit;
                ni += upperNI * 0.02; // 2%
            }
        }
        return ni;
    };

    const calculateStudentLoan = (salary: number, plan: string) => {
        let threshold = 0;
        const rate = 0.09; // 9% for most plans

        if (plan === "plan1") threshold = 24990;
        else if (plan === "plan2") threshold = 27295;
        else if (plan === "plan4") threshold = 31395;
        else return 0;

        if (salary > threshold) {
            return (salary - threshold) * rate;
        }
        return 0;
    };

    useEffect(() => {
        const annualGross = payPeriod === "annual" ? grossSalary :
            payPeriod === "monthly" ? grossSalary * 12 :
                grossSalary * 52;

        const pensionAmount = pensionType === "percentage" ? (annualGross * (pensionValue / 100)) : pensionValue;
        const taxableSalary = Math.max(0, annualGross - pensionAmount);

        const tax = calculateTax(taxableSalary);
        const ni = calculateNI(annualGross);
        const sl = calculateStudentLoan(annualGross, studentLoan);
        const takeHome = annualGross - tax - ni - sl - pensionAmount;

        setResults({
            gross: annualGross,
            tax,
            ni,
            studentLoan: sl,
            pension: pensionAmount,
            takeHome,
        });
    }, [grossSalary, payPeriod, studentLoan, pensionType, pensionValue]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "@id": "https://fastcalc.site/tools/take-home-pay/#app",
                                "name": "UK Take-Home Pay Calculator 2025/26",
                                "url": "https://fastcalc.site/tools/take-home-pay",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-GB",
                                "description": "Calculate your UK net salary after income tax, National Insurance, pension and student loan deductions. Updated for 2025/26 HMRC tax rates.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "GBP"
                                },
                                "featureList": [
                                    "Income Tax Calculation",
                                    "National Insurance Calculation",
                                    "Student Loan Deduction",
                                    "Pension Contribution",
                                    "Monthly and Weekly Breakdown"
                                ],
                                "audience": {
                                    "@type": "Audience",
                                    "audienceType": "UK employees and contractors"
                                },
                                "publisher": {
                                    "@id": "https://fastcalc.site/#organization"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://fastcalc.site/tools/take-home-pay/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "What is take-home pay?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Take-home pay is the amount of salary you receive after all deductions including income tax, National Insurance, pension contributions and student loan repayments have been removed from your gross salary."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How accurate is this take-home pay calculator?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "This calculator uses the official 2025/26 HMRC tax bands and National Insurance thresholds. Results are estimates and may vary based on your personal tax code and individual circumstances."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does this calculator include National Insurance?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. The calculator includes Class 1 employee National Insurance contributions at 8% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is the personal allowance for 2025/26?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "The personal allowance for 2025/26 is £12,570. This is the amount you can earn before paying any income tax."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can I calculate weekly and monthly take-home pay?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. The calculator shows your take-home pay broken down annually, monthly, weekly and daily."
                                        }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "@id": "https://fastcalc.site/tools/take-home-pay/#breadcrumb",
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
                                        "name": "UK Take-Home Pay Calculator",
                                        "item": "https://fastcalc.site/tools/take-home-pay"
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Inputs Column */}
                    <div className="lg:col-span-1">
                        <h1 className="text-3xl font-bold text-navy mb-2">Take-Home Pay</h1>
                        <p className="text-gray-500 mb-8">2025/26 Tax Year Calculator</p>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <label className="block text-sm font-semibold text-navy mb-4">Gross Salary (£)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">£</span>
                                    <input
                                        type="number"
                                        value={grossSalary}
                                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-lg font-bold"
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <label className="block text-sm font-semibold text-navy mb-4">Pay Period</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["annual", "monthly", "weekly"].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setPayPeriod(period)}
                                            className={`py-2 px-3 rounded-lg text-sm font-semibold capitalize transition-all border ${payPeriod === period
                                                ? "bg-navy text-white border-navy"
                                                : "bg-white text-gray-500 border-gray-200 hover:border-accent"
                                                }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <label className="block text-sm font-semibold text-navy mb-4">Student Loan</label>
                                <select
                                    value={studentLoan}
                                    onChange={(e) => setStudentLoan(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm font-medium"
                                >
                                    <option value="none">No Student Loan</option>
                                    <option value="plan1">Plan 1 (Pre-2012)</option>
                                    <option value="plan2">Plan 2 (Post-2012)</option>
                                    <option value="plan4">Plan 4 (Scottish)</option>
                                </select>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-semibold text-navy">Pension (%)</label>
                                    <span className="text-accent font-bold">{pensionValue}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={pensionValue}
                                    onChange={(e) => setPensionValue(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                                    <span>0%</span>
                                    <span>25%</span>
                                    <span>50%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                                    <div>
                                        <h2 className="text-gray-500 font-medium mb-1">Your Est. Monthly Take-Home</h2>
                                        <p className="text-5xl font-black text-navy">{formatCurrency(results.takeHome / 12)}</p>
                                    </div>
                                    <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100">
                                        <p className="text-green-600 text-sm font-bold uppercase tracking-wider mb-1">Annual Total</p>
                                        <p className="text-2xl font-bold text-navy">{formatCurrency(results.takeHome)}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-navy border-b border-gray-100 pb-4">Annual Breakdown</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Gross Income</span>
                                            <span className="font-bold text-navy">{formatCurrency(results.gross)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 group relative">
                                                <span className="text-gray-500">Income Tax</span>
                                                <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                                            </div>
                                            <span className="font-bold text-red-500">- {formatCurrency(results.tax)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">National Insurance</span>
                                            <span className="font-bold text-red-500">- {formatCurrency(results.ni)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Pension Contribution</span>
                                            <span className="font-bold text-red-500">- {formatCurrency(results.pension)}</span>
                                        </div>
                                        {results.studentLoan > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Student Loan</span>
                                                <span className="font-bold text-red-500">- {formatCurrency(results.studentLoan)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-12 bg-navy rounded-2xl p-6 text-white grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center md:border-r border-navy-light px-2">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Annual</p>
                                            <p className="font-bold text-lg">{formatCurrency(results.takeHome)}</p>
                                        </div>
                                        <div className="text-center md:border-r border-navy-light px-2">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Monthly</p>
                                            <p className="font-bold text-lg">{formatCurrency(results.takeHome / 12)}</p>
                                        </div>
                                        <div className="text-center md:border-r border-navy-light px-2">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Weekly</p>
                                            <p className="font-bold text-lg">{formatCurrency(results.takeHome / 52)}</p>
                                        </div>
                                        <div className="text-center px-2">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Daily</p>
                                            <p className="font-bold text-lg">{formatCurrency(results.takeHome / 260)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="mt-16 space-y-8">
                            <h3 className="text-2xl font-bold text-navy">Calculation FAQ</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-navy mb-3">Has the personal allowance changed?</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        No, the personal allowance remains frozen at £12,570 for the 2025/26 tax year.
                                        It begins to taper at £100,000, reducing by £1 for every £2 earned above this limit.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy mb-3">What are the 2025/26 NI rates?</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Class 1 National Insurance for employees is 8% for earnings between
                                        the Primary Threshold (£12,570) and the Upper Earnings Limit (£50,270),
                                        and 2% above that.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy mb-3">Does this include employers costs?</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        No, this calculator shows employee take-home pay for standard payroll (Inside IR35 or Umbrella).
                                        It does not deduct Employers NI or Apprenticeship Levy unless you account for them in gross pay.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate prose-lg max-w-none">
                    <header className="not-prose mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 leading-tight">
                            UK Take-Home Pay Calculator 2025/26 — Complete Guide
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Everything you need to understand your salary after tax, updated for the 2025/26 PAYE tax year.
                        </p>
                    </header>

                    {/* Intro */}
                    <section className="mb-12">
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You just got offered £45,000 a year. Sounds great — but what actually lands in your bank account each month? After income tax, National Insurance, and maybe a pension contribution or student loan repayment, that number can feel quite different from the headline figure. Our free UK take-home pay calculator gives you an instant answer, updated for the 2025/26 tax year. Whether you&apos;re a PAYE employee, a contractor, or someone comparing job offers, this guide explains exactly how your salary after tax is worked out — no jargon, no guesswork.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">How Much of Your Salary Do You Actually Keep?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When your employer pays you a gross salary, HM Revenue &amp; Customs (HMRC) takes a cut before it ever reaches your bank account. That process is called PAYE — Pay As You Earn. Your employer deducts Income Tax and National Insurance automatically from your paycheque and passes that money directly to HMRC on your behalf.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            So what typically comes out? <strong>Income Tax</strong> based on how much you earn over your personal allowance. <strong>National Insurance Contributions (NIC)</strong> — a separate deduction that funds the NHS, state pension, and other benefits. <strong>Pension contributions</strong> if you&apos;re auto-enrolled (which most employees are). And <strong>student loan repayments</strong> if you borrowed money for university.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Together, these deductions mean the average UK worker keeps somewhere between 65% and 80% of their gross salary. The more you earn, the larger the bite. But understanding exactly where your money goes makes you a much better financial decision-maker — whether you&apos;re negotiating a salary, choosing between job offers, or simply planning ahead.
                        </p>
                    </section>

                    {/* Section 2 — Tax Bands */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Understanding the 2025/26 UK Tax Bands</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Income Tax in the UK isn&apos;t flat — it works in bands. You don&apos;t pay 40% on your whole salary just because you earn over £50,270. You pay 40% only on the portion that sits above that threshold. Here&apos;s how the 2025/26 income tax bands break down in England, Wales, and Northern Ireland:
                        </p>
                        <div className="not-prose overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Taxable Income</th>
                                        <th className="text-left px-6 py-4 font-bold">Tax Rate</th>
                                        <th className="text-left px-6 py-4 font-bold">Tax Band Name</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Up to £12,570</td><td className="px-6 py-4 font-bold text-accent">0%</td><td className="px-6 py-4 text-gray-600">Personal Allowance</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">£12,571 – £50,270</td><td className="px-6 py-4 font-bold text-navy">20%</td><td className="px-6 py-4 text-gray-600">Basic Rate</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">£50,271 – £125,140</td><td className="px-6 py-4 font-bold text-amber-600">40%</td><td className="px-6 py-4 text-gray-600">Higher Rate</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Over £125,140</td><td className="px-6 py-4 font-bold text-red-500">45%</td><td className="px-6 py-4 text-gray-600">Additional Rate</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The <strong>personal allowance</strong> of £12,570 is the amount you can earn completely tax-free. Almost everyone gets it automatically — it&apos;s reflected in the standard tax code <strong>1257L</strong>, the number your employer uses to calculate deductions.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            In practice: if you earn £30,000, you only pay 20% tax on £17,430 (the amount above £12,570), not the full £30,000. That works out to £3,486 in income tax for the year. If you earn £60,000, you pay 20% on the basic rate portion and 40% on the slice between £50,270 and £60,000 — that&apos;s where you feel the higher rate quite sharply.
                        </p>
                    </section>

                    {/* Section 3 — NI */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">National Insurance Contributions Explained</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            National Insurance (NI) is often misunderstood. It&apos;s not a savings account — it&apos;s a contribution to the UK&apos;s social security system that funds the NHS, state pension, sick pay, and maternity pay entitlements. If you&apos;re an employee, you pay <strong>Class 1 National Insurance</strong>, automatically deducted from your pay through PAYE.
                        </p>
                        <div className="not-prose overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Earnings (Annual)</th>
                                        <th className="text-left px-6 py-4 font-bold">Employee NI Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Up to £12,570</td><td className="px-6 py-4 font-bold text-accent">0%</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">£12,571 – £50,270</td><td className="px-6 py-4 font-bold text-navy">8%</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Over £50,270</td><td className="px-6 py-4 font-bold text-amber-600">2%</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            On earnings between £12,570 and £50,270, you&apos;re effectively paying 28% on each pound (20% income tax + 8% NI). That&apos;s the real reason a Basic Rate taxpayer doesn&apos;t keep as much as the headline tax rate might suggest.
                        </p>
                    </section>

                    {/* Section 4 — Examples */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Real-World Take-Home Pay Examples</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Here&apos;s what four common gross salaries actually look like after income tax and NI in 2025/26 — assuming standard tax code 1257L, no pension deduction, and no student loan:
                        </p>
                        <div className="not-prose overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Gross Salary</th>
                                        <th className="text-left px-6 py-4 font-bold">Income Tax</th>
                                        <th className="text-left px-6 py-4 font-bold">National Insurance</th>
                                        <th className="text-left px-6 py-4 font-bold">Net Monthly Pay</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 font-bold text-navy">£20,000</td><td className="px-6 py-4 text-red-500">£1,486</td><td className="px-6 py-4 text-red-500">£1,148</td><td className="px-6 py-4 font-black text-accent">£1,447</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 font-bold text-navy">£30,000</td><td className="px-6 py-4 text-red-500">£3,486</td><td className="px-6 py-4 text-red-500">£1,948</td><td className="px-6 py-4 font-black text-accent">£2,047</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 font-bold text-navy">£45,000</td><td className="px-6 py-4 text-red-500">£6,486</td><td className="px-6 py-4 text-red-500">£3,028</td><td className="px-6 py-4 font-black text-accent">£2,957</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 font-bold text-navy">£60,000</td><td className="px-6 py-4 text-red-500">£13,432</td><td className="px-6 py-4 text-red-500">£3,748</td><td className="px-6 py-4 font-black text-accent">£3,568</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Your actual take-home may differ depending on pension contributions, student loan repayments, or any salary sacrifice arrangements. Even a 5% pension contribution on a £45,000 salary reduces your taxable income — so your net pay won&apos;t fall by a full 5%.
                        </p>
                    </section>

                    {/* Section 5 — Other Factors */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">What Else Affects Your Take-Home Pay?</h2>

                        <h3 className="text-xl font-bold text-navy mb-3">Pension Contributions</h3>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            If you work for an employer with five or more employees, you&apos;re almost certainly enrolled in a workplace pension via <strong>auto-enrolment</strong>. The legal minimum in 2025/26 is 5% from you and 3% from your employer. Your pension contributions reduce your taxable income, so if you earn £40,000 and contribute £2,000 to your pension, you only pay tax on £38,000. That&apos;s a genuine saving that compounds over time.
                        </p>

                        <h3 className="text-xl font-bold text-navy mb-3">Student Loan Repayments</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Student loan repayments are separate from tax and NI but come out through PAYE at the same time. Which plan you&apos;re on depends on when and where you studied:
                        </p>
                        <div className="not-prose overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Plan</th>
                                        <th className="text-left px-6 py-4 font-bold">Repayment Threshold</th>
                                        <th className="text-left px-6 py-4 font-bold">Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Plan 1</td><td className="px-6 py-4 text-gray-700">£24,990</td><td className="px-6 py-4 font-bold text-navy">9%</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Plan 2</td><td className="px-6 py-4 text-gray-700">£27,295</td><td className="px-6 py-4 font-bold text-navy">9%</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Plan 4 (Scottish)</td><td className="px-6 py-4 text-gray-700">£31,395</td><td className="px-6 py-4 font-bold text-navy">9%</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            You repay 9% of everything you earn <em>above</em> the threshold — nothing below it. Repayments pause automatically if your income drops below the threshold.
                        </p>

                        <h3 className="text-xl font-bold text-navy mb-3">Tax Code — Why It Matters</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Your tax code tells your employer how much tax to deduct each pay period. The most common is <strong>1257L</strong>, representing the standard personal allowance of £12,570. If your code is wrong — because HMRC has old information on file — you could be paying too much or too little tax all year without knowing it. Check your tax code on your payslip and verify it through your Personal Tax Account on HMRC&apos;s website.
                        </p>
                    </section>

                    {/* Section 6 — Extended FAQ */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-8">
                            {[
                                {
                                    q: "What is take-home pay?",
                                    a: "Take-home pay is the amount that actually reaches your bank account after all deductions from your gross salary. It's sometimes called net pay. Gross salary is the headline number on your contract — take-home pay is what you live on. Most UK full-time workers keep somewhere between 65% and 82% of their gross salary, depending on earnings level and which deductions apply."
                                },
                                {
                                    q: "How is income tax calculated in the UK?",
                                    a: "Income tax in the UK is calculated progressively using bands. Each portion of your earnings is taxed at the applicable rate for that band only. The first £12,570 is completely tax-free (the personal allowance). Earnings from £12,571 to £50,270 are taxed at 20% (Basic Rate). Anything from £50,271 to £125,140 is taxed at 40% (Higher Rate). Your employer handles this automatically through PAYE using your tax code."
                                },
                                {
                                    q: "Is National Insurance the same as income tax?",
                                    a: "No — they're two completely separate deductions that happen to come off your pay at the same time. Income tax goes into the government's general fund. National Insurance contributions are specifically linked to state benefit entitlements: the State Pension, statutory sick pay, maternity pay, and NHS services. Your NI record builds your entitlement to the full State Pension when you retire."
                                },
                                {
                                    q: "Why is my take-home different from my friend's on the same salary?",
                                    a: "Several things can cause this. Pension contribution levels differ — a salary sacrifice scheme reduces taxable income differently from a personal pension. Student loan plans vary — Plan 1, Plan 2, and Plan 4 have different thresholds. Tax codes differ if HMRC holds different information about each person. And those in Scotland pay Scottish income tax rates, which differ from the rest of the UK."
                                },
                                {
                                    q: "Does pension reduce my tax bill?",
                                    a: "Yes — and this is one of the most practical financial benefits many employees overlook. Workplace pension contributions are taken from your gross salary before income tax applies. Contribute £2,000 on a £40,000 salary, and you only pay tax on £38,000. Basic Rate taxpayers effectively get 20p back for every £1 in their pension. Higher Rate taxpayers get 40p back."
                                }
                            ].map(({ q, a }) => (
                                <div key={q} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-navy mb-3">{q}</h3>
                                    <p className="text-gray-600 leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Accuracy Notice */}
                    <section className="bg-navy/5 border border-navy/10 rounded-2xl p-8 mb-12">
                        <h2 className="text-xl font-bold text-navy mb-3">A Note on Accuracy</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            All figures on this page and in our calculator are based on 2025/26 HMRC rates (6 April 2025 – 5 April 2026). Results are estimates for standard PAYE employees in England, Wales, and Northern Ireland. They may not account for unusual tax codes, additional income sources, or complex pension arrangements. This content is for guidance only and does not constitute financial or tax advice. Always verify your specific situation with HMRC directly or speak to a qualified accountant.
                        </p>
                    </section>

                    {/* Closing */}
                    <section>
                        <p className="text-gray-600 leading-relaxed">
                            You now know what comes out of your salary, how the 2025/26 tax bands work, and how pensions, student loans, and your tax code shape your monthly net pay. Use the calculator at the top of this page to get your personalised breakdown in seconds. Bookmark this page and come back whenever your salary changes or a new tax year brings new rates — knowing your real take-home is the first step to being in control of your finances.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
