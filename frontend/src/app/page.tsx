'use client';
import { motion } from 'framer-motion';
import { Bot, Zap, Clock, ShieldCheck, ArrowRight, MessageSquare, BarChart, Bell } from 'lucide-react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-100 selection:bg-blue-500/30">

      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 text-white h-24">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          <Link href="/features" className="hover:text-white transition-colors py-2">Features</Link>
          <Link href="/pricing" className="hover:text-white transition-colors py-2">Pricing</Link>
          <Link href="/privacy" className="hover:text-white transition-colors py-2">Privacy</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition py-2 px-4">Log in</Link>
          <Link href="/signup" className="text-sm font-bold bg-white text-neutral-950 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-neutral-300 tracking-wide">Cloud API v2.0 Now Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] "
        >
          Never miss a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 drop-shadow-sm">
            WhatsApp Sale
          </span>
          <br /> again.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-12 leading-relaxed"
        >
          Connect AutoReply AI to WhatsApp Business and let our intelligent agents handle customer support, capture leads, and close sales 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/signup" className="group relative px-8 py-4 bg-white text-neutral-950 font-bold text-lg rounded-full overflow-hidden flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <span className="relative z-10">Start Automating</span>
            <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/features" className="px-8 py-4 rounded-full border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm text-white font-medium text-lg hover:bg-neutral-800 transition flex items-center gap-3">
            <Zap size={20} className="text-yellow-400" />
            See Features
          </Link>
        </motion.div>

        {/* Hero Interactive Image / CSS Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 50 }}
          className="mt-24 w-full max-w-5xl relative perspective-1000"
        >
          {/* Glow Behind Image */}
          <div className="absolute inset-x-10 bottom-0 h-1/2 bg-gradient-to-t from-blue-600/40 to-purple-600/40 blur-[80px] -z-10 rounded-full"></div>

          {/* High-Res CSS Dashboard Mockup */}
          <div className="w-full relative rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-xl shadow-[0_0_80px_rgba(79,70,229,0.15)] overflow-hidden aspect-[16/9] flex text-left">
            {/* Sidebar */}
            <div className="w-64 bg-black/40 border-r border-neutral-800/50 p-4 hidden md:flex flex-col gap-6">
              <div className="opacity-50 pointer-events-none scale-75 origin-top-left"><Logo /></div>
              <div className="space-y-2 mt-4">
                <div className="h-10 w-full bg-blue-600/20 rounded-lg border border-blue-500/30 flex items-center px-4 font-semibold text-blue-400 text-sm gap-3"><MessageSquare size={16} /> Live Chats</div>
                <div className="h-10 w-full hover:bg-white/5 rounded-lg flex items-center px-4 font-medium text-neutral-400 text-sm gap-3"><Zap size={16} /> Automations</div>
                <div className="h-10 w-full hover:bg-white/5 rounded-lg flex items-center px-4 font-medium text-neutral-400 text-sm gap-3"><BarChart size={16} /> Analytics</div>
              </div>
            </div>
            {/* Main Area */}
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <div className="h-16 border-b border-neutral-800/50 flex items-center justify-between px-6">
                <div className="font-semibold text-neutral-200">Recent Conversations</div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center"><Bell size={14} className="text-neutral-400" /></div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border border-white/10"></div>
                </div>
              </div>
              {/* Chat Interface */}
              <div className="flex-1 p-6 flex gap-6 overflow-hidden">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex self-start gap-4 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 shrink-0"><b className="text-xs">WA</b></div>
                    <div className="bg-neutral-800/80 p-4 rounded-b-xl rounded-tr-xl border border-neutral-700/50 text-sm text-neutral-300">
                      Hi, do you offer expedited shipping for the Enterprise plan?
                    </div>
                  </div>
                  <div className="flex self-end gap-4 max-w-[80%] flex-row-reverse">
                    <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0"><Bot size={16} /></div>
                    <div className="bg-blue-600/20 p-4 rounded-b-xl rounded-tl-xl border border-blue-500/30 text-sm text-blue-100">
                      <p className="font-semibold text-xs text-blue-400 mb-1 flex items-center gap-1"><Zap size={12} /> AI Reply Generated</p>
                      Hello! Yes, the Enterprise plan includes next-day expedited shipping at no extra cost. Would you like me to send you the upgrade link?
                    </div>
                  </div>
                  <div className="mt-auto h-12 w-full bg-black/40 border border-neutral-800 rounded-lg flex items-center px-4 text-neutral-500 text-sm">
                    AI agent is active and monitoring...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 max-w-7xl mx-auto relative z-10 border-t border-neutral-900">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Designed for <span className="text-blue-500">Growth</span></h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Everything you need to turn your WhatsApp channel into an automated revenue engine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { tag: "Intelligent", title: "Context-Aware AI Answers", desc: "Train the bot on your exact business description, FAQs, and product catalog. It speaks like you do.", icon: <Brain size={24} />, color: "from-blue-500 to-cyan-400" },
            { tag: "Automation", title: "Custom Logic Triggers", desc: "Detect keywords 'Price' or 'Menu' and instantly fire a complex media template. You are in control.", icon: <Zap size={24} />, color: "from-yellow-400 to-orange-500" },
            { tag: "Analytics", title: "Smart Lead Capture", desc: "Never lose a contact. Instantly save names, phone numbers, and calculate response volumes.", icon: <BarChart size={24} />, color: "from-purple-500 to-pink-500" },
            { tag: "Speed", title: "Zero Latency Responses", desc: "Powered by Redis queues, the platform handles tens of thousands of messages simultaneously.", icon: <Clock size={24} />, color: "from-green-400 to-emerald-600" },
            { tag: "Reliability", title: "Official Cloud API", desc: "No more scanning QR codes on sketchy tools. We integrate directly with official Meta APIs.", icon: <ShieldCheck size={24} />, color: "from-indigo-500 to-blue-600" },
            { tag: "Memory", title: "Persistent Conversations", desc: "The AI remembers what the user said 4 messages ago, guaranteeing a human-like flow.", icon: <MessageSquare size={24} />, color: "from-rose-400 to-red-600" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-colors group cursor-default"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} shadow-lg shadow-black/20 text-white`}>
                {feature.icon}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">{feature.tag}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative border-t border-neutral-900 bg-black pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Automate?</span></h2>
          <p className="text-xl text-neutral-400 mb-10">Join forward-thinking businesses scaling their support and sales on autopilot.</p>
          <Link href="/signup" className="inline-flex px-10 py-5 bg-white text-black font-extrabold text-xl rounded-full items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
            Create Free Account <ArrowRight size={24} />
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-neutral-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link href="/" className="scale-75 origin-left pointer-events-none"><Logo /></Link>
            <span className="ml-2">© 2026 AutoReply AI Inc.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/features" className="hover:text-white transition">Features</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Brain = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);
