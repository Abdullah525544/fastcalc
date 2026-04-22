"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    Activity,
    ArrowLeft,
    RotateCcw,
    Music,
    Heart,
    Zap,
    Clock,
    Info,
    ChevronRight,
    MousePointer2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TapTempo() {
    const [taps, setTaps] = useState<number[]>([]);
    const [bpm, setBpm] = useState<number | null>(null);
    const [lastTapTime, setLastTapTime] = useState<number | null>(null);
    const [isPulsing, setIsPulsing] = useState(false);

    // Limits for calculation
    const MAX_TAPS = 20;
    const RESET_TIMEOUT = 3000; // 3 seconds of inactivity resets some state

    const handleTap = useCallback(() => {
        const now = Date.now();
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 100);

        setTaps((prevTaps) => {
            const newTaps = [...prevTaps, now].slice(-MAX_TAPS);

            if (newTaps.length > 1) {
                const intervals = [];
                for (let i = 1; i < newTaps.length; i++) {
                    intervals.push(newTaps[i] - newTaps[i - 1]);
                }
                const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                setBpm(Math.round(60000 / avgInterval));
            }

            return newTaps;
        });

        setLastTapTime(now);
    }, []);

    const reset = () => {
        setTaps([]);
        setBpm(null);
        setLastTapTime(null);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "Enter") {
                e.preventDefault();
                handleTap();
            }
            if (e.code === "KeyR" || e.code === "Escape") {
                reset();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleTap]);

    // Classical tempos mapping
    const getTempoText = (bpm: number) => {
        if (bpm < 40) return "Grave / Larghissimo";
        if (bpm < 60) return "Largo";
        if (bpm < 66) return "Larghetto";
        if (bpm < 76) return "Adagio";
        if (bpm < 108) return "Andante";
        if (bpm < 120) return "Moderato";
        if (bpm < 156) return "Allegro";
        if (bpm < 176) return "Vivace";
        if (bpm > 176) return "Presto / Prestissimo";
        return "";
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
                                "@id": "https://fastcalc.site/tools/tap-tempo/#app",
                                "name": "Tap Tempo BPM Counter",
                                "url": "https://fastcalc.site/tools/tap-tempo",
                                "applicationCategory": "MultimediaApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Free online tap tempo tool. Find the BPM (Beats Per Minute) of any song or heart rate by tapping along with your keyboard or mouse.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
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

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">Tap Tempo BPM Counter</h1>
                    <p className="text-gray-500 max-w-2xl text-lg mx-auto">
                        Find the exact beats per minute of any song or your heart rate instantly.
                        Simply tap the area below or use your <span className="text-accent font-bold">Spacebar</span>.
                    </p>
                </header>

                <div className="max-w-3xl mx-auto">
                    {/* Main Tool Grid */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            {/* BPM Display */}
                            <div className="mb-12 text-center">
                                <span className="block text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Current Tempo</span>
                                <div className="relative inline-block">
                                    <motion.div
                                        key={bpm}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-8xl md:text-[10rem] font-black text-navy leading-none"
                                    >
                                        {bpm || "---"}
                                    </motion.div>
                                    <span className="absolute -bottom-4 right-0 text-2xl font-bold text-accent">BPM</span>
                                </div>
                                <AnimatePresence>
                                    {bpm && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mt-4 text-xl font-medium text-gray-500 italic"
                                        >
                                            {getTempoText(bpm)}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Tap Area */}
                            <motion.button
                                onClick={handleTap}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full max-w-md aspect-square md:aspect-[16/9] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-150 border-4 relative overflow-hidden group
                                    ${isPulsing
                                        ? "bg-accent text-white border-accent shadow-2xl shadow-accent/40"
                                        : "bg-gray-50 text-navy border-gray-100 hover:border-accent/30 hover:bg-white shadow-xl"
                                    }`}
                            >
                                <Activity className={`w-12 h-12 mb-4 ${isPulsing ? "animate-pulse" : "text-accent"}`} />
                                <span className={`text-2xl font-bold uppercase tracking-tighter ${isPulsing ? "text-white" : "text-navy"}`}>
                                    TAP HERE
                                </span>
                                <span className={`text-sm mt-2 opacity-60 ${isPulsing ? "text-white" : "text-gray-400"}`}>
                                    OR PRESS SPACEBAR
                                </span>

                                {/* Visual Ring on Tap */}
                                {isPulsing && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 4, opacity: 0 }}
                                        className="absolute inset-0 rounded-full border-4 border-white pointer-events-none"
                                    />
                                )}
                            </motion.button>

                            {/* Stats & Actions */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 w-full border-t border-gray-100 pt-8">
                                <div className="text-center">
                                    <span className="block text-gray-400 text-xs font-bold uppercase mb-1">Beats Logged</span>
                                    <span className="text-2xl font-black text-navy">{taps.length}</span>
                                </div>
                                <div className="h-12 w-px bg-gray-100 hidden sm:block"></div>
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-light transition-all shadow-lg active:scale-95"
                                >
                                    <RotateCcw className="w-4 h-4" /> Reset Tool
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                            <div className="bg-blue-500 p-3 rounded-xl h-fit text-white">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy mb-1">Pro Tip</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Tap for at least 10 beats to get the most accurate average. The counter ignores irregularities to ensure a stable result.
                                </p>
                            </div>
                        </div>
                        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 flex gap-4">
                            <div className="bg-purple-500 p-3 rounded-xl h-fit text-white">
                                <MousePointer2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy mb-1">Shortcuts</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Use <kbd className="bg-white border rounded px-1 text-xs">Spacebar</kbd> for faster tapping or <kbd className="bg-white border rounded px-1 text-xs">Esc</kbd> to quickly reset the data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate max-w-none">
                    <header className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 leading-tight">
                            The Science of Rhythm: A Deep Dive into BPM
                        </h2>
                        <p className="text-gray-500 text-xl leading-relaxed italic">
                            How "tapping it out" translates timing into mathematics.
                        </p>
                    </header>

                    <section className="mb-20">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-navy mb-6">What Exactly is Tap Tempo?</h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Tap Tempo is a vital tool for musicians, producers, and DJs that allows you to calculate the <strong className="text-navy">Beats Per Minute (BPM)</strong> of a piece of music by simply tapping along to the beat. Instead of guessing the speed or looking at a static sheet, you use your natural sense of rhythm to feed data into our algorithm.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg italic">
                                    Our BPM counter uses a sophisticated sliding window average. This means it filters out small variations in your tapping speed to provide a reliable, "centered" BPM value that represents the true pulse of the music.
                                </p>
                            </div>
                            <div className="w-full md:w-80 bg-navy rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                                <h4 className="font-bold text-accent mb-4 uppercase tracking-widest text-xs">Modern Music Standards</h4>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex items-center gap-3 border-b border-white/10 pb-2">
                                        <Music className="w-4 h-4 text-accent" /> Low: 60-90 BPM (Lo-Fi / R&B)
                                    </li>
                                    <li className="flex items-center gap-3 border-b border-white/10 pb-2">
                                        <Music className="w-4 h-4 text-accent" /> Mid: 120-128 BPM (House / Pop)
                                    </li>
                                    <li className="flex items-center gap-3 border-b border-white/10 pb-2">
                                        <Music className="w-4 h-4 text-accent" /> High: 140+ BPM (Techno / D&B)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h3 className="text-3xl font-bold text-navy mb-8">Who Needs a BPM Counter?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                                    <Music className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-navy mb-3">Musicians & DJs</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Perfect for setting delay pedal times, syncing metronomes, or calculating the energy level of your next set list.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-navy">
                                <div className="bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-red-500">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-navy mb-3">Fitness & Health</h4>
                                <p className="text-gray-600 text-sm leading-relaxed text-navy">
                                    Measure your heart rate by tapping along with your pulse. Ideal for checking resting heart rate or recovery speed.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-600">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-navy mb-3">Editors & Animators</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Sync video cuts and motion graphics to the rhythmic pulse of your soundtrack for a more "harmonic" viewer experience.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mb-48 -mr-48 blur-3xl"></div>
                            <h3 className="text-3xl font-bold mb-8 text-accent">Classical Tempo Glossary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    { name: "Larghissimo", bpm: "24 & under", desc: "Extremely slow, broad" },
                                    { name: "Adagio", bpm: "66—76", desc: "Slow and stately" },
                                    { name: "Andante", bpm: "76—108", desc: "At a walking pace" },
                                    { name: "Moderato", bpm: "108—120", desc: "At a moderate speed" },
                                    { name: "Allegro", bpm: "120—156", desc: "Fast, quickly and bright" },
                                    { name: "Presto", bpm: "168—200", desc: "Extremely fast" },
                                ].map((tempo) => (
                                    <div key={tempo.name} className="flex justify-between items-center border-b border-white/10 pb-4 group">
                                        <div>
                                            <h5 className="font-bold text-lg group-hover:text-accent transition-colors">{tempo.name}</h5>
                                            <p className="text-xs text-gray-400">{tempo.desc}</p>
                                        </div>
                                        <span className="font-mono text-accent text-lg">{tempo.bpm}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h3 className="text-3xl font-bold text-navy mb-8 text-center">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "How many taps do I need for a good result?",
                                    a: "Mathematically, the more taps the better. We recommend at least 8 to 16 taps to account for human error in timing. Our algorithm starts calculating after just 2 taps but stabilizes significantly after 8."
                                },
                                {
                                    q: "Can I use this for non-musical purposes?",
                                    a: "Yes! Many users use this tool for 'BPM of the heart' (medical tracking) or to measure the speed of mechanical equipment by tapping whenever a cycle completes."
                                },
                                {
                                    q: "Is the BPM reading saved?",
                                    a: "No. For your privacy, all calculations happen in your browser. We do not store or transmit your timing data or final BPM results to any server."
                                }
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <summary className="font-bold text-navy flex items-center justify-between list-none">
                                        {item.q}
                                        <ChevronRight className="w-5 h-5 text-accent group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    <section className="bg-accent rounded-3xl p-12 text-navy mb-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                        <h2 className="text-3xl font-black mb-6">Ready to mix some tracks?</h2>
                        <p className="text-navy-light text-lg mb-8 max-w-2xl mx-auto">
                            Now that you have your BPM, head over to our other utility tools to help build your complete project profile.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/tools/percentage-calculator" className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-light transition-all">Percentage Tool</Link>
                            <Link href="/tools" className="bg-white text-navy px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">All Tools</Link>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}
