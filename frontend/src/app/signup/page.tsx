'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

const schema = z.object({
    businessName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const onSubmit = async (data: Record<string, string>) => {
        try {
            const res = await api.post('/auth/signup', data);
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'response' in err) {
                setError((err as { response: { data: { error: string } } }).response?.data?.error || 'Signup failed');
            } else {
                setError('Signup failed');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-neutral-950 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md space-y-8 bg-neutral-900/50 backdrop-blur-xl p-8 shadow-2xl rounded-3xl border border-neutral-800 z-10 relative">
                <div className="flex flex-col items-center">
                    <Link href="/" className="mb-6 hover:scale-105 transition-transform"><Logo /></Link>
                    <h2 className="text-center text-3xl font-black tracking-tight text-white">Create an account</h2>
                    <p className="mt-2 text-center text-sm text-neutral-400">Join and start automating your WhatsApp</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <input {...register('businessName')} type="text" placeholder="Business Name" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-purple-500 focus:ring-purple-600 sm:text-sm px-4 outline-none transition transition-shadow text-neutral-200" />
                            {errors.businessName?.message && <p className="text-red-400 text-sm mt-1 ml-1">{String(errors.businessName.message)}</p>}
                        </div>
                        <div>
                            <input {...register('email')} type="email" placeholder="Email address" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-purple-500 focus:ring-purple-600 sm:text-sm px-4 outline-none transition transition-shadow text-neutral-200" />
                            {errors.email?.message && <p className="text-red-400 text-sm mt-1 ml-1">{String(errors.email.message)}</p>}
                        </div>
                        <div>
                            <input {...register('password')} type="password" placeholder="Password" className="block w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 text-white placeholder-neutral-500 shadow-sm focus:ring-2 focus:border-purple-500 focus:ring-purple-600 sm:text-sm px-4 outline-none transition transition-shadow text-neutral-200" />
                            {errors.password?.message && <p className="text-red-400 text-sm mt-1 ml-1">{String(errors.password.message)}</p>}
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm font-medium text-center bg-red-950/30 p-2 rounded-lg border border-red-900/50">{error}</p>}
                    <button type="submit" className="flex w-full justify-center rounded-xl bg-purple-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-purple-500 transition shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]">Sign Up</button>

                    <p className="text-center text-sm text-neutral-400 mt-6">
                        Already have an account? <Link href="/login" className="font-semibold text-purple-400 hover:text-purple-300">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
