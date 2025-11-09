"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Plus,
  FolderOpen
} from "lucide-react"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

interface User {
  id: string
  email: string
  name?: string | null
}

interface Project {
  id: string
  name: string
}

export function DashboardHeader({ user }: { user: User }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const handleCreateProject = () => {
    router.push("/dashboard/projects/new")
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsProjectMenuOpen(false)
  }

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AISEO Turbo
            </h1>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Project Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
              >
                <FolderOpen className="w-4 h-4" />
                <span>
                  {selectedProject ? selectedProject.name : "Select Project"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProjectMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50"
                >
                  <div className="p-2">
                    {projects.length === 0 ? (
                      <div className="p-4 text-center text-gray-400">
                        <p className="mb-2">No projects yet</p>
                        <button
                          onClick={handleCreateProject}
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Create your first project
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {projects.map((project) => (
                          <button
                            key={project.id}
                            onClick={() => handleProjectSelect(project)}
                            className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md transition-colors"
                          >
                            {project.name}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-gray-600 mt-2 pt-2">
                      <button
                        onClick={handleCreateProject}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-cyan-400 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Project</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {user.name?.[0] || user.email[0].toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-gray-600">
                      <p className="text-white font-medium">{user.name || "User"}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => router.push("/dashboard/settings")}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
