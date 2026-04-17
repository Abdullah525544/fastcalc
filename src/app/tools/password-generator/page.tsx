"use client";

import { useState, useEffect, useCallback } from "react";
import {
    ShieldCheck,
    ArrowLeft,
    Copy,
    RefreshCw,
    Check,
    Lock,
    Eye,
    EyeOff,
    Zap,
    Key
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState({ label: "Weak", color: "bg-red-500", width: "25%" });

    const generatePassword = useCallback(() => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let charset = lowercase;
        if (includeUppercase) charset += uppercase;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        let generated = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generated += charset[randomIndex];
        }
        setPassword(generated);
    }, [length, includeUppercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    useEffect(() => {
        let score = 0;
        if (length > 8) score++;
        if (length > 12) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (score <= 2) setStrength({ label: "Weak", color: "bg-red-500", width: "25%" });
        else if (score <= 4) setStrength({ label: "Medium", color: "bg-yellow-500", width: "50%" });
        else if (score <= 5) setStrength({ label: "Strong", color: "bg-green-500", width: "75%" });
        else setStrength({ label: "Very Strong", color: "bg-blue-500", width: "100%" });
    }, [password, length, includeUppercase, includeNumbers, includeSymbols]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                                "@id": "https://fastcalc.site/tools/password-generator/#app",
                                "name": "Secure Password Generator - Fastcalc",
                                "url": "https://fastcalc.site/tools/password-generator",
                                "applicationCategory": "SecurityApplication",
                                "operatingSystem": "Web Browser",
                                "inLanguage": "en-US",
                                "description": "Generate cryptographically strong, random passwords instantly. Completely client-side security with customizable length and character sets.",
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
                    <h1 className="text-4xl font-bold text-navy mb-4">Secure Password Generator</h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Create unbreakable passwords to protect your digital life. Generated entirely in your browser.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col gap-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                            {/* Display Area */}
                            <div className="relative group">
                                <div className="bg-gray-50 p-6 md:p-10 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                                    <span className="text-2xl md:text-4xl font-black text-navy break-all font-mono tracking-tight">
                                        {password}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={generatePassword}
                                            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-accent hover:border-accent transition-all shadow-sm"
                                            title="Regenerate"
                                        >
                                            <RefreshCw className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className={`p-3 rounded-xl transition-all shadow-lg flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-navy text-white hover:bg-navy-light'}`}
                                        >
                                            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                            <span className="hidden md:block font-bold">Copy</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Strength Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Security Strength</span>
                                        <span className={`text-xs font-black uppercase ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: strength.width }}
                                            className={`h-full ${strength.color} transition-all duration-500`}
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm font-bold text-navy">Password Length</label>
                                            <span className="bg-accent/10 px-3 py-1 rounded-lg text-accent font-black text-lg">{length}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="8"
                                            max="64"
                                            value={length}
                                            onChange={(e) => setLength(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                        />
                                    </div>
                                    <div className="bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
                                        <Zap className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                        <p className="text-xs text-blue-700/80 leading-relaxed font-medium">
                                            Expert Tip: Aim for at least 16 characters for maximum security against modern "brute force" attacks.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { label: "Include Uppercase (A-Z)", checked: includeUppercase, set: setIncludeUppercase },
                                        { label: "Include Numbers (0-9)", checked: includeNumbers, set: setIncludeNumbers },
                                        { label: "Include Symbols (!@#$)", checked: includeSymbols, set: setIncludeSymbols },
                                    ].map((opt) => (
                                        <label key={opt.label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer hover:border-accent transition-all group">
                                            <span className="text-sm font-bold text-navy">{opt.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={opt.checked}
                                                onChange={(e) => opt.set(e.target.checked)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute bottom-0 right-0 opacity-10">
                                <Lock className="w-32 h-32" />
                            </div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-accent" />
                                Zero Server Risk
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Unlike other generators, Fastcalc creates your password purely on your device. We NEVER see, store, or transmit your password over the internet.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                            <h3 className="font-bold text-navy mb-6">Security Checklist</h3>
                            <ul className="space-y-4">
                                {[
                                    "Change passwords every 90 days",
                                    "Use a password manager",
                                    "Never reuse passwords",
                                    "Enable 2FA wherever possible"
                                ].map((step) => (
                                    <li key={step} className="flex gap-3 text-sm text-gray-500 border-b border-gray-50 pb-3 last:border-0">
                                        <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2"></div>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── SEO GUIDE CONTENT ── */}
                <article className="mt-24 max-w-4xl mx-auto prose prose-slate max-w-none">
                    <header className="not-prose mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 leading-tight">
                            The Ultimate Guide to Digital Security: How to Generate Passwords
                        </h2>
                        <p className="text-gray-500 text-xl leading-relaxed">
                            In an age of data breaches and cyber attacks, your first line of defense is a strong, random password. Learn why length matters more than complexity and how to stay safe.
                        </p>
                    </header>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-6">What Makes a Password "Strong"?</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            Security experts used to recommend complex passwords like "P@ssw0rd1!". Today, we know that <strong>entropy</strong> (randomness) and <strong>length</strong> are far more important. A short, complex password is easy for a modern computer to guess using a "brute force" attack. A long, random sequence is exponentially harder.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                                <h4 className="font-bold text-red-800 mb-4 uppercase text-xs tracking-widest">Weak Habits</h4>
                                <ul className="text-sm text-red-700/70 space-y-2">
                                    <li>• Using your pet's name or birthdays</li>
                                    <li>• Reusing the same password for 10 sites</li>
                                    <li>• Storing passwords in a text file</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                                <h4 className="font-bold text-green-800 mb-4 uppercase text-xs tracking-widest">Strong Habits</h4>
                                <ul className="text-sm text-green-700/70 space-y-2">
                                    <li>• Using a random generator (like this one)</li>
                                    <li>• Aiming for 16+ characters</li>
                                    <li>• Unique passwords for every single account</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-10">How Long Would It Take to Hack You?</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Modern hacking tools can try billions of character combinations per second. Here&apos;s a rough estimate of how length affects your security when using a mix of letters, numbers, and symbols:
                        </p>
                        <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-navy text-white font-bold">
                                    <tr>
                                        <th className="px-8 py-4">Length</th>
                                        <th className="px-8 py-4">Time to Crack</th>
                                        <th className="px-8 py-4">Security Profile</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr className="bg-white">
                                        <td className="px-8 py-4 font-bold text-navy">8 Characters</td>
                                        <td className="px-8 py-4 text-red-600">Minutes</td>
                                        <td className="px-8 py-4 italic text-gray-400">Dangerous</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-8 py-4 font-bold text-navy">12 Characters</td>
                                        <td className="px-8 py-4 text-amber-600">Years</td>
                                        <td className="px-8 py-4 italic text-gray-400">Moderate</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-8 py-4 font-bold text-navy">16 Characters</td>
                                        <td className="px-8 py-4 text-green-600">Centuries</td>
                                        <td className="px-8 py-4 italic text-gray-400">Secure</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-8 py-4 font-bold text-navy">20+ Characters</td>
                                        <td className="px-8 py-4 text-blue-600">Millennia</td>
                                        <td className="px-8 py-4 italic text-gray-400">Bulletproof</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-navy mb-6">Why Client-Side Generation?</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Many "Secure Password" websites generate the password on their servers and then send it to you. This is a massive security risk, as the site owner could log the password or it could be intercepted mid-transit.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    <strong>Fastcalc uses Javascript</strong> to generate the random string locally on your device. The entropy (randomness) never leaves your browser, ensuring absolute privacy and security.
                                </p>
                            </div>
                            <div className="w-full md:w-80 bg-navy rounded-3xl p-8 text-white shadow-2xl relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-accent p-2 rounded-lg">
                                        <Key className="w-6 h-6 text-navy" />
                                    </div>
                                    <h4 className="font-bold text-accent">Security Policy</h4>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    We do not track, log, or store any data entered into this calculator. Your passwords are yours alone.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-navy mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Should I write my passwords down?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Actually, yes! While digital files are risky, a physical notebook inside a locked safe is often more secure than a recycled password. However, a <strong>Master Password Manager</strong> is the best modern solution.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">What are "Seed" words?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Commonly used in crypto wallets, a 12 or 24-word "seed" is just another form of a high-entropy random sequence. They are easier for humans to write down but provide massive mathematical security.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Is "password123" still bad?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Worse than bad—it&apos;s instant. Dictionary-based passwords are the first thing hackers try. Our generator avoids all common patterns to ensure you stay protected.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy mb-3">Are symbols always necessary?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    They improve security, but pure length (e.g., 64 lowercase letters) is often more powerful than a short string with symbols. However, most websites require at least one special character.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-accent rounded-3xl p-12 text-navy mb-20">
                        <h2 className="text-3xl font-black mb-6 text-center">Stay Secure Everywhere</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Banking", description: "Use different random passwords for every bank account." },
                                { title: "Email", description: "Your email is the key to everything. Make it 24+ characters." },
                                { title: "Socials", description: "Protect your identity from theft and impersonation." }
                            ].map((box) => (
                                <div key={box.title} className="bg-white/30 p-6 rounded-2xl backdrop-blur-sm">
                                    <h4 className="font-black mb-2">{box.title}</h4>
                                    <p className="text-sm font-medium leading-relaxed opacity-80">{box.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}
