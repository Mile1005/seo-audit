import React from "react";

interface PerformanceData {
  lcp: number | null; // Largest Contentful Paint (seconds)
  cls: number | null; // Cumulative Layout Shift
  inp: number | null; // Interaction to Next Paint (milliseconds)
  notes: string[];
}

interface PerformancePanelProps {
  performance: PerformanceData;
}

export default function PerformancePanel({ performance }: PerformancePanelProps) {
  const getLCPStatus = (lcp: number | null) => {
    if (lcp === null) return { status: "unknown", color: "text-gray-500", label: "Not available" };
    if (lcp <= 2.5) return { status: "good", color: "text-green-600", label: "Good" };
    if (lcp <= 4.0) return { status: "needs-improvement", color: "text-yellow-600", label: "Needs improvement" };
    return { status: "poor", color: "text-red-600", label: "Poor" };
  };

  const getCLSStatus = (cls: number | null) => {
    if (cls === null) return { status: "unknown", color: "text-gray-500", label: "Not available" };
    if (cls <= 0.1) return { status: "good", color: "text-green-600", label: "Good" };
    if (cls <= 0.25) return { status: "needs-improvement", color: "text-yellow-600", label: "Needs improvement" };
    return { status: "poor", color: "text-red-600", label: "Poor" };
  };

  const getINPStatus = (inp: number | null) => {
    if (inp === null) return { status: "unknown", color: "text-gray-500", label: "Not available" };
    if (inp <= 200) return { status: "good", color: "text-green-600", label: "Good" };
    if (inp <= 500) return { status: "needs-improvement", color: "text-yellow-600", label: "Needs improvement" };
    return { status: "poor", color: "text-red-600", label: "Poor" };
  };

  const lcpStatus = getLCPStatus(performance.lcp);
  const clsStatus = getCLSStatus(performance.cls);
  const inpStatus = getINPStatus(performance.inp);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* LCP */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">LCP</h4>
            <span className={`text-sm font-medium ${lcpStatus.color}`}>
              {lcpStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performance.lcp !== null ? `${performance.lcp.toFixed(2)}s` : "—"}
          </div>
          <div className="text-sm text-gray-600">Largest Contentful Paint</div>
          <div className="text-xs text-gray-500 mt-1">Target: ≤2.5s</div>
        </div>

        {/* CLS */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">CLS</h4>
            <span className={`text-sm font-medium ${clsStatus.color}`}>
              {clsStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performance.cls !== null ? performance.cls.toFixed(3) : "—"}
          </div>
          <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
          <div className="text-xs text-gray-500 mt-1">Target: ≤0.1</div>
        </div>

        {/* INP */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">INP</h4>
            <span className={`text-sm font-medium ${inpStatus.color}`}>
              {inpStatus.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {performance.inp !== null ? `${performance.inp}ms` : "—"}
          </div>
          <div className="text-sm text-gray-600">Interaction to Next Paint</div>
          <div className="text-xs text-gray-500 mt-1">Target: ≤200ms</div>
        </div>
      </div>

      {/* Performance Notes */}
      {performance.notes && performance.notes.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Performance Insights</h4>
          <div className="space-y-2">
            {performance.notes.map((note, index) => (
              <div key={index} className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                {note}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No PSI Data Warning */}
      {performance.lcp === null && performance.cls === null && performance.inp === null && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                Core Web Vitals data not available. This could be due to:
              </p>
              <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
                <li>PageSpeed Insights API key not configured</li>
                <li>Network connectivity issues</li>
                <li>Page not accessible to PageSpeed Insights</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
