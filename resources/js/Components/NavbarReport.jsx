import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/UI/Dropdown';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';

export default function NavbarReport() {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const user = auth?.user;
    if (!user) return null;

    const fullNameParts = (user.name || '').split(' ');
    const firstName = fullNameParts[0] || 'User';
    const lastName = fullNameParts.slice(1).join(' ') || '';
    const userRole = user.role || 'User';

    const NavDropdownTrigger = ({ label }) => (
        <span className="inline-flex rounded-md">
            <button
                type="button"
                className="inline-flex items-center text-[15px] font-medium text-white hover:text-orange-100 focus:outline-none transition ease-in-out duration-150 font-sans tracking-wide"
            >
                {label}
                <svg
                    className="ml-1 -mr-0.5 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </span>
    );

    const DropdownHeader = ({ children }) => (
        <div className="block px-4 py-2 text-xs text-gray-400 font-bold uppercase tracking-wider font-sans">
            {children}
        </div>
    );

    return (
        <nav className="bg-[#F59E0B] shadow-lg border-b border-orange-600 fixed w-full top-0 z-50 font-sans">
            <div className="w-full px-4 lg:px-8">
                <div className="flex justify-between h-16 lg:h-20 items-center">

                    {/* Left Side: Logo & System Name */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <Link href="/dashboard" className="flex items-center gap-3 lg:gap-4 hover:opacity-90 transition-opacity">
                            <div className="shrink-0 flex items-center bg-white/10 p-2 rounded-full shadow-sm">
                                <img src="/images/rmutt-logo.png" alt="RMUTT" className="h-8 lg:h-11 w-auto drop-shadow-sm" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-white font-semibold text-base lg:text-xl leading-none tracking-wide drop-shadow-sm mb-0.5 lg:mb-1">
                                    ระบบรับเรื่องแจ้งปัญหา
                                </span>
                                <span className="hidden lg:block text-orange-50 text-xs lg:text-sm font-light tracking-wider opacity-95">
                                    ภาควิศวกรรมคอมพิวเตอร์ (Computer Engineering Issue Reporting System)
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side: Desktop Menu & Profile */}
                    <div className="hidden lg:flex items-center gap-8 ml-auto">

                        {/* 1. Universal Dropdown: แจ้งปัญหา */}
                        <div className="relative group">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <NavDropdownTrigger label="แจ้งปัญหา" />
                                </Dropdown.Trigger>
                                <Dropdown.Content width="56">
                                    <DropdownHeader>เมนูทั่วไป</DropdownHeader>
                                    <Dropdown.Link href="/dashboard">หน้าแรก</Dropdown.Link>
                                    <Dropdown.Link href={route('report.create')}>ฟอร์มแจ้งปัญหา</Dropdown.Link>
                                    <Dropdown.Link href={route('report.history')}>ประวัติการแจ้ง</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Report Menu Dropdown */}
                        <div className="relative group">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <NavDropdownTrigger label="กลุ่มงานแจ้งซ่อม" />
                                </Dropdown.Trigger>
                                <Dropdown.Content width="56">
                                    <DropdownHeader>เมนูแจ้งซ่อม</DropdownHeader>
                                    <Dropdown.Link href="/report">Dashboard</Dropdown.Link>
                                    <Dropdown.Link href="/report/create-news">สร้างข่าวสาร</Dropdown.Link>
                                    <Dropdown.Link href="/report/list-report">รายการแจ้งซ่อม</Dropdown.Link>
                                    <Dropdown.Link href="/report/all-jobs">ใบงานรวม</Dropdown.Link>
                                    <Dropdown.Link href="/report/my-jobs">ใบงานของฉัน</Dropdown.Link>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <Dropdown.Link href={route('report.manage-keyword')}>กำหนดคีย์เวิร์ด</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* User Profile Dropdown (Separated by Divider) */}
                        <div className="h-10 w-px bg-orange-400/60"></div>

                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-3 border border-transparent text-sm leading-4 font-medium rounded-full text-white hover:bg-white/10 focus:outline-none transition ease-in-out duration-150 py-1.5 pl-1.5 pr-4"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-white text-[#F59E0B] flex items-center justify-center font-bold text-xl shadow-md ring-2 ring-white/20">
                                                {firstName[0]}
                                            </div>
                                            <div className="flex flex-col items-start text-left">
                                                <span className="font-semibold text-[15px] leading-tight">{firstName}</span>
                                                <span className="text-[11px] opacity-90 uppercase tracking-wider font-light">{userRole}</span>
                                            </div>
                                            <svg
                                                className="ml-1 h-4 w-4 opacity-70"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Signed in as</p>
                                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            Profile Settings
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 hover:bg-red-50">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Log Out
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile Hamburger (Visible on < lg) */}
                    <div className="flex items-center lg:hidden ml-auto">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <svg className="h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden bg-[#F59E0B] border-t border-orange-600 shadow-xl'}>
                <div className="pt-2 pb-3 space-y-1">
                    <div className="px-4 py-2 text-xs font-bold text-orange-200 uppercase tracking-widest">เมนูทั่วไป</div>
                    <ResponsiveNavLink href="/dashboard" className="text-white hover:bg-black/10 text-lg">หน้าแรก</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('report.create')} className="text-white hover:bg-black/10 text-lg">ฟอร์มแจ้งปัญหา</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('report.history')} className="text-white hover:bg-black/10 text-lg">ประวัติการแจ้ง</ResponsiveNavLink>

                    <div className="px-4 py-2 text-xs font-bold text-orange-200 uppercase tracking-widest mt-4">เมนูแจ้งซ่อม</div>
                    <ResponsiveNavLink href="/report" className="text-white hover:bg-black/10 text-lg">Dashboard</ResponsiveNavLink>
                    <ResponsiveNavLink href="/report/create-news" className="text-white hover:bg-black/10 text-lg">สร้างข่าวสาร</ResponsiveNavLink>
                    <ResponsiveNavLink href="/report/list-report" className="text-white hover:bg-black/10 text-lg">รายการแจ้งซ่อม</ResponsiveNavLink>
                    <ResponsiveNavLink href="/report/all-jobs" className="text-white hover:bg-black/10 text-lg">ใบงานรวม</ResponsiveNavLink>
                    <ResponsiveNavLink href="/report/my-jobs" className="text-white hover:bg-black/10 text-lg">ใบงานของฉัน</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('report.manage-keyword')} className="text-white hover:bg-black/10 text-lg">กำหนดคีย์เวิร์ด</ResponsiveNavLink>
                </div>

                <div className="pt-6 pb-6 border-t border-orange-600 bg-orange-700/30">
                    <div className="px-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-white text-[#F59E0B] flex items-center justify-center font-bold text-xl shadow-md">
                            {firstName[0]}
                        </div>
                        <div>
                            <div className="font-semibold text-lg text-white">
                                {firstName} {lastName}
                            </div>
                            <div className="font-light text-sm text-orange-200">{user.email}</div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2 px-2">
                        <ResponsiveNavLink href={route('profile.edit')} className="text-white hover:bg-black/10 rounded-lg">Profile Settings</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-white hover:bg-black/10 rounded-lg">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
