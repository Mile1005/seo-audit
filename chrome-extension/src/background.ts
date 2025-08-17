chrome.runtime.onInstalled.addListener(() => {
  // Optional: setup or log install
});

// Ensure not shadowed
if (chrome.action && chrome.action.onClicked) {
  chrome.action.onClicked.addListener(async (tab) => {
    if (!tab?.id) return;
    try {
      await chrome.tabs.sendMessage(tab.id, { type: "ANALYZE" });
    } catch (e) {
      // If content script is not injected, optionally inject (requires "scripting" permission)
      // chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
      // Then retry messaging if needed
      // eslint-disable-next-line no-console
      console.warn('[SEO-AUDIT] Failed to send ANALYZE message:', e);
    }
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Log all messages for debugging
  // eslint-disable-next-line no-console
  console.log('[SEO-AUDIT][background] Message received:', msg, sender);
  // Optionally handle background commands here
});
