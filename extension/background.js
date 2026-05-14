let bypassTabs = new Set();

chrome.runtime.onMessage.addListener((msg, sender) => {
    if (!sender.tab) return;

    const tabId = sender.tab.id;

    if (msg.action === "OPEN_WARNING") {
        if (bypassTabs.has(tabId)) return;

        chrome.storage.local.set({
            lastRiskScore: msg.riskScore || 0,
            lastReasons: msg.reasons || []
        }, () => {
            chrome.tabs.update(tabId, {
                url: chrome.runtime.getURL(
                    "warning/warining.html?url=" + encodeURIComponent(msg.url)
                )
            });
        });
    }

    if (msg.action === "CONTINUE_ANYWAY") {
        bypassTabs.add(tabId);
        chrome.tabs.update(tabId, { url: msg.url });
    }

    if (msg.action === "GO_BACK") {
        chrome.tabs.goBack(tabId);
    }
});