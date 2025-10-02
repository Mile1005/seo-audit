'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ExternalLink, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Target,
  Download,
  RefreshCw,
  Filter,
  Search,
  Mail,
  Globe,
  Link as LinkIcon
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts'

interface Backlink {
  id: string
  sourceUrl: string
  sourceDomain: string
  targetUrl: string
  anchorText: string
  linkType: 'FOLLOW' | 'NOFOLLOW'
  status: 'ACTIVE' | 'LOST' | 'REDIRECT' | 'BROKEN'
  domainRating: number
  pageRating: number
  traffic: number
  isToxic: boolean
  toxicScore: number
  linkStrength: 'WEAK' | 'NORMAL' | 'STRONG' | 'VERY_STRONG'
  firstSeen: string
  lastSeen: string
  lastChecked: string
}

interface BacklinkStats {
  total: number
  byStatus: Record<string, number>
  byLinkType: Record<string, number>
  toxic: number
  referringDomains: number
  domainRating: {
    average: number
    max: number
    min: number
  }
}

interface BacklinkDashboardProps {
  projectId: string
}

export default function BacklinkDashboard({ projectId }: BacklinkDashboardProps) {
  const [backlinks, setBacklinks] = useState<Backlink[]>([])
  const [stats, setStats] = useState<BacklinkStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: 'all',
    linkType: 'all',
    toxic: 'all',
    domain: '',
    minDomainRating: '',
    maxDomainRating: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchBacklinks = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        projectId,
        page: currentPage.toString(),
        limit: '50',
        ...filter
      })
      const response = await fetch(`/api/backlinks?${params}`)
      const data = await response.json()
      if (response.ok) {
        setBacklinks(data.backlinks)
        setStats(data.stats)
        setTotalPages(data.pagination.pages)
      } else {
        console.error('Failed to fetch backlinks:', data.error)
      }
    } catch (error) {
      console.error('Error fetching backlinks:', error)
    } finally {
      setLoading(false)
    }
  }, [projectId, currentPage, filter])

  const generateMockData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/backlinks/mock-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, count: 100 })
      })

      if (response.ok) {
        fetchBacklinks()
      } else {
        console.error('Failed to generate mock data')
      }
    } catch (error) {
      console.error('Error generating mock data:', error)
    }
  }

  useEffect(() => {
    fetchBacklinks()
  }, [fetchBacklinks])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'LOST': return 'bg-red-100 text-red-800'
      case 'BROKEN': return 'bg-orange-100 text-orange-800'
      case 'REDIRECT': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLinkStrengthColor = (strength: string) => {
    switch (strength) {
      case 'VERY_STRONG': return 'bg-emerald-100 text-emerald-800'
      case 'STRONG': return 'bg-green-100 text-green-800'
      case 'NORMAL': return 'bg-yellow-100 text-yellow-800'
      case 'WEAK': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const domainRatingDistribution = stats ? [
    { range: '0-20', count: 0 },
    { range: '21-40', count: 0 },
    { range: '41-60', count: 0 },
    { range: '61-80', count: 0 },
    { range: '81-100', count: 0 }
  ] : []

  // Populate domain rating distribution
  backlinks.forEach(backlink => {
    const rating = backlink.domainRating
    if (rating <= 20) domainRatingDistribution[0].count++
    else if (rating <= 40) domainRatingDistribution[1].count++
    else if (rating <= 60) domainRatingDistribution[2].count++
    else if (rating <= 80) domainRatingDistribution[3].count++
    else domainRatingDistribution[4].count++
  })

  const statusData = stats ? Object.entries(stats.byStatus).map(([status, count]) => ({
    status,
    count
  })) : []

  const linkTypeData = stats ? Object.entries(stats.byLinkType).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / stats.total) * 100)
  })) : []

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  if (loading && backlinks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Backlink Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive backlink profile analysis and monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateMockData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Mock Data
          </Button>
          <Button onClick={fetchBacklinks} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Backlinks</p>
                  <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
                </div>
                <LinkIcon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Referring Domains</p>
                  <p className="text-2xl font-bold">{stats.referringDomains.toLocaleString()}</p>
                </div>
                <Globe className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Domain Rating</p>
                  <p className="text-2xl font-bold">{Math.round(stats.domainRating.average)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toxic Links</p>
                  <p className="text-2xl font-bold text-red-600">{stats.toxic}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(((stats.total - stats.toxic) / stats.total) * 100)}%
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="overview" className="whitespace-nowrap">Overview</TabsTrigger>
            <TabsTrigger value="backlinks" className="whitespace-nowrap">Backlinks</TabsTrigger>
            <TabsTrigger value="domains" className="whitespace-nowrap">Referring Domains</TabsTrigger>
            <TabsTrigger value="toxic" className="whitespace-nowrap">Toxic Analysis</TabsTrigger>
            <TabsTrigger value="prospects" className="whitespace-nowrap">Link Prospects</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Domain Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Domain Rating Distribution</CardTitle>
                <CardDescription>
                  Backlinks grouped by domain authority ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={domainRatingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Link Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Link Type Distribution</CardTitle>
                <CardDescription>
                  Follow vs NoFollow link breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={linkTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {linkTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Backlinks */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Backlinks</CardTitle>
              <CardDescription>
                Latest discovered backlinks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backlinks.slice(0, 5).map((backlink) => (
                  <div key={backlink.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{backlink.sourceDomain}</span>
                        <Badge className={getStatusColor(backlink.status)}>
                          {backlink.status}
                        </Badge>
                        {backlink.isToxic && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Toxic
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        "{backlink.anchorText}"
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>DR: {backlink.domainRating}</span>
                        <span>{backlink.linkType}</span>
                        <span>Last seen: {new Date(backlink.lastSeen).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <Input
                  placeholder="Search domain..."
                  value={filter.domain}
                  onChange={(e) => setFilter(prev => ({ ...prev, domain: e.target.value }))}
                />
                <Select value={filter.status} onValueChange={(value: string) => setFilter(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="LOST">Lost</SelectItem>
                    <SelectItem value="BROKEN">Broken</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filter.linkType} onValueChange={(value: string) => setFilter(prev => ({ ...prev, linkType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Link Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="FOLLOW">Follow</SelectItem>
                    <SelectItem value="NOFOLLOW">NoFollow</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filter.toxic} onValueChange={(value: string) => setFilter(prev => ({ ...prev, toxic: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toxic Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Links</SelectItem>
                    <SelectItem value="false">Clean Links</SelectItem>
                    <SelectItem value="true">Toxic Links</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Min DR"
                  value={filter.minDomainRating}
                  onChange={(e) => setFilter(prev => ({ ...prev, minDomainRating: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Max DR"
                  value={filter.maxDomainRating}
                  onChange={(e) => setFilter(prev => ({ ...prev, maxDomainRating: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Backlinks Table */}
          <Card>
            <CardHeader>
              <CardTitle>Backlinks ({stats?.total || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backlinks.map((backlink) => (
                  <div key={backlink.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-blue-600">
                            {backlink.sourceDomain}
                          </span>
                          <Badge className={getStatusColor(backlink.status)}>
                            {backlink.status}
                          </Badge>
                          <Badge className={getLinkStrengthColor(backlink.linkStrength)}>
                            {backlink.linkStrength}
                          </Badge>
                          {backlink.isToxic && (
                            <Badge variant="destructive">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Toxic ({Math.round(backlink.toxicScore)}%)
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm mb-2">
                          <span className="font-medium">Anchor:</span> "{backlink.anchorText}"
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Domain Rating:</span>
                            <span className="ml-1 font-medium">{backlink.domainRating}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Page Rating:</span>
                            <span className="ml-1 font-medium">{backlink.pageRating}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Traffic:</span>
                            <span className="ml-1 font-medium">{backlink.traffic?.toLocaleString() || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <span className="ml-1 font-medium">{backlink.linkType}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-muted-foreground">
                          First seen: {new Date(backlink.firstSeen).toLocaleDateString()} • 
                          Last seen: {new Date(backlink.lastSeen).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toxic">
          <Card>
            <CardHeader>
              <CardTitle>Toxic Link Analysis</CardTitle>
              <CardDescription>
                Identify and manage potentially harmful backlinks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="whitespace-nowrap">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Disavow File
                  </Button>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Shield className="h-4 w-4 mr-2" />
                    Bulk Mark as Safe
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
                  <p>Toxic link analysis will be displayed here</p>
                  <p className="text-sm">This feature analyzes link quality and identifies potentially harmful backlinks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects">
          <Card>
            <CardHeader>
              <CardTitle>Link Building Prospects</CardTitle>
              <CardDescription>
                Manage outreach opportunities for link building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="whitespace-nowrap">
                    <Target className="h-4 w-4 mr-2" />
                    Find New Prospects
                  </Button>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Mail className="h-4 w-4 mr-2" />
                    Start Outreach Campaign
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4" />
                  <p>Link building prospects will be displayed here</p>
                  <p className="text-sm">This feature helps identify and manage outreach opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
