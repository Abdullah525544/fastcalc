"use client";

import { Info, ShieldCheck, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-4xl font-black text-navy mb-6 leading-tight">
                        Built for Contractors, <br />By People Who Care.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Fastcalc was created to demystify the complex world of UK tax and employment legislation.
                        We believe financial tools should be professional, free, and private.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <Zap className="w-10 h-10 text-accent mb-6" />
                        <h3 className="text-xl font-bold text-navy mb-4">Our Mission</h3>
                        <p className="text-gray-500 leading-relaxed">
                            To provide the UK contractor community with the most accurate,
                            up-to-date, and easy-to-use financial tools without the need for
                            sign-ups or sales pitches.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <ShieldCheck className="w-10 h-10 text-accent mb-6" />
                        <h3 className="text-xl font-bold text-navy mb-4">Accuracy First</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Every calculator on this site is updated manually for each tax year.
                            We track HMRC announcements, NI changes, and IR35 case law to
                            ensure your results are reliable.
                        </p>
                    </div>
                </div>

                <div className="prose prose-lg prose-slate max-w-none border-t border-gray-100 pt-16">
                    <h2 className="text-2xl font-bold text-navy mb-6">Why we exist</h2>
                    <p className="text-gray-600 mb-6 font-medium">
                        Contracting is one of the most rewarding ways to work, but the financial admin
                        can be a nightmare. From 2025/26 tax bands to fluctuating dividend rates
                        and the constant shadow of IR35, knowing Your 'real' income isn't easy.
                    </p>
                    <p className="text-gray-500 leading-relaxed mb-6">
                        Most tools are either hidden behind lead-generation forms or buried in
                        expensive accounting software. Fastcalc is different. We provide
                        premium-grade tools for free, because we know how much a quick,
                        reliable estimate matters when you're negotiating your next day rate.
                    </p>

                    <div className="bg-navy rounded-2xl p-8 text-white mt-12 flex flex-col md:flex-row items-center gap-8 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Ready to crunch some numbers?</h3>
                            <p className="text-gray-400 text-sm mb-0">
                                Explore our tools and see how they can help your business thrive.
                            </p>
                        </div>
                        <Link
                            href="/tools"
                            className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-bold transition-all whitespace-nowrap"
                        >
                            Go to Toolkit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
