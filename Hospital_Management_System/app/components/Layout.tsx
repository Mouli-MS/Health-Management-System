'use client';

import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  Settings,
  HelpCircle,
  Power,
  Home,
  User,
  TestTube,
  FileText,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const roleMenus: Record<string, { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  Admin: [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Patients', href: '/admin/patients', icon: User },
    { name: 'Labs', href: '/admin/lab', icon: TestTube },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
  ],
  Doctor: [
    { name: 'Dashboard', href: '/doctor', icon: Home },
    { name: 'Patients', href: '/doctor/patients', icon: User },
    { name: 'Appointments', href: '/doctor/appointments', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: FileText },
  ],
  Reception: [
    { name: 'Dashboard', href: '/reception', icon: Home },
    { name: 'Register Patient', href: '/reception/register-patient', icon: User },
    { name: 'Search Patients', href: '/reception/search-patients', icon: User },
    { name: 'Create Appointment', href: '/reception/create-appointment', icon: FileText },
    { name: 'Create Bill', href: '/reception/create-bill', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: FileText },
  ],
  Lab: [
    { name: 'Dashboard', href: '/lab', icon: Home },
    { name: 'Upload Report', href: '/lab/upload-report', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: FileText },
  ],
};

export default function Layout({ children }: LayoutProps): ReactNode {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const publicPaths = ['/login', '/register', '/'];

    if (publicPaths.includes(currentPath)) {
      setRole(null);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRole(payload.role);
    } catch {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(saved === 'true');
      if (saved === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!role) {
    return <>{children}</>;
  }

  const menus = roleMenus[role] || [];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-900 text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="flex items-center space-x-2 px-6 py-4 border-b border-gray-700">
          <Home className="w-6 h-6 text-indigo-500" />
          <h1 className="text-xl font-bold text-indigo-500">MediTrack HMS</h1>
          <button
            className="md:hidden ml-auto p-2 rounded-md text-gray-300 hover:bg-gray-700"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 p-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar */}
        <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="User profile"
            >
              <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="hidden sm:block text-gray-900 dark:text-white">Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setProfileOpen(false);
                    router.push('/settings');
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setProfileOpen(false);
                    router.push('/support');
                  }}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  <Power className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
