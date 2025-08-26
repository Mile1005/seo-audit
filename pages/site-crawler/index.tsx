"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import EnhancedHeader from "../../components/layout/EnhancedHeader";
import Footer from "../../components/layout/Footer";

export const dynamic = 'force-dynamic';

export default function SiteCrawlerPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({});
  const [crawlId, setCrawlId] = useState<string | null>(null);
  const [crawlResult, setCrawlResult] = useState<any>(null);
  const [crawlStatus, setCrawlStatus] = useState<string | null>(null);
  const [crawlError, setCrawlError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const validateForm = () => {
    const newErrors: { url?: string; email?: string } = {};

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!url.match(/^https?:\/\/.+/)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsCrawling(true);
    setCrawlError(null);
    setCrawlResult(null);
    setCrawlStatus(null);
    setCrawlId(null);
    try {
      const response = await fetch("/api/crawl/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startUrl: url.trim(), limit: 30 }),
      });
      const data = await response.json();
      if (response.ok && data.crawlId) {
        setCrawlId(data.crawlId);
        pollCrawlStatus(data.crawlId);
      } else {
        setCrawlError(data.error || "Failed to start crawl");
        setIsCrawling(false);
      }
    } catch (error) {
      setCrawlError("Network error. Please try again.");
      setIsCrawling(false);
    }
  };

  const pollCrawlStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/crawl/get?id=${id}`);
      const data = await response.json();
      setCrawlStatus(data.status);
      if (response.ok && data.status === "ready" && data.result) {
        setCrawlResult(data.result);
        setIsCrawling(false);
        setCrawlStatus("ready");
        setCrawlId(id);
      } else if (data.status === "failed") {
        setCrawlError("Crawl failed.");
        setIsCrawling(false);
      } else if (data.status === "queued" || data.status === "running") {
        pollingRef.current = setTimeout(() => pollCrawlStatus(id), 2000);
      }
    } catch {
      setCrawlError("Failed to get crawl status.");
      setIsCrawling(false);
    }
  };

  const handleExport = async (format: "csv" | "json") => {
    if (!crawlId) return;
    const url = `/api/crawl/export?id=${crawlId}&format=${format}`;
    window.open(url, "_blank");
  };

  const handleShowDetails = (page: any) => {
    setSelectedPage(page);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPage(null);
  };

  if (isCrawling || crawlStatus === "queued" || crawlStatus === "running") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <EnhancedHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-12"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Crawling Website</h2>
                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Analyzing Site Structure</div>
                  <div className="bg-white rounded border p-4">
                    <div className="text-lg font-medium text-gray-900 truncate">
                      {url}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-gray-500">Site Map Preview</div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Crawling in progress...</h3>
                <div className="flex justify-center mb-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Discovering pages and analyzing your website structure...
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Discovering pages...</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Analyzing internal links...</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Checking for broken links...</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Generating sitemap...</span>
                </div>
              </div>
              {crawlStatus && (
                <div className="mt-8 text-gray-500">Status: {crawlStatus}</div>
              )}
              {crawlError && (
                <div className="mt-8 text-red-600 font-semibold">{crawlError}</div>
              )}
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (crawlResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <EnhancedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Crawl Results</h1>
                <p className="text-gray-600">{crawlResult.totalPages} pages crawled. Average load time: {Math.round(crawlResult.averageLoadTime)} ms</p>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button onClick={() => handleExport("csv")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">
                  Export CSV
                </button>
                <button onClick={() => handleExport("json")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold shadow">
                  Export JSON
                </button>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 border">URL</th>
                    <th className="px-2 py-2 border">Status</th>
                    <th className="px-2 py-2 border">Title</th>
                    <th className="px-2 py-2 border">H1</th>
                    <th className="px-2 py-2 border">Word Count</th>
                    <th className="px-2 py-2 border">Images Missing Alt</th>
                    <th className="px-2 py-2 border">Noindex</th>
                    <th className="px-2 py-2 border">Canonical</th>
                    <th className="px-2 py-2 border">Meta Description</th>
                    <th className="px-2 py-2 border">Internal Links</th>
                    <th className="px-2 py-2 border">External Links</th>
                    <th className="px-2 py-2 border">Load Time (ms)</th>
                    <th className="px-2 py-2 border">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {crawlResult.pages.map((page: any, idx: number) => (
                    <tr key={page.url} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleShowDetails(page)}>
                      <td className="px-2 py-1 border text-blue-700 underline max-w-xs truncate" title={page.url}>{page.url}</td>
                      <td className={`px-2 py-1 border ${page.status === 200 ? 'text-green-600' : 'text-red-600'}`}>{page.status}</td>
                      <td className="px-2 py-1 border max-w-xs truncate" title={page.title}>{page.title}</td>
                      <td className="px-2 py-1 border">{page.h1_presence ? "Yes" : "No"}</td>
                      <td className="px-2 py-1 border">{page.word_count}</td>
                      <td className={`px-2 py-1 border ${page.images_missing_alt > 0 ? 'text-orange-600 font-bold' : ''}`}>{page.images_missing_alt}</td>
                      <td className={`px-2 py-1 border ${page.noindex ? 'text-orange-600 font-bold' : ''}`}>{page.noindex ? "Yes" : "No"}</td>
                      <td className="px-2 py-1 border max-w-xs truncate" title={page.canonical}>{page.canonical}</td>
                      <td className="px-2 py-1 border max-w-xs truncate" title={page.meta_description}>{page.meta_description}</td>
                      <td className="px-2 py-1 border">{page.internal_links}</td>
                      <td className="px-2 py-1 border">{page.external_links}</td>
                      <td className="px-2 py-1 border">{page.load_time_ms}</td>
                      <td className="px-2 py-1 border text-red-600">{page.error || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Details Modal */}
            {showDetails && selectedPage && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={handleCloseDetails}>&times;</button>
                  <h2 className="text-2xl font-bold mb-4">Page Details</h2>
                  <div className="space-y-2 text-sm">
                    <div><b>URL:</b> {selectedPage.url}</div>
                    <div><b>Status:</b> {selectedPage.status}</div>
                    <div><b>Title:</b> {selectedPage.title}</div>
                    <div><b>H1 Present:</b> {selectedPage.h1_presence ? "Yes" : "No"}</div>
                    <div><b>Word Count:</b> {selectedPage.word_count}</div>
                    <div><b>Images Missing Alt:</b> {selectedPage.images_missing_alt}</div>
                    <div><b>Noindex:</b> {selectedPage.noindex ? "Yes" : "No"}</div>
                    <div><b>Canonical:</b> {selectedPage.canonical}</div>
                    <div><b>Meta Description:</b> {selectedPage.meta_description}</div>
                    <div><b>Internal Links:</b> {selectedPage.internal_links}</div>
                    <div><b>External Links:</b> {selectedPage.external_links}</div>
                    <div><b>Load Time (ms):</b> {selectedPage.load_time_ms}</div>
                    <div><b>Error:</b> {selectedPage.error || "None"}</div>
                    <div><b>Open Graph:</b> <pre className="bg-gray-100 rounded p-2 overflow-x-auto">{JSON.stringify(selectedPage.og, null, 2)}</pre></div>
                    <div><b>Twitter Card:</b> <pre className="bg-gray-100 rounded p-2 overflow-x-auto">{JSON.stringify(selectedPage.twitter, null, 2)}</pre></div>
                    <div><b>Structured Data:</b> <pre className="bg-gray-100 rounded p-2 overflow-x-auto">{JSON.stringify(selectedPage.structuredData, null, 2)}</pre></div>
                  </div>
                </div>
              </div>
            )}
            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">SEO Issues</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Noindex pages: <b>{crawlResult.issues.noindex_pages}</b></li>
                  <li>Missing titles: <b>{crawlResult.issues.missing_titles}</b></li>
                  <li>Missing H1: <b>{crawlResult.issues.missing_h1}</b></li>
                  <li>Missing meta descriptions: <b>{crawlResult.issues.missing_meta_descriptions}</b></li>
                  <li>Images without alt: <b>{crawlResult.issues.images_without_alt}</b></li>
                  <li>Pages without canonical: <b>{crawlResult.issues.pages_without_canonical}</b></li>
                  <li>Broken links: <b>{crawlResult.issues.broken_links}</b></li>
                  <li>Duplicate titles: <b>{crawlResult.issues.duplicate_titles.length}</b></li>
                  <li>Duplicate canonicals: <b>{crawlResult.issues.duplicate_canonicals.length}</b></li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Crawl Info</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Start URL: <b>{crawlResult.startUrl}</b></li>
                  <li>Total pages: <b>{crawlResult.totalPages}</b></li>
                  <li>Successful: <b>{crawlResult.successfulPages}</b></li>
                  <li>Failed: <b>{crawlResult.failedPages}</b></li>
                  <li>Average load time: <b>{Math.round(crawlResult.averageLoadTime)} ms</b></li>
                  <li>Crawl time: <b>{Math.round(crawlResult.crawlTime / 1000)}s</b></li>
                  <li>Robots.txt: <b>{crawlResult.robotsTxt.found ? "Found" : "Not found"}</b></li>
                  <li>Sitemap.xml: <b>{crawlResult.sitemapXml.found ? "Found" : "Not found"}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
