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
        mutationFn: async (data: any) => await api.post('/business/rules', data),
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
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Custom Automations</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Rule</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trigger Keyword</label>
                        <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="e.g. price, location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bot Reply</label>
                        <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="The message sent when keyword is detected" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-24" />
                    </div>
                    <button
                        disabled={!keyword || !response || createMutation.isPending}
                        onClick={() => createMutation.mutate({ keyword, response })}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
                    >
                        {createMutation.isPending ? 'Saving...' : 'Create Rule'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Active Rules ({rules?.length || 0})</h2>
                {isLoading ? <p className="text-gray-500">Loading rules...</p> : (
                    <div className="space-y-4">
                        {rules?.map((r: any) => (
                            <div key={r.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-gray-100 rounded-lg bg-gray-50 gap-4">
                                <div>
                                    <p className="font-bold text-blue-600">If message contains: <span className="text-gray-900 font-extrabold">&quot;{r.keyword}&quot;</span></p>
                                    <p className="text-gray-700 mt-2">{r.response}</p>
                                </div>
                                <button onClick={() => deleteMutation.mutate(r.id)} className="text-red-600 hover:text-red-800 px-4 py-2 font-medium bg-red-50 hover:bg-red-100 transition rounded-md shadow-sm whitespace-nowrap">Delete Rule</button>
                            </div>
                        ))}
                        {rules?.length === 0 && <p className="text-gray-500">No auto rules defined yet.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
