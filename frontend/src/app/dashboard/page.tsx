'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function DashboardOverview() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => (await api.get('/business/stats')).data
    });

    if (isLoading) return <div>Loading dashboard...</div>;

    return (
        <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Welcome back, {stats?.businessName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-neutral-800">
                    <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-widest mb-1">Messages Dealt</h3>
                    <p className="text-5xl font-black text-white mt-2">{stats?.totalMessages || 0}</p>
                </div>
                <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-neutral-800">
                    <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-widest mb-1">Leads Extracted</h3>
                    <p className="text-5xl font-black text-white mt-2">{stats?.totalLeads || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                    <h3 className="text-blue-200/60 text-sm font-bold uppercase tracking-widest mb-1">Subscription Tier</h3>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2 capitalize">{stats?.plan.toLowerCase()}</p>
                    <p className="text-sm text-blue-200/50 mt-4 font-medium">{stats?.messagesUsed} replies consumed this month</p>
                </div>
            </div>
        </div>
    );
}
