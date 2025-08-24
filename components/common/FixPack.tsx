"use client";

import { useState } from "react";
import { AuditResult } from "../../lib/heuristics";

interface FixPackProps {
  isOpen: boolean;
  onClose: () => void;
  result: AuditResult;
}

interface FixItem {
  id: string;
  title: string;
  content: string;
  type: "title" | "meta" | "schema" | "links" | "images" | "general";
  priority: "high" | "medium" | "low";
}

export default function FixPack({ isOpen, onClose, result }: FixPackProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate fix items based on audit results
  const generateFixes = (): FixItem[] => {
    const fixes: FixItem[] = [];

    // Title optimization
    if (result.detected?.title) {
      const currentTitle = result.detected.title;
      if (currentTitle.length < 30) {
        fixes.push({
          id: "title-short",
          title: "Improve Title Length",
          content: `<!-- Current title is too short (${currentTitle.length} characters) -->
<!-- Recommended: 50-60 characters -->
<title>${currentTitle} - Complete Guide & Best Practices | Your Brand</title>`,
          type: "title",
          priority: "high",
        });
      } else if (currentTitle.length > 60) {
        fixes.push({
          id: "title-long",
          title: "Shorten Title Length",
          content: `<!-- Current title is too long (${currentTitle.length} characters) -->
<!-- Recommended: 50-60 characters -->
<title>${currentTitle.substring(0, 55)}...</title>`,
          type: "title",
          priority: "high",
        });
      }
    }

    // Meta description fixes
    if (!result.detected.meta_description) {
      fixes.push({
        id: "meta-missing",
        title: "Add Meta Description",
        content: `<!-- Add a compelling meta description -->
<meta name="description" content="${result.detected?.title || "Your Page Title"} - Learn about ${result.detected?.h1 || "this topic"} with expert insights, best practices, and actionable tips. Discover how to improve your results today." />`,
        type: "meta",
        priority: "high",
      });
    } else if (result.detected.meta_description.length < 120) {
      fixes.push({
        id: "meta-short",
        title: "Improve Meta Description",
        content: `<!-- Current meta description is too short (${result.detected.meta_description.length} characters) -->
<!-- Recommended: 150-160 characters -->
<meta name="description" content="${result.detected.meta_description} - Learn more about ${result.detected.h1 || "this topic"} with expert insights and actionable strategies for better results." />`,
        type: "meta",
        priority: "medium",
      });
    }

    // Schema markup
    if (result.scores?.schema < 80) {
      fixes.push({
        id: "schema-article",
        title: "Add Article Schema",
        content: `<!-- Add structured data for better search results -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${result.detected?.title || "Your Page Title"}",
  "description": "${result.detected.meta_description || "Page description"}",
  "image": "${result.url}/og-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Your Company Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company Name",
    "logo": {
      "@type": "ImageObject",
      "url": "${result.url}/logo.png"
    }
  },
  "datePublished": "${new Date().toISOString().split("T")[0]}",
  "dateModified": "${new Date().toISOString().split("T")[0]}"
}
</script>`,
        type: "schema",
        priority: "medium",
      });
    }

    // Internal linking suggestions
    if (result.detected.internal_links.length < 5) {
      fixes.push({
        id: "internal-links",
        title: "Add Internal Links",
        content: `<!-- Add relevant internal links to improve site structure -->
<!-- Example internal links to add: -->
<a href="/related-page-1">Related Topic 1</a>
<a href="/related-page-2">Related Topic 2</a>
<a href="/related-page-3">Related Topic 3</a>

<!-- Best practices: -->
<!-- - Use descriptive anchor text -->
<!-- - Link to relevant, high-quality pages -->
<!-- - Don't over-optimize with exact match keywords -->`,
        type: "links",
        priority: "medium",
      });
    }

    // Image alt text fixes
    const imagesMissingAlt = result.detected.images.filter((img) => !img.alt).length;
    if (imagesMissingAlt > 0) {
      fixes.push({
        id: "image-alt",
        title: "Add Missing Alt Text",
        content: `<!-- Add descriptive alt text to images -->
<!-- Replace generic alt attributes with descriptive ones: -->

<!-- Instead of: -->
<img src="image.jpg" alt="image" />

<!-- Use: -->
<img src="image.jpg" alt="${result.detected.h1 || "Relevant"} diagram showing key concepts and best practices" />

<!-- Alt text should: -->
<!-- - Be descriptive and relevant -->
<!-- - Include target keywords naturally -->
<!-- - Be under 125 characters -->
<!-- - Not start with "Image of" or "Picture of" -->`,
        type: "images",
        priority: "medium",
      });
    }

    // Canonical URL
    if (!result.detected.canonical) {
      fixes.push({
        id: "canonical",
        title: "Add Canonical URL",
        content: `<!-- Add canonical URL to prevent duplicate content issues -->
<link rel="canonical" href="${result.url}" />

<!-- Place this in the <head> section -->
<!-- This tells search engines this is the preferred version of the page -->`,
        type: "general",
        priority: "high",
      });
    }

    // Open Graph tags
    // Note: og_title is not in the detected interface, so we'll check if we need to add OG tags
    const needsOGTags = true; // You can add logic here to determine if OG tags are needed
    if (needsOGTags) {
      fixes.push({
        id: "og-tags",
        title: "Add Open Graph Tags",
        content: `<!-- Add Open Graph tags for better social media sharing -->
<meta property="og:title" content="${result.detected?.title || "Your Page Title"}" />
<meta property="og:description" content="${result.detected.meta_description || "Page description"}" />
<meta property="og:url" content="${result.url}" />
<meta property="og:type" content="article" />
<meta property="og:image" content="${result.url}/og-image.jpg" />
<meta property="og:site_name" content="Your Site Name" />

<!-- Add Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${result.detected?.title || "Your Page Title"}" />
<meta name="twitter:description" content="${result.detected.meta_description || "Page description"}" />
<meta name="twitter:image" content="${result.url}/twitter-image.jpg" />`,
        type: "general",
        priority: "medium",
      });
    }

    return fixes;
  };

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const copyAllFixes = async () => {
    const fixes = generateFixes();
    const allContent = fixes.map((fix) => `=== ${fix.title} ===\n${fix.content}\n`).join("\n");

    try {
      await navigator.clipboard.writeText(allContent);
      setCopiedId("all");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = allContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId("all");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "title":
        return "📝";
      case "meta":
        return "🏷️";
      case "schema":
        return "🔗";
      case "links":
        return "🔗";
      case "images":
        return "🖼️";
      case "general":
        return "⚙️";
      default:
        return "📄";
    }
  };

  const fixes = generateFixes();

  if (!isOpen) return null;

  return (
    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-accent-primary/30 animated-gradient-hover">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white/90 sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fix Pack</h2>
          <p className="text-sm text-gray-600">Copy-ready code snippets for implementation</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors text-3xl font-bold bg-white/80 rounded-full p-2 shadow-lg"
          aria-label="Close fix pack"
        >
          ×
        </button>
      </div>
      {/* Content */}
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
        {/* Summary */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Ready to Implement</h3>
              <p className="text-sm text-blue-700">
                {fixes.length} actionable fixes found for {result.url}
              </p>
            </div>
            <button
              onClick={copyAllFixes}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copiedId === "all" ? "Copied!" : "Copy All Fixes"}
            </button>
          </div>
        </div>
        {/* Fixes List */}
        <div className="space-y-4">
          {fixes.map((fix) => (
            <div key={fix.id} className="border rounded-lg overflow-hidden">
              {/* Fix Header */}
              <div className={`p-4 border-b ${getPriorityColor(fix.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getTypeIcon(fix.type)}</span>
                    <div>
                      <h4 className="font-semibold">{fix.title}</h4>
                      <p className="text-sm opacity-75">
                        Priority: {fix.priority.charAt(0).toUpperCase() + fix.priority.slice(1)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(fix.content, fix.id)}
                    className="px-3 py-1 bg-white border rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copiedId === fix.id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              {/* Fix Content */}
              <div className="p-4 bg-gray-50">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border overflow-x-auto">
                  {fix.content}
                </pre>
              </div>
            </div>
          ))}
        </div>
        {/* Empty State */}
        {fixes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Job!</h3>
            <p className="text-gray-600">
              No critical fixes needed. Your page is well optimized!
            </p>
          </div>
        )}
        {/* Implementation Tips */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Implementation Tips</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Start with high-priority fixes first</li>
            <li>• Test changes in a staging environment</li>
            <li>• Monitor search console after implementation</li>
            <li>• Re-run the audit after making changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
