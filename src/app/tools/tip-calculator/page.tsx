"use client";

import { useState, useEffect } from "react";
import {
    UtensilsCrossed,
    ArrowLeft,
    Info,
    HelpCircle,
    Users,
    DollarSign,
    Split,
    Star
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TipCalculator() {
    const [bill, setBill] = useState<number>(65.50);
    const [tipPercentage, setTipPercentage] = useState<number>(18);
    const [people, setPeople] = useState<number>(2);

    const [results, setResults] = useState({
        tipAmount: 0,
        totalWithTip: 0,
        perPerson: 0,
    });

    useEffect(() => {
        const tipAmount = (bill * tipPercentage) / 100;
        const total = bill + tipAmount;
        setResults({
            tipAmount: tipAmount,
            totalWithTip: total,
            perPerson: total / (people > 0 ? people : 1),
        });
    }, [bill, tipPercentage, people]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val);
    };

    const tipOptions = [10, 15, 18, 20, 25];

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
                                "@id": "https://fastcalc.site/tools/tip-calculator/#app",
                                "name": "Tip Calculator - Free Bill Splitter Tool",
                                "url": "https://fastcalc.site/tools/tip-calculator",
                                "applicationCategory": "FinanceApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Quickly calculate tips and split bills between friends. Includes global tipping guides and etiquette tips.",
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-900">
                <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-accent mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-navy mb-4">Ultimate Tip Calculator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Calculate the perfect tip and split the bill easily with your friends.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <h3 className="text-lg font-bold text-navy mb-8">Service Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-navy mb-3">Total Bill Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            value={bill}
                                            onChange={(e) => setBill(Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-accent text-xl font-black text-navy"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-navy mb-3">Tip Percentage (%)</label>
                                    <div className="grid grid-cols-5 gap-2 mb-4">
                                        {tipOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setTipPercentage(opt)}
                                                className={`py-2 rounded-lg text-xs font-bold transition-all border ${tipPercentage === opt
                                                    ? 'bg-navy text-white border-navy'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-accent'}`}
                                            >
                                                {opt}%
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        value={tipPercentage}
                                        onChange={(e) => setTipPercentage(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs font-bold text-accent mt-3">
                                        <span>Custom: {tipPercentage}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-navy mb-3 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        Split Between
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setPeople(Math.max(1, people - 1))}
                                            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                                        >-</button>
                                        <div className="flex-1 text-center font-black text-2xl text-navy">{people}</div>
                                        <button
                                            onClick={() => setPeople(people + 1)}
                                            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
                            <h4 className="flex items-center gap-2 text-orange-800 font-bold text-sm mb-2">
                                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                                Tipping Manners
                            </h4>
                            <p className="text-orange-700/80 text-xs leading-relaxed">
                                In the US, a tip of 18-20% is standard for good service. For exceptional service, 25% is a great way to say thanks!
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                            <div className="relative z-10 space-y-12">
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Total Per Person</p>
                                    <p className="text-7xl font-black text-accent">{formatCurrency(results.perPerson)}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                                                <DollarSign className="w-5 h-5" />
                                            </div>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Tip Amount</p>
                                        </div>
                                        <p className="text-3xl font-bold text-navy">{formatCurrency(results.tipAmount)}</p>
                                        <p className="text-gray-500 text-xs mt-1">({formatCurrency(results.tipAmount / people)} each)</p>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-accent">
                                                <Split className="w-5 h-5" />
                                            </div>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total with Tip</p>
                                        </div>
                                        <p className="text-3xl font-bold text-navy">{formatCurrency(results.totalWithTip)}</p>
                                        <p className="text-gray-500 text-xs mt-1">Total bill after gratuity</p>
                                    </div>
                                </div>

                                <div className="bg-navy rounded-2xl p-6 text-white flex items-center gap-6">
                                    <UtensilsCrossed className="w-10 h-10 text-accent/50" />
                                    <div>
                                        <h4 className="font-bold">Dining Tip</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Always calculate your tip based on the subtotal <em>before</em> any tax is applied to save a bit of extra cash!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate max-w-none">
                    <header className="not-prose mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 leading-tight">
                            The Complete Tipping Guide: Etiquette, Rules, and Math
                        </h2>
                        <p className="text-gray-500 text-xl leading-relaxed">
                            Gratuity can be confusing. From restaurants to hair salons, learn the standard tipping rates for 2026 and how to use our calculator to split the bill effortlessly.
                        </p>
                    </header>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-6">Why We Tip</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            Tipping, or leaving a gratuity, is more than just a financial transaction. In many cultures, especially in the United States, it is a critical part of the service industry economy. Tips often make up the majority of a server's or service provider's income, as they are frequently paid a "tipped minimum wage" that is significantly lower than the standard minimum wage.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            By leaving a tip, you are recognizing the effort, skill, and hospitality provided by the person assisting you. It serves as an immediate performance-based reward for excellent service.
                        </p>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-8">Standard Tipping Rates for 2026</h2>
                        <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-navy text-white">
                                    <tr>
                                        <th className="px-8 py-4">Service Type</th>
                                        <th className="px-8 py-4">Standard Tip %</th>
                                        <th className="px-8 py-4">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white">
                                        <td className="px-8 py-4 font-bold text-navy">Sit-down Restaurant</td>
                                        <td className="px-8 py-4">18% - 25%</td>
                                        <td className="px-8 py-4 text-gray-500">Calculate based on pre-tax total.</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-8 py-4 font-bold text-navy">Bar / Bartender</td>
                                        <td className="px-8 py-4">$1 - $2 per drink</td>
                                        <td className="px-8 py-4 text-gray-500">Or 15-20% for a large tab.</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-8 py-4 font-bold text-navy">Hair Salon / Barber</td>
                                        <td className="px-8 py-4">15% - 20%</td>
                                        <td className="px-8 py-4 text-gray-500">Tip the assistant separately if they helped.</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-8 py-4 font-bold text-navy">Rideshare (Uber/Lyft)</td>
                                        <td className="px-8 py-4">10% - 15%</td>
                                        <td className="px-8 py-4 text-gray-500">More if they help with heavy luggage.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20">
                        <div className="bg-navy rounded-3xl p-10 text-white flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-6">Global Tipping Customs</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Traveling abroad? Tipping rules change drastically at the border.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <span className="text-accent font-bold">Europe:</span>
                                        <span className="text-sm text-gray-300">A "service charge" is often included. If not, rounding up the bill or leaving 5-10% is polite.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-accent font-bold">Japan/Korea:</span>
                                        <span className="text-sm text-gray-300">Tipping is not expected and can sometimes even be seen as offensive. Good service is standard.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-64 aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center p-8 border border-white/10 text-center">
                                <HelpCircle className="w-12 h-12 text-accent mb-4" />
                                <h4 className="font-bold mb-2">Did You Know?</h4>
                                <p className="text-[10px] text-gray-400">The word "TIP" was originally rumored to stand for "To Insure Promptness," though linguists now believe it has older origins!</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm outline outline-1 outline-gray-50">
                                <h3 className="font-bold text-navy mb-3">Should I tip on the total or the subtotal?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Standard etiquette is to tip on the <strong>subtotal</strong> (the cost of food and drink) before sales tax is added.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm outline outline-1 outline-gray-50">
                                <h3 className="font-bold text-navy mb-3">How do I handle poor service?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Instead of leaving no tip, which might be interpreted as forgetting, leave a smaller amount (10%) and politely speak with the manager about your experience.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm outline outline-1 outline-gray-50">
                                <h3 className="font-bold text-navy mb-3">What is "Autogratuity"?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Many restaurants automatically add a 18-20% tip for large groups (usually 6 or more). Always check your bill to ensure you don&apos;t accidentally double-tip!
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm outline outline-1 outline-gray-50">
                                <h3 className="font-bold text-navy mb-3">Is it okay to tip in cash?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Most service workers prefer cash tips because they receive them immediately. If tipping on a card, the server often has to wait for their next paycheck.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center">
                        <h2 className="text-2xl font-bold text-navy mb-4">Be the Guest Servers Love</h2>
                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Gratuity is a gesture of kindness. While math helps you find the right number, your attitude and appreciation are what truly make a difference in person.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
