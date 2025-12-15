"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

// Traffic Growth Chart - Shows before/after SEO audit impact
interface TrafficData {
  month: string;
  before: number;
  after: number;
}

export function TrafficGrowthChart() {
  const data: TrafficData[] = [
    { month: "Jan", before: 1200, after: 1200 },
    { month: "Feb", before: 1350, after: 1800 },
    { month: "Mar", before: 1100, after: 2400 },
    { month: "Apr", before: 1500, after: 3200 },
    { month: "May", before: 1250, after: 4100 },
    { month: "Jun", before: 1400, after: 5200 },
  ];

  const averageIncrease = (
    ((data[data.length - 1].after - data[0].before) / data[0].before) *
    100
  ).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 p-6 bg-slate-900/50 border border-slate-800 rounded-lg"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">Traffic Growth After SEO Audit</h3>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-bold">+{averageIncrease}%</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Comparison of organic traffic before and after implementing audit recommendations
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Area
            type="monotone"
            dataKey="before"
            stroke="#64748b"
            fillOpacity={1}
            fill="url(#colorBefore)"
            name="Before Audit"
          />
          <Area
            type="monotone"
            dataKey="after"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorAfter)"
            name="After Audit"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Starting Traffic</p>
          <p className="text-lg font-bold text-white">{data[0].before.toLocaleString()}/mo</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Current Traffic</p>
          <p className="text-lg font-bold text-green-400">
            {data[data.length - 1].after.toLocaleString()}/mo
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Audit Impact Chart - Shows which audit areas had the biggest impact
interface ImpactData {
  category: string;
  improvement: number;
  issues: number;
}

export function AuditImpactChart() {
  const data: ImpactData[] = [
    { category: "Technical SEO", improvement: 85, issues: 12 },
    { category: "Page Speed", improvement: 72, issues: 8 },
    { category: "Mobile UX", improvement: 68, issues: 6 },
    { category: "Content Quality", improvement: 55, issues: 15 },
    { category: "On-Page SEO", improvement: 48, issues: 9 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 p-6 bg-slate-900/50 border border-slate-800 rounded-lg"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Audit Category Impact</h3>
        <p className="text-gray-400 text-sm">
          Performance improvement by audit category (percentage of issues resolved)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="category" type="category" stroke="#94a3b8" width={120} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Bar dataKey="improvement" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Improvement" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-300 mb-1">Key Insight</p>
            <p className="text-sm text-gray-300">
              Technical SEO improvements typically deliver the highest ROI, addressing foundational
              issues that impact all other optimization efforts.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Core Web Vitals Chart - Shows performance metrics improvement
interface WebVitalsData {
  metric: string;
  before: number;
  after: number;
  threshold: number;
}

export function CoreWebVitalsChart() {
  const data: WebVitalsData[] = [
    { metric: "LCP (s)", before: 4.2, after: 1.8, threshold: 2.5 },
    { metric: "FID (ms)", before: 280, after: 45, threshold: 100 },
    { metric: "CLS", before: 0.28, after: 0.05, threshold: 0.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 p-6 bg-slate-900/50 border border-slate-800 rounded-lg"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Core Web Vitals Improvement</h3>
        <p className="text-gray-400 text-sm">Before and after optimization (lower is better)</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="metric" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Bar dataKey="before" fill="#ef4444" name="Before" radius={[4, 4, 0, 0]} />
          <Bar dataKey="after" fill="#10b981" name="After" radius={[4, 4, 0, 0]} />
          <Bar dataKey="threshold" fill="#f59e0b" name="Threshold" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 bg-slate-800/50 rounded-lg text-center">
          <p className="text-xs text-gray-400 mb-1">LCP</p>
          <p className="text-lg font-bold text-green-400">57% ↓</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg text-center">
          <p className="text-xs text-gray-400 mb-1">FID</p>
          <p className="text-lg font-bold text-green-400">84% ↓</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg text-center">
          <p className="text-xs text-gray-400 mb-1">CLS</p>
          <p className="text-lg font-bold text-green-400">82% ↓</p>
        </div>
      </div>
    </motion.div>
  );
}

// SEO Progress Timeline - Shows progress over audit implementation
interface TimelineData {
  week: string;
  issues: number;
  resolved: number;
}

export function SEOProgressTimeline() {
  const data: TimelineData[] = [
    { week: "Week 1", issues: 47, resolved: 0 },
    { week: "Week 2", issues: 47, resolved: 12 },
    { week: "Week 3", issues: 47, resolved: 23 },
    { week: "Week 4", issues: 47, resolved: 31 },
    { week: "Week 5", issues: 47, resolved: 39 },
    { week: "Week 6", issues: 47, resolved: 45 },
    { week: "Week 7", issues: 47, resolved: 47 },
  ];

  const completionRate = (
    (data[data.length - 1].resolved / data[data.length - 1].issues) *
    100
  ).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12 p-6 bg-slate-900/50 border border-slate-800 rounded-lg"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">Implementation Progress</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Completion:</span>
            <span className="text-lg font-bold text-green-400">{completionRate}%</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Typical timeline for implementing 47-point SEO audit
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="week" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Line
            type="monotone"
            dataKey="issues"
            stroke="#64748b"
            strokeWidth={2}
            dot={{ fill: "#64748b", r: 4 }}
            name="Total Issues"
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 5 }}
            name="Resolved"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-green-600/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-semibold">Recommended Timeline</span>
        </div>
        <p className="text-sm text-gray-300">
          Most sites complete a full audit implementation in 6-8 weeks when dedicating 10-15 hours
          per week. Prioritizing high-impact technical issues first accelerates results.
        </p>
      </div>
    </motion.div>
  );
}
