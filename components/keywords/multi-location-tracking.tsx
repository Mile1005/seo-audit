"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  Search,
  ChevronDown,
  Loader2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LocationRanking {
  country: string;
  countryCode: string;
  city?: string;
  rank: number;
  previousRank: number;
  searchVolume: number;
  device: "desktop" | "mobile" | "tablet";
  change: number;
  url?: string;
}

interface DeviceStats {
  device: string;
  avgRank: number;
  change: number;
  locations: number;
}

interface MultiLocationTrackingProps {
  keywordId: string;
  keyword: string;
}

export function MultiLocationTracking({ keywordId, keyword }: MultiLocationTrackingProps) {
  const [selectedDevice, setSelectedDevice] = useState<"all" | "desktop" | "mobile" | "tablet">(
    "all"
  );
  const [rankings, setRankings] = useState<LocationRanking[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocationData();
  }, [keywordId, selectedDevice]);

  const fetchLocationData = async () => {
    try {
      setLoading(true);
      setError(null);

      const deviceParam = selectedDevice === "all" ? "" : `&device=${selectedDevice}`;
      const response = await fetch(
        `/api/keywords/rankings/locations?keywordId=${keywordId}${deviceParam}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location rankings");
      }

      const result = await response.json();

      if (result.success) {
        setRankings(result.data.rankings);
        setDeviceStats(result.data.deviceStats || []);
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error fetching location rankings:", err);
      setError(err instanceof Error ? err.message : "Failed to load location data");
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const filteredRankings =
    selectedDevice === "all" ? rankings : rankings.filter((r) => r.device === selectedDevice);

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-900/10 dark:via-gray-900/10 dark:to-cyan-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-b border-teal-100 dark:border-teal-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
              <Globe className="h-5 w-5 text-white" />
            </div>
            Multi-Location & Device Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            <span className="ml-3 text-slate-600">Loading location data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-900/10 dark:via-gray-900/10 dark:to-cyan-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-b border-teal-100 dark:border-teal-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
              <Globe className="h-5 w-5 text-white" />
            </div>
            Multi-Location & Device Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-700 dark:text-slate-300 mb-4">{error}</p>
            <button
              onClick={fetchLocationData}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (rankings.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-900/10 dark:via-gray-900/10 dark:to-cyan-900/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-b border-teal-100 dark:border-teal-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
              <Globe className="h-5 w-5 text-white" />
            </div>
            Multi-Location & Device Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              No location data available yet
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Location rankings will appear here once tracking data is collected
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-900/10 dark:via-gray-900/10 dark:to-cyan-900/10 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-b border-teal-100 dark:border-teal-800">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
            <Globe className="h-5 w-5 text-white" />
          </div>
          Multi-Location & Device Tracking
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
          Track rankings across 190+ countries, 2500+ cities, and all device types for "{keyword}"
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Device Performance Overview */}
        {deviceStats.length > 0 && (
          <div className="mb-6 p-6 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Device Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deviceStats.map((stat) => (
                <div key={stat.device} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getDeviceIcon(stat.device)}
                    <p className="text-xs text-teal-100 capitalize">{stat.device}</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">#{stat.avgRank.toFixed(1)}</p>
                  <div className="flex items-center gap-2 text-xs text-teal-100">
                    {stat.change !== 0 && (
                      <>
                        {stat.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(stat.change)} positions</span>
                      </>
                    )}
                    {stat.change === 0 && <span>No change</span>}
                  </div>
                  <p className="text-xs text-teal-100 mt-2">{stat.locations} locations</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Device Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Filter by Device:
          </span>
          <div className="flex gap-2">
            {[
              { value: "all", label: "All Devices", icon: <Globe className="h-4 w-4" /> },
              { value: "desktop", label: "Desktop", icon: <Monitor className="h-4 w-4" /> },
              { value: "mobile", label: "Mobile", icon: <Smartphone className="h-4 w-4" /> },
              { value: "tablet", label: "Tablet", icon: <Tablet className="h-4 w-4" /> },
            ].map((device) => (
              <button
                key={device.value}
                onClick={() => setSelectedDevice(device.value as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDevice === device.value
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                {device.icon}
                {device.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Device
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Change
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Search Volume
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredRankings.map((ranking, idx) => {
                  const change = ranking.rank - ranking.previousRank;
                  const changeAbs = Math.abs(change);

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                              {ranking.country}
                            </p>
                            {ranking.city && (
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                {ranking.city}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-slate-100 text-slate-700 capitalize">
                          {getDeviceIcon(ranking.device)}
                          <span className="ml-1">{ranking.device}</span>
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge
                          className={
                            ranking.rank <= 3
                              ? "bg-green-100 text-green-700"
                              : ranking.rank <= 10
                                ? "bg-blue-100 text-blue-700"
                                : ranking.rank <= 20
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-slate-100 text-slate-700"
                          }
                        >
                          #{ranking.rank}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {change !== 0 ? (
                          <Badge
                            className={
                              change < 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }
                          >
                            {change < 0 ? (
                              <>
                                <TrendingUp className="h-3 w-3 mr-1" />+{changeAbs}
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-3 w-3 mr-1" />-{changeAbs}
                              </>
                            )}
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600">No change</Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {ranking.searchVolume.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-teal-600" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Total Locations</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {filteredRankings.length}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Across {selectedDevice === "all" ? "all devices" : selectedDevice}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Average Rank</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              #
              {(
                filteredRankings.reduce((sum, r) => sum + r.rank, 0) / filteredRankings.length
              ).toFixed(1)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Across tracked locations
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-5 w-5 text-green-600" />
              <h5 className="font-bold text-slate-900 dark:text-slate-100">Total Search Volume</h5>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {(filteredRankings.reduce((sum, r) => sum + r.searchVolume, 0) / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Combined monthly searches
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
