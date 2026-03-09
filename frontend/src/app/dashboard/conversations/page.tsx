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
        <div className="max-w-7xl mx-auto flex h-[calc(100vh-10rem)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Contacts List */}
            <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
                <h2 className="p-4 font-bold text-gray-900 border-b border-gray-100 bg-gray-50">Leads & Contacts</h2>
                {isLoading ? <div className="p-4 text-gray-500">Loading...</div> : contacts?.map((c: { id: string; name: string; phoneNumber: string }) => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedContact(c.id)}
                        className={`w-full text-left p-4 border-b border-gray-50 hover:bg-blue-50 transition ${selectedContact === c.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                    >
                        <div className="font-semibold text-gray-900">{c.name || c.phoneNumber}</div>
                        <div className="text-sm text-gray-500">{c.phoneNumber}</div>
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="w-2/3 flex flex-col bg-gray-50">
                {selectedContact ? (
                    <>
                        <div className="p-4 border-b border-gray-100 bg-white shadow-sm z-10 font-bold text-gray-900">
                            Conversation History
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages?.map((m: { id: string; role: string; content: string }) => (
                                <div key={m.id} className={`flex ${m.role === 'BOT' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-xl p-3 shadow-sm ${m.role === 'BOT' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {messages?.length === 0 && <p className="text-gray-500 text-center mt-4">No messages yet.</p>}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a contact to view conversation
                    </div>
                )}
            </div>
        </div>
    );
}
