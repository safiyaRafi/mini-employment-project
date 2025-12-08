import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    UsersIcon,
    ArrowLeftOnRectangleIcon,
    ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/', icon: ChartBarSquareIcon },
    { name: 'Employees', href: '/employees', icon: UsersIcon },
];

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, user } = useAuth();

    return (
        <>
            <div className="h-full bg-slate-900">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 border-r border-slate-700/50 px-6 pb-4 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                EMS Portal
                                            </span>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-2">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <NavLink
                                                                    to={item.href}
                                                                    className={({ isActive }) =>
                                                                        clsx(
                                                                            isActive
                                                                                ? 'bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 text-cyan-400 border border-indigo-500/30'
                                                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
                                                                            'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-200'
                                                                        )
                                                                    }
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                    {item.name}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Desktop sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 border-r border-slate-800 px-6 pb-4">
                        <div className="flex h-20 shrink-0 items-center">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
                                EMS Portal
                            </span>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-2">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <NavLink
                                                    to={item.href}
                                                    className={({ isActive }) =>
                                                        clsx(
                                                            isActive
                                                                ? 'bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-400 border-l-4 border-indigo-500 pl-4'
                                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-l-4 border-transparent pl-4',
                                                            'group flex gap-x-3 p-3 text-sm leading-6 font-medium transition-all duration-300'
                                                        )
                                                    }
                                                >
                                                    <item.icon className={clsx(
                                                        'h-5 w-5 shrink-0 transition-colors duration-200',
                                                    )} aria-hidden="true" />
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto mb-4">
                                    <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700/50">
                                        <p className="text-xs text-slate-500 mb-1">Signed in as</p>
                                        <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 w-full transition-colors duration-200"
                                    >
                                        <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72 h-full">
                    {/* Header / Top bar */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-slate-400 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-900">
                                    {user?.username?.substring(0, 2).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="py-10 bg-slate-950 min-h-[calc(100vh-4rem)]">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
