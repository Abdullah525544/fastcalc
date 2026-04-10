"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Zap,
  Lock,
  RefreshCcw
} from "lucide-react";

const tools = [
  {
    name: "Take-Home Pay",
    description: "Calculate your net pay after tax, NI, and student loans for 2025/26.",
    href: "/tools/take-home-pay",
    icon: Calculator,
    color: "bg-blue-500",
  },
  {
    name: "IR35 Checker",
    description: "Self-assess your contract status with our accurate multi-step questionnaire.",
    href: "/tools/ir35-checker",
    icon: ShieldCheck,
    color: "bg-accent",
  },
  {
    name: "Dividend vs Salary",
    description: "Find the most tax-efficient way to pay yourself from your limited company.",
    href: "/tools/dividend-vs-salary",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

const features = [
  {
    title: "100% Free",
    description: "No subscription or hidden costs. Access all tools immediately.",
    icon: Zap,
  },
  {
    title: "Accurate for 2025/26",
    description: "Updated with the latest HMRC tax bands and National Insurance rates.",
    icon: RefreshCcw,
  },
  {
    title: "Privacy Focused",
    description: "No signup required. Your financial data never leaves your browser.",
    icon: Lock,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Master Your <span className="text-accent">Contractor Finances</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional, easy-to-use tools for UK contractors and freelancers.
              Get accurate tax estimates and IR35 assessments in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/40 flex items-center gap-2 group"
              >
                Launch Toolbox
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Essential Toolkit</h2>
            <p className="text-gray-500">Pick a tool below to start your calculation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className={`${tool.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                  <tool.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{tool.name}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-accent font-bold group-hover:gap-3 transition-all gap-2"
                >
                  Use Tool <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center md:items-start text-center md:text-left text-white">
                  <div className="bg-white/10 p-3 rounded-xl mb-6">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
