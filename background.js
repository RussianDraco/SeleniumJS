chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'stop-recording') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: () => {
              return events.join('\n');
            }
          },
          (results) => {
            sendResponse({ code: results[0].result });
          }
        );
      });
      return true; // Keep the message channel open for async response
    }
  });