'use client';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function Pricing() {
    return (
        <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Navbar Minimal */}
            <nav className="relative z-50 flex items-center justify-between px-8 text-white h-24 border-b border-neutral-900/80">
                <Link href="/"><Logo /></Link>
                <div className="flex gap-4">
                    <Link href="/features" className="text-sm font-medium text-neutral-400 hover:text-white transition py-2 px-4">Features</Link>
                    <Link href="/signup" className="text-sm font-bold bg-white text-neutral-950 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Start Free</Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 py-24 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
                    Simple, straight-forward <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">pricing</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-20 leading-relaxed">
                    Start for free, upgrade when you hit scale. No hidden fees or limits on what you can build.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    {/* Free */}
                    <div className="p-10 rounded-3xl bg-neutral-900 border border-neutral-800">
                        <h3 className="text-2xl font-bold mb-2">Hobby</h3>
                        <p className="text-neutral-400 mb-6">Perfect for testing the waters.</p>
                        <div className="text-5xl font-black mb-8">$0<span className="text-lg text-neutral-500 font-medium">/mo</span></div>
                        <Link href="/signup" className="block w-full text-center py-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition">Get Started</Link>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-center gap-3 text-neutral-300">✓ Up to 100 AI replies/mo</li>
                            <li className="flex items-center gap-3 text-neutral-300">✓ 5 Automation rules</li>
                            <li className="flex items-center gap-3 text-neutral-300">✓ Basic Lead storage</li>
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="p-10 rounded-3xl bg-gradient-to-b from-blue-900/40 to-neutral-900 border border-blue-500/30 relative">
                        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Growth</h3>
                        <p className="text-blue-200/60 mb-6">For businesses capturing serious leads.</p>
                        <div className="text-5xl font-black mb-8 text-white">$49<span className="text-lg text-blue-200/50 font-medium">/mo</span></div>
                        <Link href="/signup" className="block w-full text-center py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-bold transition shadow-[0_0_20px_rgba(37,99,235,0.4)]">Upgrade to Growth</Link>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-center gap-3 text-blue-100">✓ Unlimited AI replies</li>
                            <li className="flex items-center gap-3 text-blue-100">✓ Unlimited Automation rules</li>
                            <li className="flex items-center gap-3 text-blue-100">✓ Advanced Analytics & Exports</li>
                            <li className="flex items-center gap-3 text-blue-100">✓ Priority Email support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
