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

interface BacklinkSnapshotSectionProps {
  domainId: string;
  domain: string;
}

export default function BacklinkSnapshotSection({ domainId, domain }: BacklinkSnapshotSectionProps) {
  const [snapshots, setSnapshots] = useState<BacklinkSnapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchBacklinkData = async () => {
    setLoading(true);
    setError(null);
    setHasAttemptedFetch(true);
    
    console.log('BacklinkSnapshot: Manually fetching data for domainId:', domainId);
    
    try {
      const res = await fetch(`/api/backlinks/${domainId}`);
      console.log('BacklinkSnapshot: API response status:', res.status);
      console.log('BacklinkSnapshot: API response headers:', Object.fromEntries(res.headers.entries()));
      
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
  };

  const triggerBacklinkSnapshot = async () => {
    setTriggering(true);
    try {
      console.log('BacklinkSnapshot: Creating real snapshot for domain:', domain);
      
      // Call the real backlinks API
      const response = await fetch('/api/backlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create backlink snapshot');
      }
      
      const data = await response.json();
      console.log('BacklinkSnapshot: API response:', data);
      
      // Create a snapshot from the API response
      const newSnapshot: BacklinkSnapshot = {
        id: crypto.randomUUID(),
        domainId,
        totalBacklinks: data.totalBacklinks || 0,
        referringDomains: data.referringDomains || 0,
        provider: 'OpenLinkProfiler',
        createdAt: new Date().toISOString()
      };
      
      setSnapshots(prev => [newSnapshot, ...prev]);
      setError(null);
      console.log('BacklinkSnapshot: Real snapshot created successfully');
      
    } catch (e: any) {
      console.error('BacklinkSnapshot: Error creating snapshot:', e);
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

  // Show initial state with action buttons
  if (!hasAttemptedFetch) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Backlink Snapshot</h3>
          <div className="text-gray-600 mb-4">Ready to fetch backlink data</div>
          <div className="mb-2 text-sm text-gray-500">Domain ID: <code className="bg-gray-800 px-2 py-1 rounded">{domainId}</code></div>
          <div className="mb-2 text-sm text-gray-500">Domain: <code className="bg-gray-800 px-2 py-1 rounded">{domain}</code></div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={fetchBacklinkData}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            🔍 Fetch Backlink Data
          </button>
          <button 
            onClick={triggerBacklinkSnapshot}
            disabled={triggering}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {triggering ? 'Creating...' : '➕ Create Sample Data'}
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Click "Fetch Backlink Data" to load existing data from the database, or "Create Sample Data" to generate demo content.
        </div>
      </Card>
    );
  }

  if (loading) return (
    <Card className="p-6 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Backlink Snapshot</h3>
        <div className="animate-pulse">Loading backlink data...</div>
      </div>
      <div className="text-sm text-gray-500">Domain ID: {domainId}</div>
    </Card>
  );
  
  if (error) return (
    <Card className="p-6 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Backlink Snapshot</h3>
        <div className="text-red-400 mb-4">{error}</div>
      </div>
      <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={fetchBacklinkData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🔄 Try Again
        </button>
        <button 
          onClick={triggerBacklinkSnapshot}
          disabled={triggering}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {triggering ? 'Creating...' : '➕ Create Sample Data'}
        </button>
      </div>
    </Card>
  );
  
  if (!snapshots.length) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-4">Backlink Snapshot</h3>
          <div className="text-gray-600 mb-4">No backlink data available yet</div>
        </div>
        <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={fetchBacklinkData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 Refresh Data
          </button>
          <button 
            onClick={triggerBacklinkSnapshot}
            disabled={triggering}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {triggering ? 'Creating...' : '➕ Create Sample Data'}
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          No data found in the database. Create sample data to see the interface in action.
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
        <div className="flex gap-2">
          <button 
            onClick={fetchBacklinkData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            🔄 Refresh
          </button>
          <button 
            onClick={triggerBacklinkSnapshot}
            disabled={triggering}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            {triggering ? 'Creating...' : '➕ Add Data'}
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">Domain ID: {domainId}</div>
      
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
