// TypeScript types for Chrome APIs are available via @types/chrome

type Preferences = {
  showBadge: boolean;
};

const DEFAULT_PREFS: Preferences = {
  showBadge: true,
};

// Helper: Get user preferences from storage
function getPreferences(): Promise<Preferences> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(DEFAULT_PREFS, (items) => {
      resolve(items as Preferences);
    });
  });
}

// Helper: Set user preferences
function setPreferences(prefs: Partial<Preferences>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set(prefs, () => resolve());
  });
}

// Message passing between popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_PREFS') {
    getPreferences().then(sendResponse);
    return true;
  }
  if (message.type === 'SET_PREFS') {
    setPreferences(message.prefs).then(() => sendResponse({ success: true }));
    return true;
  }
  if (message.type === 'SEO_SCORE_UPDATE') {
    // Update badge with SEO score
    if (typeof message.score === 'number') {
      if (typeof sender.tab?.id === 'number') {
        updateBadge(message.score, sender.tab.id);
      } else {
        updateBadge(message.score);
      }
    }
    sendResponse({ success: true });
    return true;
  }
  if (message.type === 'PASS_TO_CONTENT') {
    // Forward message to content script
    if (sender.tab?.id) {
      chrome.tabs.sendMessage(sender.tab.id, message.payload, sendResponse);
      return true;
    }
  }
});

// Tab updates: clear badge or update as needed
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    chrome.action.setBadgeText({ text: '', tabId: activeInfo.tabId });
  } catch (e) {
    // Ignore errors
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.action.setBadgeText({ text: '', tabId });
  }
});

// Context menu: Analyze SEO
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'analyze-seo',
    title: 'Analyze SEO',
    contexts: ['page'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyze-seo' && typeof tab?.id === 'number') {
    const tabId = tab.id;
    chrome.tabs.sendMessage(tabId, { type: 'GET_SEO_DATA' }, (response) => {
      if (chrome.runtime.lastError) {
        // Content script not injected
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js'],
        }, () => {
          chrome.tabs.sendMessage(tabId, { type: 'GET_SEO_DATA' });
        });
      }
    });
  }
});

// Badge update helper
function updateBadge(score: number, tabId?: number) {
  const text = score >= 0 ? String(score) : '';
  const badgeTextArgs = tabId !== undefined ? { text, tabId } : { text };
  const badgeColorArgs = tabId !== undefined
    ? { color: score >= 80 ? '#4caf50' : score >= 50 ? '#ff9800' : '#f44336', tabId }
    : { color: score >= 80 ? '#4caf50' : score >= 50 ? '#ff9800' : '#f44336' };
  // Use spread to only include tabId if defined
  chrome.action.setBadgeText({ text, ...(tabId !== undefined ? { tabId } : {}) });
  chrome.action.setBadgeBackgroundColor({ color: score >= 80 ? '#4caf50' : score >= 50 ? '#ff9800' : '#f44336', ...(tabId !== undefined ? { tabId } : {}) });
}
