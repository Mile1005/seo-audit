"use client";

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Link } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BacklinkDashboard = dynamic(
  () => import('../../../../components/backlinks/backlink-dashboard'),
  { ssr: false, loading: () => <div>Loading backlinks dashboard...</div> }
)

export default function BacklinksPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentProjectId, setCurrentProjectId] = useState<string>('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: { 'x-user-id': 'demo-user' }
      })
      if (response.ok) {
        const result = await response.json()
        if (result.data && result.data.length > 0) {
          setProjects(result.data)
          setCurrentProjectId(result.data[0].id)
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Backlinks Analysis - Monitor Link Building Performance</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Monitor your backlink profile and link building opportunities
          </p>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No Projects Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Create a project first to start analyzing your backlinks
            </p>
            <Button onClick={() => router.push('/dashboard/projects')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Backlinks Analysis - Monitor Link Building Performance</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Monitor your backlink profile and link building opportunities
        </p>
      </div>

      {/* Project Selector */}
      {projects.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Project</CardTitle>
            <CardDescription>Choose a project to analyze backlinks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    currentProjectId === project.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setCurrentProjectId(project.id)}
                >
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.url || project.domain}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {currentProjectId && <BacklinkDashboard projectId={currentProjectId} />}
    </div>
  )
}
