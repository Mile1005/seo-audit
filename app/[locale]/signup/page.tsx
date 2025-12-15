"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  User,
  Check,
  Crown,
  Zap,
  Star,
} from "lucide-react";
import { Link } from "@/lib/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { useTranslations } from "next-intl";
// ...existing code...

const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "10 SEO audits per month",
      "Basic crawling (5 pages)",
      "Performance insights",
      "Core Web Vitals",
      "Email support",
    ],
    icon: Star,
    color: "from-gray-500 to-gray-600",
    popular: false,
  },
  PRO: {
    name: "Pro",
    price: 29,
    description: "For growing businesses",
    features: [
      "100 SEO audits per month",
      "Advanced crawling (50 pages)",
      "Competitor analysis",
      "Custom reports",
      "Priority support",
      "Export to CSV/PDF",
    ],
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    popular: true,
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    features: [
      "Unlimited SEO audits",
      "Deep crawling (500+ pages)",
      "White-label reports",
      "API access",
      "Dedicated support",
      "Team collaboration",
    ],
    icon: Crown,
    color: "from-purple-500 to-pink-600",
    popular: false,
  },
};

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const tErrors = useTranslations("auth.errors");
  const params = useParams();
  const locale = params.locale as string;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("PRO");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    agreeToTerms: false,
  });
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      // For Google OAuth, let NextAuth handle the redirect automatically
      // This will redirect the user to Google's OAuth page
      await signIn("google", {
        callbackUrl: "/onboarding",
      });
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError("Failed to sign up with Google");
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (!formData.agreeToTerms) {
        setError("Please agree to the terms and conditions");
        return;
      }
      setError("");
      setCurrentStep(2);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Failed to create account");
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <MainLayout>
      {/* Server-rendered SEO content */}
      <div className="sr-only">
        <h2>AI SEO Turbo Pricing Plans</h2>
        <p>Choose from Free, Pro, or Enterprise plans to access advanced SEO auditing tools.</p>
        <h2>Account Registration</h2>
        <p>Create your account with secure authentication and start optimizing your website SEO.</p>
        <h2>SEO Tools Included</h2>
        <p>
          Access comprehensive SEO audit tools, keyword tracking, backlink analysis, and competitor
          insights.
        </p>
      </div>

      <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
        <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800 text-white relative">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-400"}`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 rounded ${currentStep >= 2 ? "bg-blue-600" : "bg-slate-700"}`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-400"}`}
              >
                2
              </div>
            </div>
          </div>
          {currentStep === 1 ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold mb-2" id="main-content">
                    Create Your Account <span aria-hidden>✨</span>
                  </h1>
                  <p className="text-gray-300">Join thousands of marketers boosting their SEO</p>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 py-3 px-4 rounded-xl font-medium hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 mb-6 min-h-[44px]"
                  aria-label="Sign up with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </motion.button>
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-gray-400 font-medium">
                      Or continue with email
                    </span>
                  </div>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  action="/api/auth/signup"
                  method="post"
                  className="space-y-4"
                  aria-label="Signup form"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        aria-hidden="true"
                      />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                        placeholder="John Doe"
                        aria-required="true"
                        aria-label="Full Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        aria-hidden="true"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                        placeholder="john@company.com"
                        aria-required="true"
                        aria-label="Email Address"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        aria-hidden="true"
                      />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-12 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                        placeholder="Minimum 8 characters"
                        aria-required="true"
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        aria-hidden="true"
                      />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                        placeholder="Confirm your password"
                        aria-required="true"
                        aria-label="Confirm Password"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                      Company (Optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder:text-gray-500"
                      placeholder="Your company name"
                      aria-label="Company"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-700 rounded"
                      aria-checked={formData.agreeToTerms}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    aria-label="Continue to Plan Selection"
                  >
                    Continue to Plan Selection
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Sign in →
                    </Link>
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white h-full">
                  <h2 className="text-2xl font-bold mb-6">Why Choose AI SEO Turbo?</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Real-time SEO Analysis</h3>
                        <p className="text-blue-100 text-sm">
                          Get instant insights powered by Google PageSpeed Insights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Advanced Site Crawling</h3>
                        <p className="text-blue-100 text-sm">
                          Discover technical issues across your entire website
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Actionable Recommendations</h3>
                        <p className="text-blue-100 text-sm">
                          Get specific steps to improve your search rankings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Professional Reports</h3>
                        <p className="text-blue-100 text-sm">
                          Export beautiful reports for clients and stakeholders
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white/10 rounded-lg">
                    <p className="text-sm text-blue-100">
                      <span className="font-semibold">Join 1,000+</span> marketers who've improved
                      their SEO with our tool
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Plan</h2>
                <p className="text-gray-300">Select the perfect plan for your SEO needs</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {Object.entries(PLANS).map(([key, plan]) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlan(key)}
                      className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                        selectedPlan === key
                          ? "border-blue-500 bg-blue-900/30"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                      tabIndex={0}
                      aria-pressed={selectedPlan === key}
                      aria-label={`Select ${plan.name} plan`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-300">/month</span>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-slate-800 text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-slate-700 transition-all duration-200"
                  aria-label="Back to registration"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFormSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  aria-label="Create Account"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section - Only show on step 1 */}
      {currentStep === 1 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Start Your SEO Journey Today</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of marketers and businesses who trust AI SEO Turbo to optimize their
              websites and improve search rankings.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Setup</h3>
              <p className="text-gray-400 text-sm">
                Get started in minutes with our simple onboarding process and immediate access to
                all features.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-lg font-semibold text-white mb-2">No Credit Card</h3>
              <p className="text-gray-400 text-sm">
                Start with our free plan - no credit card required. Upgrade anytime when you're
                ready to scale.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cancel Anytime</h3>
              <p className="text-gray-400 text-sm">
                No long-term contracts or commitments. Cancel your subscription anytime with just
                one click.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">
                Get help whenever you need it with our responsive support team and extensive
                documentation.
              </p>
            </div>
          </div>

          {/* What You'll Get Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Everything You Need to Succeed</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">AI-Powered SEO Analysis</h3>
                  <p className="text-gray-400 text-sm">
                    Get intelligent insights and recommendations powered by advanced machine
                    learning algorithms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Technical SEO Audits</h3>
                  <p className="text-gray-400 text-sm">
                    Comprehensive website crawling to identify broken links, duplicate content, and
                    technical issues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Keyword Research Tools</h3>
                  <p className="text-gray-400 text-sm">
                    Discover high-value keywords, track rankings, and identify content opportunities
                    to drive traffic.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Competitor Analysis</h3>
                  <p className="text-gray-400 text-sm">
                    Analyze competitor strategies, backlink profiles, and keyword targeting to stay
                    ahead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Backlink Monitoring</h3>
                  <p className="text-gray-400 text-sm">
                    Track your backlink profile, identify toxic links, and discover new
                    link-building opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Performance Tracking</h3>
                  <p className="text-gray-400 text-sm">
                    Monitor page speed, Core Web Vitals, and mobile usability for optimal user
                    experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Content Optimization</h3>
                  <p className="text-gray-400 text-sm">
                    Get recommendations to optimize your content for target keywords and improve
                    readability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">White-Label Reports</h3>
                  <p className="text-gray-400 text-sm">
                    Generate professional, branded SEO reports in PDF format for clients and
                    stakeholders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">API Access</h3>
                  <p className="text-gray-400 text-sm">
                    Integrate SEO data into your existing tools and workflows with our powerful REST
                    API.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Join Successful Companies</h2>
              <p className="text-gray-300">
                See how businesses like yours are achieving SEO success
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-3xl font-bold text-blue-400">157%</div>
                  <div className="text-sm text-gray-400">increase</div>
                </div>
                <p className="text-white font-semibold mb-2">Organic Traffic Growth</p>
                <p className="text-gray-400 text-sm">
                  "AI SEO Turbo helped us identify and fix critical issues that were holding back
                  our rankings. Within 3 months, our organic traffic more than doubled."
                </p>
                <p className="text-blue-400 text-sm mt-3 font-medium">
                  - Sarah M., Marketing Director
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-3xl font-bold text-green-400">$50K+</div>
                  <div className="text-sm text-gray-400">saved</div>
                </div>
                <p className="text-white font-semibold mb-2">Agency Cost Reduction</p>
                <p className="text-gray-400 text-sm">
                  "We replaced expensive agency fees with AI SEO Turbo and got better results. The
                  platform pays for itself many times over."
                </p>
                <p className="text-green-400 text-sm mt-3 font-medium">
                  - Mike Chen, E-commerce Owner
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-3xl font-bold text-purple-400">#1</div>
                  <div className="text-sm text-gray-400">rankings</div>
                </div>
                <p className="text-white font-semibold mb-2">Top Position Achieved</p>
                <p className="text-gray-400 text-sm">
                  "Using the keyword research and content optimization tools, we achieved #1
                  rankings for our most valuable keywords in competitive industries."
                </p>
                <p className="text-purple-400 text-sm mt-3 font-medium">
                  - Jessica T., SEO Consultant
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
