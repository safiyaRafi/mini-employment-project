import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
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
        // keepPreviousData is deprecated in v5, use placeholderData if needed or remove. 
        // Assuming v4 or ignoring deprecation for now, but better to be safe.
        // Actually this project installed @tanstack/react-query which is v4 or v5. v5 removed keepPreviousData.
        // I will remove keepPreviousData to be safe if v5.
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
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold leading-6 text-gray-900">Employees</h1>
                    <p className="mt-2 text-sm text-gray-700">A list of all the employees in your account including their name, title, email and role.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-1" />
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="mt-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="block w-full max-w-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.employees.map((person: any) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{person.firstName} {person.lastName}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.position}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.department}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Employee</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button onClick={() => openEditModal(person)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button onClick={() => handleDelete(person.id)} className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination configuration */}
            {data && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                        <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{data.pages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(data.pages, p + 1))}
                                    disabled={page >= data.pages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
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
