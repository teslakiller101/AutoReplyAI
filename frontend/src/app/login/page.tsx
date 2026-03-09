'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post('/auth/login', data);
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <input {...register('email')} type="email" placeholder="Email address" className="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-4" />
                            {errors.email?.message && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
                        </div>
                        <div>
                            <input {...register('password')} type="password" placeholder="Password" className="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-4" />
                            {errors.password?.message && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                    <button type="submit" className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold leading-6 text-white hover:bg-blue-500 transition shadow-md">Sign in</button>
                </form>
            </div>
        </div>
    );
}
