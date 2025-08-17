import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import App from './sidebar/App';

// Overlay mount root (Shadow DOM)
const overlayId = '__seo_audit_overlay_root__';
let root = document.getElementById(overlayId);
if (!root) {
  root = document.createElement('div');
  root.id = overlayId;
  const shadow = root.attachShadow({ mode: 'open' });
  document.body.appendChild(root);
  render(<App />, shadow);
}
// TODO: Add event bus, router, and unmount logic
