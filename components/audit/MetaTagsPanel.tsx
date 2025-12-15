"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Code, AlertTriangle, CheckCircle, Copy, Check } from "lucide-react";
import { AuditResultUnified } from "../../lib/types/audit";
import { GlassCard } from "../ui/GlassCard";

interface Props {
  result: AuditResultUnified;
}
export const MetaTagsPanel = ({ result }: Props) => {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const titleLength = result.pageData.title.length;
  const descLength = result.pageData.metaDescription.length;

  const copyToClipboard = (text: string, type: "title" | "desc") => {
    navigator.clipboard.writeText(text);
    if (type === "title") {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    }
  };

  return (
    <GlassCard hover>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8">
          <Code className="h-5 w-5 text-sky-300" />
        </span>
        <div>
          <div className="text-lg font-semibold text-white">SEO Meta Information</div>
          <div className="text-sm text-white/60">Title tag and meta description quality</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                {titleLength > 0 && titleLength <= 60 ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                )}
              </motion.div>
              <Label className="text-base font-bold text-white">
                Title Tag ({titleLength} characters)
              </Label>
            </div>
            {result.pageData.title && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(result.pageData.title, "title")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Copy to clipboard"
              >
                {copiedTitle ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-sky-300" />
                )}
              </motion.button>
            )}
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 group-hover:bg-white/8 transition-colors">
            <p className="text-sm text-white/80 font-medium">
              {result.pageData.title || "No title found"}
            </p>
          </div>
          {titleLength > 60 && (
            <div className="mt-3 p-2 rounded border border-white/10 bg-white/5">
              <p className="text-sm text-amber-300 font-medium">
                ⚠️ Title exceeds 60 characters - may be truncated in search results
              </p>
            </div>
          )}
          {titleLength === 0 && (
            <div className="mt-3 p-2 rounded border border-white/10 bg-white/5">
              <p className="text-sm text-rose-300 font-medium">
                🔴 Missing title tag - critical for SEO
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                {descLength > 0 && descLength <= 160 ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                )}
              </motion.div>
              <Label className="text-base font-bold text-white">
                Meta Description ({descLength} characters)
              </Label>
            </div>
            {result.pageData.metaDescription && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(result.pageData.metaDescription, "desc")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Copy to clipboard"
              >
                {copiedDesc ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-sky-300" />
                )}
              </motion.button>
            )}
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 group-hover:bg-white/8 transition-colors">
            <p className="text-sm text-white/80 font-medium">
              {result.pageData.metaDescription || "No meta description found"}
            </p>
          </div>
          {descLength > 160 && (
            <div className="mt-3 p-2 rounded border border-white/10 bg-white/5">
              <p className="text-sm text-amber-300 font-medium">
                ⚠️ Description exceeds 160 characters - may be truncated in search results
              </p>
            </div>
          )}
          {descLength === 0 && (
            <div className="mt-3 p-2 rounded border border-white/10 bg-white/5">
              <p className="text-sm text-rose-300 font-medium">
                🔴 Missing meta description - important for click-through rates
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </GlassCard>
  );
};
