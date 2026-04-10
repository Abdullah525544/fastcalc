"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    RefreshCcw,
    Share2,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    HelpCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        id: 1,
        question: "Do you control how and when you complete your work?",
        hint: "Supervision, Direction, and Control (SDC) is a key IR35 indicator.",
        weight: 15,
    },
    {
        id: 2,
        question: "Can you send a substitute to do your work?",
        hint: "Personal service is inside IR35. A genuine right of substitution points outside.",
        weight: 20,
    },
    {
        id: 3,
        question: "Does the client control your working hours?",
        hint: "Being required to work 9-5 like an employee suggests employment status.",
        weight: 10,
    },
    {
        id: 4,
        question: "Do you use your own equipment?",
        hint: "Providing your own tools is a classic indicator of being in business on your own account.",
        weight: 8,
    },
    {
        id: 5,
        question: "Are you integrated into the client's team/org chart?",
        hint: "Having an internal email signature or reporting to a line manager suggests employment.",
        weight: 12,
    },
    {
        id: 6,
        question: "Can the client extend or end the contract without notice?",
        hint: "Mutuality of Obligation (MOO) is a major factor in employment status.",
        weight: 15,
    },
    {
        id: 7,
        question: "Do you work for multiple clients simultaneously?",
        hint: "Having multiple concurrent revenue streams indicates a genuine business.",
        weight: 5,
    },
    {
        id: 8, question: "Do you bear financial risk if work is unsatisfactory?",
        hint: "Fixing mistakes in your own time at your own cost is a business risk.",
        weight: 10,
    },
    {
        id: 9,
        question: "Does the contract specify a fixed deliverable or project?",
        hint: "Being hired for a specific task rather than just 'filling a role' points outside.",
        weight: 5,
    },
    {
        id: 10,
        question: "Do you have a business website, insurance, and separate business account?",
        hint: "Evidence of a professional business structure supports Outside IR35 status.",
        weight: 5,
    },
];

