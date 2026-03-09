'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        api.get('/auth/me').then(() => setLoading(false)).catch(() => {
            localStorage.removeItem('token');
            router.push('/login');
        });
    }, [router]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your workspace...</div>;

    return (
        <div className="flex h-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
            <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 flex flex-col backdrop-blur-xl relative z-20">
                <div className="h-20 flex items-center px-6 border-b border-neutral-800">
                    <span className="text-xl font-black tracking-tighter text-white">
                        Auto<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Reply</span>
                    </span>
                </div>
                <nav className="p-4 space-y-2 flex-grow">
                    <Link href="/dashboard" className="block px-4 py-3 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-white rounded-xl transition">Overview</Link>
                    <Link href="/dashboard/conversations" className="block px-4 py-3 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-white rounded-xl transition">Conversations</Link>
                    <Link href="/dashboard/rules" className="block px-4 py-3 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-white rounded-xl transition">Automations</Link>
                    <Link href="/dashboard/config" className="block px-4 py-3 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-white rounded-xl transition">AI Config</Link>
                </nav>
                <div className="p-4 border-t border-neutral-800">
                    <button onClick={() => { localStorage.removeItem('token'); router.push('/'); }} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-950/30 font-medium rounded-xl transition border border-transparent hover:border-red-900/50">Sign out</button>
                </div>
            </aside>
            <div className="flex-1 overflow-auto bg-neutral-950 p-8 relative z-10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
                {children}
            </div>
        </div>
    );
}
