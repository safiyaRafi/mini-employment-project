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

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">Dashboard</h1>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Employees</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data?.totalEmployees}</dd>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Employees</h2>
                <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.recentEmployees.map((person: any) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{person.firstName} {person.lastName}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
