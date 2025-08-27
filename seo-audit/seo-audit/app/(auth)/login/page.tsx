"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type FormData = z.infer<typeof emailSchema>

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({ email: "" })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setStatus("idle")

    try {
      const validatedData = emailSchema.parse(formData)
      
      const result = await signIn("email", {
        email: validatedData.email,
        redirect: false,
      })

      if (result?.error) {
        setStatus("error")
        setStatusMessage("Failed to send login link. Please try again.")
      } else {
        setStatus("success")
        setStatusMessage("Check your email for a login link!")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setStatus("error")
        setStatusMessage("An unexpected error occurred.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card-enhanced p-8 rounded-2xl border border-gray-700/50">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to AISEO Turbo
            </h1>
            <p className="text-gray-400">
              Sign in to access your SEO dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending login link...
                </div>
              ) : (
                "Send Login Link"
              )}
            </button>
          </form>

          {status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg flex items-center ${
                status === "success" 
                  ? "bg-green-900/20 border border-green-500/30 text-green-400"
                  : "bg-red-900/20 border border-red-500/30 text-red-400"
              }`}
              role="alert"
              aria-live="polite"
            >
              {status === "success" ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {statusMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
