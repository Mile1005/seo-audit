"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ApiErrorBoundary } from "@/components/ui/error-boundary";
import { useFormSubmission } from "@/hooks/use-api";

// Dynamic imports to prevent lambda issues
import dynamic from "next/dynamic";

const HowAIWorks = dynamic(() => import("@/components/features/ai-assistant/how-ai-works"), {
  ssr: false,
});
const RecommendationTypes = dynamic(
  () => import("@/components/features/ai-assistant/recommendation-types"),
  { ssr: false }
);
const IndustrySpecialization = dynamic(
  () => import("@/components/features/ai-assistant/industry-specialization"),
  { ssr: false }
);
const ImplementationGuides = dynamic(
  () => import("@/components/features/ai-assistant/implementation-guides"),
  { ssr: false }
);
const AIAssistantHero = dynamic(
  () =>
    import("@/components/features/ai-assistant/ai-assistant-hero").then((mod) => ({
      default: mod.AIAssistantHero,
    })),
  { ssr: false }
);

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistantFeaturePage() {
  const t = useTranslations("featurePages.aiAssistant");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI SEO Assistant. I can help you with:\n\n• SEO strategy and planning\n• Keyword research and analysis\n• Technical SEO issues\n• Content optimization\n• Competitor analysis\n• Performance tracking\n\nWhat would you like to know about SEO?",
      timestamp: new Date(),
    },
  ]);

  const { isSubmitting, submitError, submit } = useFormSubmission<any, any>();

  const handleChatSubmit = async (message: string) => {
    if (!message.trim() || isSubmitting) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    await submit(
      async (data) => {
        const response = await fetch("/api/ai-assistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: data.message,
            conversationHistory: data.history,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }
        return response.json();
      },
      {
        message: userMessage.content,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      },
      (result) => {
        if (result.success) {
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: result.response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      }
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: "Features", url: "https://www.aiseoturbo.com/features" },
              { name: "AI Assistant", url: "https://www.aiseoturbo.com/features/ai-assistant" },
            ]}
            className="mb-4"
          />
        </div>

        {/* Interactive Hero Section */}
        <section>
          <h1 className="sr-only">AI SEO Assistant - Smart Optimization Recommendations</h1>
          <AIAssistantHero
            onChatSubmit={handleChatSubmit}
            isTyping={isSubmitting}
            conversation={messages.map((msg) => ({
              type: msg.role === "user" ? ("user" as const) : ("ai" as const),
              message: msg.content,
              time: msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              typing: msg.role === "assistant" && isSubmitting,
            }))}
          />
        </section>

        {/* How AI Works */}
        <HowAIWorks />

        {/* Recommendation Types */}
        <RecommendationTypes />

        {/* Industry Specialization */}
        <IndustrySpecialization />

        {/* Implementation Guides */}
        <ImplementationGuides />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-xl p-8 border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("cta.title")}</h2>
              <p className="text-xl text-muted-foreground mb-8">{t("cta.subtitle")}</p>
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {t("cta.button")}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
