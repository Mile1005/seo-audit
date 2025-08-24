chrome.runtime.onInstalled.addListener(() => {
console.log('[SEO-AUDIT] installed');
});

const INVALID_SCHEMES = ['chrome:', 'chrome-extension:', 'about:', 'edge:'];

chrome.action?.onClicked?.addListener(async (tab) => {
try {
if (!tab?.id || !tab?.url) return;
const u = String(tab.url);
if (INVALID_SCHEMES.some((s) => u.startsWith(s))) {
console.warn('[SEO-AUDIT] Unsupported URL scheme:', u);
return;
}
await chrome.tabs.sendMessage(tab.id, { type: 'ANALYZE' });
} catch (err) {
console.warn('[SEO-AUDIT] Failed to send ANALYZE message:', err);
}
});

chrome.runtime.onMessage.addListener((msg, sender) => {
console.log('[SEO-AUDIT][background] Message received:', msg, sender);
});
