"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Globe, Calendar, BarChart3, Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  domain: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    domain: ''
  });

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects?page=1&limit=10', {
        headers: {
          'x-user-id': 'demo-user'
        }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setProjects(result.data || []);
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim() || !newProject.domain.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'demo-user'
        },
        body: JSON.stringify({
          name: newProject.name,
          domain: newProject.domain.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setProjects(prev => [result.data.project, ...prev]);
        setNewProject({ name: '', domain: '' });
        setShowCreateForm(false);
      } else {
        alert('Error creating project: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } else {
        alert('Error deleting project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage your SEO projects and domains
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>
                Add a new website to start tracking its SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <Input
                    placeholder="My Website"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <Input
                    placeholder="example.com"
                    value={newProject.domain}
                    onChange={(e) => setNewProject(prev => ({ ...prev, domain: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={createProject}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project?.id || Math.random()} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project?.name || 'Untitled Project'}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Globe className="h-4 w-4" />
                        {project?.domain || 'No domain'}
                      </CardDescription>
                    </div>
                    <Badge variant={project?.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {project?.status || 'UNKNOWN'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created
                      </span>
                      <span>{formatDate(project?.createdAt || new Date().toISOString())}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/dashboard/keywords?project=${project?.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Keywords
                        </Button>
                      </Link>
                      <Link href={`/dashboard/backlinks?project=${project?.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Globe className="h-4 w-4 mr-2" />
                          Backlinks
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/dashboard/audit?project=${project?.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          SEO Audit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProject(project?.id || '')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No Projects Yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Create your first project to start tracking SEO performance
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
  );
}
