"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-gray-50 min-h-screen py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-accent mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
                </Link>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-accent/10 p-2 rounded-lg">
                            <Lock className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="text-3xl font-black text-navy">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-slate prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
                        <p className="text-gray-400 italic">Last updated: April 2026</p>

                        <section>
                            <h2 className="text-lg font-bold text-navy mb-2 uppercase tracking-wider">1. The "No Data" Promise</h2>
                            <p>
                                At Fastcalc, we take your privacy incredibly seriously.
                                Our core philosophy is simple: **We don't want your data.**
                                Every calculation performed on this website happens locally in your
                                browser. We do not store, see, or transmit your financial figures
                                to our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-navy mb-2 uppercase tracking-wider">2. Information We Use</h2>
                            <p>
                                We only use essential technical information required to run the site:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Local Storage:</strong> We use your browser's local storage to remember your cookie consent preferences and, in some cases, your tool inputs for your convenience next time you visit. This data stays on your machine.</li>
                                <li><strong>Analytics:</strong> We use anonymized analytics (like Google Analytics) to understand how many people use our tools. This records things like page views and browser types, but <strong>no personal identifiers or calculation results.</strong></li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-navy mb-2 uppercase tracking-wider">3. Third Parties</h2>
                            <p>
                                We may display advertisements from partners like Google AdSense to keep this
                                service free. These third parties may use cookies to serve ads based on your
                                prior visits to this or other websites. You can opt-out of personalized
                                advertising in your Google account settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-navy mb-2 uppercase tracking-wider">4. Security</h2>
                            <p>
                                Because we don't collect personal data, there is no database for attackers to target.
                                We use standard HTTPS encryption to ensure your connection to our site is secure.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-gray-100 mt-12">
                            <p className="text-xs text-gray-400">
                                &copy; {currentYear} Fastcalc. For privacy inquiries, please contact us
                                through our GitHub repository or support channels.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
