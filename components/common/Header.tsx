"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">SEO Audit</span>
            </motion.div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : session ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {session.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <span className="text-sm text-gray-600">Welcome, Guest</span>
                <div className="flex items-center space-x-2">
                  <a
                    href="/auth/signin"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                  >
                    Sign In
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href="/auth/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Register
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}