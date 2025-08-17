import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Summary from './components/Summary';
import Issues from './components/Issues';
import Structure from './components/Structure';
import Order from './components/Order';
import Contrast from './components/Contrast';
import Reference from './components/Reference';
import { AnalysisResult, Category, Severity, Issue } from '../../types';
import { exportAnalysisCSV, exportAnalysisJSON } from './exportUtils';

const TABS = ['Summary', 'Issues', 'Structure', 'Order', 'Contrast', 'Reference'] as const;
type Tab = typeof TABS[number];

const DEFAULT_WIDTH = 340;
const DEFAULT_HEIGHT = 600;

export default function App() {
  const [tab, setTab] = useState<Tab>('Summary');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<Record<Category, boolean>>({
    error: true, alert: true, feature: true, structure: true, aria: true
  });
  const [sidebarPos, setSidebarPos] = useState<{ x: number; y: number }>({ x: window.innerWidth - DEFAULT_WIDTH, y: 0 });
  const [sidebarSize, setSidebarSize] = useState<{ w: number; h: number }>({ w: DEFAULT_WIDTH, h: DEFAULT_HEIGHT });
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [diagnostics, setDiagnostics] = useState({ fps: 0, nodes: 0, duration: 0 });
  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const fpsRef = useRef<number[]>([]);
  const lastFrame = useRef(performance.now());
  const [focusIssueId, setFocusIssueId] = useState<string | null>(null);
  // Listen for badge click to focus issue
  useEffect(() => {
    function onOpenIssue(e: any) {
      setTab('Issues');
      setFocusIssueId(e.detail.issueId);
    }
    window.addEventListener('seo-audit-open-issue', onOpenIssue);
    return () => window.removeEventListener('seo-audit-open-issue', onOpenIssue);
  }, []);

  // Load persisted state
  useEffect(() => {
    chrome.storage.sync.get(['sidebarPos', 'sidebarSize', 'visibleCategories', 'showDiagnostics'], (data) => {
      if (data.sidebarPos) setSidebarPos(data.sidebarPos);
      if (data.sidebarSize) setSidebarSize(data.sidebarSize);
      if (data.visibleCategories) setVisibleCategories(data.visibleCategories);
      if (typeof data.showDiagnostics === 'boolean') setShowDiagnostics(data.showDiagnostics);
    });
  }, []);
  // Persist state
  useEffect(() => {
    chrome.storage.sync.set({ sidebarPos, sidebarSize, visibleCategories, showDiagnostics });
  }, [sidebarPos, sidebarSize, visibleCategories, showDiagnostics]);

  // Drag/resize handlers
  const onDragStart = (e: MouseEvent) => {
    dragging.current = true;
    dragOffset.current = { x: e.clientX - sidebarPos.x, y: e.clientY - sidebarPos.y };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  };
  const onDrag = (e: MouseEvent) => {
    if (!dragging.current) return;
    setSidebarPos({ x: Math.max(0, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - sidebarSize.w)), y: Math.max(0, e.clientY - dragOffset.current.y) });
  };
  const onDragEnd = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  };
  const onResizeStart = (e: MouseEvent) => {
    resizing.current = true;
    dragOffset.current = { x: e.clientX, y: e.clientY };
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', onResizeEnd);
    e.stopPropagation();
  };
  const onResize = (e: MouseEvent) => {
    if (!resizing.current) return;
    setSidebarSize({
      w: Math.max(240, Math.min(sidebarSize.w + (e.clientX - dragOffset.current.x), window.innerWidth - sidebarPos.x)),
      h: Math.max(300, sidebarSize.h + (e.clientY - dragOffset.current.y)),
    });
    dragOffset.current = { x: e.clientX, y: e.clientY };
  };
  const onResizeEnd = () => {
    resizing.current = false;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  // Listen for analysis results (stub: replace with real event bus)
  useEffect(() => {
    function onAnalysis(e: any) {
      setResult(e.detail.result);
      // Diagnostics: count nodes, duration
      const nodes = document.querySelectorAll('*').length;
      setDiagnostics(d => ({ ...d, nodes }));
    }
    window.addEventListener('seo-audit-analysis', onAnalysis);
    return () => window.removeEventListener('seo-audit-analysis', onAnalysis);
  }, []);

  // FPS diagnostics
  useEffect(() => {
    let running = true;
    function loop() {
      if (!running) return;
      const now = performance.now();
      const delta = now - lastFrame.current;
      lastFrame.current = now;
      fpsRef.current.push(1000 / delta);
      if (fpsRef.current.length > 30) fpsRef.current.shift();
      setDiagnostics(d => ({ ...d, fps: Math.round(fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length) }));
      requestAnimationFrame(loop);
    }
    loop();
    return () => { running = false; };
  }, []);

  // Telemetry logger (console only)
  useEffect(() => {
    window.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.error('[SEO-AUDIT TELEMETRY]', e.error || e.message);
    });
  }, []);

  // Toggle badge visibility
  const toggleCategory = (cat: Category) => {
    setVisibleCategories(v => ({ ...v, [cat]: !v[cat] }));
  };

  // Export handlers
  const exportCSV = () => {
    if (!result) return;
    exportAnalysisCSV(result);
  };
  const exportJSON = () => {
    if (!result) return;
    exportAnalysisJSON(result);
  };

  // Re-run analysis
  const rerunAnalysis = () => {
    const start = performance.now();
    try {
      window.dispatchEvent(new CustomEvent('seo-audit-request-analysis'));
      setDiagnostics(d => ({ ...d, duration: Math.round(performance.now() - start) }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[SEO-AUDIT TELEMETRY] Analysis error', e);
    }
  };

  return (
    <div
      className="seo-audit-sidebar"
      role="complementary"
      aria-label="SEO Audit Sidebar"
      style={{
        position: 'fixed',
        top: sidebarPos.y,
        left: sidebarPos.x,
        width: sidebarSize.w,
        height: sidebarSize.h,
        zIndex: 2147483647,
        resize: 'both',
        boxShadow: '-2px 0 8px #0008',
        background: '#181c20',
        color: '#fff',
        fontFamily: 'sans-serif',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="seo-audit-sidebar-header" style={{ cursor: 'move', padding: '8px', background: '#222', userSelect: 'none' }} onMouseDown={onDragStart}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>SEO Audit Overlay</span>
        <button aria-label="Close sidebar" style={{ float: 'right', cursor: 'pointer', background: 'none', border: 'none', color: '#fff' }} onClick={() => window.dispatchEvent(new CustomEvent('seo-audit-close-sidebar'))}>✕</button>
      </div>
      <nav className="seo-audit-tabs" style={{ display: 'flex', borderBottom: '1px solid #333' }} role="tablist" aria-label="Sidebar tabs">
        {TABS.map(t => (
          <button key={t} className={tab === t ? 'active' : ''} role="tab" aria-selected={tab === t} aria-label={t + ' tab'} style={{ flex: 1, background: 'none', border: 'none', color: tab === t ? '#22c55e' : '#aaa', padding: '12px', cursor: 'pointer', fontSize: '1rem', borderBottom: tab === t ? '2px solid #22c55e' : 'none' }} onClick={() => setTab(t)}>{t}</button>
        ))}
        <button aria-label="Toggle diagnostics" style={{ background: 'none', border: 'none', color: showDiagnostics ? '#22c55e' : '#aaa', padding: '12px', cursor: 'pointer', fontSize: '1rem' }} onClick={() => setShowDiagnostics(v => !v)} title="Toggle diagnostics">⚙️</button>
      </nav>
      <div className="seo-audit-tab-content" style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {showDiagnostics && (
          <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <div>Overlay FPS: {diagnostics.fps}</div>
            <div>Nodes scanned: {diagnostics.nodes}</div>
            <div>Last analysis duration: {diagnostics.duration} ms</div>
            <button onClick={rerunAnalysis} style={{ marginTop: 8 }} aria-label="Re-run analysis">Re-run analysis</button>
          </div>
        )}
        {tab === 'Summary' && (
          <Summary result={result} visibleCategories={visibleCategories} toggleCategory={toggleCategory} exportCSV={exportCSV} exportJSON={exportJSON} diagnostics={diagnostics} rerunAnalysis={rerunAnalysis} />
        )}
        {tab === 'Issues' && (
          <Issues result={result} focusIssueId={focusIssueId} />
        )}
        {tab === 'Structure' && (
          <Structure result={result} />
        )}
        {tab === 'Order' && (
          <Order result={result} />
        )}
        {tab === 'Contrast' && (
          <Contrast result={result} />
        )}
        {tab === 'Reference' && (
          <Reference keyboardShortcuts={[{ combo: 'Alt+Shift+O', desc: 'Toggle overlay' }, { combo: 'Alt+Shift+S', desc: 'Open/close sidebar' }]} />
        )}
      </div>
      <div className="seo-audit-sidebar-resize" style={{ position: 'absolute', right: 0, bottom: 0, width: '16px', height: '16px', cursor: 'nwse-resize', zIndex: 2147483648 }} onMouseDown={onResizeStart} />
    </div>
  );
}
