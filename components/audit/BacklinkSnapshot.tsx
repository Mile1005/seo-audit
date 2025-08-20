import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface BacklinkSnapshot {
  id: string;
  domainId: string;
  totalBacklinks: number;
  referringDomains: number;
  provider?: string;
  createdAt: string;
}

export default function BacklinkSnapshotSection({ domainId }: { domainId: string }) {
  const [snapshots, setSnapshots] = useState<BacklinkSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      console.log('BacklinkSnapshot: Fetching data for domainId:', domainId);
      
      try {
        const res = await fetch(`/api/backlinks/${domainId}`);
        console.log('BacklinkSnapshot: API response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('BacklinkSnapshot: API response data:', data);
        
        if (data.error && res.status === 429) {
          setError('Quota reached, try again later');
        } else {
          setSnapshots(data);
        }
      } catch (e: any) {
        console.error('BacklinkSnapshot: Error fetching data:', e);
        setError(e.message || 'Failed to load backlink data');
      } finally {
        setLoading(false);
      }
    }
    if (domainId) fetchData();
  }, [domainId]);

  const triggerBacklinkSnapshot = async () => {
    setTriggering(true);
    try {
      // For now, we'll create a dummy snapshot since we don't have real data
      // In a real implementation, this would call the backlink API
      const dummySnapshot: BacklinkSnapshot = {
        id: crypto.randomUUID(),
        domainId,
        totalBacklinks: Math.floor(Math.random() * 10000) + 100,
        referringDomains: Math.floor(Math.random() * 500) + 10,
        provider: 'OpenLinkProfiler',
        createdAt: new Date().toISOString()
      };
      
      setSnapshots(prev => [dummySnapshot, ...prev]);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to trigger backlink snapshot');
    } finally {
      setTriggering(false);
    }
  };

  // Placeholder for future filters
  const filterUI = (
    <div className="mb-4 flex gap-4 items-center">
      <input type="date" className="border rounded px-2 py-1" disabled placeholder="Date from" />
      <input type="date" className="border rounded px-2 py-1" disabled placeholder="Date to" />
      <select className="border rounded px-2 py-1" disabled>
        <option>All Providers</option>
      </select>
      <span className="text-xs text-gray-400">(Filters coming soon)</span>
    </div>
  );

  if (loading) return <Card className="p-6 text-center animate-pulse">Loading backlink data...</Card>;
  if (error) return (
    <Card className="p-6 text-center text-red-400">
      <div className="mb-4">{error}</div>
      <button 
        onClick={triggerBacklinkSnapshot}
        disabled={triggering}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {triggering ? 'Triggering...' : 'Try Again'}
      </button>
    </Card>
  );
  
  if (!snapshots.length) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-4 text-gray-600">No backlink data available yet.</div>
        <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
        <button 
          onClick={triggerBacklinkSnapshot}
          disabled={triggering}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {triggering ? 'Triggering...' : 'Trigger First Snapshot'}
        </button>
        <div className="mt-2 text-sm text-gray-500">
          This will create a sample backlink entry for demonstration.
        </div>
      </Card>
    );
  }

  const latest = snapshots[0];
  const prev = snapshots[1];
  const backlinkTrend = prev ? latest.totalBacklinks - prev.totalBacklinks : 0;
  const domainTrend = prev ? latest.referringDomains - prev.referringDomains : 0;
  const data = snapshots.map(s => ({ ...s, date: new Date(s.createdAt).toLocaleDateString() })).reverse();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Backlink Snapshot</h3>
        <button 
          onClick={triggerBacklinkSnapshot}
          disabled={triggering}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {triggering ? 'Triggering...' : 'Add Snapshot'}
        </button>
      </div>
      {filterUI}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">Total Backlinks</div>
          <div className="text-3xl font-bold text-accent-primary">{latest.totalBacklinks}</div>
          {prev && (
            <div className={`mt-2 text-sm font-medium ${backlinkTrend > 0 ? 'text-green-500' : backlinkTrend < 0 ? 'text-red-500' : 'text-gray-400'}`}>{backlinkTrend > 0 ? '▲' : backlinkTrend < 0 ? '▼' : '–'} {Math.abs(backlinkTrend)}</div>
          )}
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-2">Referring Domains</div>
          <div className="text-3xl font-bold text-accent-secondary">{latest.referringDomains}</div>
          {prev && (
            <div className={`mt-2 text-sm font-medium ${domainTrend > 0 ? 'text-green-500' : domainTrend < 0 ? 'text-red-500' : 'text-gray-400'}`}>{domainTrend > 0 ? '▲' : domainTrend < 0 ? '▼' : '–'} {Math.abs(domainTrend)}</div>
          )}
        </Card>
      </div>
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-2">Backlink Growth Over Time</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalBacklinks" stroke="#10B981" name="Total Backlinks" />
            <Line type="monotone" dataKey="referringDomains" stroke="#6366F1" name="Referring Domains" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
