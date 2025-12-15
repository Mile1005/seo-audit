"use client";

import { MainLayout } from "@/components/layout/main-layout";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import PerformanceContent from "./PerformanceContent";

export default function PerformanceTranslatedPage() {
  const t = useTranslations("help.categories.troubleshooting.articles.performance");

  return <PerformanceContent />;
}
