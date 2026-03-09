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
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {stats?.businessName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Messages Dealt</h3>
                    <p className="text-4xl font-extrabold text-gray-900 mt-3">{stats?.totalMessages || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Leads Extracted</h3>
                    <p className="text-4xl font-extrabold text-gray-900 mt-3">{stats?.totalLeads || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Subscription Tier</h3>
                    <p className="text-4xl font-extrabold text-blue-600 mt-3 capitalize">{stats?.plan.toLowerCase()}</p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">{stats?.messagesUsed} replies consumed this month</p>
                </div>
            </div>
        </div>
    );
}
