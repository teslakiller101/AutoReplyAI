'use client';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            {/* Navbar Minimal */}
            <nav className="relative z-50 flex items-center justify-between px-8 text-white h-24 border-b border-neutral-900/80">
                <Link href="/"><Logo /></Link>
                <div className="flex gap-4">
                    <Link href="/features" className="text-sm font-medium text-neutral-400 hover:text-white transition py-2 px-4">Features</Link>
                    <Link href="/signup" className="text-sm font-bold bg-white text-neutral-950 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Start Free</Link>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto px-4 py-24 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-neutral w-full max-w-none">
                    <p>Last updated: March 2026</p>
                    <h3>1. Introduction</h3>
                    <p>AutoReply AI respects your privacy. We connect to official Meta APIs and adhere strictly to their data processing agreements.</p>

                    <h3>2. Data Collection</h3>
                    <p>We only store the messages required to provide our service (i.e. generating AI replies). Your customers&apos; names and numbers are extracted into your private dashboard.</p>

                    <h3>3. Data Retention</h3>
                    <p>Conversations are retained for up to 90 days to provide the conversation memory feature. You may delete conversations at any time.</p>

                    <h3>4. Third-Party Sharing</h3>
                    <p>We do not sell your data. We share anonymized chat data with our AI providers (such as OpenAI) strictly for the purpose of generating automated replies for your business.</p>
                </div>
            </div>
        </div>
    );
}
