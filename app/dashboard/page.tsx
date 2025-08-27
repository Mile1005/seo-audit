"use client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { m as motion } from "framer-motion"
import { Plus, FolderOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Minimal placeholder to avoid server-only auth/db in client boundary during homepage work.
  const [projects] = useState<any[]>([])
  useEffect(() => {
    // TODO: Replace with proper data fetching once dashboard work resumes.
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome back
        </h1>
        <p className="text-gray-400">
          Manage your SEO projects and audits
        </p>
      </div>

  {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass-card-enhanced p-8 rounded-2xl border border-gray-700/50 max-w-md mx-auto">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No projects yet
            </h2>
            <p className="text-gray-400 mb-6">
              Create your first project to start analyzing websites
            </p>
            <Link
              href="/dashboard/projects/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create Project</span>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-enhanced p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {project.name}
                </h3>
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  View
                </Link>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>{project._count.audits} audits</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FolderOpen className="w-4 h-4" />
                  <span>{project._count.crawls} crawls</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-enhanced p-6 rounded-xl border border-gray-700/50 border-dashed hover:border-cyan-500/30 transition-all duration-200"
          >
            <Link
              href="/dashboard/projects/new"
              className="flex flex-col items-center justify-center h-full text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-medium">New Project</span>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  )
}
