import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { motion } from 'framer-motion';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post('/auth/login', data);
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

            {/* Animated Background Blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md p-8 glass rounded-2xl"
            >
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        Welcome Back
                    </motion.h2>
                    <p className="text-slate-300">Enter your credentials to access the portal</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg mb-6 text-sm flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Username</label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            placeholder="admin"
                        />
                        {errors.username && <span className="text-red-400 text-xs mt-1 block">{String(errors.username.message)}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1 block">{String(errors.password.message)}</span>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200"
                    >
                        Sign In
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-500">
                    Protected by Enterprise Grade Security
                </div>
            </motion.div>
        </div>
    );
}
