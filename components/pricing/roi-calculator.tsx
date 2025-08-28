"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, DollarSign, Target, Clock } from "lucide-react"
import { 
  calculateROI, 
  formatCurrency, 
  pricingPlans,
  type ROICalculatorInputs, 
  type ROICalculatorResults 
} from "../../data/pricing"

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROICalculatorInputs>({
    monthlyVisits: 10000,
    conversionRate: 2.5,
    averageOrderValue: 100
  })

  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [results, setResults] = useState<ROICalculatorResults | null>(null)

  // Calculate ROI whenever inputs or selected plan changes
  useEffect(() => {
    const plan = pricingPlans.find(p => p.id === selectedPlan)
    if (plan && plan.priceMonthly > 0) {
      const calculatedResults = calculateROI(inputs, plan.priceMonthly)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }, [inputs, selectedPlan])

  const handleInputChange = (field: keyof ROICalculatorInputs, value: string) => {
    const numericValue = parseFloat(value) || 0
    setInputs(prev => ({
      ...prev,
      [field]: numericValue
    }))
  }

  const paidPlans = pricingPlans.filter(plan => plan.priceMonthly > 0)

  // Simple SVG bar chart component
  const ProgressBar = ({ 
    label, 
    value, 
    maxValue, 
    color = "from-green-500 to-blue-500" 
  }: { 
    label: string
    value: number
    maxValue: number
    color?: string 
  }) => {
    const percentage = Math.min((value / maxValue) * 100, 100)
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">{label}</span>
          <span className="text-white font-medium">{formatCurrency(value)}</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-3">
          <motion.div
            className={`h-3 rounded-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm mb-6">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">ROI Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Calculate Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 bg-clip-text text-transparent">
              SEO Investment ROI
            </span>
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            See how much additional revenue you could generate with improved SEO performance. 
            Based on real customer results.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Enter Your Current Metrics
                </h3>

                {/* Plan Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Plan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {paidPlans.map((plan) => (
                      <motion.button
                        key={plan.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`
                          p-4 rounded-xl border transition-all duration-200 text-left
                          ${selectedPlan === plan.id
                            ? 'border-green-500/50 bg-green-500/10 text-white'
                            : 'border-slate-600/50 bg-slate-800/30 text-gray-300 hover:border-green-500/30'
                          }
                        `}
                      >
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-sm opacity-75">
                          ${plan.priceMonthly}/month
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="monthly-visits" className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Organic Visits
                    </label>
                    <input
                      id="monthly-visits"
                      type="number"
                      value={inputs.monthlyVisits}
                      onChange={(e) => handleInputChange('monthlyVisits', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="10,000"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="conversion-rate" className="block text-sm font-medium text-gray-300 mb-2">
                      Conversion Rate (%)
                    </label>
                    <input
                      id="conversion-rate"
                      type="number"
                      step="0.1"
                      value={inputs.conversionRate}
                      onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="2.5"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label htmlFor="average-order" className="block text-sm font-medium text-gray-300 mb-2">
                      Average Order Value ($)
                    </label>
                    <input
                      id="average-order"
                      type="number"
                      value={inputs.averageOrderValue}
                      onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="100"
                      min="0"
                    />
                  </div>
                </div>

                {/* Assumptions */}
                <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Conservative Estimates Based On Customer Data:
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 30% average increase in organic traffic</li>
                    <li>• 15% improvement in conversion rate</li>
                    <li>• Results typically seen within 3-6 months</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Your Projected Results
                </h3>

                {results ? (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-3">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {formatCurrency(results.monthlyROI)}
                        </div>
                        <div className="text-sm text-gray-400">Monthly ROI</div>
                      </div>

                      <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {results.paybackPeriod.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-400">Months to Payback</div>
                      </div>
                    </div>

                    {/* Revenue Comparison */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-6">Revenue Projection</h4>
                      
                      <div className="space-y-6">
                        <ProgressBar
                          label="Current Monthly Revenue"
                          value={results.currentRevenue}
                          maxValue={results.projectedRevenue}
                          color="from-gray-500 to-gray-600"
                        />
                        
                        <ProgressBar
                          label="Projected Monthly Revenue"
                          value={results.projectedRevenue}
                          maxValue={results.projectedRevenue}
                          color="from-green-500 to-blue-500"
                        />
                        
                        <div className="pt-4 border-t border-slate-700/50">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Monthly Increase</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                              {formatCurrency(results.potentialIncrease)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Annual Summary */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          Annual Impact
                        </h4>
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-2">
                        {formatCurrency(results.annualROI)}
                      </div>
                      <div className="text-green-400 text-sm">
                        Additional annual revenue after plan costs
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Target className="w-5 h-5" />
                      <span>Start Achieving These Results</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-8 text-center">
                    <Calculator className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Select a paid plan to see your ROI projection
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
