"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MessageSquare, Brain, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Send } from 'lucide-react'

interface AIAssistantHeroProps {
  onChatSubmit?: (message: string) => void;
  isTyping?: boolean;
  conversation?: Array<{
    type: 'user' | 'ai';
    message: string;
    time: string;
    typing?: boolean;
  }>;
}

export function AIAssistantHero({ onChatSubmit, isTyping = false, conversation = [] }: AIAssistantHeroProps) {
  const t = useTranslations('featurePages.aiAssistant');
  const [message, setMessage] = useState('');

  const defaultConversation = [
    {
      type: 'user' as const,
      message: t('chatPreview.userMessage'),
      time: 'Just now'
    },
    {
      type: 'ai' as const,
      message: t('chatPreview.aiMessage'),
      time: 'Just now',
      typing: isTyping
    }
  ];

  const displayConversation = conversation.length > 0 ? conversation : defaultConversation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onChatSubmit) {
      onChatSubmit(message.trim());
      setMessage('');
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Brain className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('hero.title')}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {t('hero.chatButton')}
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5" />
                {t('hero.demoButton')}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>{t('hero.trust.trained')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>{t('hero.trust.realtime')}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - AI Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('chatPreview.headerTitle')}</h3>
                    <p className="text-sm opacity-90">{t('chatPreview.headerStatus')}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 h-80 overflow-y-auto">
                {displayConversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.2 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-muted text-foreground"
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === "user" ? "text-blue-100" : "text-muted-foreground"
                      }`}>
                        {msg.time}
                      </p>
                      {msg.typing && (
                        <div className="flex space-x-1 mt-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('chatPreview.inputPlaceholder')}
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim() || isTyping}
                    className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}