export default function IR35Checker() {
    const [step, setStep] = useState(0); // 0 = Intro, 1-10 = Questions, 11 = Result
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const [score, setScore] = useState(0);

    const startQuiz = () => setStep(1);

    const handleAnswer = (questionId: number, value: boolean) => {
        const updatedAnswers = { ...answers, [questionId]: value };
        setAnswers(updatedAnswers);

        if (step < 10) {
            setStep(step + 1);
        } else {
            calculateResult(updatedAnswers);
        }
    };

    const calculateResult = (finalAnswers: Record<number, boolean>) => {
        let totalScore = 0;
        questions.forEach((q) => {
            // Logic: For IR35, "Yes" to "Control", "Subs", "Own Equip", "Risk", "Fixed Deliv", "Business setup" points OUTSIDE.
            // Wait, let's map them carefully based on the question text.
            // Q1: Control how/when (Yes = OUT)
            // Q2: Send substitute (Yes = OUT)
            // Q3: Client control hours (No = OUT)
            // Q4: Own equipment (Yes = OUT)
            // Q5: Integrated team (No = OUT)
            // Q6: End without notice (Yes = OUT - usually lack of MOO)
            // Q7: Multiple clients (Yes = OUT)
            // Q8: Financial risk (Yes = OUT)
            // Q9: Fixed deliverable (Yes = OUT)
            // Q10: Business setup (Yes = OUT)

            const outsideAnswers = {
                1: true, 2: true, 3: false, 4: true, 5: false,
                6: true, 7: true, 8: true, 9: true, 10: true
            };

            if (finalAnswers[q.id] === (outsideAnswers as any)[q.id]) {
                totalScore += q.weight;
            }
        });
        setScore(totalScore);
        setStep(11);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setScore(0);
    };

    const getStatus = () => {
        if (score >= 70) return {
            title: "Likely Outside IR35",
            color: "text-green-500",
            bg: "bg-green-50",
            border: "border-green-100",
            icon: CheckCircle2,
            desc: "Your working arrangement indicates you are operating as a genuine business. You maintain control, provide a specialized service, and lack integration into the client organization."
        };
        if (score >= 40) return {
            title: "Borderline — Seek Advice",
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-100",
            icon: AlertTriangle,
            desc: "Your results are mixed. Some factors point towards employment, while others suggest independent contracting. A full contract review by a professional is highly recommended."
        };
        return {
            title: "Likely Inside IR35",
            color: "text-red-500",
            bg: "bg-red-50",
            border: "border-red-100",
            icon: XCircle,
            desc: "Based on your answers, HMRC might view this engagement as 'disguised employment'. The client maintains significant control and you are integrated into the team."
        };
    };

    const renderStep = () => {
        if (step === 0) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="bg-accent/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-4xl font-bold text-navy mb-6">IR35 Status Checker</h1>
                    <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
                        Determine your employment status for tax purposes with our evidence-based questionnaire.
                        Takes less than 2 minutes.
                    </p>
                    <button
                        onClick={startQuiz}
                        className="bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/30"
                    >
                        Start Assessment
                    </button>
                </motion.div>
            );
        }

        if (step <= 10) {
            const q = questions[step - 1];
            return (
                <div className="max-w-2xl mx-auto">
                    <div className="mb-12">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question {step} of 10</span>
                            <span className="text-sm font-bold text-accent">{Math.round((step / 10) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 10) * 100}%` }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-navy mb-4">{q.question}</h2>
                            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl mb-10">
                                <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <p className="text-blue-700 text-sm italic">{q.hint}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleAnswer(q.id, true)}
                                    className="py-6 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-green-50 text-navy font-bold transition-all text-lg"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => handleAnswer(q.id, false)}
                                    className="py-6 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-green-50 text-navy font-bold transition-all text-lg"
                                >
                                    No
                                </button>
                            </div>

                            <button
                                onClick={() => setStep(step - 1)}
                                className="mt-8 text-gray-400 hover:text-navy text-sm font-medium flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Previous
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            );
        }

        const status = getStatus();

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto"
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "WebApplication",
                                    "@id": "https://fastcalc.site/tools/ir35-checker/#app",
                                    "name": "IR35 Status Checker 2025 — Free Tool",
                                    "url": "https://fastcalc.site/tools/ir35-checker",
                                    "applicationCategory": "FinanceApplication",
                                    "operatingSystem": "Web Browser",
                                    "inLanguage": "en-GB",
                                    "description": "Check your IR35 status instantly with our free 10-question checker. Find out if you are likely inside or outside IR35 based on the key HMRC tests — control, substitution and mutuality of obligation.",
                                    "offers": {
                                        "@type": "Offer",
                                        "price": "0",
                                        "priceCurrency": "GBP"
                                    },
                                    "featureList": [
                                        "IR35 Status Assessment",
                                        "Control Test",
                                        "Substitution Test",
                                        "Mutuality of Obligation Test",
                                        "Instant Result with Explanation"
                                    ],
                                    "audience": {
                                        "@type": "Audience",
                                        "audienceType": "UK contractors and freelancers"
                                    },
                                    "publisher": {
                                        "@id": "https://fastcalc.site/#organization"
                                    }
                                },
                                {
                                    "@type": "FAQPage",
                                    "@id": "https://fastcalc.site/tools/ir35-checker/#faq",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "What is IR35?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "IR35 is UK tax legislation designed to identify contractors who work like employees but operate through a limited company to pay less tax. If caught by IR35 you are taxed as an employee on that income."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "What does inside IR35 mean?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Inside IR35 means HMRC considers you a disguised employee for that contract. Your income from that contract is taxed like a salary with full income tax and National Insurance deducted."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "What are the three main IR35 tests?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "The three key tests HMRC uses are: Control (does the client control how you work?), Substitution (can you send someone else to do the work?), and Mutuality of Obligation (must you accept and complete work offered?)."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Is this IR35 checker the same as HMRC's CEST tool?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "No. This is an independent guide tool based on established IR35 case law principles. HMRC's official tool is called CEST (Check Employment Status for Tax). We recommend using both as a starting point before seeking professional advice."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Who decides IR35 status in the private sector?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Since April 2021, medium and large private sector clients determine IR35 status for their contractors. Small companies are exempt and contractors determine their own status."
                                            }
                                        }
                                    ]
                                },
                                {
                                    "@type": "BreadcrumbList",
                                    "@id": "https://fastcalc.site/tools/ir35-checker/#breadcrumb",
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
                                            "name": "IR35 Status Checker",
                                            "item": "https://fastcalc.site/tools/ir35-checker"
                                        }
                                    ]
                                }
                            ]
                        })
                    }}
                />
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <div className={`${status.bg} p-10 text-center border-b ${status.border}`}>
                        <status.icon className={`w-16 h-16 ${status.color} mx-auto mb-6`} />
                        <h2 className={`text-4xl font-black ${status.color} mb-2`}>{status.title}</h2>
                        <p className="text-gray-500 font-medium">Confidence Score: {score}%</p>
                    </div>

                    <div className="p-10 md:p-12">
                        <h3 className="text-xl font-bold text-navy mb-4">Assessment Summary</h3>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {status.desc}
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                <strong className="text-navy">Disclaimer:</strong> This tool provides an estimate
                                based on common IR35 case law and HMRC guidelines. It is <strong>not</strong> a legal
                                determination and should not be used as the sole basis for tax reporting.
                                Fastcalc accepts no liability for decisions made using this tool.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    if (typeof navigator !== 'undefined') {
                                        navigator.share({
                                            title: 'My IR35 Status',
                                            text: `I just checked my contract status on Fastcalc. Result: ${status.title}`,
                                            url: window.location.href,
                                        }).catch(() => {
                                            alert("Link copied to clipboard!");
                                        });
                                    }
                                }}
                                className="flex-1 bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" /> Share Result
                            </button>
                            <button
                                onClick={reset}
                                className="flex-1 bg-white border border-gray-200 hover:border-accent hover:text-accent text-navy font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCcw className="w-5 h-5" /> Retake Test
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-accent mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
                </Link>

                {renderStep()}

                {/* FAQ Section */}
                {step === 0 && (
                    <div className="mt-24 space-y-12 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold text-navy text-center">About IR35 Assessments</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="font-bold text-navy text-lg mb-4">What is IR35?</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    IR35 is tax legislation designed to identify "disguised employees" — people
                                    working through an intermediary (like a limited company) who would otherwise
                                    be employees if the intermediary didn't exist.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-lg mb-4">Inside vs Outside IR35?</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    Outside IR35 means you are genuinely self-employed and can pay yourself a mix
                                    of salary and dividends. Inside IR35 means you must pay tax and NI as an employee.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-lg mb-4">What if I'm borderline?</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    Status can be complex. HMRC's official CEST tool is one way to check,
                                    but independent reviews from specialists are the gold standard for protection.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-lg mb-4">How accurate is this?</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    We use weights based on real HMRC case law. However, status depends on
                                    both the written contract and the 'working practices' (the day-to-day reality).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto">
                    <header className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 leading-tight">
                            IR35 Status Checker 2025 — Are You Inside or Outside IR35?
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            A complete guide to the IR35 rules, the 3 key tests, the real cost difference, and what to do after you check your IR35 status.
                        </p>
                    </header>

                    <section className="mb-12">
                        <p className="text-gray-600 leading-relaxed">
                            You&apos;ve just landed a new contract. The day rate looks good. But then your client mentions IR35 — and suddenly everything feels uncertain. IR35 is the UK tax legislation designed to identify contractors who HMRC considers &quot;disguised employees&quot; — people working through a limited company who would otherwise be classed as employees if that company didn&apos;t exist. Use the free IR35 status checker above for an instant assessment. This guide explains exactly how the rules work in 2025, what your result means, and what to do next.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">What Is IR35 — And Why Does It Matter So Much?</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            IR35 was introduced in 2000 to tackle what HMRC called &quot;disguised employment.&quot; If you work through a limited company but your arrangement looks and feels like employment, HMRC wants you to pay tax like an employee. The financial consequences are significant — the difference between inside and outside IR35 at typical contractor rates is £8,000–£15,000+ per year.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <h3 className="font-bold text-red-600 mb-4">⚠️ Inside IR35</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>→ Taxed as an employee via PAYE</li>
                                    <li>→ Employer NI at 15% absorbed from your rate</li>
                                    <li>→ No tax-efficient dividend strategy</li>
                                    <li className="font-bold text-red-600">→ Lose £8,000–£15,000+ per year typically</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                                <h3 className="font-bold text-green-600 mb-4">✓ Outside IR35</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>→ Operate as genuine limited company</li>
                                    <li>→ Pay yourself salary + dividends</li>
                                    <li>→ Claim legitimate business expenses</li>
                                    <li className="font-bold text-green-600">→ Keep 70–80% of your gross day rate</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">The 3 Key IR35 Tests HMRC Uses to Judge Your Status</h2>
                        <div className="space-y-6 mb-8">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">1. Control</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">Does your client control what you do, how you do it, and when? If yes, that looks like employment. A genuine contractor decides their own working methods and delivers agreed outputs without being micromanaged on process.</p>
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                    <p className="text-sm text-amber-800"><strong>Example:</strong> If your client requires you in the office 9–5 and dictates exactly how to write every line of code, that&apos;s a red flag. If you decide your own schedule and methodology and deliver agreed outcomes, that supports outside IR35.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">2. Substitution</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">Can you send a qualified colleague in your place to do the work? A genuine business can substitute — an employee cannot. The right doesn&apos;t need to be exercised in practice, but it must be genuine and the client must realistically accept it.</p>
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                    <p className="text-sm text-amber-800"><strong>Example:</strong> If your contract allows a suitably qualified substitute and the client would genuinely accept them, that&apos;s a strong outside IR35 indicator. If the client insists on your personal service and would reject any substitute, that points inside IR35.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-navy mb-3">3. Mutuality of Obligation (MOO)</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">Is the client obliged to offer you work — and are you obliged to accept it? High mutuality of obligation is a hallmark of employment. A genuine contractor has a defined scope: deliver a project, then you&apos;re done. Notably, HMRC&apos;s own CEST tool controversially omits MOO from its assessment — a key reason tax professionals consider it incomplete.</p>
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                    <p className="text-sm text-amber-800"><strong>Example:</strong> If you&apos;re contracted to deliver a specific system and when done you&apos;re finished — that&apos;s low MOO. If you&apos;re expected to be available indefinitely and always roll onto the next project, that&apos;s high MOO.</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">IR35 Test</th>
                                        <th className="text-left px-6 py-4 font-bold text-green-300">Outside IR35 Signal</th>
                                        <th className="text-left px-6 py-4 font-bold text-red-300">Inside IR35 Signal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 font-semibold text-navy">Control</td><td className="px-6 py-4 text-gray-600">You choose how &amp; when to work</td><td className="px-6 py-4 text-gray-600">Client dictates methods &amp; hours</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 font-semibold text-navy">Substitution</td><td className="px-6 py-4 text-gray-600">Can send a qualified substitute</td><td className="px-6 py-4 text-gray-600">Must deliver the work personally</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 font-semibold text-navy">Mutuality of Obligation</td><td className="px-6 py-4 text-gray-600">No obligation to accept further work</td><td className="px-6 py-4 text-gray-600">Expected to always be available</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">Other Factors HMRC Also Considers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Financial Risk", body: "Do you risk your own money if a project goes wrong? Genuine businesses bear financial risk — fixing faults in your own time at your own cost, without extra pay. Employees don't carry this risk." },
                                { title: "Part and Parcel", body: "Are you treated like a permanent employee — given a company desk, email address, appearing on their org chart, attending company events? This level of integration suggests employment status rather than genuine contracting." },
                                { title: "Right of Substitution in the Contract", body: "Your written contract matters — but HMRC looks at the reality, not just the paper. A substitution clause that would never be used in practice provides very limited protection under scrutiny." },
                                { title: "Provision of Equipment", body: "Do you use your own laptop, software, and tools of the trade? Genuine contractors typically do. Being issued company devices and a security pass on day one looks employee-like to HMRC." }
                            ].map(({ title, body }) => (
                                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-navy mb-2">{title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Inside vs Outside IR35 — The Real Cost Difference</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">A worked example for a contractor billing £500/day (~£110,000/year at 220 days) under 2025/26 rates:</p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Scenario</th>
                                        <th className="text-left px-6 py-4 font-bold">Annual Tax Paid</th>
                                        <th className="text-left px-6 py-4 font-bold">Estimated Take-Home</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-green-50/50"><td className="px-6 py-4 font-bold text-green-700">Outside IR35 (Ltd Co)</td><td className="px-6 py-4 text-gray-600">~£28,000</td><td className="px-6 py-4 font-black text-green-600">~£82,000</td></tr>
                                    <tr className="bg-red-50/50"><td className="px-6 py-4 font-bold text-red-700">Inside IR35 (PAYE)</td><td className="px-6 py-4 text-gray-600">~£43,000</td><td className="px-6 py-4 font-black text-red-600">~£67,000</td></tr>
                                    <tr className="bg-white border-t-2 border-navy"><td className="px-6 py-4 font-black text-navy">Difference</td><td className="px-6 py-4 font-black text-red-500">£15,000 more tax</td><td className="px-6 py-4 font-black text-red-500">£15,000 less take-home</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed">This is why IR35 status isn&apos;t just a compliance issue — it&apos;s a financial one. Getting it wrong costs you thousands every year.</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">Public Sector vs Private Sector IR35 Rules</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The 2017 off-payroll working reform moved IR35 status responsibility from contractors to end clients in the public sector. From April 2021, the same change extended to medium/large private sector companies. Your end client now determines your status and must issue a <strong>Status Determination Statement (SDS)</strong> — a written notice of their IR35 decision with their reasoning. The exception is <strong>small companies</strong> (under £10.2m turnover, under £5.1m balance sheet, or fewer than 50 employees) — contractors working for small clients still determine their own IR35 status.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="text-left px-6 py-4 font-bold">Sector / Client Type</th>
                                        <th className="text-left px-6 py-4 font-bold">Who Decides IR35 Status?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Public sector (NHS, councils, govt)</td><td className="px-6 py-4 font-semibold text-navy">End client (since 2017)</td></tr>
                                    <tr className="bg-gray-50/50"><td className="px-6 py-4 text-gray-700">Private sector — medium/large company</td><td className="px-6 py-4 font-semibold text-navy">End client (since April 2021)</td></tr>
                                    <tr className="bg-white"><td className="px-6 py-4 text-gray-700">Private sector — small company</td><td className="px-6 py-4 font-semibold text-accent">Contractor determines own status</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-4">What Is HMRC&apos;s CEST Tool — And Is It Reliable?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            CEST (Check Employment Status for Tax) is HMRC&apos;s own online IR35 checker. HMRC says they&apos;ll stand behind CEST results if you answer accurately and honestly. But CEST is controversial — it doesn&apos;t properly account for Mutuality of Obligation, one of the three cornerstone IR35 tests, and returns &quot;unable to determine&quot; for a significant proportion of cases.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            CEST is worth running as a data point — but it shouldn&apos;t be your only check. Use it alongside this tool, review your actual working practices, and for any contract with significant money at stake, get a formal review from a specialist such as Qdos or IR35 Shield. A contractor accountant who specialises in IR35 is worth their weight in gold if your status isn&apos;t clear-cut.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-6">What to Do After You Get Your Result</h2>
                        <div className="space-y-6">
                            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-green-700 mb-3">If You&apos;re Likely Outside IR35</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">Don&apos;t get complacent. Ensure your written contract reflects genuine outside IR35 working practices, keep records of how you actually work (own equipment, flexible hours, no client integration), and for contracts above £500/day, a professional contract review from Qdos or IR35 Shield is money very well spent. It provides documented protection should HMRC ever enquire.</p>
                            </div>
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-amber-700 mb-3">If You&apos;re Borderline</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">Take this seriously. Borderline means real risk — some factors support outside IR35 while others don&apos;t. Get a professional contract review immediately and examine whether your actual working practices match what the contract says. HMRC tends to find their cases exactly at the gap between paper and reality.</p>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-red-700 mb-3">If You&apos;re Likely Inside IR35</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">Don&apos;t panic — many contractors work legitimately inside IR35. Your options: move to an umbrella company (which handles all PAYE administration cleanly), renegotiate your day rate for an &quot;IR35 rate uplift&quot; to account for the higher tax, or seek outside IR35 contracts instead. Speak to a contractor accountant who can map out the real financial impact at your rate.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                { q: "What does inside IR35 actually mean?", a: "Inside IR35 means HMRC considers your working arrangement equivalent to employment. In practice, the fee-payer (usually the agency or direct client) must deduct income tax and National Insurance before paying you, just like an employer. You lose the ability to take dividends tax-efficiently and typically take home significantly less than an outside IR35 contractor on the same day rate." },
                                { q: "Can I appeal an IR35 determination from my client?", a: "Yes. If your end client issues a Status Determination Statement that you believe is incorrect, you can use their formal disagreement process to challenge it. The client must respond within 45 days with either a revised determination or a detailed explanation for maintaining their original decision. If you're still unhappy, you can escalate to HMRC. This right applies to medium/large private sector clients and public sector bodies — not small companies where you determine your own status." },
                                { q: "Does IR35 apply if I work through an umbrella company?", a: "No — IR35 doesn't apply to umbrella company workers. Umbrella companies employ you directly and run full PAYE payroll as standard, so you're taxed as an employee from day one. There's no IR35 question because you're not operating through your own limited company. Many contractors whose contracts fall inside IR35 choose umbrella companies as the simplest, most compliant route." },
                                { q: "What is a Status Determination Statement (SDS)?", a: "A Status Determination Statement is a written document that your end client is legally required to give you when they assess your IR35 status — if they're a medium/large private sector company or public sector body. It must clearly state their conclusion (inside or outside IR35) and the reasoning behind it. Without a valid SDS, the IR35 liability shifts back to the end client. Always request your SDS and check whether the reasoning genuinely reflects your working arrangement." },
                                { q: "Can I work both inside and outside IR35 at the same time?", a: "Yes — IR35 status is assessed per contract, not per person. If you have two simultaneous contracts, each is treated completely separately for tax purposes. Your inside IR35 income is taxed as employment income; your outside IR35 income goes through your limited company as normal. Keep meticulous records and ensure each contract has clear, separate terms that accurately reflect how each engagement actually works." },
                                { q: "How often should I check my IR35 status?", a: "Check your status any time something materially changes: when you start a new contract, when an existing contract is renewed or extended, when your working practices shift, or when a new tax year brings updated HMRC rules. A contract that was clearly outside IR35 twelve months ago might look different today if the client has gradually increased their control or integrated you more into their team. Use this checker as a regular health check, not a one-time exercise." }
                            ].map(({ q, a }) => (
                                <div key={q} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-navy mb-3">{q}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-navy/5 border border-navy/10 rounded-2xl p-8 mb-12">
                        <h2 className="text-xl font-bold text-navy mb-3">Important Disclaimer</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            This IR35 status checker is a free guidance tool only — it is <strong>not</strong> a formal HMRC determination and does not constitute legal or tax advice. Results are based on general IR35 principles and weighted scoring built from HMRC guidance and employment case law. Your actual IR35 status depends on the specific facts of your contract and your working practices. For any contract where significant money is at stake, always consult a specialist contractor accountant or an IR35 review service such as Qdos, IR35 Shield, or Kingsbridge before making decisions.
                        </p>
                    </section>

                    <section>
                        <p className="text-gray-600 leading-relaxed">
                            IR35 is complex — but it&apos;s knowable. The three key tests — Control, Substitution, and Mutuality of Obligation — give you a clear framework for assessing any contract. Use the checker at the top of this page as your starting point, understand what your result means, and take the right next step based on what you find. With potentially £15,000 or more per year at stake, this is one compliance question absolutely worth getting right.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
