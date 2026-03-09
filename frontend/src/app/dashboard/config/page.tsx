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
        <div className="max-w-4xl mx-auto pb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">System Configuration</h1>

            <form onSubmit={handleSubmit((d) => updateMutation.mutate(d))} className="space-y-8">

                {/* WhatsApp API Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">WhatsApp Integrations</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account ID</label>
                            <input {...register('waAccountId')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
                            <input {...register('waPhoneNumberId')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Permanent Access Token</label>
                            <input {...register('waAccessToken')} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                </div>

                {/* AI Knowledge Base */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">AI Knowledge Base</h2>
                    <p className="text-sm text-gray-500 mb-4">Train the AutoReply AI on how to respond to your customers natively.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Business Description</label>
                            <textarea {...register('description')} rows={3} placeholder="We are a local agency serving businesses..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Products & Catalog</label>
                            <textarea {...register('products')} rows={4} placeholder="1. Basic Support Package ($499/mo)..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Frequently Asked Questions (FAQ)</label>
                            <textarea {...register('faq')} rows={5} placeholder="Q: Do you offer refunds? A: Yes, within 14 days." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                    {updateMutation.isPending ? 'Saving Config...' : 'Save Configuration'}
                </button>
            </form>
        </div>
    );
}
