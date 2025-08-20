import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface RankSnapshot {
  id: string;
  domainId: string;
  keyword: string;
  position: number;
  provider?: string;
  createdAt: string;
}

interface RankSnapshotSectionProps {
  domainId: string;
  domain: string;
}

export default function RankSnapshotSection({ domainId, domain }: RankSnapshotSectionProps) {
  const [snapshots, setSnapshots] = useState<RankSnapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const [keyword, setKeyword] = useState('');

  const fetchRankData = async () => {
    setLoading(true);
    setError(null);
    setHasAttemptedFetch(true);
    
    console.log('RankSnapshot: Manually fetching data for domainId:', domainId);
    
    try {
      const res = await fetch(`/api/rank/${domainId}`);
      console.log('RankSnapshot: API response status:', res.status);
      console.log('RankSnapshot: API response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      console.log('RankSnapshot: API response data:', data);
      
      if (data.error && res.status === 429) {
        setError('Quota reached, try again later');
      } else {
        setSnapshots(data);
      }
    } catch (e: any) {
      console.error('RankSnapshot: Error fetching data:', e);
      setError(e.message || 'Failed to load rank data');
    } finally {
      setLoading(false);
    }
  };

  const triggerRankSnapshot = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword first');
      return;
    }
    
    setTriggering(true);
    try {
      console.log('RankSnapshot: Creating real snapshot for domain:', domain, 'keyword:', keyword);
      
      // Call the real rank tracking API
      const response = await fetch('/api/rank-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          domain: domain,
          keyword: keyword.trim() 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create rank snapshot');
      }
      
      const data = await response.json();
      console.log('RankSnapshot: API response:', data);
      
      // Create a snapshot from the API response
      const newSnapshot: RankSnapshot = {
        id: crypto.randomUUID(),
        domainId,
        keyword: keyword.trim(),
        position: data.position || 0,
        provider: 'SERPAPI',
        createdAt: new Date().toISOString()
      };
      
      setSnapshots(prev => [newSnapshot, ...prev]);
      setError(null);
      setKeyword(''); // Clear the input after success
      console.log('RankSnapshot: Real snapshot created successfully');
      
    } catch (e: any) {
      console.error('RankSnapshot: Error creating snapshot:', e);
      setError(e.message || 'Failed to trigger rank snapshot');
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
        <option>All Keywords</option>
      </select>
      <span className="text-xs text-gray-400">(Filters coming soon)</span>
    </div>
  );

  // Show initial state with action buttons
  if (!hasAttemptedFetch) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Rank Tracking</h3>
          <div className="text-gray-600 mb-4">Ready to fetch rank tracking data</div>
          <div className="mb-2 text-sm text-gray-500">Domain ID: <code className="bg-gray-800 px-2 py-1 rounded">{domainId}</code></div>
          <div className="mb-2 text-sm text-gray-500">Domain: <code className="bg-gray-800 px-2 py-1 rounded">{domain}</code></div>
          
          {/* Keyword Input */}
          <div className="mb-4">
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-300 mb-2">
              Enter keyword to track:
            </label>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., 'seo tools', 'website audit'"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={fetchRankData}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            🔍 Fetch Rank Data
          </button>
          <button 
            onClick={triggerRankSnapshot}
            disabled={triggering}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {triggering ? 'Creating...' : '➕ Create Sample Data'}
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Click "Fetch Rank Data" to load existing data from the database, or "Create Sample Data" to generate demo content.
        </div>
      </Card>
    );
  }

  if (loading) return (
    <Card className="p-6 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Rank Tracking</h3>
        <div className="animate-pulse">Loading rank data...</div>
      </div>
      <div className="text-sm text-gray-500">Domain ID: {domainId}</div>
    </Card>
  );
  
  if (error) return (
    <Card className="p-6 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Rank Tracking</h3>
        <div className="text-red-400 mb-4">{error}</div>
      </div>
      <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={fetchRankData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🔄 Try Again
        </button>
        <button 
          onClick={triggerRankSnapshot}
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
          <h3 className="text-2xl font-bold mb-4">Rank Tracking</h3>
          <div className="text-gray-600 mb-4">No rank data available yet</div>
        </div>
        <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={fetchRankData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 Refresh Data
          </button>
          <button 
            onClick={triggerRankSnapshot}
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

  // Group by keyword
  const keywords = Array.from(new Set(snapshots.map(s => s.keyword)));
  const latestByKeyword = keywords.map(kw => {
    const kwSnaps = snapshots.filter(s => s.keyword === kw);
    const latest = kwSnaps[0];
    return { keyword: kw, position: latest?.position || 0 };
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Rank Tracking</h3>
        <div className="flex gap-2">
          <button 
            onClick={fetchRankData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            🔄 Refresh
          </button>
          <button 
            onClick={triggerRankSnapshot}
            disabled={triggering}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            {triggering ? 'Creating...' : '➕ Add Data'}
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">Domain ID: {domainId}</div>
      
      {filterUI}
      <Card className="p-6 mb-6">
        <h4 className="text-lg font-semibold mb-2">Latest Keyword Ranks</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="px-4 py-2 text-left">Keyword</th>
              <th className="px-4 py-2 text-left">Latest Position</th>
            </tr>
          </thead>
          <tbody>
            {latestByKeyword.map((row, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-4 py-2 font-medium text-accent-primary">{row.keyword}</td>
                <td className="px-4 py-2">{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {keywords.map(kw => {
        const data = snapshots.filter(s => s.keyword === kw).map(s => ({ ...s, date: new Date(s.createdAt).toLocaleDateString() }));
        return (
          <Card key={kw} className="p-6 mb-6">
            <h4 className="text-lg font-semibold mb-2">{kw} - Rank History</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis reversed domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="position" stroke="#3B82F6" name="Google Position" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        );
      })}
    </div>
  );
}
