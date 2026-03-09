'use client';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Bot, Zap, ShieldCheck, BarChart, CheckCircle2 } from 'lucide-react';

export default function Features() {
    return (
        <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Navbar Minimal */}
            <nav className="relative z-50 flex items-center justify-between px-8 text-white h-24 border-b border-neutral-900/80">
                <Link href="/"><Logo /></Link>
                <div className="flex gap-4">
                    <Link href="/pricing" className="text-sm font-medium text-neutral-400 hover:text-white transition py-2 px-4">Pricing</Link>
                    <Link href="/signup" className="text-sm font-bold bg-white text-neutral-950 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Start Free</Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 py-24 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
                    Every feature you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">dominate</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-20 leading-relaxed">
                    Stop replying manually to the same &quot;what is the price?&quot; messages. Let our intelligent AI infrastructure categorize, reply, and sell for you.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
                    <FeatureCard
                        icon={<Bot />} title="Context-Aware AI Training" color="text-blue-400 bg-blue-500/10 border-blue-500/20"
                        desc="Upload your FAQs, business description, and return policies. The AI internalizes your voice and provides human-like replies to any arbitrary query."
                    />
                    <FeatureCard
                        icon={<Zap />} title="Real-Time Automation Rules" color="text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                        desc="Create rigid logic flows: If a user says 'location', reply instantly with a Map link. Bypass the AI for strict deterministic paths."
                    />
                    <FeatureCard
                        icon={<BarChart />} title="Lead Extraction Pipeline" color="text-purple-400 bg-purple-500/10 border-purple-500/20"
                        desc="The AI is instructed to ask for phone numbers, names, and emails naturally during conversation. It saves these variables directly to your dashboard."
                    />
                    <FeatureCard
                        icon={<ShieldCheck />} title="Official Meta Integration" color="text-green-400 bg-green-500/10 border-green-500/20"
                        desc="No hacky WhatsApp web scrapers. We use the official Cloud API, ensuring your number is never banned and your uptime is 99.99%."
                    />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
    return (
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${color}`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-400 leading-relaxed">{desc}</p>
            <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-neutral-300"><CheckCircle2 size={16} className="text-blue-500" /> Advanced sentiment analysis</li>
                <li className="flex items-center gap-3 text-sm text-neutral-300"><CheckCircle2 size={16} className="text-blue-500" /> Multi-lingual support included</li>
            </ul>
        </div>
    )
}
