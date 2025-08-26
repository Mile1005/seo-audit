"use client";

import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import EnhancedHeader from "../../components/layout/EnhancedHeader";
import Footer from "../../components/layout/Footer";

export const dynamic = 'force-dynamic';

export default function SiteCrawlerPage() {
  // DEBUG: Always render something to avoid blank page
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("SiteCrawlerPage loaded");
  }
  // const router = useRouter();
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

  // Cleanup polling on component unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

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
      
      if (response.ok) {
        if (data.status === "completed" && data.result) {
          setCrawlResult(data.result);
          setIsCrawling(false);
          setCrawlStatus("completed");
          setCrawlId(id);
          if (pollingRef.current) {
            clearTimeout(pollingRef.current);
            pollingRef.current = null;
          }
        } else if (data.status === "failed") {
          setCrawlError(data.error || "Crawl failed");
          setIsCrawling(false);
          if (pollingRef.current) {
            clearTimeout(pollingRef.current);
            pollingRef.current = null;
          }
        } else if (data.status === "processing") {
          // Continue polling for processing status
          pollingRef.current = setTimeout(() => pollCrawlStatus(id), 3000);
        }
      } else {
        setCrawlError("Failed to get crawl status");
        setIsCrawling(false);
      }
    } catch (error) {
      setCrawlError("Network error while checking crawl status");
      setIsCrawling(false);
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
        pollingRef.current = null;
      }
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

  if (isCrawling || crawlStatus === "processing") {
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
            {/* Superior Results Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Page Analysis Results</h3>
                <p className="text-sm text-gray-600 mt-1">Click any row to view detailed information</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>🔗</span>
                          <span>URL</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>📊</span>
                          <span>Status</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>📝</span>
                          <span>Title</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>📋</span>
                          <span>H1</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>🖼️</span>
                          <span>Images</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>🚫</span>
                          <span>Noindex</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>📄</span>
                          <span>Meta Desc</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>🔗</span>
                          <span>Links</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                        <div className="flex items-center space-x-1">
                          <span>⚡</span>
                          <span>Load Time</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {crawlResult.pages.map((page: any, idx: number) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 group" 
                        onClick={() => handleShowDetails(page)}
                      >
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${page.statusCode === 200 ? 'bg-green-400' : page.statusCode >= 400 ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
                            <span className="text-blue-600 font-medium truncate max-w-xs group-hover:text-blue-800">{page.url}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            page.statusCode === 200 ? 'bg-green-100 text-green-800' : 
                            page.statusCode >= 400 ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {page.statusCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="truncate max-w-xs">
                            <span className="text-gray-900 font-medium">{page.title}</span>
                            {!page.title && <span className="text-red-500 italic">Missing Title</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            page.h1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {page.h1 ? "✓ Present" : "✗ Missing"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-900">{page.images_without_alt || 0}</span>
                            {(page.images_without_alt || 0) > 0 && (
                              <span className="text-red-500 text-xs">⚠️</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            page.noindex ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {page.noindex ? "🚫 Yes" : "✓ No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="truncate max-w-xs">
                            {page.meta_description ? (
                              <span className="text-gray-900">{page.meta_description.substring(0, 50)}...</span>
                            ) : (
                              <span className="text-red-500 italic">Missing</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-3">
                            <div className="flex items-center space-x-1">
                              <span className="text-green-600">↗️</span>
                              <span className="text-gray-900">{page.internal_links || 0}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-blue-600">🔗</span>
                              <span className="text-gray-900">{page.external_links || 0}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              page.load_time_ms < 200 ? 'bg-green-400' : 
                              page.load_time_ms < 500 ? 'bg-yellow-400' : 
                              'bg-red-400'
                            }`}></div>
                            <span className="text-gray-900 font-mono">{page.load_time_ms}ms</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            {/* Enhanced Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SEO Issues Card */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚨</span>
                  </div>
                  <h3 className="font-bold text-lg text-red-900">SEO Issues</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🚫 Noindex pages</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.noindex_pages > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.noindex_pages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">📝 Missing titles</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.missing_titles > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.missing_titles}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">📋 Missing H1</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.missing_h1 > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.missing_h1}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">📄 Missing meta descriptions</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.missing_meta_descriptions > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.missing_meta_descriptions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🖼️ Images without alt</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.images_without_alt > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.images_without_alt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🔗 Broken links</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${crawlResult.issues.broken_links > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {crawlResult.issues.broken_links}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <h3 className="font-bold text-lg text-blue-900">Performance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">📊 Total pages</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {crawlResult.totalPages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">✅ Successful</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {crawlResult.successfulPages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">❌ Failed</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {crawlResult.failedPages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">⚡ Avg load time</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      crawlResult.averageLoadTime < 200 ? 'bg-green-100 text-green-800' :
                      crawlResult.averageLoadTime < 500 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {Math.round(crawlResult.averageLoadTime)}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">⏱️ Crawl time</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {Math.round(crawlResult.crawlTime / 1000)}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical SEO Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔧</span>
                  </div>
                  <h3 className="font-bold text-lg text-green-900">Technical SEO</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🌐 Start URL</span>
                    <span className="text-xs text-blue-600 max-w-[120px] truncate" title={crawlResult.startUrl}>
                      {crawlResult.startUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🤖 Robots.txt</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crawlResult.robotsTxt.found ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {crawlResult.robotsTxt.found ? "✓ Found" : "✗ Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🗺️ Sitemap.xml</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crawlResult.sitemapXml.found ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {crawlResult.sitemapXml.found ? "✓ Found" : "✗ Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">📋 Duplicate titles</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crawlResult.issues.duplicate_titles.length > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {crawlResult.issues.duplicate_titles.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">🔗 Duplicate canonicals</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      crawlResult.issues.duplicate_canonicals.length > 0 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {crawlResult.issues.duplicate_canonicals.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main form UI (this was missing!)
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">SEO Site Crawler</h1>
              <p className="text-lg text-gray-600">Analyze your website's structure, SEO, and performance</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {crawlError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{crawlError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isCrawling}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                {isCrawling ? "Starting Crawl..." : "Start SEO Crawl"}
              </button>
            </form>

            <div className="mt-8 text-sm text-gray-500">
              <p>We'll crawl up to 30 pages and analyze SEO factors, performance, and structure.</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );

  // Fallback: If nothing else rendered, show a message
  return (
    <div style={{ padding: 40, textAlign: 'center', color: '#333' }}>
      <h1>SEO Site Crawler</h1>
      <p>If you see this message, the main UI did not render. Please check your API endpoints and environment variables.</p>
      <p>Try opening <code>/api/crawl/start</code> and <code>/api/crawl/get</code> directly in your browser to check for errors.</p>
    </div>
  );
}
