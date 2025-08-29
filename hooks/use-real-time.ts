import { useEffect, useState, useRef } from 'react'
import { useWebSocket } from '../lib/websocket-client'

// Real-time progress tracking
export interface ProgressUpdate {
  id: string
  type: 'crawl' | 'audit' | 'competitor' | 'keywords'
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress?: number
  currentStep?: string
  data?: any
  error?: string
  timestamp: number
}

// Hook for real-time job progress
export function useRealTimeProgress(jobId: string | null, jobType: string) {
  const [progress, setProgress] = useState<ProgressUpdate | null>(null)
  const { isConnected, subscribe, connectionState } = useWebSocket()

  useEffect(() => {
    if (!jobId || !isConnected) return

    // Subscribe to job-specific updates
    const unsubscribe = subscribe(`${jobType}_update`, (data: any) => {
      if (data.id === jobId || data.jobId === jobId) {
        setProgress({
          id: jobId,
          type: jobType as any,
          ...data,
          timestamp: Date.now(),
        })
      }
    })

    // Subscribe to general progress updates
    const unsubscribeGeneral = subscribe('progress_update', (data: any) => {
      if (data.id === jobId && data.type === jobType) {
        setProgress({
          ...data,
          timestamp: Date.now(),
        })
      }
    })

    return () => {
      unsubscribe()
      unsubscribeGeneral()
    }
  }, [jobId, jobType, isConnected, subscribe])

  return {
    progress,
    isConnected: connectionState === 'connected',
    connectionState,
  }
}

// Hook for crawl-specific real-time updates
export function useCrawlRealTime(crawlId: string | null) {
  const { progress, isConnected, connectionState } = useRealTimeProgress(crawlId, 'crawl')
  
  return {
    crawlProgress: progress,
    isConnected,
    connectionState,
    status: progress?.status || 'unknown',
    currentUrl: progress?.data?.currentUrl,
    pagesDiscovered: progress?.data?.pagesDiscovered || 0,
    pagesProcessed: progress?.data?.pagesProcessed || 0,
    progressPercentage: progress?.progress || 0,
    error: progress?.error,
  }
}

// Hook for audit-specific real-time updates
export function useAuditRealTime(auditId: string | null) {
  const { progress, isConnected, connectionState } = useRealTimeProgress(auditId, 'audit')
  
  return {
    auditProgress: progress,
    isConnected,
    connectionState,
    status: progress?.status || 'unknown',
    currentCheck: progress?.data?.currentCheck,
    checksCompleted: progress?.data?.checksCompleted || 0,
    totalChecks: progress?.data?.totalChecks || 0,
    progressPercentage: progress?.progress || 0,
    error: progress?.error,
  }
}

// Hook for general notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: number
    read: boolean
  }>>([])
  
  const { isConnected, subscribe } = useWebSocket()

  useEffect(() => {
    if (!isConnected) return

    const unsubscribe = subscribe('notification', (data: any) => {
      setNotifications(prev => [{
        id: data.id || Date.now().toString(),
        type: data.type || 'info',
        title: data.title || 'Notification',
        message: data.message,
        timestamp: Date.now(),
        read: false,
        ...data,
      }, ...prev].slice(0, 50)) // Keep only last 50 notifications
    })

    return unsubscribe
  }, [isConnected, subscribe])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    isConnected,
  }
}

// Hook for real-time system status
export function useSystemStatus() {
  const [status, setStatus] = useState({
    crawlerOnline: false,
    auditSystemOnline: false,
    aiServiceOnline: false,
    queueLength: 0,
    activeJobs: 0,
    systemLoad: 0,
  })
  
  const { isConnected, subscribe } = useWebSocket()

  useEffect(() => {
    if (!isConnected) return

    const unsubscribe = subscribe('system_status', (data: any) => {
      setStatus(prev => ({ ...prev, ...data }))
    })

    return unsubscribe
  }, [isConnected, subscribe])

  return {
    ...status,
    isConnected,
    allSystemsOnline: status.crawlerOnline && status.auditSystemOnline && status.aiServiceOnline,
  }
}

// Hook for collaborative features (if multiple users work on same project)
export function useCollaboration(projectId: string | null) {
  const [activeUsers, setActiveUsers] = useState<Array<{
    id: string
    name: string
    avatar?: string
    cursor?: { x: number; y: number }
  }>>([])
  
  const { isConnected, subscribe, send } = useWebSocket()

  useEffect(() => {
    if (!projectId || !isConnected) return

    // Join collaboration room
    send({
      type: 'join_collaboration',
      data: { projectId }
    })

    const unsubscribeUsers = subscribe('collaboration_users', (data: any) => {
      if (data.projectId === projectId) {
        setActiveUsers(data.users || [])
      }
    })

    const unsubscribeUserJoin = subscribe('user_joined', (data: any) => {
      if (data.projectId === projectId) {
        setActiveUsers(prev => [...prev, data.user])
      }
    })

    const unsubscribeUserLeave = subscribe('user_left', (data: any) => {
      if (data.projectId === projectId) {
        setActiveUsers(prev => prev.filter(user => user.id !== data.userId))
      }
    })

    return () => {
      // Leave collaboration room
      send({
        type: 'leave_collaboration',
        data: { projectId }
      })
      
      unsubscribeUsers()
      unsubscribeUserJoin()
      unsubscribeUserLeave()
    }
  }, [projectId, isConnected, subscribe, send])

  const updateCursor = (x: number, y: number) => {
    if (projectId && isConnected) {
      send({
        type: 'cursor_update',
        data: { projectId, cursor: { x, y } }
      })
    }
  }

  return {
    activeUsers,
    isConnected,
    updateCursor,
  }
}

// Hook for auto-saving functionality
export function useAutoSave<T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  options: {
    delay?: number
    enabled?: boolean
  } = {}
) {
  const { delay = 2000, enabled = true } = options
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!enabled) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      setIsSaving(true)
      setSaveError(null)
      
      try {
        await saveFunction(data)
        setLastSaved(new Date())
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Save failed')
      } finally {
        setIsSaving(false)
      }
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, saveFunction, delay, enabled])

  const forceSave = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setIsSaving(true)
    setSaveError(null)
    
    try {
      await saveFunction(data)
      setLastSaved(new Date())
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  return {
    isSaving,
    lastSaved,
    saveError,
    forceSave,
  }
}
