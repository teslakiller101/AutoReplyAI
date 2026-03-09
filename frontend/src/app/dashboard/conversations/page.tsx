'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useState } from 'react';

export default function Conversations() {
    const [selectedContact, setSelectedContact] = useState<string | null>(null);

    const { data: contacts, isLoading } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => (await api.get('/business/contacts')).data
    });

    const { data: messages } = useQuery({
        queryKey: ['messages', selectedContact],
        queryFn: async () => (await api.get(`/business/conversations/${selectedContact}`)).data,
        enabled: !!selectedContact
    });

    return (
        <div className="max-w-7xl mx-auto flex h-[calc(100vh-10rem)] bg-neutral-900/50 rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden relative z-10 backdrop-blur-xl">
            {/* Contacts List */}
            <div className="w-1/3 border-r border-neutral-800 overflow-y-auto bg-neutral-950/50">
                <h2 className="p-5 font-black tracking-tight text-white border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-20">Leads & Contacts</h2>
                {isLoading ? <div className="p-5 text-neutral-500">Loading...</div> : contacts?.map((c: { id: string; name: string; phoneNumber: string }) => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedContact(c.id)}
                        className={`w-full text-left p-5 border-b border-neutral-800/50 hover:bg-white/5 transition flex flex-col gap-1 ${selectedContact === c.id ? 'bg-white/10 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
                    >
                        <div className="font-bold text-neutral-100">{c.name || c.phoneNumber}</div>
                        <div className="text-xs text-neutral-400 font-medium tracking-wide">{c.phoneNumber}</div>
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="w-2/3 flex flex-col bg-neutral-950">
                {selectedContact ? (
                    <>
                        <div className="p-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md shadow-sm z-10 font-bold text-white flex items-center justify-between">
                            <span>Conversation History</span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> WhatsApp Live
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages?.map((m: { id: string; role: string; content: string }) => (
                                <div key={m.id} className={`flex ${m.role === 'BOT' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm ${m.role === 'BOT'
                                            ? 'bg-blue-600/20 text-blue-50 border border-blue-500/30 rounded-br-sm'
                                            : 'bg-neutral-800/80 text-neutral-200 border border-neutral-700/50 rounded-bl-sm'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {messages?.length === 0 && <p className="text-neutral-500 text-center mt-10">No messages yet.</p>}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 gap-4">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                            <span className="text-2xl text-neutral-600">💬</span>
                        </div>
                        <p className="font-medium">Select a contact to view conversation</p>
                    </div>
                )}
            </div>
        </div>
    );
}
