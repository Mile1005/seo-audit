'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon, 
  CalendarIcon, 
  ClockIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  TrophyIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  // Mock user stats and activity data
  const userStats = {
    totalAudits: 47,
    criticalIssuesFixed: 156,
    averageScore: 87,
    daysActive: 23,
    streak: 7,
    rank: 'SEO Expert',
    joinedDate: '2024-08-15'
  }

  const recentActivity = [
    {
      id: 1,
      action: 'Completed SEO audit',
      target: 'aiseoturbo.com',
      score: 92,
      timestamp: '2 hours ago',
      type: 'audit'
    },
    {
      id: 2,
      action: 'Fixed critical issue',
      target: 'Missing meta description',
      impact: 'High',
      timestamp: '5 hours ago',
      type: 'fix'
    },
    {
      id: 3,
      action: 'Added new project',
      target: 'example-site.com',
      timestamp: '1 day ago',
      type: 'project'
    },
    {
      id: 4,
      action: 'Reached milestone',
      target: '50 audits completed',
      timestamp: '2 days ago',
      type: 'milestone'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Audit',
      description: 'Completed your first SEO audit',
      icon: DocumentMagnifyingGlassIcon,
      earned: true,
      earnedDate: '2024-08-15'
    },
    {
      id: 2,
      title: 'Issue Hunter',
      description: 'Fixed 100+ critical SEO issues',
      icon: TrophyIcon,
      earned: true,
      earnedDate: '2024-09-10'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Used the platform for 7 consecutive days',
      icon: FireIcon,
      earned: true,
      earnedDate: '2024-09-20'
    },
    {
      id: 4,
      title: 'SEO Expert',
      description: 'Achieved average audit score of 85+',
      icon: StarIcon,
      earned: false,
      progress: 87
    }
  ]

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'audit':
        return <DocumentMagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
      case 'fix':
        return <TrophyIcon className="w-5 h-5 text-green-500" />
      case 'project':
        return <ChartBarIcon className="w-5 h-5 text-purple-500" />
      case 'milestone':
        return <StarIcon className="w-5 h-5 text-yellow-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-slate-500" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-16 h-16 text-white/70" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{userStats.streak}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{session?.user?.name || 'User'}</h1>
            <p className="text-blue-100 text-lg">{session?.user?.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {userStats.rank}
              </span>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm">Joined {new Date(userStats.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="text-2xl font-bold text-slate-900">{userStats.totalAudits}</div>
              <div className="text-sm text-slate-500">Total Audits</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="text-2xl font-bold text-slate-900">{userStats.averageScore}</div>
              <div className="text-sm text-slate-500">Avg Score</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="text-2xl font-bold text-slate-900">{userStats.criticalIssuesFixed}</div>
              <div className="text-sm text-slate-500">Issues Fixed</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="text-2xl font-bold text-slate-900">{userStats.daysActive}</div>
              <div className="text-sm text-slate-500">Days Active</div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {getActionIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.action}
                        {activity.type === 'audit' && activity.score && (
                          <span className="ml-2 text-green-600 font-semibold">
                            Score: {activity.score}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-slate-500">{activity.target}</p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {activity.timestamp}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Achievements</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      achievement.earned 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-full ${
                      achievement.earned ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.earned ? 'text-green-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-slate-500">{achievement.description}</p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
