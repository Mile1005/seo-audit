"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const logos = [
  { name: "Shopify Stores", width: "120px" },
  { name: "Local Businesses", width: "130px" },
  { name: "E-commerce Brands", width: "140px" },
  { name: "Marketing Agencies", width: "140px" },
  { name: "SaaS Companies", width: "120px" },
  { name: "Content Publishers", width: "130px" },
];

// CSS animation style for better performance (runs on GPU)
const carouselStyle = `
  @keyframes carousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .carousel-container {
    animation: carousel 30s linear infinite;
  }
  
  .carousel-container:hover {
    animation-play-state: paused;
  }
`;

export function TrustLogos() {
  const t = useTranslations("home");
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-slate-950/50 border-t border-slate-800/50">
      <style>{carouselStyle}</style>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            {t("trustedBy", { count: "1,000" }).replace("1,000+", "").trim()}
          </h2>
        </motion.div>

        {/* Animated Logo Carousel - Using CSS for better performance */}
        <div className="relative overflow-hidden">
          <div className="flex items-center carousel-container" style={{ width: "200%" }}>
            <div className="flex items-center space-x-8">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 group"
                  style={{ width: logo.width } as React.CSSProperties}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center h-12 opacity-60 group-hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ width: logo.width } as React.CSSProperties}
                  >
                    <div className="w-full h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded flex items-center justify-center text-xs font-semibold text-white">
                      {logo.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mt-8 text-center"
        >
          {/* Users Count */}
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs font-semibold text-white"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              <span className="text-blue-400 font-semibold">{t("trustLogos.marketersText")}</span>{" "}
              {t("trustLogos.trustText")}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">
              <span className="text-white font-semibold">{t("trustLogos.ratingText")}</span>{" "}
              {t("trustLogos.ratingLabel")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
