"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface AuditRun {
  id: string;
  pageUrl: string;
  status: string;
  createdAt: string;
  hasResults: boolean;
}

interface UserDashboardProps {
  className?: string;
}

export default function UserDashboard({ className = "" }: UserDashboardProps) {
  const { data: session } = useSession();
  const [auditRuns, setAuditRuns] = useState<AuditRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserAudits();
    }
  }, [session?.user?.id]);

  const fetchUserAudits = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/audits`);
      if (response.ok) {
        const data = await response.json();
        setAuditRuns(data.runs || []);
      } else {
        setError("Failed to load audit history");
      }
    } catch (err) {
      setError("Failed to load audit history");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-green-600 bg-green-100";
      case "running":
        return "text-blue-600 bg-blue-100";
      case "queued":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!session) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user?.name?.split(" ")[0] || "User"}!
          </h2>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Audit History</h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchUserAudits}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : auditRuns.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No audits yet</p>
            <p className="text-sm text-gray-500">
              Start your first SEO audit to see your results here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {auditRuns.map((run) => (
              <motion.div
                key={run.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {run.pageUrl}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(run.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        run.status
                      )}`}
                    >
                      {run.status}
                    </span>
                    {run.hasResults && (
                      <a
                        href={`/audit/${run.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg transition-colors duration-200"
                      >
                        View Results
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">{auditRuns.length}</p>
            <p className="text-sm text-gray-600">Total Audits</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">
              {auditRuns.filter((run) => run.status === "ready").length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}