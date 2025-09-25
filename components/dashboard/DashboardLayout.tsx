'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  FolderIcon, 
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  LinkIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Keywords', href: '/dashboard/keywords', icon: MagnifyingGlassIcon },
  { name: 'Site Audit', href: '/dashboard/audit', icon: DocumentMagnifyingGlassIcon },
  { name: 'Backlinks', href: '/dashboard/backlinks', icon: LinkIcon },
  { name: 'Competitors', href: '/dashboard/competitors', icon: UsersIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`min-h-screen bg-slate-50 ${darkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">SEOTurbo</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
{/* 
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed left-0 lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center h-16 px-6 border-b border-slate-200 dark:border-slate-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">SEOTurbo</span>
            </Link>
          </div>
          <nav className="mt-6 flex-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* Bottom section */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/dashboard/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <Cog6ToothIcon className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </div> 

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/dashboard" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                      Dashboard
                    </Link>
                  </li>
                  {pathname !== '/dashboard' && (
                    <>
                      <span className="text-slate-400">/</span>
                      <li className="text-slate-900 dark:text-white font-medium">
                        {navigation.find(item => item.href === pathname)?.name || 'Page'}
                      </li>
                    </>
                  )}
                </ol>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User profile */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">admin@aiseoturbo.com</p>
                </div>
                <button className="flex items-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <UserCircleIcon className="w-8 h-8 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
