import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusIcon, PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../lib/axios';
import EmployeeModal from '../components/EmployeeModal';

import type { Employee } from '../types';

interface EmployeeResponse {
    employees: Employee[];
    total: number;
    page: number;
    pages: number;
}

export default function EmployeeList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<EmployeeResponse>({
        queryKey: ['employees', page, search],
        queryFn: async () => {
            const res = await api.get(`/employees?page=${page}&limit=10&search=${search}`);
            return res.data;
        },
    });

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            await api.delete(`/employees/${id}`);
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    };

    const openAddModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const openEditModal = (employee: any) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="sm:flex sm:items-center justify-between mb-6">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold text-white">Employees</h1>
                    <p className="mt-2 text-sm text-slate-400">Manage your team members and their roles.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="block rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transition-all duration-200"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-2" />
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="mt-4 flex gap-4 mb-6">
                <div className="relative w-full max-w-md group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, or dept..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="block w-full rounded-xl bg-slate-800 border-slate-700 py-3 pl-10 pr-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 sm:text-sm shadow-sm transition-all duration-200"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-slate-700/50 overflow-hidden bg-slate-800/50 backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="text-center py-10 text-slate-400 animate-pulse">Loading employees...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-800">
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 sm:pl-6">Name</th>
                                    <th className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Title</th>
                                    <th className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Department</th>
                                    <th className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Email</th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 bg-slate-800/30">
                                {data?.employees.map((person: any) => (
                                    <tr key={person.id} className="hover:bg-slate-700/50 transition-colors duration-150">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                            {person.firstName} {person.lastName}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{person.position}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                                            <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-400/20">
                                                {person.department}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-400">{person.email}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button onClick={() => openEditModal(person)} className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors">
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => handleDelete(person.id)} className="text-red-400 hover:text-red-300 transition-colors">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {data?.employees.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-slate-500 italic">No employees found matching your search.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Pagination configuration */}
            {data && (
                <div className="flex items-center justify-between border-t border-slate-700/50 px-4 py-3 sm:px-6 mt-4">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="relative inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50">Previous</button>
                        <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)} className="relative ml-3 inline-flex items-center rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50">Next</button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-400">
                                Showing page <span className="font-medium text-white">{page}</span> of <span className="font-medium text-white">{data.pages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-600 hover:bg-slate-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                                >
                                    <span className="sr-only">Previous</span>
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(data.pages, p + 1))}
                                    disabled={page >= data.pages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-600 hover:bg-slate-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                                >
                                    <span className="sr-only">Next</span>
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            <EmployeeModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                employee={selectedEmployee}
            />
        </div>
    );
}
