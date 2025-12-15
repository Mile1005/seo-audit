"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  AlertTriangle,
  Target,
  Play,
  Rocket,
  Globe,
  BarChart3,
  Settings,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function QuickStartContent() {
  const t = useTranslations("help.quick-start");
  return (
    <section className="pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          {/* Introduction */}
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700/50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-green-400 mt-1" aria-hidden="true" />
              <div>
                <h2 className="text-white text-xl font-bold mb-3">{t("intro.title")}</h2>
                <p className="text-gray-300 mb-4">{t("intro.description")}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-300">{t("intro.highlights.0")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                    <span className="text-yellow-300">{t("intro.highlights.1")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    <span className="text-blue-300">{t("intro.highlights.2")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">{t("progressTracker.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {t.raw("progressTracker.steps").map((step: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{step.title}</div>
                    <div className="text-gray-400 text-xs">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step Guide */}
          <h2 className="text-2xl font-bold text-white mb-8">Let's get started!</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{t("steps.1.title")}</h3>
                  <p className="text-gray-300 mb-4">{t("steps.1.description")}</p>

                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-3">
                      {t("steps.1.requirements.title")}
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      {t.raw("steps.1.requirements.items").map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">{t("steps.1.tip.title")}</h4>
                    <p className="text-gray-300 text-sm">{t("steps.1.tip.description")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{t("steps.2.title")}</h3>
                  <p className="text-gray-300 mb-4">{t("steps.2.description")}</p>

                  <div className="space-y-4">
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{t("steps.2.details.title")}</h4>
                      <div className="space-y-3">
                        {t.raw("steps.2.details.items").map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            {item.icon === "Globe" && (
                              <Globe className="w-5 h-5 text-blue-400" aria-hidden="true" />
                            )}
                            {item.icon === "Settings" && (
                              <Settings className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            )}
                            {item.icon === "BarChart3" && (
                              <BarChart3 className="w-5 h-5 text-orange-400" aria-hidden="true" />
                            )}
                            <div>
                              <span className="text-gray-300 text-sm">{item.label}</span>
                              {item.value && (
                                <code className="ml-2 text-green-400 bg-slate-800 px-2 py-1 rounded text-sm">
                                  {item.value}
                                </code>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
                      <h4 className="text-yellow-400 font-medium mb-2">
                        {t("steps.2.warning.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">{t("steps.2.warning.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{t("steps.3.title")}</h3>
                  <p className="text-gray-300 mb-4">{t("steps.3.description")}</p>

                  <div className="space-y-4">
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">{t("steps.3.analysis.title")}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t
                          .raw("steps.3.analysis.categories")
                          .map((category: string[], categoryIndex: number) => (
                            <div key={categoryIndex} className="space-y-2">
                              {category.map((item: string, itemIndex: number) => {
                                const colors = [
                                  "green",
                                  "blue",
                                  "purple",
                                  "orange",
                                  "yellow",
                                  "cyan",
                                ];
                                const color =
                                  colors[(categoryIndex * 3 + itemIndex) % colors.length];
                                return (
                                  <div key={itemIndex} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-green-400" aria-hidden="true" />
                        <h4 className="text-green-400 font-medium">{t("steps.3.feature.title")}</h4>
                      </div>
                      <p className="text-gray-300 text-sm">{t("steps.3.feature.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{t("steps.4.title")}</h3>
                  <p className="text-gray-300 mb-4">{t("steps.4.description")}</p>

                  <div className="space-y-4">
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">
                        {t("steps.4.dashboard.title")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t.raw("steps.4.dashboard.items").map((item: any, index: number) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-start gap-3">
                              {item.icon === "BarChart3" && (
                                <BarChart3
                                  className="w-5 h-5 text-blue-400 mt-0.5"
                                  aria-hidden="true"
                                />
                              )}
                              {item.icon === "AlertTriangle" && (
                                <AlertTriangle
                                  className="w-5 h-5 text-yellow-400 mt-0.5"
                                  aria-hidden="true"
                                />
                              )}
                              {item.icon === "CheckCircle" && (
                                <CheckCircle
                                  className="w-5 h-5 text-green-400 mt-0.5"
                                  aria-hidden="true"
                                />
                              )}
                              {item.icon === "Target" && (
                                <Target
                                  className="w-5 h-5 text-purple-400 mt-0.5"
                                  aria-hidden="true"
                                />
                              )}
                              <div>
                                <h5 className="text-white font-medium text-sm">{item.title}</h5>
                                <p className="text-gray-400 text-xs">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-900/30 border border-purple-600/30 rounded-lg p-4">
                      <h4 className="text-purple-400 font-medium mb-2">
                        {t("steps.4.focus.title")}
                      </h4>
                      <p className="text-gray-300 text-sm">{t("steps.4.focus.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t("congratulations.title")}
            </h2>
            <p className="text-gray-300 text-center mb-8">{t("congratulations.description")}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.raw("congratulations.nextActions").map((action: any, index: number) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 mx-auto mb-3">
                    {action.icon === "CheckCircle" && (
                      <CheckCircle className="w-6 h-6 text-white" aria-hidden="true" />
                    )}
                    {action.icon === "BarChart3" && (
                      <BarChart3 className="w-6 h-6 text-white" aria-hidden="true" />
                    )}
                    {action.icon === "Rocket" && (
                      <Rocket className="w-6 h-6 text-white" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-yellow-400 text-lg font-semibold mb-4">{t("faq.title")}</h3>
                <div className="space-y-4">
                  {t.raw("faq.questions").map((question: any, index: number) => (
                    <div key={index}>
                      <h4 className="text-white font-medium">{question.question}</h4>
                      <p className="text-gray-300 text-sm">{question.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-6">{t("nextSteps.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.raw("nextSteps.articles").map((article: any, index: number) => (
              <Link
                key={index}
                href={article.href}
                className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                aria-label={`Learn ${article.title.toLowerCase()}`}
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm">{article.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
