import React, { useEffect, useState } from 'react';

type Checks = {
  title: boolean;
  meta: boolean;
  headings: boolean;
  content: boolean;
  images: boolean;
  links: boolean;
  performance: boolean;
  schema: boolean;
};

type Weights = {
  title: number;
  meta: number;
  headings: number;
  content: number;
  images: number;
  links: number;
  performance: number;
};

type Settings = {
  analysisDepth: 'basic' | 'advanced';
  checks: Checks;
  weights: Weights;
};

const DEFAULT_SETTINGS: Settings = {
  analysisDepth: 'basic',
  checks: {
    title: true,
    meta: true,
    headings: true,
    content: true,
    images: true,
    links: true,
    performance: true,
    schema: true,
  },
  weights: {
    title: 20,
    meta: 15,
    headings: 15,
    content: 20,
    images: 10,
    links: 10,
    performance: 10,
  },
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
      setSettings(items as Settings);
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set(settings, () => {
      setStatus('Settings saved!');
      setTimeout(() => setStatus(''), 1500);
    });
  };

  const exportSettings = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-analyzer-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        setSettings(imported);
        chrome.storage.sync.set(imported, () => setStatus('Settings imported!'));
      } catch {
        setStatus('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    chrome.storage.sync.clear(() => {
      setSettings(DEFAULT_SETTINGS);
      setStatus('Data cleared!');
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow mt-4 font-sans">
      <h2 className="text-xl font-bold mb-4">SEO Analyzer Settings</h2>
      <div className="mb-4">
        <label className="font-semibold">Analysis Depth:</label>
        <select className="ml-2 border rounded px-2 py-1" value={settings.analysisDepth} onChange={e => setSettings(s => ({ ...s, analysisDepth: e.target.value as any }))}>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Enable Checks:</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.keys(settings.checks).map((key) => (
            <label key={key} className="flex items-center">
              <input type="checkbox" checked={settings.checks[key as keyof Checks]} onChange={e => setSettings(s => ({ ...s, checks: { ...s.checks, [key]: e.target.checked } }))} />
              <span className="ml-2 capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Scoring Weights:</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.keys(settings.weights).map((key) => (
            <label key={key} className="flex items-center">
              <span className="capitalize w-20 inline-block">{key}</span>
              <input type="number" min={0} max={100} className="ml-2 border rounded px-2 py-1 w-16" value={settings.weights[key as keyof Weights]} onChange={e => setSettings(s => ({ ...s, weights: { ...s.weights, [key]: Number(e.target.value) } }))} />
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={saveSettings}>Save</button>
        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={exportSettings}>Export</button>
        <label className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer">
          Import
          <input type="file" accept="application/json" className="hidden" onChange={importSettings} />
        </label>
        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={clearData}>Clear Data</button>
      </div>
      {status && <div className="text-green-600 mb-2">{status}</div>}
    </div>
  );
};
