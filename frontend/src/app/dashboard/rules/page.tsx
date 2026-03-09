'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useState } from 'react';

export default function Rules() {
    const queryClient = useQueryClient();
    const [keyword, setKeyword] = useState('');
    const [response, setResponse] = useState('');

    const { data: rules, isLoading } = useQuery({
        queryKey: ['rules'],
        queryFn: async () => (await api.get('/business/rules')).data
    });

    const createMutation = useMutation({
        mutationFn: async (data: { keyword: string; response: string }) => await api.post('/business/rules', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rules'] });
            setKeyword('');
            setResponse('');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => await api.delete(`/business/rules/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rules'] })
    });

    return (
        <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Custom Automations</h1>

            <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-800 mb-8">
                <h2 className="text-xl font-bold text-white mb-6">Add New Rule</h2>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Trigger Keyword</label>
                        <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="e.g. price, location" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Bot Reply</label>
                        <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="The message sent when keyword is detected" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition h-28 resize-none" />
                    </div>
                    <button
                        disabled={!keyword || !response || createMutation.isPending}
                        onClick={() => createMutation.mutate({ keyword, response })}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-white font-bold hover:bg-blue-500 transition disabled:opacity-50 shadow-[0_0_20px_rgba(37,99,235,0.2)] mt-2"
                    >
                        {createMutation.isPending ? 'Saving...' : 'Create Rule'}
                    </button>
                </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-800">
                <h2 className="text-xl font-bold text-white mb-6">Active Rules ({rules?.length || 0})</h2>
                {isLoading ? <p className="text-neutral-500 font-medium">Loading rules...</p> : (
                    <div className="space-y-4">
                        {rules?.map((r: { id: string; keyword: string; response: string }) => (
                            <div key={r.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-5 border border-neutral-800 rounded-xl bg-neutral-950/50 gap-4 hover:border-neutral-700 transition">
                                <div>
                                    <p className="font-bold text-blue-400">If message contains: <span className="text-white font-black px-2 py-1 bg-neutral-800 rounded-md ml-1">&quot;{r.keyword}&quot;</span></p>
                                    <p className="text-neutral-300 mt-3 leading-relaxed">{r.response}</p>
                                </div>
                                <button onClick={() => deleteMutation.mutate(r.id)} className="text-red-400 hover:text-red-300 px-4 py-2 font-bold bg-red-950/30 hover:bg-red-900/50 transition rounded-lg border border-red-900/30 whitespace-nowrap">Delete Rule</button>
                            </div>
                        ))}
                        {rules?.length === 0 && <p className="text-neutral-500 font-medium">No auto rules defined yet.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
