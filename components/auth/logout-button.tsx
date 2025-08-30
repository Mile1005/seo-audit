'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../../hooks/use-auth'

interface LogoutButtonProps {
  variant?: 'button' | 'menu-item'
  className?: string
}

export function LogoutButton({ variant = 'button', className = '' }: LogoutButtonProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false
      })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (variant === 'menu-item') {
    return (
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${className}`}
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleLogout}
      className={`bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 ${className}`}
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </motion.button>
  )
}

export function UserInfo() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
        {user.image ? (
          <img 
            src={user.image} 
            alt={user.name || 'User'} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  )
}
