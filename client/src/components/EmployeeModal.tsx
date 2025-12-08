import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '../lib/axios';
import { useQueryClient } from '@tanstack/react-query';

import type { Employee } from '../types';

interface EmployeeModalProps {
    isOpen: boolean;
    closeModal: () => void;
    employee?: Employee | null;
}

export default function EmployeeModal({ isOpen, closeModal, employee }: EmployeeModalProps) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (employee) {
            setValue('firstName', employee.firstName);
            setValue('lastName', employee.lastName);
            setValue('email', employee.email);
            setValue('position', employee.position);
            setValue('department', employee.department);
            setValue('dateOfJoining', employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '');
            setValue('salary', employee.salary);
        } else {
            reset({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                department: '',
                dateOfJoining: '',
                salary: ''
            });
        }
    }, [employee, isOpen, reset, setValue]);

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                dateOfJoining: new Date(data.dateOfJoining).toISOString(),
                salary: parseFloat(data.salary)
            };

            if (employee) {
                await api.put(`/employees/${employee.id}`, payload);
            } else {
                await api.post('/employees', payload);
            }
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            closeModal();
            reset();
        } catch (error) {
            console.error('Error saving employee', error);
            // Handle error (show toast etc)
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        {employee ? 'Edit Employee' : 'Add Employee'}
                                    </Dialog.Title>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input {...register('firstName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input {...register('lastName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Department</label>
                                            <input {...register('department', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Position</label>
                                            <input {...register('position', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                                            <input type="date" {...register('dateOfJoining', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                                            <input type="number" {...register('salary', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
