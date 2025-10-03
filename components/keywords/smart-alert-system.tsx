'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Award,
  AlertTriangle,
  Settings,
  Mail,
  MessageSquare,
  Check,
  X,
  Zap,
  Target,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Alert {
  id: string;
  type: 'ranking' | 'traffic' | 'competitor' | 'serp' | 'technical';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  change: string;
  timestamp: string;
  isRead: boolean;
  actionable: boolean;
  actionText?: string;
}

interface AlertConfig {
  id: string;
  type: string;
  threshold: number;
  isActive: boolean;
  emailEnabled: boolean;
  slackEnabled: boolean;
  webhookUrl?: string;
}

interface SmartAlertSystemProps {
  keywordId: string;
  projectId: string;
  keyword: string;
  currentRank?: number;
}

export function SmartAlertSystem({ keywordId, projectId, keyword, currentRank = 5 }: SmartAlertSystemProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [configs, setConfigs] = useState<AlertConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, [keywordId, projectId]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/keywords/alerts?keywordId=${keywordId}&projectId=${projectId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }

      const result = await response.json();

      if (result.success) {
        setAlerts(result.data.recentAlerts);
        setConfigs(result.data.configs);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  const toggleAlertConfig = async (configId: string, field: 'isActive' | 'emailEnabled' | 'slackEnabled') => {
    setSavingConfig(true);
    try {
      const config = configs.find(c => c.id === configId);
      if (!config) return;

      const updatedConfig = { ...config, [field]: !config[field] };

      const response = await fetch('/api/keywords/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywordId,
          projectId,
          ...updatedConfig
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update alert configuration');
      }

      // Update local state
      setConfigs(configs.map(c => c.id === configId ? updatedConfig : c));
    } catch (err) {
      console.error('Error updating alert config:', err);
      alert('Failed to update alert configuration');
    } finally {
      setSavingConfig(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'ranking':
        return TrendingUp;
      case 'traffic':
        return Activity;
      case 'competitor':
        return Users;
      case 'serp':
        return Award;
      case 'technical':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-rose-50 via-white to-red-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 border-b border-rose-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow-md">
              <Bell className="h-5 w-5 text-white" />
            </div>
            Smart Alert System
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
            <span className="ml-3 text-slate-600">Loading alerts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-rose-50 via-white to-red-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 border-b border-rose-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow-md">
              <Bell className="h-5 w-5 text-white" />
            </div>
            Smart Alert System
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-700 mb-4">{error}</p>
            <button
              onClick={fetchAlerts}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const warningAlerts = alerts.filter(a => a.severity === 'warning').length;

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-rose-50 via-white to-red-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 border-b border-rose-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow-md">
                <Bell className="h-5 w-5 text-white" />
              </div>
              Smart Alert System
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium mt-1">
              Real-time monitoring and instant notifications for "{keyword}"
            </CardDescription>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-rose-300 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Configure</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 rounded-xl border-2 border-red-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h5 className="font-bold text-slate-900">Critical</h5>
            </div>
            <p className="text-3xl font-bold text-red-600">{criticalAlerts}</p>
            <p className="text-xs text-slate-600 mt-1">Requires immediate attention</p>
          </div>

          <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h5 className="font-bold text-slate-900">Warnings</h5>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{warningAlerts}</p>
            <p className="text-xs text-slate-600 mt-1">Monitor closely</p>
          </div>

          <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <h5 className="font-bold text-slate-900">Active Alerts</h5>
            </div>
            <p className="text-3xl font-bold text-blue-600">{configs.filter(c => c.isActive).length}</p>
            <p className="text-xs text-slate-600 mt-1">Out of {configs.length} configured</p>
          </div>
        </div>

        {/* Alert Configuration Panel */}
        {showConfig && (
          <div className="mb-6 bg-white rounded-2xl border-2 border-slate-200 p-6 animate-in slide-in-from-top duration-300">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-rose-600" />
              Alert Configuration
            </h3>
            <div className="space-y-4">
              {configs.map((config) => (
                <div key={config.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{config.type.replace(/_/g, ' ').toUpperCase()}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Threshold: {config.threshold} {config.type.includes('ranking') ? 'positions' : '%'}
                      </p>
                    </div>
                    <Switch
                      checked={config.isActive}
                      onCheckedChange={() => toggleAlertConfig(config.id, 'isActive')}
                      disabled={savingConfig}
                    />
                  </div>

                  {config.isActive && (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-600" />
                        <span className="text-xs text-slate-600">Email</span>
                        <Switch
                          checked={config.emailEnabled}
                          onCheckedChange={() => toggleAlertConfig(config.id, 'emailEnabled')}
                          disabled={savingConfig}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-slate-600" />
                        <span className="text-xs text-slate-600">Slack</span>
                        <Switch
                          checked={config.slackEnabled}
                          onCheckedChange={() => toggleAlertConfig(config.id, 'slackEnabled')}
                          disabled={savingConfig}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-rose-600" />
            Recent Alerts
          </h3>

          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No alerts yet</p>
              <p className="text-xs text-slate-500">You'll be notified when important changes occur</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                const severityClass = getSeverityColor(alert.severity);

                return (
                  <div
                    key={alert.id}
                    className={`rounded-xl border-2 p-4 ${severityClass} transition-all duration-200`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/50 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold">{alert.title}</h4>
                          <Badge className={severityClass}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          </div>
                          {alert.actionable && alert.actionText && (
                            <button className="text-xs font-medium underline hover:no-underline">
                              {alert.actionText}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
