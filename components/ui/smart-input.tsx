import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SmartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
  success?: boolean
  isPassword?: boolean
  showStrength?: boolean
  onValidate?: (value: string) => { valid: boolean; errors: string[] }
}

export const SmartInput: React.FC<SmartInputProps> = ({
  label,
  icon: Icon,
  error,
  success,
  isPassword = false,
  showStrength = false,
  onValidate,
  className,
  value,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [validation, setValidation] = useState<{ valid: boolean; errors: string[] } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange?.(e)
    
    if (onValidate && newValue) {
      const result = onValidate(newValue)
      setValidation(result)
    } else {
      setValidation(null)
    }
  }

  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[@$!%*?&]/.test(password)) score++

    const levels = [
      { label: 'Very Weak', color: 'bg-red-500' },
      { label: 'Weak', color: 'bg-orange-500' },
      { label: 'Fair', color: 'bg-yellow-500' },
      { label: 'Good', color: 'bg-blue-500' },
      { label: 'Strong', color: 'bg-green-500' }
    ]

    return { score, ...levels[score] }
  }

  const passwordStrength = showStrength && isPassword && value ? getPasswordStrength(value as string) : null

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
            isFocused ? "text-blue-500" : "text-gray-400"
          )} />
        )}
        
        <input
          {...props}
          type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-3 py-3 border rounded-xl transition-all duration-200 bg-white/90 text-gray-900 placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            Icon && "pl-10",
            isPassword && "pr-12",
            error ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500",
            success && "border-green-300 focus:ring-green-500",
            isFocused && "scale-[1.02] shadow-lg",
            className
          )}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Password Strength Indicator */}
      {passwordStrength && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={cn("h-2 rounded-full transition-all duration-300", passwordStrength.color)}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{passwordStrength.label}</span>
          </div>
        </motion.div>
      )}

      {/* Validation Feedback */}
      {validation && !validation.valid && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          {validation.errors.map((err, index) => (
            <p key={index} className="text-xs text-red-600 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              {err}
            </p>
          ))}
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}

      {/* Success Message */}
      {success && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-600 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Looks good!
        </motion.p>
      )}
    </div>
  )
}
