"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react"
import { pricingPlans, formatCurrency, calculateSavings, type PricingPlan } from "../../data/pricing"
import { handleCTAClick } from "@/lib/cta-utils"
import { useTranslations } from 'next-intl'

export function PricingCards() {
  const t = useTranslations('home.pricing')
  const [isAnnual, setIsAnnual] = useState(false)

  // Persist billing cycle preference in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('billing-cycle')
    if (saved) {
      setIsAnnual(saved === 'annual')
    }
  }, [])

  const toggleBilling = (annual: boolean) => {
    setIsAnnual(annual)
    localStorage.setItem('billing-cycle', annual ? 'annual' : 'monthly')
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Zap className="w-5 h-5" />
      case 'pro': return <Star className="w-5 h-5" />
      case 'agency': return <Crown className="w-5 h-5" />
      default: return <Zap className="w-5 h-5" />
    }
  }

  const getPlanPrice = (plan: PricingPlan) => {
    if (plan.priceMonthly === 0) return 0
    return isAnnual ? Math.round(plan.priceAnnual / 12) : plan.priceMonthly
  }

  const getSavingsAmount = (plan: PricingPlan) => {
    if (plan.priceMonthly === 0) return 0
    return calculateSavings(plan.priceMonthly, plan.priceAnnual)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 text-sm mb-6">
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-green-300">{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t('title1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('title2')}
            </span>
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
              {t('billing.monthly')}
            </span>
            
            <motion.button
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                ${isAnnual ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-600'}
              `}
              onClick={() => toggleBilling(!isAnnual)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle billing frequency"
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                animate={{ x: isAnnual ? 24 : 4 }}
              />
            </motion.button>

            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
                {t('billing.annual')}
              </span>
              {isAnnual && (
                <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {t('billing.saveUpTo')}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                relative group
                ${plan.highlight 
                  ? 'md:-mt-4 md:mb-4' 
                  : ''
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {t('mostPopular')}
                  </div>
                </div>
              )}

              <div className={`
                relative h-full bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 lg:p-8 
                transition-all duration-300 group-hover:scale-105
                ${plan.highlight 
                  ? 'from-slate-800/60 to-slate-900/60 border-2 border-green-500/30 shadow-2xl shadow-green-500/10' 
                  : 'from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-purple-500/30'
                }
              `}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`
                    inline-flex items-center space-x-2 p-3 rounded-full mb-4
                    ${plan.highlight 
                      ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30' 
                      : 'bg-slate-700/30 border border-slate-600/30'
                    }
                  `}>
                    <span className={plan.highlight ? 'text-green-400' : 'text-gray-400'}>
                      {getPlanIcon(plan.id)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t(`plans.${plan.id}.name`)}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6">
                    {t(`plans.${plan.id}.description`)}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl lg:text-5xl font-bold text-white">
                        {plan.priceMonthly === 0 ? t('plans.free.name') : `$${getPlanPrice(plan)}`}
                      </span>
                      {plan.priceMonthly > 0 && (
                        <span className="text-gray-400 text-lg">
                          /{t('billing.monthly').toLowerCase()}
                        </span>
                      )}
                    </div>
                    
                    {isAnnual && plan.priceMonthly > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-400 line-through">
                          ${plan.priceMonthly}/{t('billing.monthly').toLowerCase()}
                        </span>
                        <span className="ml-2 text-sm text-green-400 font-medium">
                          {t('billing.save')} {getSavingsAmount(plan)}%
                        </span>
                      </div>
                    )}
                    
                    {isAnnual && plan.priceMonthly > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {t('billing.billedAnnually')} (${formatCurrency(plan.priceAnnual)})
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className={`
                          flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                          ${plan.highlight 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                            : 'bg-purple-500/20 border border-purple-500/30'
                          }
                        `}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {t(`plans.${plan.id}.features.${featureIndex}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limits */}
                <div className="mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <h4 className="text-sm font-medium text-white mb-3">{t('limits.title')}</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400">{t('limits.audits')}:</span>
                      <span className="text-white ml-1 font-medium">{t(`limits.values.${plan.id}.audits`)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t('limits.sites')}:</span>
                      <span className="text-white ml-1 font-medium">{t(`limits.values.${plan.id}.sites`)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t('limits.reports')}:</span>
                      <span className="text-white ml-1 font-medium">{t(`limits.values.${plan.id}.reports`)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">{t('limits.support')}:</span>
                      <span className="text-white ml-1 font-medium">{t(`limits.values.${plan.id}.support`)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={plan.id === 'free' ? '/signup' : '/pricing'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 
                    flex items-center justify-center space-x-2 group
                    ${plan.ctaVariant === 'primary' 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg shadow-green-500/25' 
                      : plan.ctaVariant === 'secondary'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 hover:bg-white/10 border border-white/20 hover:border-green-500/30 text-white'
                    }
                  `}
                  data-testid={`cta-${plan.id}`}
                  aria-label={`${t(`plans.${plan.id}.cta`)} for ${t(`plans.${plan.id}.name`)} plan`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destination = plan.id === 'free' ? 'FREE_TRIAL' : 'PRICING'
                    handleCTAClick(destination, t(`plans.${plan.id}.cta`), 'pricing-cards')
                  }}
                >
                  <span>{t(`plans.${plan.id}.cta`)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            {t('footer.notSure')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-500/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            {t('footer.scheduleDemo')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingCards
