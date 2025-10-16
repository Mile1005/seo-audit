'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Globe, Target, Zap, BarChart3 } from 'lucide-react'
import { AuthGuard } from '../../components/auth/auth-guard'
import { UserInfo } from '../../components/auth/logout-button'

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to AI SEO Turbo! 🎉',
    description: 'Let\'s get you set up for SEO success',
    icon: Zap
  },
  {
    id: 'goals',
    title: 'What are your SEO goals?',
    description: 'Help us personalize your experience',
    icon: Target
  },
  {
    id: 'website',
    title: 'Tell us about your website',
    description: 'We\'ll run your first SEO audit',
    icon: Globe
  },
  {
    id: 'complete',
    title: 'You\'re all set! 🚀',
    description: 'Ready to boost your SEO performance',
    icon: CheckCircle
  }
]

const SEO_GOALS = [
  'Improve search rankings',
  'Increase organic traffic',
  'Fix technical SEO issues',
  'Monitor competitors',
  'Track keyword performance',
  'Generate SEO reports'
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [websiteData, setWebsiteData] = useState({
    url: '',
    industry: '',
    company: ''
  })
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const currentStepData = ONBOARDING_STEPS[currentStep]

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const handleNext = async () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      // Complete onboarding
      setLoading(true)
      try {
        // Save user preferences and run first audit
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/dashboard')
      } catch (error) {
        console.error('Onboarding completion error:', error)
      } finally {
        setLoading(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'welcome':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to AI SEO Turbo! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You're about to join thousands of marketers who've boosted their SEO performance. Let's get you set up for success!
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
                <p className="text-sm text-gray-600">Get instant SEO insights powered by Google</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Site Crawling</h3>
                <p className="text-sm text-gray-600">Discover issues across your entire website</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Actionable Tips</h3>
                <p className="text-sm text-gray-600">Get specific steps to improve rankings</p>
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What are your SEO goals?
              </h2>
              <p className="text-lg text-gray-600">
                Select all that apply to personalize your experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SEO_GOALS.map((goal, index) => (
                <motion.button
                  key={goal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedGoals.includes(goal)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{goal}</span>
                    {selectedGoals.includes(goal) && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 'website':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us about your website
              </h2>
              <p className="text-lg text-gray-600">
                We'll run your first SEO audit to get you started
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website URL *
                </label>
                <input
                  type="url"
                  value={websiteData.url}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry (Optional)
                </label>
                <input
                  type="text"
                  value={websiteData.industry}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., E-commerce, SaaS, Local Business"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={websiteData.company}
                  onChange={(e) => setWebsiteData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 'complete':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're all set! 🚀
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your account is ready. Let's start improving your SEO performance!
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">What's next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Run your first SEO audit</li>
                <li>✅ Explore your dashboard</li>
                <li>✅ Set up monitoring</li>
                <li>✅ Generate your first report</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">AI SEO Turbo</h1>
              </div>
              <UserInfo />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/50 py-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {ONBOARDING_STEPS.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
            >
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                <button
                  onClick={handleSkip}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Skip for now
                </button>

                <div className="flex gap-4">
                  {currentStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={loading || (currentStepData.id === 'website' && !websiteData.url)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Setting up...' : currentStep === ONBOARDING_STEPS.length - 1 ? 'Go to Dashboard' : 'Continue'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
