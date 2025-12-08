import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

import type { Employee } from '../types';

interface DashboardStats {
    totalEmployees: number;
    recentEmployees: Employee[];
}

export default function Dashboard() {
    const { data, isLoading } = useQuery<DashboardStats>({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await api.get('/dashboard');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-white text-center mt-10 animate-pulse">Loading Dashboard...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700/50">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl" />
                    <dt className="truncate text-sm font-medium text-slate-400">Total Employees</dt>
                    <dd className="mt-2 text-4xl font-bold text-white tracking-tight">{data?.totalEmployees}</dd>
                    <div className="mt-4 flex items-center text-sm text-green-400">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Active Records
                        </span>
                    </div>
                </div>

                {/* Future cards can be added here */}
                {/* <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700/50"> ... </div> */}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Joiners</h2>
                <div className="rounded-2xl border border-slate-700/50 overflow-hidden bg-slate-800/50 backdrop-blur-sm shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-800">
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 sm:pl-6">Name</th>
                                    <th className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Email</th>
                                    <th className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Department</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                                {data?.recentEmployees.map((person: any) => (
                                    <tr key={person.id} className="hover:bg-slate-700/50 transition-colors duration-150">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                            {person.firstName} {person.lastName}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{person.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                            <span className="inline-flex items-center rounded-full bg-indigo-400/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-400/20">
                                                {person.department}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {data?.recentEmployees.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-8 text-slate-500 italic">No recent employees found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
