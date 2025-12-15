"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon, CheckCircle, XCircle, Copy, Check } from "lucide-react";
import { ComprehensiveResults } from "../../lib/types/audit";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "@/lib/utils";

interface Props {
  social: ComprehensiveResults["social_meta"];
}
export const SocialMetaPanel = ({ social }: Props) => {
  const entries = [
    ["og:title", social.og_title],
    ["og:description", social.og_description],
    ["og:image", social.og_image],
    ["twitter:card", social.twitter_card],
    ["twitter:title", social.twitter_title],
    ["twitter:description", social.twitter_description],
  ];
  const openGraphComplete = entries.slice(0, 3).every(([_, v]) => v);
  const twitterComplete = entries.slice(3).every(([_, v]) => v);

  const statusClass = (complete: boolean) =>
    cn(
      "px-3 py-1 rounded-full text-xs font-medium border",
      "bg-white/8 border-white/10",
      complete ? "text-emerald-300" : "text-amber-300"
    );

  return (
    <GlassCard hover>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8">
          <LinkIcon className="h-5 w-5 text-sky-300" />
        </span>
        <div>
          <div className="text-lg font-semibold text-white">Social Media Meta Tags</div>
          <div className="text-sm text-white/60">Open Graph and X (Twitter) previews</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Open Graph Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.597 0 0 .596 0 1.326v21.348C0 23.404.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.404 24 22.674V1.326C24 .596 23.403 0 22.675 0" />
              </svg>
              Open Graph
            </h4>
            <div className={statusClass(openGraphComplete)}>
              {openGraphComplete ? "✓ Complete" : "⚠ Incomplete"}
            </div>
          </div>
          <div className="space-y-2">
            {entries.slice(0, 3).map(([k, v], index) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {v ? (
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                    )}
                  </motion.div>
                  <span className="font-medium text-white">{k}</span>
                </div>
                <span
                  className={`text-sm font-medium truncate max-w-[250px] text-right ${
                    v ? "text-white/65" : "text-white/45"
                  }`}
                >
                  {v || "Missing"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* X (Twitter) Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-sky-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </h4>
            <div className={statusClass(twitterComplete)}>
              {twitterComplete ? "✓ Complete" : "⚠ Incomplete"}
            </div>
          </div>
          <div className="space-y-2">
            {entries.slice(3).map(([k, v], index) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + 3) * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {v ? (
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                    )}
                  </motion.div>
                  <span className="font-medium text-white">{k}</span>
                </div>
                <span
                  className={`text-sm font-medium truncate max-w-[250px] text-right ${
                    v ? "text-white/65" : "text-white/45"
                  }`}
                >
                  {v || "Missing"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
