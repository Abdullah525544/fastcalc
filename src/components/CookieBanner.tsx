"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-[100] md:max-w-md md:left-auto">
            <div className="bg-navy rounded-xl shadow-2xl border border-navy-light p-5 text-white animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">Cookie Policy</h3>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                    We use essential cookies to ensure our calculators work correctly.
                    By using our site, you agree to our
                    <a href="/privacy" className="text-accent hover:underline ml-1 font-medium">Privacy Policy</a>.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={acceptCookies}
                        className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-6 rounded-lg text-sm w-full transition-all"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
