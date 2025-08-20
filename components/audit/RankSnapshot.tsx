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

export default function RankSnapshotSection({ domainId }: { domainId: string }) {
  const [snapshots, setSnapshots] = useState<RankSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      console.log('RankSnapshot: Fetching data for domainId:', domainId);
      
      try {
        const res = await fetch(`/api/rank/${domainId}`);
        console.log('RankSnapshot: API response status:', res.status);
        
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
    }
    if (domainId) fetchData();
  }, [domainId]);

  const triggerRankSnapshot = async () => {
    setTriggering(true);
    try {
      // For now, we'll create a dummy snapshot since we don't have real data
      // In a real implementation, this would call the rank tracking API
      const dummySnapshot: RankSnapshot = {
        id: crypto.randomUUID(),
        domainId,
        keyword: 'sample keyword',
        position: Math.floor(Math.random() * 100) + 1,
        provider: 'SERPAPI',
        createdAt: new Date().toISOString()
      };
      
      setSnapshots(prev => [dummySnapshot, ...prev]);
      setError(null);
    } catch (e: any) {
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

  if (loading) return <Card className="p-6 text-center animate-pulse">Loading rank data...</Card>;
  if (error) return (
    <Card className="p-6 text-center text-red-400">
      <div className="mb-4">{error}</div>
      <button 
        onClick={triggerRankSnapshot}
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
        <div className="mb-4 text-gray-600">No rank data available yet.</div>
        <div className="mb-2 text-sm text-gray-500">Domain ID: {domainId}</div>
        <button 
          onClick={triggerRankSnapshot}
          disabled={triggering}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {triggering ? 'Triggering...' : 'Trigger First Snapshot'}
        </button>
        <div className="mt-2 text-sm text-gray-500">
          This will create a sample rank tracking entry for demonstration.
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
        <button 
          onClick={triggerRankSnapshot}
          disabled={triggering}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {triggering ? 'Triggering...' : 'Add Snapshot'}
        </button>
      </div>
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
