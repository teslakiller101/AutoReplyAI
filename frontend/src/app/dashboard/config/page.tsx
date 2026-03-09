'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Config() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => (await api.get('/auth/me')).data
    });

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user?.user?.business) {
            reset({
                description: user.user.business.description || '',
                faq: user.user.business.faq || '',
                products: user.user.business.products || '',
                waAccountId: user.user.business.waAccountId || '',
                waPhoneNumberId: user.user.business.waPhoneNumberId || '',
                waAccessToken: user.user.business.waAccessToken || '',
            });
        }
    }, [user, reset]);

    const updateMutation = useMutation({
        mutationFn: async (data: Record<string, string>) => await api.post('/business/config', data),
        onSuccess: () => alert('Configuration updated successfully!')
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-12 relative z-10">
            <h1 className="text-3xl font-black text-white mb-8 tracking-tight">System Configuration</h1>

            <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-8">

                {/* WhatsApp API Settings */}
                <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-800">
                    <h2 className="text-xl font-bold text-white mb-6">WhatsApp Integrations</h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Account ID</label>
                            <input {...register('waAccountId')} type="text" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Phone Number ID</label>
                            <input {...register('waPhoneNumberId')} type="text" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Permanent Access Token</label>
                            <input {...register('waAccessToken')} type="password" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition" />
                        </div>
                    </div>
                </div>

                {/* AI Knowledge Base */}
                <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-neutral-800">
                    <h2 className="text-xl font-bold text-white mb-2">AI Knowledge Base</h2>
                    <p className="text-sm text-neutral-400 mb-6 font-medium">Train the AutoReply AI on how to respond to your customers natively.</p>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Business Description</label>
                            <textarea {...register('description')} rows={3} placeholder="We are a local agency serving businesses..." className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Products & Catalog</label>
                            <textarea {...register('products')} rows={4} placeholder="1. Basic Support Package ($499/mo)..." className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 tracking-wide mb-2">Frequently Asked Questions (FAQ)</label>
                            <textarea {...register('faq')} rows={5} placeholder="Q: Do you offer refunds? A: Yes, within 14 days." className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-600 sm:text-sm px-4 outline-none transition resize-none" />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="w-full flex justify-center py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50"
                >
                    {updateMutation.isPending ? 'Saving Config...' : 'Save Configuration'}
                </button>
            </form>
        </div>
    );
}
