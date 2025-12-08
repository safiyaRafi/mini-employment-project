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
                    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all border border-slate-700">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white">
                                        {employee ? 'Edit Employee' : 'Add New Employee'}
                                    </Dialog.Title>
                                    <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
                                            <input {...register('firstName', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
                                            <input {...register('lastName', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                        <input type="email" {...register('email', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
                                            <input {...register('department', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Position</label>
                                            <input {...register('position', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Joining Date</label>
                                            <input type="date" {...register('dateOfJoining', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all [color-scheme:dark]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Salary</label>
                                            <input type="number" {...register('salary', { required: true })} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-colors"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors shadow-lg shadow-indigo-500/20"
                                        >
                                            Save Changes
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
