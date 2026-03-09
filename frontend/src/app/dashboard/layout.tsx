'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

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
        <div className="flex h-[calc(100vh-4rem)]">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <nav className="p-4 space-y-2 flex-grow">
                    <a href="/dashboard" className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Overview</a>
                    <a href="/dashboard/conversations" className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Conversations</a>
                    <a href="/dashboard/rules" className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Automations</a>
                    <a href="/dashboard/config" className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">AI & Config</a>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button onClick={() => { localStorage.removeItem('token'); router.push('/'); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium rounded-lg">Sign out</button>
                </div>
            </aside>
            <div className="flex-1 overflow-auto bg-gray-50 p-8">
                {children}
            </div>
        </div>
    );
}
