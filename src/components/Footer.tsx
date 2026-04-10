import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-navy p-1.5 rounded-lg">
                                <Calculator className="w-5 h-5 text-accent" />
                            </div>
                            <span className="text-navy font-bold text-xl tracking-tight">
                                Fastcalc
                            </span>
                        </Link>
                        <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                            Professional financial toolkit for UK contractors. Free tools and
                            calculators for take-home pay, IR35 status, and share dividends
                            updated for the 2025/26 tax year.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-navy font-bold text-sm uppercase tracking-wider mb-4">Calculators</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tools/take-home-pay" className="text-gray-500 hover:text-accent text-sm transition-colors">
                                    Take-Home Pay
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/ir35-checker" className="text-gray-500 hover:text-accent text-sm transition-colors">
                                    IR35 Status Checker
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/dividend-vs-salary" className="text-gray-500 hover:text-accent text-sm transition-colors">
                                    Dividend vs Salary
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-navy font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-500 hover:text-accent text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-500 hover:text-accent text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs text-center md:text-left">
                        &copy; {currentYear} Fastcalc. All rights reserved.
                        All calculations are estimates for guidance only.
                    </p>
                    <div className="flex gap-6">
                        <p className="text-gray-400 text-[10px] italic">
                            Built for speed & accuracy
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
